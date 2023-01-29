import '../sass/fontlist.sass'
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

var Detector = function () {
	var baseFonts = ['monospace', 'sans-serif', 'serif']
	var testString = 'abcdefghilmnopqrstuvz'
	var testSize = '72px'
	var h = document.getElementsByTagName('body')[0]
	// create a SPAN in the document to get the width of the text we use to test
	var s = document.createElement('span')
	s.style.fontSize = testSize
	s.innerHTML = testString
	var defaultWidth = {}
	var defaultHeight = {}
	for (var index in baseFonts) {
		//get the default width for the three base fonts
		s.style.fontFamily = baseFonts[index]
		h.appendChild(s)
		defaultWidth[baseFonts[index]] = s.offsetWidth //width for the default font
		defaultHeight[baseFonts[index]] = s.offsetHeight //height for the defualt font
		h.removeChild(s)
	}

	function detect(font) {
		var detected = false
		for (var index in baseFonts) {
			s.style.fontFamily = font + ',' + baseFonts[index] // name of the font along with the base font for fallback.
			h.appendChild(s)
			var matched =
				s.offsetWidth != defaultWidth[baseFonts[index]] ||
				s.offsetHeight != defaultHeight[baseFonts[index]]
			h.removeChild(s)
			detected = detected || matched
		}
		return detected
	}

	this.detect = detect
}
var d = new Detector()
var list = [
	'Abadi MT Condensed Light',
	'Albertus Extra Bold',
	'Albertus Medium',
	'Antique Olive',
	'Arial',
	'Arial Black',
	'Arial MT',
	'Arial Narrow',
	'Bazooka',
	'Book Antiqua',
	'Bookman Old Style',
	'Boulder',
	'Calisto MT',
	'Calligrapher',
	'Century Gothic',
	'Century Schoolbook',
	'Cezanne',
	'CG Omega',
	'CG Times',
	'Charlesworth',
	'Chaucer',
	'Clarendon Condensed',
	'Comic Sans MS',
	'Copperplate Gothic Bold',
	'Copperplate Gothic Light',
	'Cornerstone',
	'Coronet',
	'Courier',
	'Courier New',
	'Cuckoo',
	'Dauphin',
	'Denmark',
	'Fransiscan',
	'Garamond',
	'Geneva',
	'Haettenschweiler',
	'Heather',
	'Helvetica',
	'Herald',
	'Impact',
	'Jester',
	'Letter Gothic',
	'Lithograph',
	'Lithograph Light',
	'Long Island',
	'Lucida Console',
	'Lucida Handwriting',
	'Lucida Sans',
	'Lucida Sans Unicode',
	'Marigold',
	'Market',
	'Matisse ITC',
	'MS LineDraw',
	'News GothicMT',
	'OCR A Extended',
	'Old Century',
	'Pegasus',
	'Pickwick',
	'Poster',
	'Pythagoras',
	'Sceptre',
	'Sherwood',
	'Signboard',
	'Socket',
	'Steamer',
	'Storybook',
	'Subway',
	'Tahoma',
	'Technical',
	'Teletype',
	'Tempus Sans ITC',
	'Times',
	'Times New Roman',
	'Times New Roman PS',
	'Trebuchet MS',
	'Tristan',
	'Tubular',
	'Unicorn',
	'Univers',
	'Univers Condensed',
	'Vagabond',
	'Verdana',
	'Westminster	Allegro',
	'Amazone BT',
	'AmerType Md BT',
	'Arrus BT',
	'Aurora Cn BT',
	'AvantGarde Bk BT',
	'AvantGarde Md BT',
	'BankGothic Md BT',
	'Benguiat Bk BT',
	'BernhardFashion BT',
	'BernhardMod BT',
	'BinnerD',
	'Bremen Bd BT',
	'CaslonOpnface BT',
	'Charter Bd BT',
	'Charter BT',
	'ChelthmITC Bk BT',
	'CloisterBlack BT',
	'CopperplGoth Bd BT',
	'English 111 Vivace BT',
	'EngraversGothic BT',
	'Exotc350 Bd BT',
	'Freefrm721 Blk BT',
	'FrnkGothITC Bk BT',
	'Futura Bk BT',
	'Futura Lt BT',
	'Futura Md BT',
	'Futura ZBlk BT',
	'FuturaBlack BT',
	'Galliard BT',
	'Geometr231 BT',
	'Geometr231 Hv BT',
	'Geometr231 Lt BT',
	'GeoSlab 703 Lt BT',
	'GeoSlab 703 XBd BT',
	'GoudyHandtooled BT',
	'GoudyOLSt BT',
	'Humanst521 BT',
	'Humanst 521 Cn BT',
	'Humanst521 Lt BT',
	'Incised901 Bd BT',
	'Incised901 BT',
	'Incised901 Lt BT',
	'Informal011 BT',
	'Kabel Bk BT',
	'Kabel Ult BT',
	'Kaufmann Bd BT',
	'Kaufmann BT',
	'Korinna BT',
	'Lydian BT',
	'Monotype Corsiva',
	'NewsGoth BT',
	'Onyx BT',
	'OzHandicraft BT',
	'PosterBodoni BT',
	'PTBarnum BT',
	'Ribbon131 Bd BT',
	'Serifa BT',
	'Serifa Th BT',
	'ShelleyVolante BT',
	'Souvenir Lt BT',
	'Staccato222 BT',
	'Swis721 BlkEx BT',
	'Swiss911 XCm BT',
	'TypoUpright BT',
	'ZapfEllipt BT',
	'ZapfHumnst BT',
	'ZapfHumnst Dm BT',
	'Zurich BlkEx BT',
	'Zurich Ex BT'
]

const flist = document.querySelector('#flist')
list.forEach((element) => {
	var a = d.detect(element)
	if (a) {
		var el = document.createElement('div')
		el.innerText = element
		el.className = 'card _aos'
		el.style.fontFamily = element
		flist.appendChild(el)
	}
	console.log(a)
})
