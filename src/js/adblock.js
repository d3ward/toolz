import '../sass/adblock.sass'
import * as data from '../data/adblock_data.json'
import { icons } from '../assets/adblock/icons'
import { navbar } from './components/navbar'
import { dialog } from './components/dialog'
import { themeManager } from './components/themeManager'
import { gotop } from './components/gotop'
import { aos } from './components/aos'
import { fadeIn, fadeOut } from './components/fade'
import { Snackbar } from './components/snackbar'
import { LocalStorageManager } from './components/localStorage'
async function getStatus(url) {
	return new Promise(function (resolve, reject) {
		var link = document.createElement('link')
		link.rel = 'stylesheet'
		link.type = 'text/css'
		link.href = url
		link.onload = function () {
			resolve(true)
		}
		link.onerror = function () {
			resolve(false)
		}
		document.body.appendChild(link)
	})
}
var LS = new LocalStorageManager('adb_tool')
var reports = LS.get('reports')
var collapseStatus = LS.get('collapseStatus')
if (!collapseStatus) { collapseStatus = true; LS.set('collapseStatus', collapseStatus) }
var tslog = ""
if (!reports) reports = []
var test_log = document.getElementById('test_log')
var snackbar = new Snackbar({
	topPos: "10px",
	classNames: 'success',
	autoClose: true,
	autoCloseTimeout: 2000
})
async function copyToClip(str) {
	try {
		await navigator.clipboard.writeText(str).then(() => { snackbar.showN('URL copied to clipboard !') })

	} catch (err) {
		const txt = document.createElement('textarea')
		txt.value = str
		txt.setAttribute('readonly', '')
		txt.style.position = 'absolute'
		txt.style.left = '-9999px'
		document.body.appendChild(txt)

		txt.select();
		txt.setSelectionRange(0, 99999);
		document.execCommand('copy');
		txt.remove()
		snackbar.showN('URL copied to clipboard !')
	}
}
var abt = {
	total: 10,
	blocked: 0,
	notblocked:0,
	cosmetic_test: {
		static: false,
		dynamic: false
	},
	script: {
		ads: false,
		pagead: false,
		partnerads: false
	},
	hosts: {}
}
const testWrapper = document.getElementById('test') //Tests wrapper

//--------------------------------------------------
//Function to check a host blocking status
async function check_url(url, div, parent, k1, k2) {
	const controller = new AbortController()
	const config = {
		...{
			method: 'HEAD',
			mode: 'no-cors'
		},
		signal: controller.signal
	}
	const timeout = setTimeout(() => {
		controller.abort()
	}, 8000)
	abt.total += 1
	var hostDiv = document.createElement('div')
	hostDiv.onclick = () => {
		copyToClip(url)
	}
	div.appendChild(hostDiv)
	try {
		await fetch('https://' + url, config, timeout, parent, div)
			.then((response) => {
				console.log(response)
				parent.style.background = 'var(--red)'
				hostDiv.innerHTML = icons['x'] + '<span>' + url + '</span>'
				abt.notblocked += 1
				Object.assign(abt.hosts[k1][k2], { [url]: false })
				tslog += "<br> " + url + " - not blocked"
				//Response was received --> ads are NOT blocked
			})
			.catch((error) => {
				console.log(error.message)
				hostDiv.innerHTML = icons['v'] + '<span>' + url + '</span>'
				abt.blocked += 1
				Object.assign(abt.hosts[k1][k2], { [url]: true })
				tslog += "<br> " + url + " - blocked"
				//No response / error  --> ads are blocked
			})
	} catch (error) {
		console.log(error)
	}
}

//Function to collapse a test
function collapse_category(cc, c) {
	var others = document.querySelectorAll('.test_collapse')
	others.forEach((element) => {
		if (cc == true) element.parentElement.classList.add('show')
		else element.parentElement.classList.remove('show')
		if (c == true)
			element.addEventListener('click', () => {
				element.parentElement.classList.toggle('show')
			})
	})
}

