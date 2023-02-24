export function fontChecker() {
	var baseFonts = ['monospace', 'sans-serif', 'serif']
	var testString = 'abcdefghilmnopqrstuvz'
	var testSize = '72px'
	var h = document.getElementsByTagName('body')[0]
	var s = document.createElement('span')
	s.style.fontSize = testSize
	s.innerHTML = testString
	var defaultWidth = {}
	var defaultHeight = {}
	for (var index in baseFonts) {
		s.style.fontFamily = baseFonts[index]
		h.appendChild(s)
		defaultWidth[baseFonts[index]] = s.offsetWidth //width for the default font
		defaultHeight[baseFonts[index]] = s.offsetHeight //height for the defualt font
		h.removeChild(s)
	}

	this.detect = function(font){
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
}