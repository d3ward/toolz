export function pagesRoute() {
	var t = this
	const notFoundPage = document.querySelector('#notFound')
	t.links = Array.from(document.querySelectorAll('[topage]'))
	t.scrollTop = () => {
		document.querySelector('html').scrollTop = 0
		document.querySelector('body').scrollTop = 0
	}
	t.navigate = (id) => {
		//Hide current active page
		var activePage = document.querySelector('section.page-active')
		if (activePage) activePage.classList.remove('page-active')
		var activeLink = document.querySelector('[topage].active')
		if (activeLink) activeLink.classList.remove('active')
		//Show the next page
		var nextPage = document.querySelector(id)
		if (nextPage) nextPage.classList.add('page-active')
		var nextLink = document.querySelector("[topage='" + id + "']")
		if (nextLink) nextLink.classList.add('active')
		//Scroll to top
		t.scrollTop()
		//Set history state
		if (history.pushState) history.pushState(null, null, id)
		else location.hash = id
	}
	t.listeners = () => {
		t.links.forEach((page) => {
			var id = page.getAttribute('topage')
			page.addEventListener('click', () => {
				t.navigate(id)
			})
		})
	}
	if (t.links) {
		if (window.location.hash) t.navigate(window.location.hash)
		t.listeners()
	}
}
