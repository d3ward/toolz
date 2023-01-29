export function gotop() {
	var el = this
	el.gt = document.getElementById('gt-link')
	el.scrollToTop = function () {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		})
	}
	el.listeners = function () {
		window.addEventListener('scroll', () => {
			let y = window.scrollY
			if (y > 0) {
				el.gt.classList.remove('hidden')
			} else {
				el.gt.classList.add('hidden')
			}
		})
		el.gt.onclick = function (e) {
			e.preventDefault()
			if (
				document.documentElement.scrollTop ||
				document.body.scrollTop > 0
			) {
				el.scrollToTop()
			}
		}
	}
	if (el.gt) {
		el.listeners()
	}
}
