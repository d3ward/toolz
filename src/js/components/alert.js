export function alert(options) {
	var t = this
	if (!options) options = []
	t.count = 0
	t.timeout = options.timeout ? options.timeout : 3000
	t.autoClose = options.autoClose ? options.autoClose : true
	const close =
		'<svg class="_icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>'
	t.container = document.querySelector('#nt1')
	t.close = ($el) => {
		$el.classList.add('animate-out')
		setTimeout(() => {
			$el.remove()
			t.count--
		}, 300)
	}
	t.setCloseOnClick = ($el) => {
		$el.addEventListener('click', function () {
			t.close($el)
		})
	}
	t.setAutocloseTimeout = ($el, timeout) => {
		setTimeout(() => {
			t.close($el)
		}, timeout)
	}
	t.createItem = (message, type) => {
		var $item = document.createElement('div')
		$item.classList.add('alert-item')
		$item.classList.add(type)
		$item.innerHTML = '<span>' + message + '</span>' + close
		t.count++
		return $item
	}

	t.error = (txt) => {
		t.showA(t.createItem(txt, 'error'))
	}
	t.warn = (txt) => {
		t.showA(t.createItem(txt, 'warn'))
	}
	t.info = (txt) => {
		var l = t.createItem(txt, 'info')
		t.showA(l)
	}
	t.success = (txt) => {
		var l = t.createItem(txt, 'success')
		t.showA(l)
	}
	t.show = (txt) => {
		var l = t.createItem(txt, '')
		t.showA(l)
	}
	t.showA = (l) => {
		if (t.autoClose) t.setAutocloseTimeout(l, t.timeout)
		t.setCloseOnClick(l)
		t.container.append(l)
	}
}
