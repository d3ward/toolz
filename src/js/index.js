import '../sass/index.sass'
import packageJSON from '../../package.json'
import { navbar } from './components/navbar'
import A11yDialog from './components/dialog'
import { themeManager } from './components/themeManager'
import { gotop } from './components/gotop'
import { aos } from './components/aos'
import { LocalStorageManager } from './components/localStorage'
const cd = document.querySelector('#dlg_changelog')
const ch_dialog = new A11yDialog(cd)
var TZ = new LocalStorageManager('toolz')
const version = packageJSON.version
var tzversion = TZ.get('version')
console.log(tzversion, version)
if (tzversion !== version) {
	//Show changelog
	//ch_dialog.show()
	//Set version
	//TZ.set('version', version)
}
// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	new themeManager()
	new navbar()
	new gotop()
	new aos()
})
