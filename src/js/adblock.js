import '../sass/adblock.sass'
import packageJSON from '../../package.json'
import { icons } from '../data/icons'
import { navbar } from './components/navbar'
import A11yDialog from './components/dialog'
import { themeManager } from './components/themeManager'
import { gotop } from './components/gotop'
import { aos } from './components/aos'

import { LocalStorageManager } from './components/localStorage'

var TZ = new LocalStorageManager('toolz')
const version = packageJSON.version
const tzversion = TZ.get('version')
if (tzversion !== version) {
	console.log(version, tzversion)
	//Show changelog
	//ch_dialog.show()
	//Set version
	TZ.set('version', version)
}

document.addEventListener('DOMContentLoaded', function () {
	new navbar()
	new themeManager()
	new gotop()
	new aos()
})
