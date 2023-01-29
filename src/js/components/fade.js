// ** FADE OUT FUNCTION **
export function fadeOut(el, callback) {
	el.style.opacity = 1
	;(function fade() {
		if ((el.style.opacity -= 0.1) < 0) {
			el.style.display = 'none'
			if (callback) callback()
		} else {
			requestAnimationFrame(fade)
		}
	})()
}

// ** FADE IN FUNCTION **
export function fadeIn(el, display) {
	el.style.opacity = 0
	el.style.display = display || 'block'
	;(function fade() {
		var val = parseFloat(el.style.opacity)
		if (!((val += 0.1) > 1)) {
			el.style.opacity = val
			requestAnimationFrame(fade)
		}
	})()
}
