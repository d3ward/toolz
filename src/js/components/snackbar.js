export function Snackbar(option) {
	const t = this
	t.snack = document.createElement('div')
	t.snack.className = 'snackbar'
	t.message = document.createElement('div')
	t.snack.appendChild(t.message)
	document.body.appendChild(t.snack)

	t.top = option.topPos
	t.classNames = option.classNames
	t.autoClose =
		typeof option.autoClose === 'boolean' ? option.autoClose : false
	t.autoCloseTimeout =
		option.autoClose && typeof option.autoCloseTimeout === 'number'
			? option.autoCloseTimeout
			: 3000

	//Methods
	t.reset = function () {
		t.message.innerHTML = ''
		t.snack.classList.remove(t.classNames)
	}
	t.show = function (msg, type) {
		t.hide()
		t.message.innerHTML = msg
		t.snack.style.top = t.top
		t.snack.classList.add(type || t.classNames)

		if (t.autoClose) {
			setTimeout(function () {
				t.hide()
			}, t.autoCloseTimeout)
		}
	}
	t.hide = function () {
		t.snack.style.top = '-100%'
		t.reset()
	}
}
