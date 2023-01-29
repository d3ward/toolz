import '../sass/units.sass'
import { navbar } from './components/navbar'
import { dialog } from './components/dialog'
import { themeManager } from './components/themeManager'
import { gotop } from './components/gotop'
import { aos } from './components/aos'

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	new themeManager()
	new navbar()
	new gotop()
	new aos()
})

const spinner = ['/', '-', '\\', '|']
let spinnerIx = 0
function el(name) {
	return document.querySelector(name)
}

let bars = []

function getBars() {
	var b = document.querySelectorAll('.bar')
	b.forEach((el) => {
		bars.push(el)
	})
	console.log(bars)
}

function updateTest() {
	let i = window.innerHeight
	el('.innerHeightLog>span').innerText = 'innerHeight: ' + i + 'px '
	let vh, svh, dvh, lvh, p
	vh = el('.bar.b-vh').clientHeight
	svh = el('.bar.b-svh').clientHeight
	dvh = el('.bar.b-dvh').clientHeight
	lvh = el('.bar.b-lvh').clientHeight
	p = el('.bar.b-p').clientHeight

	document.body.style.setProperty('--100vh', vh + 'px')
	document.body.style.setProperty('--100svh', svh + 'px')
	document.body.style.setProperty('--100dvh', dvh + 'px')
	document.body.style.setProperty('--100lvh', lvh + 'px')
	document.body.style.setProperty('--100p', p + 'px')

	el('.t-vh>span').innerText = '100vh (' + vh + 'px)'
	el('.t-dvh>span').innerText = '100dvh (' + dvh + 'px)'
	el('.t-svh>span').innerText = '100svh (' + svh + 'px)'
	el('.t-lvh>span').innerText = '100lvh (' + lvh + 'px)'
	el('.t-p>span').innerText = '100% (' + p + 'px)'
	el('.t-vh').style.background =
		vh == i ? 'var(--green)' : vh > i ? 'var(--blue)' : 'var(--orange)'
	el('.t-dvh').style.background =
		dvh == i ? 'var(--green)' : dvh > i ? 'var(--blue)' : 'var(--orange)'
	el('.t-svh').style.background =
		svh == i ? 'var(--green)' : svh > i ? 'var(--blue)' : 'var(--orange)'
	el('.t-lvh').style.background =
		lvh == i ? 'var(--green)' : lvh > i ? 'var(--blue)' : 'var(--orange)'
	el('.t-p').style.background =
		p == i ? 'var(--green)' : p > i ? 'var(--blue)' : 'var(--orange)'
	
}

var fullscreen = false
addEventListener('load', function () {
	getBars()
	updateTest()
	visualViewport.addEventListener('resize', () => {
		updateTest()
	})
	document.body.addEventListener('resize', updateTest())
})
