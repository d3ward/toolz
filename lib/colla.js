/**
* @fileOverview CollaJS - the lightweight modern DOM manipulation and events library
* @author Eduard Ursu
* @version 1.0.0
*/

(function (window, document) {

    'use strict';
    /** @constructor Colla */
    function Colla(selector, context) {
        return Object.create(collaProto, {
            s: {
                get: function () {
                    if(typeof selector  === 'string') {
                        var startAt = ((context  === 'string') ? document.querySelectorAll(selector) : context) || document; // tidy up
                        var nl = startAt.querySelectorAll(selector);
                        var arr = [];
    
                        for (var i = 0, len = arr.length = nl.length; i < len; i++) {
                            arr[i] = nl[i];
                        }
    
                        return arr;
                    } else {
                        return [selector]; // could be an object, dom node or a function but always kept in an array
                    }
                },
                set: function(value) {
                    selector = value;
                }
            }
        });
    }
    var collaProto = {
         /**
        * Fade in/out 
        * @memberOf Colla
        * @param {string} string Type of fading "in" or "out"
        * @param {function} callback Function to be run after fading
        * @returns Colla
        * @example
        * $('#first-box').fade("out", () => {  });
        * $('#second-box').fade("in", () => {  });
        */
        fade: function (status,callback) {
            return this.each((function (el) {
                if(status=="out"){
                    var opacity = 1;
                    var timer = setInterval(function(){
                        if(opacity < 0.1){
                            clearInterval(timer);
                            el.style.display = "none";
                            callback(); //this executes the callback function!
                        }
                        el.style.opacity = opacity;
                        opacity -=  0.1;
                    }, 50);
                }else{
                    var opacity = 0;
                    el.style.opacity = opacity;
                    el.style.display = "block";
                    var timer = setInterval(function(){
                        if(opacity > 1){
                            clearInterval(timer);
                            if(callback)callback();
                        }
                        el.style.opacity = opacity;
                        opacity +=  0.1;
                    }, 50);
                }
            }))
        },
        /**
        * Each loop
        * @memberOf Colla
        * @param {function} callback Function to be run on each selector
        * @returns Colla
        * @example
        * $('.each').each(function() { });
        */
        each: function(callback) {
            for (var i = 0, len = this.s.length; i < len; i++) {
                callback(this.s[i]);
            }
            return this;
        },
    
        /**
        * Find a new selector within a parent selector
        * @memberOf Colla
        * @param {string} selector Find a new selector within a parent selector
        * @returns Colla
        * @example
        * $('.parent').find('.child');
        */
        find: function(selector) {
            return new Colla(selector, this.s[0]);
        },
    
        /**
        * Set the CSS for an element
        * @memberOf Colla
        * @param {string} property Property of element to set
        * @param {string} value Value of property to set
        * @returns Colla
        * @example
        * $('.color').css('color', 'red');
        */
        css: function(property, value) {
            if(value) {
                return this.each(function(el) {
                    el.style[property] = value;
                });
            } else {
                return getComputedStyle(this.s[0])[property];
            }
        },
    
        /**
        * Sets selector to display none
        * @memberOf Colla
        * @returns Colla
        * @example
        * $('.hide').hide();
        */
        hide: function() {
            return this.each(function(el) {
                el.style.display = 'none';
            });
        },
    
        /**
        * Sets selector to display block
        * @memberOf Colla
        * @returns Colla
        * @example
        * $('.show').show();
        */
        show: function() {
            return this.each(function(el) {
                el.style.display = 'block';
            });
        },
    
        /**
        * Checks whether the selector is visible
        * @memberOf Colla
        * @returns Boolean
        * @example
        * $('.visible').visible();
        */
        visible: function() {
            if(this.s.length > 0) {
                return this.s[0].offsetWidth > 0 || this.s[0].offsetHeight > 0;
            } else {
                return false;
            }
        },
    
        /**
        * Toggles the display property of the selector or a class from selecetor
        * @memberOf Colla
        * @param {string} className Name of class to toggle
        * @returns Colla
        * @example
        * $('.class-box').toggle();
        *  $('.class').toggle('toggle-class');
        */
        toggle: function(className) {
            if(!className){
                return this.each(function(el) {
                    if(el.style.display === '' || el.style.display === 'block') {
                        el.style.display = 'none';
                    }
                    else {
                        el.style.display = 'block';
                    }
                });
            }
            return this.each(function(el) {
                el.classList.toggle(className);
            });
        },
    
        /**
        * Adds a class to the selector
        * @memberOf Colla
        * @param {string} className Name of class to add
        * @returns Colla
        * @example
        * $('.class').addClass('another-class');
        */
        addClass: function(className) {
            return this.each(function(el) {
                el.classList.add(className);
            });
        },
    
        /**
        * Removes a class from the selector
        * @memberOf Colla
        * @param {string} className Name of class to remove
        * @returns Colla
        * @example
        * $('.class remove-class').removeClass('remove-class');
        */
        removeClass: function(className) {
            return this.each(function(el) {
                el.classList.remove(className);
            });
        },
    
       
        /**
        * Checks whether the selector has a specific class
        * @memberOf Colla
        * @returns Boolean
        * @example
        * $('.class').hasClass('another-class');
        */
        hasClass: function(className) {
            if(this.s.length > 0) {
                return this.s[0].classList.contains(className);
            } else {
                return false;
            }
    
        },
    
        /**
        * Attaches an event to the selector
        * @memberOf Colla
        * @param {string} name Name of event e.g. click or names of events separated by spaces e.g. 'keyup keydown'
        * @param {function} callback Callback to run when event is triggered
        * @returns Colla
        * @example
        * $('.click-me').on('click', function() { alert('Clicked!'); });
        */
        on: function(name, callback) {
            return this.each(function(el) {
                name.split(' ').forEach(function(ev){
                    el.addEventListener(ev, callback);
                });
            });
        },
    
        /**
        * Attaches an event to the selector and removes after callback
        * @memberOf Colla
        * @param {string} name Name of event e.g. 'click' or names of events separated by spaces e.g. 'keyup keydown'
        * @param {function} callback Callback to run when event is triggered
        * @returns Colla
        * @example
        * $('.click-me').one('click', function() { alert('Clicked!'); });
        */
        one: function(name, callback) {
            return this.each(function(el) {
                name.split(' ').forEach(function(ev){
                    var callbackWithRemove = function() {
                        callback();
                        el.removeEventListener(ev, callbackWithRemove); // remove event
                    };
                    el.addEventListener(ev, callbackWithRemove);
                });
            });
        },
    
        /**
        * Removes an event from the selector
        * @memberOf Colla
        * @param {string} name Name of event e.g. click or names of events separated by spaces e.g. 'keyup keydown'
        * @param {function} callback Callback to run when event is triggered
        * @returns Colla
        * @example
        * $('.click-me').off('click', function() { alert('Clicked!'); });
        */
        off: function(name, callback) {
            return this.each(function(el) {
                name.split(' ').forEach(function(ev){
                    el.removeEventListener(ev, callback);
                });
            });
        },
    
        /**
        * Sets the first selector to be focussed
        * @memberOf Colla
        * @returns Colla
        * @example
        * $('.focus').focus();
        */
        focus: function() {
            if(this.s.length > 0) {
                this.s[0].focus();
            }
            return this;
        },
    
        /**
        * Removes keyboard focus from first selector
        * @memberOf Colla
        * @returns Colla
        * @example
        * $('.blur').blur();
        */
        blur: function() {
            if(this.s.length > 0) {
                this.s[0].blur();
            }
            return this;
        },
    
        /**
        * Trigger an event from the selector
        * @memberOf Colla
        * @param {string} name Name of event e.g. click
        * @param {object} detail The data passed when initializing the event
        * @returns Colla
        * @example
        * $('.click-me').trigger('click');
        */
        trigger: function(name, detail) {
            return this.each(function(el) {
                var triggerEvent = ((detail) ? new CustomEvent(name, detail) : document.createEvent('HTMLEvents'));
                if(!detail) {
                    triggerEvent.initEvent(name, true, false);
                }
                el.dispatchEvent(triggerEvent);
            });
        },
    
        /**
        * Find the previous sibling to the current selector
        * @memberOf Colla
        * @returns Colla
        * @example
        * $('.selector').prev();
        */
        prev: function() {
            if(this.s.length > 0) {
                this.s = this.s[0].previousElementSibling;
            } else {
                this.s = [];
            }
            return this;
        },
    
        /**
        * Find the next sibling to the current selector
        * @memberOf Colla
        * @returns Colla
        * @example
        * $('.selector').next();
        */
        next: function() {
            if(this.s.length > 0) {
                this.s = this.s[0].nextElementSibling;
            } else {
                this.s = [];
            }
            return this;
        },
    
        /**
        * Find the first element of the selector
        * @memberOf Colla
        * @returns Colla
        * @example
        * $('.selector').first();
        */
        first: function() {
            if(this.s.length > 0) {
                this.s = this.s[0];
            }
            return this;
        },
    
        /**
        * Find the last element of the selector
        * @memberOf Colla
        * @returns Colla
        * @example
        * $('.selector').last();
        */
        last: function() {
            if(this.s.length > 0) {
                var arrayLength = this.s.length;
                this.s = this.s.slice(arrayLength-1,arrayLength);
            }
            return this;
        },
    
        /**
        * Find the parent of the selector
        * @memberOf Colla
        * @returns Colla
        * @example
        * $('.selector').parent();
        */
        parent: function() {
            if(this.s.length > 0) {
                this.s = this.s[0].parentNode;
            }
            return this;
        },
    
        /**
        * Find the children of the selector
        * @memberOf Colla
        * @returns Colla
        * @example
        * $('.selector').children();
        */
        children: function() {
            if(this.s.length > 0) {
                this.s.slice.call(this.s[0].children);
            } else {
                this.s = [];
            }
            return this;
        },
    
        /**
        * Add HTML to the page in relation to the current selector
        * @memberOf Colla
        * @param {string} position The position to add the html - before, after, atstart, atend
        * @param {string} html The HTML to add
        * @returns Colla
        * @example
        * $('.html').append('before','<p>I am before</p>');
        */
        append: function(position, html) {
            return this.each(function(el) {
                switch(position.toLowerCase()){
                    case 'before': return el.insertAdjacentHTML('beforebegin', html);
                    case 'after': return el.insertAdjacentHTML('afterend', html);
                    case 'atstart': return el.insertAdjacentHTML('afterbegin', html);
                    case 'atend': return el.insertAdjacentHTML('beforeend', html);
                }
            });
        },
    
        /**
        * Set the text of a selector
        * @memberOf Colla
        * @param {string} text Text to set
        * @returns Colla or text
        * @example
        * $('.text').text('Some text.');
        */
        text: function(text) {
            if(text) {
                return this.each(function(el) {
                    el.textContent = text;
                });
            } else {
                return this.s[0].textContent.trim();
            }
        },
    
        /**
        * Set the HTML of a selector
        * @memberOf Colla
        * @param {string} html HTML to set
        * @returns Colla or HTML
        * @example
        * $('.text').html('<span>A span.</span>');
        */
        html: function(html) {
            if(html) {
                return this.each(function(el) {
                    el.innerHTML = html;
                });
            } else {
                return this.s[0].innerHTML;
            }
        },
    
        /**
        * Set the outerHTML of a selector
        * @memberOf Colla
        * @param {string} html HTML to set
        * @returns Colla or HTML
        * @example
        * $('.text').outerHTML('<span>A span.</span>');
        */
        outerHTML: function(html) {
            if(html) {
                return this.each(function(el) {
                    el.outerHTML = html;
                });
            } else {
                return this.s[0].outerHTML;
            }
        },
    
        /**
        * Empty the HTML of a selector
        * @memberOf Colla
        * @returns Colla
        * @example
        * $('.empty-me').empty();
        */
        empty: function() {
            return this.each(function(el) {
                el.innerHTML = '';
            });
        },
    
        /**
        * Clone a selector
        * @memberOf Colla
        * @returns Colla
        * @example
        * $('.empty-me').clone();
        */
        clone: function() {
            return this.each(function(el) {
                el.clodeNode(true);
            });
        },
    
        /**
        * Removes a selector
        * @memberOf Colla
        * @returns Colla
        * @example
        * $('.remove-me').remove();
        */
        remove: function() {
            return this.each(function(el) {
                el.parentNode.removeChild(el);
            });
        },
    
        /**
        * Get or set the attribute of a selector
        * @memberOf Colla
        * @param {string} name Attr to get or set
        * @param {string} value Value to set
        * @returns Colla
        * @example
        * $('.get-attr').attr('data-attr');
        * $('.set-attr').attr('data-attr','Value');
        */
        attr: function(name, value) {
            if(!value) {
                return this.s[0].getAttribute(name);
            } else {
                return this.each(function(el) {
                    el.setAttribute(name, value);
                });
            }
        },
    
        /**
        * Remove an attribute from a selector
        * @memberOf Colla
        * @param {string} name Attr to remove
        * @returns Colla
        * @example
        * $('.attr').removeAttr('data-attr');
        */
        removeAttr: function(name) {
            return this.each(function(el) {
                el.removeAttribute(name);
            });
        },
    
        /**
        * Get the value of a selector
        * @memberOf Colla
        * @param {string} value Value to set
        * @returns value
        * @example
        * $('.input').val();
        */
        val: function(value) {
            if(value) {
                return this.each(function(el) {
                    el.value = value;
                });
            } else {
                if(this.s.length > 0) {
                    return this.s[0].value;
                } else {
                    return undefined;
                }
            }
        },
    
        /**
        * Get the number of matched elements in the selector
        * @memberOf Colla
        * @returns length
        * @example
        * $('.length').length();
        */
        length: function() {
            return this.s.length;
        },
    
        /**
        * Get the height of the first element in the selector
        * @memberOf Colla
        * @returns number height
        * @example
        * $('.height').height();
        */
        height: function() {
            if(this.s.length > 0) {
                return this.s[0].offsetHeight;
            } else {
                return null;
            }
        },
    
        /**
        * Get the width of the first element in the selector
        * @memberOf Colla
        * @returns number width
        * @example
        * $('.width').width();
        */
        width: function() {
            if(this.s.length > 0) {
                return this.s[0].offsetWidth;
            } else {
                return null;
            }
        },
    
        /**
        * Returns the position of the first element in the selector relative to the viewport
        * @memberOf Colla
        * @returns TextRectangle object
        * @example
        * $('.position').position();
        */
        position: function() {
            if(this.s.length > 0) {
                return this.s[0].getBoundingClientRect();
            } else {
                return null;
            }
        },
    
        /**
        * Returns true if the element matches the selector string
        * @memberOf Colla
        * @param {string} selector Selector to match
        * @returns boolean
        * @example
        * $('.paragraph').matches('p');
        */
        matches: function(selector) {
            return this.s[0].matches(selector);
        },
    
        /**
        * Returns closest element to selector
        * @memberOf Colla
        * @param {string} selector Selector to match
        * @returns Colla
        * @example
        * $('.logo').closest('.header');
        */
        closest: function(selector) {
            return new Colla(this.s[0].closest(selector));
        }
    
    };
    
    // Asynchronous Module Definition support
    if (typeof define === "function" && define.amd) {
        define(function() {
            return Colla;
        });
    }
    
    // Expose colla to the world:-)
    window.$ = window.Colla = Colla;
    
    // Expose functions to the world
    window.$.fn = collaProto;
    
    }(window, document));
    
    // Polyfills
    // Matches - prefixed in IE, IOS7 Safari and older Android browser versions
    if(!Element.prototype.matches) {
        Element.prototype.matches =  Element.prototype.matchesSelector || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    
    // Closest - not yet supported by IE and Safari
    if(!Element.prototype.closest) {
        Element.prototype.closest = function closest(selector) {
            var node = this;
            while (node) {
                if (node.matches(selector)) {
                    return node;
                }
                else {
                    node = node.parentElement;
                }
            }
            return null;
        };
    }