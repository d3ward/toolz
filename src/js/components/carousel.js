export function carousel() {
	var t = this
	t.slides = document.querySelectorAll('.slide')
	t.next = document.querySelector('.next-btn')
	t.prev = document.querySelector('.prev-btn')
	t.dots = document.querySelectorAll('.dot')
	t.index = 1
	t.next.addEventListener('click', () => {
		t.showSlides((t.index += 1))
	})
	t.prev.addEventListener('click', () => {
		t.showSlides((t.index += -1))
	})
	t.dots.forEach((element, index) => {
		element.addEventListener('click', (index) => {
			t.showSlides(index)
		})
	})
	t.showSlides = (n) => {
		var i
		if (n > t.slides.length) t.index = 1
		if (n < 1) t.index = slides.length
		for (i = 0; i < t.slides.length; i++) {
			t.slides[i].style.display = 'none'
		}
		for (i = 0; i < t.dots.length; i++) {
			t.dots[i].className = t.dots[i].className.replace(' active', '')
		}
		t.slides[t.index - 1].style.display = 'block'
		t.dots[t.index - 1].className += ' active'
	}
	t.showSlides(t.index)
}
