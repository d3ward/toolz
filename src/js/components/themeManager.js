export function themeManager() {
	//Theme Switcher
	var toggles = document.getElementsByClassName('theme-toggle')

	if (window.CSS && CSS.supports('color', 'var(--bg)') && toggles) {
		var storedTheme =
			localStorage.getItem('theme') ||
			(window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light')
		if (storedTheme)
			document.documentElement.setAttribute('data-theme', storedTheme)
		for (var i = 0; i < toggles.length; i++) {
			toggles[i].onclick = function () {
				var currentTheme =
					document.documentElement.getAttribute('data-theme')
				var targetTheme = 'light'

				if (currentTheme === 'light') {
					targetTheme = 'dark'
				}

				document.documentElement.setAttribute('data-theme', targetTheme)
				localStorage.setItem('theme', targetTheme)
			}
		}
	}
}