// Function to fetch all the tests
async function fetchTests() {
	let fetches = []
	Object.keys(data).forEach((key) => {
		if (key == 'default') return
		var catEl = document.createElement('div')
		catEl.className = "grid"
		catEl.id = key
		catEl.innerHTML = '<div><h5>' + icons[key] + '&nbsp;&nbsp;' + key + '</h5><div>'
		testWrapper.appendChild(catEl)
		var category = data[key]
		var total_hosts = 0
		abt.hosts[key] = {}
		Object.keys(category).forEach((keyC) => {
			var testInfo = document.createElement('div')
			var tests_count = 0
			const dd = document.createElement('div')
			dd.classList.add('col-6')
			var div = document.createElement('div')
			const dw = document.createElement('div')
			div.classList.add('test')

			div.id = keyC
			div.style.background = 'var(--green)'
			let tc = icons[keyC] != undefined ? (icons[keyC] + "&nbsp") : ""
			div.innerHTML = "<span class='test_collapse'>" + tc + keyC + '</span>'
			div.appendChild(dw)
			dd.appendChild(div)
			catEl.appendChild(dd)
			Object.assign(abt.hosts[key], { [keyC]: {} })
			if (Object.prototype.hasOwnProperty.call(category, keyC)) {
				var value = category[keyC]
				for (let i = 0; i < value.length; i++) {
					fetches.push(
						check_url(value[i], dw, div, key, keyC).then(() => {
							set_liquid()
						})

					)
					tests_count++
				}
			}
			testInfo.innerHTML = keyC + ' => n° tests => ' + tests_count
			test_log.appendChild(testInfo)
			total_hosts += tests_count
		})
		var total_tests = document.createElement('div')
		total_tests.innerHTML =
			key +
			' => Total n° tests => ' +
			total_hosts +
			'<br> ------------------------- '
		test_log.appendChild(total_tests)
	})

	let results = await Promise.all(fetches)
	return results
}

function ad_script_test() {
	let log = document.createElement('div')
	const sfa1 = document.querySelector('#sfa_1')
	const sfa2 = document.querySelector('#sfa_2')
	const sfa3 = document.querySelector('#sfa_3')

	abt.script.ads = typeof s_test_ads == 'undefined'
	abt.script.pagead = typeof s_test_pagead == 'undefined'
	abt.script.partnerads = typeof s_test_partnerads == 'undefined'
	sfa1.classList.add(abt.script.ads ? '_bg-green' : '_bg-red')
	sfa2.classList.add(abt.script.pagead ? '_bg-green' : '_bg-red')
	sfa3.classList.add(abt.script.partnerads ? '_bg-green' : '_bg-red')
	abt.blocked += (abt.script.ads ? 2 :0)+(abt.script.pagead ? 2 :0)+(abt.script.partnerads ? 2 :0)
	abt.notblocked += (abt.script.ads ? 0 :2)+(abt.script.pagead ? 0 :2)+(abt.script.partnerads ? 0 :2)
	test_log.appendChild(log)
	log.innerHTML =
		'<div>script_ads : ' +
		abt.script.ads +
		'</div><div>script_pagead : ' +
		abt.script.pagead +
		'</div><div>script_partenrads : ' +
		abt.script.partnerads +
		'</div><br> ------------------------- '
}
const ctd = document.querySelector('#ctd_test')
const cts = document.querySelector('#cts_test')
//Static
function cosmetic_test_static() {
	abt.cosmetic_test.static =
		cts.offsetHeight || cts.clientHeight ? false : true
	abt.blocked += abt.cosmetic_test.static ? 2 : 0
	abt.notblocked += abt.cosmetic_test.static ? 0 : 2
	document
		.querySelector('#ct_static')
		.classList.add(abt.cosmetic_test.static ? '_bg-green' : '_bg-red')
	let log = document.createElement('div')
	test_log.appendChild(log)
	log.innerHTML =
		' cosmetic_static_ad : ' +
		abt.cosmetic_test.static +
		'<br><br> ------------------------- '
}
//Dynamic
function cosmetic_test_dynamic() {
	let log = document.createElement('div')
	let ad = document.createElement('div')
	ad.className =
		'textads banner-ads banner_ads ad-unit afs_ads ad-zone ad-space adsbox'
	ctd.appendChild(ad)
	setTimeout(function () {
		abt.cosmetic_test.dynamic =
			ad.offsetHeight || ad.clientHeight ? false : true
		abt.blocked += abt.cosmetic_test.dynamic ? 2 : 0
		abt.notblocked += abt.cosmetic_test.dynamic ? 0 : 2
		test_log.appendChild(log)
		log.innerHTML =
			' cosmetic_dynamic_ad : ' +
			abt.cosmetic_test.dynamic +
			'<br><br> ------------------------- '
		document
			.querySelector('#ct_dynamic')
			.classList.add(abt.cosmetic_test.dynamic ? '_bg-green' : '_bg-red')
	}, 500)
}

