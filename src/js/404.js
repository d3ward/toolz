import '../sass/404.sass'
import { themeManager } from './components/themeManager'
import { gotop } from './components/gotop'
import { aos } from './components/aos'

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	new themeManager()
	new gotop()
	new aos()
})
