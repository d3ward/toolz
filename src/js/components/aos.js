export function aos() {
	//Get and observe all the items with the item class
	let items = document.querySelectorAll('[class*=_aos]')
	//Only Use the IntersectionObserver if it is supported and _aos elements exist
	if (IntersectionObserver && items) {
		//When the element is visible on the viewport,
		//add the _aos-done class so it creates the _aos animation.
		let callback = function (entries) {
			entries.forEach((entry) => {
				//if the element is visible, add the _aos-done class
				if (
					entry.isIntersecting &&
					!entry.target.classList.contains('_aos-done')
				) {
					entry.target.classList.add('_aos-done')
				} else {
					//else the element do reverse animation
					entry.target.classList.remove('_aos-done')
				}
			})
		}
		//Create the observer
		let observer = new IntersectionObserver(callback, {
			root: null,
			threshold: 0
		})
		//Add each _aos element to the observer
		items.forEach((item) => {
			observer.observe(item)
		})
	}
}
