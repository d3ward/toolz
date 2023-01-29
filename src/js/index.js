import '../sass/index.sass'
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
	new modal()
})
