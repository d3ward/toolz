//Svelte.js (http://sveltejs.com/) edited by d3ward
var d3 = function(
    a,                        
    b                          
  ){
    a = a.match(/^(\W)?(.*)/); 
    return(                    
      b                       
      || document            
    )[
      "getElement" + (         
        a[1]
          ? a[1] == "#"
            ? "ById"          
            : "sByClassName"   
          : "sByTagName"    
      )
    ](
      a[2]           
    )
  }
! function (window, document) {
    "use strict";
    var svelteProto = {
        each: function (callback) {
            for (var i = 0, len = this.s.length; i < len; i++) callback(this.s[i]);
            return this
        },
        find: function (selector) {
            return new Svelte(selector, this.s[0])
        },
        css: function (property, value) {
            return value ? this.each((function (el) {
                el.style[property] = value
            })) : getComputedStyle(this.s[0])[property]
        },
        hide: function () {
            return this.each((function (el) {
                el.style.display = "none"
            }))
        },
        show: function () {
            return this.each((function (el) {
                el.style.display = "block"
            }))
        },
        toggle: function () {
            return this.each((function (el) {
                "" === el.style.display || "block" === el.style.display ? el.style.display = "none" : el.style.display = "block"
            }))
        },
        addClass: function (className) {
            return this.each((function (el) {
                el.classList.add(className)
            }))
        },
        removeClass: function (className) {
            return this.each((function (el) {
                el.classList.remove(className)
            }))
        },
        toggleClass: function (className) {
            return this.each((function (el) {
                el.classList.toggle(className)
            }))
        },
        hasClass: function (className) {
            return this.s.length > 0 && this.s[0].classList.contains(className)
        },
        on: function (name, callback) {
            return this.each((function (el) {
                name.split(" ").forEach((function (ev) {
                    el.addEventListener(ev, callback)
                }))
            }))
        },
        one: function (name, callback) {
            return this.each((function (el) {
                name.split(" ").forEach((function (ev) {
                    var callbackWithRemove = function () {
                        callback(), el.removeEventListener(ev, callbackWithRemove)
                    };
                    el.addEventListener(ev, callbackWithRemove)
                }))
            }))
        },
        off: function (name, callback) {
            return this.each((function (el) {
                name.split(" ").forEach((function (ev) {
                    el.removeEventListener(ev, callback)
                }))
            }))
        },
        focus: function () {
            return this.s.length > 0 && this.s[0].focus(), this
        },
        blur: function () {
            return this.s.length > 0 && this.s[0].blur(), this
        },
        trigger: function (name, detail) {
            return this.each((function (el) {
                var triggerEvent = detail ? new CustomEvent(name, detail) : document.createEvent("HTMLEvents");
                detail || triggerEvent.initEvent(name, !0, !1), el.dispatchEvent(triggerEvent)
            }))
        },
        parent: function () {
            return this.s.length > 0 && (this.s = this.s[0].parentNode), this
        },
        children: function () {
            return this.s.length > 0 ? this.s.slice.call(this.s[0].children) : this.s = [], this
        },
        append: function (position, html) {
            return this.each((function (el) {
                switch (position.toLowerCase()) {
                    case "before":
                        return el.insertAdjacentHTML("beforebegin", html);
                    case "after":
                        return el.insertAdjacentHTML("afterend", html);
                    case "atstart":
                        return el.insertAdjacentHTML("afterbegin", html);
                    case "atend":
                        return el.insertAdjacentHTML("beforeend", html)
                }
            }))
        },
        text: function (text) {
            return text ? this.each((function (el) {
                el.textContent = text
            })) : this.s[0].textContent.trim()
        },
        empty: function () {
            return this.each((function (el) {
                el.innerHTML = ""
            }))
        },
        clone: function () {
            return this.each((function (el) {
                el.clodeNode(!0)
            }))
        },
        remove: function () {
            return this.each((function (el) {
                el.parentNode.removeChild(el)
            }))
        },
        attr: function (name, value) {
            return value ? this.each((function (el) {
                el.setAttribute(name, value)
            })) : this.s[0].getAttribute(name)
        },
        removeAttr: function (name) {
            return this.each((function (el) {
                el.removeAttribute(name)
            }))
        }
    };

    function Svelte(selector, context) {
        return Object.create(svelteProto, {
            s: {
                get: function () {
                    if ("string" == typeof selector) {
                        for (var startAt, nl = (("string" === context ? document.querySelectorAll(selector) : context) || document).querySelectorAll(selector), arr = [], i = 0, len = arr.length = nl.length; i < len; i++) arr[i] = nl[i];
                        return arr
                    }
                    return [selector]
                },
                set: function (value) {
                    selector = value
                }
            }
        })
    }
    "function" == typeof define && define.amd && define((function () {
        return Svelte
    })), window.$ = window.Svelte = Svelte, window.$.fn = svelteProto
}(window, document), Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function closest(selector) {
    for (var node = this; node;) {
        if (node.matches(selector)) return node;
        node = node.parentElement
    }
    return null
});