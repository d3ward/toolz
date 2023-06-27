import '../sass/fontlist.sass'
import packageJSON from '../../package.json'
import { font_list } from '../data/font_list'
import { navbar } from './components/navbar'
import A11yDialog from './components/dialog'
import { themeManager } from './components/themeManager'
import { gotop } from './components/gotop'
import { aos } from './components/aos'
import { Snackbar } from './components/snackbar'
import { fontChecker } from './components/fontChecker'
import { icons } from '../data/icons'
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
var snackbar = new Snackbar({
	topPos: '10px',
	classNames: 'success',
	autoClose: true,
	autoCloseTimeout: 2000
})
const fo = document.getElementById('f_options')
const ft = document.getElementById('font_test')
const r_fw = document.getElementById('r_fw')
const r_fwv = document.getElementById('r_fw_value')
const r_fs = document.getElementById('r_fs')
const r_fsv = document.getElementById('r_fs_value')
const r_ls = document.getElementById('r_ls')
const r_lsv = document.getElementById('r_ls_value')
const r_lh = document.getElementById('r_lh')
const r_lhv = document.getElementById('r_lh_value')
function copyToClip() {
	var cssCode = document.getElementById('css-code')
	var range = document.createRange()
	range.selectNode(cssCode)
	window.getSelection().removeAllRanges()
	window.getSelection().addRange(range)
	document.execCommand('copy')
	window.getSelection().removeAllRanges()
	snackbar.show('CSS copied to clipboard !')
}
function generateCSS() {
	var css =
		'.custom-font {\n' +
		'  font-family: ' +
		fo.value +
		';\n' +
		'  font-weight: ' +
		r_fwv.innerText +
		';\n' +
		'  font-size: ' +
		r_fsv.innerText +
		';\n' +
		'  letter-spacing: ' +
		r_lsv.innerText +
		';\n' +
		'  line-height: ' +
		r_lhv.innerText +
		';\n' +
		'}'
	document.getElementById('css-code').innerHTML = css
}
// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	new themeManager()
	new navbar()
	new gotop()

	var total = 0,
		available = 0,
		notAvalaible = 0
	var fc = new fontChecker()
	const flist = document.querySelector('#flist')
	font_list.forEach((element) => {
		total++
		var a = fc.detect(element)
		if (a) {
			var el = document.createElement('div')
			el.innerText = element
			el.className = 'card _aos'
			var op = document.createElement('option')
			op.value = element
			op.innerText = element
			fo.appendChild(op)
			el.style.fontFamily = element
			flist.appendChild(el)
			available++
		} else {
			notAvalaible++
		}
		console.log(a)
	})
	const r = document.querySelector('#results')

	r.innerHTML =
		'<span>' +
		total +
		' Tested Fonts </span><span>' +
		icons['v'] +
		' ' +
		available +
		' Detected fonts</span><span>' +
		icons['cdot'] +
		' ' +
		notAvalaible +
		' Not available </span>'
	new aos()

	fo.onchange = function () {
		ft.style['fontFamily'] = this.value
		generateCSS()
	}
	r_fw.oninput = function () {
		ft.style['font-weight'] = this.value
		r_fwv.innerText = this.value
		generateCSS()
	}

	r_fs.oninput = function () {
		ft.style['font-size'] = this.value + 'px'
		r_fsv.innerText = this.value + 'px'
		generateCSS()
	}

	r_ls.oninput = function () {
		ft.style['letter-spacing'] = this.value + 'px'
		r_lsv.innerText = this.value + 'px'
		generateCSS()
	}

	r_lh.oninput = function () {
		ft.style['line-height'] = this.value
		r_lhv.innerText = this.value
		generateCSS()
	}
	document
		.querySelector('#css_code_copy')
		.addEventListener('click', copyToClip)
})