const lt_particles = document.querySelector('.lt_particles')
const lt_cwrap = document.querySelector('.lt_cwrap')
async function startAdBlockTesting() {
	document.querySelector('.lt_wrap').classList.add('start')
	lt_cwrap.classList.add('start')
	let tests = []
	tests.push(cosmetic_test_static())
	tests.push(cosmetic_test_dynamic())
	tests.push(ad_script_test())
	tests.push(fetchTests())
	let results = await Promise.all(tests)
	return results
}
function set_liquid() {
	var p = (100 / abt.total) * abt.blocked
	var c = p > 30 ? (p > 60 ? 'var(--green)' : 'var(--orange)') : 'var(--red)'
	document.body.style.setProperty('--liquid-percentage', 45 - p + '%')
	document.body.style.setProperty('--liquid-color', c)
	document.body.style.setProperty(
		'--liquid-title',
		"'" + abt.blocked + "'"
	)
}

function stopAdBlockTesting() {
	fadeOut(lt_particles, () => {
		document.querySelector('.lt_wrap').classList.remove('start')
		fadeIn(lt_particles, 'flex')
		document.body.classList.remove("_overflowhidden")
	})
	lt_cwrap.classList.remove('start')
	console.log(abt)
}
function saveNote(t, i) {
	console.log(i, t.value)

}
function render_tests() {
	console.log(reports)
	var r_wrap = document.querySelector('.r_wrap')
	r_wrap.innerHTML = ''
	reports.forEach((r, index) => {
		var div = document.createElement('div')
		div.className = "row"
		var date = new Date(r["time"]);
		let d = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() +
			" " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		var abt = reports[index].abt

		div.innerHTML = "<div><h5>" + d + "</h5></div><div><button class='btn-blue'>" + icons["download"] + "</button> <button class='btn-red'>" + icons["delete"] + index + "</button></div>"
		r_wrap.appendChild(div)
	})
}
//Browser : \nOS : \nAd-block : \nDNS : \nVPN :
function add_report() {
	let ms = Date.now();
	if (reports.length < 10) {
		reports.push({ "time": ms, "note": "", "abt": abt })
	} else {
		reports.splice(0, 1)
		reports.push({ "time": ms, "note": "", "abt": abt })
	}
	LS.set("reports", reports)
	render_tests()
	console.log(abt)
}
window.onbeforeunload = function () {
	window.scrollTo(0, 0);
};

const el = (l) => { return document.querySelector(l) }

document.addEventListener('DOMContentLoaded', function () {
	new navbar()
	new themeManager()
	new gotop()
	new aos()
	const ct = document.querySelector("#collapse_status")


	ct.checked = collapseStatus
	ct.addEventListener("change", () => {
		console.log(collapseStatus)
		collapseStatus = ct.checked
		collapse_category(collapseStatus, false)
		LS.set('collapseStatus', collapseStatus)
	})
	render_tests()

	startAdBlockTesting().then(() => {
		collapse_category(collapseStatus, true)
		//Add a delay in order to show properly the animation
		setTimeout(() => {
			stopAdBlockTesting()
			add_report()
			var tsl = document.createElement("div")
			tsl.innerHTML = tslog
			test_log.appendChild(tsl)
			fadeIn(document.querySelector("#adb_test"), "flex")
		}, 2000)

	})

	document.querySelector("#start_test").addEventListener("click", () => {
		location.reload(true)
	})
	const stxt = "https://raw.githubusercontent.com/d3ward/toolz/master/src/d3host.txt"
	const sadblock = 'https://raw.githubusercontent.com/d3ward/toolz/master/src/d3host.adblock'
	document.querySelector("#d3H_txt").addEventListener("click", function () { copyToClip(stxt) })
	el("#d3H_adblock").addEventListener("click", function () { copyToClip(sadblock) })

})
