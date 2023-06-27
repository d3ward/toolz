import '../sass/adblock.sass'
import * as data from '../data/adblock_data.json'
import packageJSON from '../../package.json'
import { icons } from '../data/icons'
import { navbar } from './components/navbar'
import A11yDialog from './components/dialog'
import { themeManager } from './components/themeManager'
import { gotop } from './components/gotop'
import { aos } from './components/aos'
import { fadeIn, fadeOut } from './components/fade'
import { Snackbar } from './components/snackbar'
import { LocalStorageManager } from './components/localStorage'
const cd = document.querySelector('#dlg_changelog')
const ch_dialog = new A11yDialog(cd)
var TZ = new LocalStorageManager('toolz')
const version = packageJSON.version
const tzversion = TZ.get('version')
if (tzversion !== version) {
	//Show changelog
	//ch_dialog.show()
	//Set version
	TZ.set('version', version)
}
var LS = new LocalStorageManager('adb_tool')
var results = LS.get('results')
var settings = LS.get('settings')
if (!settings || !settings['showCF']) {
	settings = {
		collapseAll: true,
		showCF: true,
		showSL: true
	}
	LS.set('settings', settings)
}

var tslog = ''
if (!results) results = []
var test_log = document.getElementById('test_log')
var snackbar = new Snackbar({
	topPos: '10px',
	classNames: 'success',
	autoClose: true,
	autoCloseTimeout: 2000
})
function downloadResult(k) {
	var r
	results.forEach((ri) => {
		console.log(ri['time'], k)
		if (ri['time'] == k) r = ri
	})
	var data = JSON.stringify(r)
	var blob = new Blob([data], { type: 'application/json' })
	var url = URL.createObjectURL(blob)
	var linkElement = document.createElement('a')
	linkElement.setAttribute('download', 'd3_adb_' + r.date + '.json')
	var revokeAndDownload = function () {
		URL.revokeObjectURL(linkElement.href)
		linkElement.href = url
		linkElement.click()
	}
	if (linkElement.href) {
		URL.revokeObjectURL(linkElement.href)
		setTimeout(revokeAndDownload, 1000)
	} else {
		revokeAndDownload()
	}
}
async function copyToClip(str) {
	try {
		await navigator.clipboard.writeText(str).then(() => {
			snackbar.show('URL copied to clipboard !')
		})
	} catch (err) {
		const txt = document.createElement('textarea')
		txt.value = str
		txt.setAttribute('readonly', '')
		txt.style.position = 'absolute'
		txt.style.left = '-9999px'
		document.body.appendChild(txt)

		txt.select()
		txt.setSelectionRange(0, 99999)
		document.execCommand('copy')
		txt.remove()
		snackbar.show('URL copied to clipboard !')
	}
}
var abt = {
	total: 0,
	blocked: 0,
	notblocked: 0,
	cosmetic_test: {
		static: null,
		dynamic: null
	},
	script: {
		ads: null,
		pagead: null,
		partnerads: null
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
				if (response.type == 'basic' && response.status == 200) {
					hostDiv.innerHTML = icons['v'] + '<span>' + url + '</span>'
					abt.blocked += 1
					Object.assign(abt.hosts[k1][k2], { [url]: true })
					tslog += '<br> ' + url + ' - blocked'
				} else {
					//Response was received --> ads are NOT blocked
					parent.style.background = 'var(--red)'
					hostDiv.innerHTML = icons['x'] + '<span>' + url + '</span>'
					abt.notblocked += 1
					Object.assign(abt.hosts[k1][k2], { [url]: false })
					tslog += '<br> ' + url + ' - not blocked'
				}
			})
			.catch((error) => {
				console.log(error)
				console.log(error.message)
				hostDiv.innerHTML = icons['v'] + '<span>' + url + '</span>'
				abt.blocked += 1
				Object.assign(abt.hosts[k1][k2], { [url]: true })
				tslog += '<br> ' + url + ' - blocked'
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
		catEl.className = 'grid'
		catEl.id = key
		catEl.innerHTML =
			'<div><h5>' + icons[key] + '&nbsp;&nbsp;' + key + '</h5><div>'
		testWrapper.appendChild(catEl)
		var category = data[key]
		var total_hosts = 0
		abt.hosts[key] = {}
		var dd_1 = document.createElement('div')
		dd_1.classList.add('col-6')
		var dd_2 = document.createElement('div')
		dd_2.classList.add('col-6')

		catEl.appendChild(dd_2)
		catEl.appendChild(dd_1)
		var i = 0
		Object.keys(category).forEach((keyC) => {
			var testInfo = document.createElement('div')
			var tests_count = 0
			var div = document.createElement('div')
			const dw = document.createElement('div')
			div.classList.add('test')
			div.id = keyC
			div.style.background = 'var(--green)'
			let tc = icons[keyC] != undefined ? icons[keyC] + '&nbsp' : ''
			div.innerHTML =
				"<span class='test_collapse'>" + tc + keyC + '</span>'
			div.appendChild(dw)
			if (i % 2 == 0) {
				dd_2.appendChild(div)
			} else {
				dd_1.appendChild(div)
			}
			i++
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
	abt.blocked +=
		(abt.script.ads ? 2 : 0) +
		(abt.script.pagead ? 2 : 0) +
		(abt.script.partnerads ? 2 : 0)
	abt.notblocked +=
		(abt.script.ads ? 0 : 2) +
		(abt.script.pagead ? 0 : 2) +
		(abt.script.partnerads ? 0 : 2)
	test_log.appendChild(log)
	log.innerHTML =
		'<div>script_ads : ' +
		abt.script.ads +
		'</div><div>script_pagead : ' +
		abt.script.pagead +
		'</div><div>script_partenrads : ' +
		abt.script.partnerads +
		'</div><br> ------------------------- '
	set_liquid()
}
const ctd = document.querySelector('#ctd_test')

//Static
function cosmetic_test_static() {
	setTimeout(function () {
		const cts = document.querySelector('#cts_test')
		abt.cosmetic_test.static =
			cts.clientHeight ||
			cts.offsetHeight ||
			window.getComputedStyle(cts, null).getPropertyValue('display') ==
				'block'
				? false
				: true
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
		set_liquid()
	}, 500)
}
//Dynamic
function cosmetic_test_dynamic() {
	let log = document.createElement('div')
	let ad = document.createElement('div')
	ad.id = 'ad_ctd'
	ad.className =
		'textads banner-ads banner_ads ad-unit afs_ads ad-zone ad-space adsbox'
	ad.innerHTML = '&nbsp;'
	ctd.appendChild(ad)
	setTimeout(function () {
		let adt = document.querySelector('#ad_ctd')
		abt.cosmetic_test.dynamic =
			adt.offsetHeight ||
			adt.clientHeight ||
			window.getComputedStyle(adt, null).getPropertyValue('display') ==
				'block'
				? false
				: true
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
		set_liquid()
	}, 500)
}

const lt_particles = document.querySelector('.lt_particles')
const lt_cwrap = document.querySelector('.lt_cwrap')
async function startAdBlockTesting() {
	document.querySelector('.lt_wrap').classList.add('start')
	lt_cwrap.classList.add('start')
	let tests = []
	if (settings['showCF'] == true) {
		abt.total += 4
		tests.push(cosmetic_test_static())
		tests.push(cosmetic_test_dynamic())
	} else {
		document.querySelector('#cf_wrap').style.display = 'none'
	}
	if (settings['showSL'] == true) {
		abt.total += 6
		tests.push(ad_script_test())
	} else {
		document.querySelector('#sl_wrap').style.display = 'none'
	}

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
		"'" + Math.round(p) + "%'"
	)
}

function stopAdBlockTesting() {
	fadeOut(lt_particles, () => {
		document.querySelector('.lt_wrap').classList.remove('start')
		fadeIn(lt_particles, 'flex')
		document.body.classList.remove('_overflowhidden')
	})
	lt_cwrap.classList.remove('start')
	console.log(abt)
}
function render_tests() {
	var r_wrap = document.querySelector('.r_wrap')
	r_wrap.innerHTML = ''
	results.forEach((r, index) => {
		var div = document.createElement('div')
		div.className = 'col-6'
		var abt_r = results[index].abt
		var t =
			'<span>' +
			icons['cdot'] +
			'Total : ' +
			abt_r.total +
			'</span><br><span>' +
			icons['x'] +
			' ' +
			abt_r.notblocked +
			' not blocked</span><span>' +
			icons['v'] +
			' ' +
			abt_r.blocked +
			' blocked</span>'
		div.innerHTML =
			"<div class='card'><div>" +
			t +
			'<br><h6>' +
			r.date +
			'</h6></div><div><button class="btn-blue outline" data-r=' +
			r['time'] +
			'>' +
			icons['download'] +
			'</button></div></div>'
		r_wrap.insertBefore(div, r_wrap.children[0])
	})
	document.querySelectorAll('button[data-r]').forEach((el) => {
		el.addEventListener('click', () => {
			downloadResult(el.getAttribute('data-r'))
		})
	})
}

function leading_zero(val) {
    return (val<10?'0':'') + val
}

//Browser : \nOS : \nAd-block : \nDNS : \nVPN :
function add_report() {
	let ms = Date.now()
	var date = new Date(ms)
	let d =
		date.getDate() +
		'/' +
		(date.getMonth() + 1) +
		'/' +
		date.getFullYear() +
		' ' +
		leading_zero(date.getHours()) +
		':' +
		leading_zero(date.getMinutes()) +
		':' +
		leading_zero(date.getSeconds())
	if (results.length < 10) {
		results.push({ time: ms, date: d, note: '', abt: abt })
	} else {
		results.splice(0, 1)
		results.push({ time: ms, date: d, note: '', abt: abt })
	}
	LS.set('results', results)
	render_tests()
	console.log(abt)
}
window.onbeforeunload = function () {
	window.scrollTo(0, 0)
}

const el = (l) => {
	return document.querySelector(l)
}

document.addEventListener('DOMContentLoaded', function () {
	new navbar()
	new themeManager()
	new gotop()
	new aos()
	console.log(settings)
	for (const key in settings) {
		try {
			console.log(`${key}: ${settings[key]}`)

			const c = document.querySelector('#' + key)
			c.checked = settings[key]
			c.addEventListener('change', () => {
				settings[key] = c.checked
				console.log(key, c.checked)
				if (key == 'collapseAll')
					collapse_category(settings[key], false)
				LS.set('settings', settings)
			})
		} catch (error) {
			console.log(error)
		}
	}
	render_tests()

	startAdBlockTesting().then(() => {
		collapse_category(settings['collapseAll'], true)
		//Add a delay in order to show properly the animation
		setTimeout(() => {
			stopAdBlockTesting()
			add_report()
			var tsl = document.createElement('div')
			tslog +=
				'<br>-----<br> Total : ' +
				abt.total +
				'<br> Blocked : ' +
				abt.blocked +
				'<br> Not Blocked : ' +
				abt.notblocked
			tsl.innerHTML = tslog
			test_log.appendChild(tsl)
			fadeIn(document.querySelector('#adb_test'), 'flex')
			const r = document.querySelector('#adb_test_r')

			r.innerHTML =
				'<span>' +
				icons['cdot'] +
				' Total : ' +
				abt.total +
				'</span><span>' +
				icons['v'] +
				' ' +
				abt.blocked +
				' blocked</span><span>' +
				icons['x'] +
				' ' +
				abt.notblocked +
				' not blocked </span>'
		}, 2000)
	})

	document.querySelector('#start_test').addEventListener('click', () => {
		location.reload(true)
	})
	const stxt =
		'https://raw.githubusercontent.com/d3ward/toolz/master/src/d3host.txt'
	const sadblock =
		'https://raw.githubusercontent.com/d3ward/toolz/master/src/d3host.adblock'
	document.querySelector('#d3H_txt').addEventListener('click', function () {
		copyToClip(stxt)
	})
	el('#d3H_adblock').addEventListener('click', function () {
		copyToClip(sadblock)
	})
})
