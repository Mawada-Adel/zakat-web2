function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
/*!
 * DOMextensions based on EasyPure by dobrapyra (v2017-08-17)
 */
 
(function(){
	'use strict'

	window.scrollLeft = function(scrollVal) {
		if(scrollVal) {
			document.body.scrollLeft = document.documentElement.scrollLeft = scrollVal
		} else {

			return window.scrollX ||
			window.pageXOffset ||
			document.body.scrollLeft ||
			document.documentElement.scrollLeft ||
			0
		}
	}

	window.scrollTop = function(scrollVal) {
		if(scrollVal) {
			document.body.scrollTop = document.documentElement.scrollTop = scrollVal
		} else {

			return window.scrollY ||
			window.pageYOffset ||
			document.body.scrollTop ||
			document.documentElement.scrollTop ||
			0
		}
	}

})()

if(document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode === undefined || (document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode !== undefined && document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value != 1)){
	Array.prototype.each = function (fn) {
		if (typeof fn !== 'function') return;
		var arr = this,
		    i,
		    l = arr.length,
		    result;
		for (i = 0; i < l; i++) {
			result = fn(arr[i], i);
			if (result === true) continue;
			if (result === false) break;
		}
	};
	
	NodeList.prototype.each = Array.prototype.each;
	HTMLCollection.prototype.each = Array.prototype.each;
}

Element.prototype.getOffset = function (relEl, withScroll) {
	var el,
	    offset = { l: 0, t: 0 };
	for (el = this; el && el !== relEl; el = el.offsetParent) {
		offset.l += el.offsetLeft;
		offset.t += el.offsetTop;
		if (withScroll) {
			if (el.tagName === 'BODY') {
				offset.l -= window.scrollX || window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || el.scrollLeft || 0;
				offset.t -= window.scrollY || window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || el.scrollTop || 0;
			} else {
				offset.l -= el.scrollLeft;
				offset.t -= el.scrollTop;
			}
		}
	}
	return offset;
};

Element.prototype.addEvent = function (name, fn, capture) {
	if (typeof fn !== 'function') return;

	var el = this,
	    eventObj,
	    nameArr,
	    eventName,
	    eventId;

	el._event = el._event || {};

	nameArr = name.split('.');eventName = nameArr[0] || '_';eventId = nameArr[1];
	if (eventId) el.removeEvent(name, capture);

	capture = !!capture;

	eventObj = { id: eventId, fn: fn.bind(el), capture: capture };

	el._event[eventName] = el._event[eventName] || [];
	el._event[eventName].push(eventObj);

	el.addEventListener(eventName, eventObj.fn, capture);
};
document.addEvent = Element.prototype.addEvent.bind(document);
window.addEvent = Element.prototype.addEvent.bind(window);

Element.prototype.removeEvent = function (name, capture) {
	var el = this,
	    eventObj,
	    nameArr,
	    eventName,
	    eventId,
	    i,
	    l,
	    toRemove = [];
	if (!el._event) return;

	nameArr = name.split('.');eventName = nameArr[0] || '_';eventId = nameArr[1];
	if (!el._event[eventName]) return;

	capture = !!capture;

	l = el._event[eventName].length;
	if (!l) return;

	for (i = 0; i < l; i++) {
		eventObj = el._event[eventName][i];
		if (eventObj.capture === capture && (!eventId || eventObj.id === eventId)) toRemove.push(eventObj);
	}

	l = toRemove.length;
	for (i = 0; i < l; i++) {
		eventObj = toRemove[i];

		el.removeEventListener(eventName, eventObj.fn, eventObj.capture);

		el._event[eventName].splice(el._event[eventName].indexOf(eventObj), 1);
	}
};
document.removeEvent = Element.prototype.removeEvent.bind(document);
window.removeEvent = Element.prototype.removeEvent.bind(window);

Element.prototype.trigger = function (name, capture) {
	var el = this,
	    eventObj,
	    nameArr,
	    eventName,
	    eventId,
	    i,
	    l;
	if (!el._event) return;

	nameArr = name.split('.');eventName = nameArr[0] || '_';eventId = nameArr[1];
	if (!el._event[eventName]) return;

	capture = !!capture;

	l = el._event[eventName].length;
	if (!l) return;

	for (i = 0; i < l; i++) {
		eventObj = el._event[eventName][i];
		if (eventObj.capture === capture && (!eventId || eventObj.id === eventId)) eventObj.fn({
			currentTarget: el
		});
	}
};
document.trigger = Element.prototype.trigger.bind(document);
window.trigger = Element.prototype.trigger.bind(window);

Element.prototype.addClass = function (className) {
	var el = this,
	    tmpArr;

	if (el.classList) {
		el.classList.add(className);
	} else {
		if (el.hasClass(className)) return;

		tmpArr = el.className.split(' ');
		tmpArr.push(className);
		el.className = tmpArr.join(' ');
	}

	return el;
};
NodeList.prototype.addClass = function (className) {
	this.each(function (el) {
		el.addClass(className);
	});
	return this;
};
HTMLCollection.prototype.addClass = NodeList.prototype.addClass;

Element.prototype.hasClass = function (className) {
	var el = this;

	if (el.classList) {
		return el.classList.contains(className);
	} else {
		return el.className.split(' ').indexOf(className) >= 0;
	}
};

Element.prototype.removeClass = function (className) {
	var el = this,
	    tmpArr;

	if (el.classList) {
		el.classList.remove(className);
	} else {
		if (!el.hasClass(className)) return;

		tmpArr = el.className.split(' ');
		tmpArr.splice(tmpArr.indexOf(className));
		el.className = tmpArr.join(' ');
	}

	return el;
};
NodeList.prototype.removeClass = function (className) {
	this.each(function (el) {
		el.removeClass(className);
	});

	return this;
};
HTMLCollection.prototype.removeClass = NodeList.prototype.removeClass;

var arabicNumbers = function arabicNumbers(value) {
  // eslint-disable-line no-unused-vars

  var finalValue = value.toString();
  var latin = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  var arabic = ['۱', '۲', '۳', '٤', '۵', '٦', '۷', '۸', '۹', '۰'];

  for (var i = 0; i < latin.length - 1; i++) {
    finalValue = finalValue.replace(new RegExp(latin[i], 'g'), arabic[i]);
  }

  return finalValue;
};


(function (ElementProto) {
  if (typeof ElementProto.matches !== 'function') {
    ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
      var element = this;
      var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      var index = 0;

      while (elements[index] && elements[index] !== element) {
        ++index;
      }

      return Boolean(elements[index]);
    };
  }

  if (typeof ElementProto.closest !== 'function') {
    ElementProto.closest = function closest(selector) {
      var element = this;

      while (element && element.nodeType === 1) {
        if (element.matches(selector)) {
          return element;
        }

        element = element.parentNode;
      }

      return null;
    };
  }
})(window.Element.prototype);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = function () {
    'use strict';

    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
        dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'function' && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [],
          prop,
          i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }();
}
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/

function throttle(func, limit) {
  var inThrottle;
  return function () {
    var args = arguments;
    var context = this;

    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(function () {
        return inThrottle = false;
      }, limit);
    }
  };
}

/*******************************************************************/
/*******************************************************************/
/*******************************************************************/

"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ScrollTo =
/*#__PURE__*/
function () {
  function ScrollTo() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, ScrollTo);

    this._debug = debug;
    if (this._debug) console.log('ScrollTo init');

    if (this._setVars()) {
      if (this._debug) console.log('ScrollTo vars init done');

      this._setEvents();
    }
  }

  _createClass(ScrollTo, [{
    key: "_setVars",
    value: function _setVars() {
      this._scrollToArr = document.querySelectorAll('.jsScrollTo');
      if (!this._scrollToArr || this._scrollToArr.length == 0) return false;
      return true;
    }
  }, {
    key: "_setEvents",
    value: function _setEvents() {
      var _this = this;

      this._scrollToArr.each(function (itemEl) {
        itemEl.addEvent('click.ScrollTo', function (e) {
          e.preventDefault();

          _this._onClick(e);
        });
      });
    }
  }, {
    key: "_onClick",
    value: function _onClick(e) {
      e.preventDefault();
      var scrollToTargetId = e.target.getAttribute('data-scrollto-id');
      if (this._debug) console.log(scrollToTargetId);
      var scrollToOffset = e.target.getAttribute('data-scrollto-offset');

      if (scrollToOffset) {
        scrollToOffset = parseInt(scrollToOffset);
      } else {
        scrollToOffset = 70;
      }

      var scrollToSpeed = e.target.getAttribute('data-scrollto-speed');

      if (scrollToSpeed) {
        scrollToSpeed = parseFloat(scrollToSpeed);
      } else {
        scrollToSpeed = 1.2;
      }

      TweenLite.killTweensOf(window);
      TweenLite.to(window, scrollToSpeed, {
        // scrollTo: { y:"#"+scrollToTargetId, offsetY:scrollToOffset },
        scrollTo: {
          y: scrollToTargetId ? '#' + scrollToTargetId : 0,
          offsetY: scrollToOffset
        },
        ease: Quad.easeInOut
      });
    }
  }]);

  return ScrollTo;
}();

"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Parallax =
/*#__PURE__*/
function () {
  function Parallax() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, Parallax);

    this._debug = debug;
    if (this._debug) console.log('EServices init');

    if (this._setVars()) {
      this._setEvents();

      this._onScroll();
    }
  }

  _createClass(Parallax, [{
    key: "_setVars",
    value: function _setVars() {
      this._intervalID = null;
      this._lastScrollTop = window.scrollTop(); //window.scrollTop()

      this._itemsArr = document.querySelectorAll('.parallax');

      if (this._itemsArr && this._itemsArr.length > 0) {
        this._itemsArr.each(function (el) {
          el._Parallax = {
            inner: el.querySelector('.parallax__inner')
          };
        });
      }

      return true;
    }
  }, {
    key: "_setEvents",
    value: function _setEvents() {
      var _this = this;

      window.addEvent('scroll.Parallax', throttle(function () {
        _this._onScroll();
      }, 5));

      this._manageTranslationFixAndIntervals();
    } // when we're at top of the page (scroll position == 0)
    // sometimes when you scroll really fast the translations not always end at y=0
    // and the throttled onScroll not always fires when scrolltop == 0
    // so we need to do the checks using intervals untill cleared

    /**
     * If we're at the top we need to:
     * 	- reset the translation
     * 	- stop interval checking
     *
     * If we're not at the top we need to:
     * 	- deploy scrolltop checking at intervals
     * 		(we wait until we're at the top and the we clear the uncleared translations)
     */

  }, {
    key: "_manageTranslationFixAndIntervals",
    value: function _manageTranslationFixAndIntervals() {
      if (this._debug) console.log('_manageTranslationFixAndIntervals');

      if (window.scrollTop() === 0) {
        if (this._debug) console.log('scroll on top');

        this._clearMatrixTranslation();

        this._clearInterval();
      } else {
        if (this._debug) console.log('scroll not top', this._intervalID);

        if (this._intervalID === null) {
          if (this._debug) console.log('deploying translation clearer');

          this._deployTranslationCleaner();
        }
      }
    }
  }, {
    key: "_deployTranslationCleaner",
    value: function _deployTranslationCleaner() {
      var _this2 = this;

      if (this._debug) console.log('_deployTranslationCleaner');
      this._intervalID = setInterval(function () {
        if (_this2._debug) console.log('interval here');

        if (window.scrollTop() === 0) {
          if (_this2._debug) console.log('interval here - parallax reset');

          _this2._clearMatrixTranslation();

          _this2._clearInterval();
        }
      }, 300);
    }
  }, {
    key: "_clearMatrixTranslation",
    value: function _clearMatrixTranslation() {
      if (this._debug) console.log('_clearMatrixTranslation');

      this._itemsArr.each(function (el) {
        if (!el._Parallax.inner) return true;
        el._Parallax.inner.style = "transform: matrix(1, 0, 0, 1, 0, 0);";
      });
    }
  }, {
    key: "_clearInterval",
    value: function _clearInterval() {
      if (this._debug) console.log('_clearInterval');
      clearInterval(this._intervalID);
      this._intervalID = null;
    }
  }, {
    key: "_onScroll",
    value: function _onScroll() {
      var scrollTop = window.scrollTop();

      this._manageTranslationFixAndIntervals(); // sometimes when you move fast the translation doesn't end at 0 so you get a cut off div when you come back


      var goingDown = false;

      if (this._lastScrollTop - scrollTop > 0) {
        goingDown = true;
      } // console.log(this._lastScrollTop, this._lastScrollTop - scrollTop, goingDown);


      this._lastScrollTop = scrollTop;

      this._itemsArr.each(function (el) {
        if (!el._Parallax.inner) return true;
        var elOffsetTop = el.getOffset().t;
        if (scrollTop < elOffsetTop || scrollTop > elOffsetTop + el.offsetHeight) return true;
        var newOffset = scrollTop - elOffsetTop;

        if (goingDown && newOffset < 50) {
          newOffset = 0;
        }

        TweenLite.set(el._Parallax.inner, {
          y: newOffset / 2
        });
      });
    }
  }]);

  return Parallax;
}();

"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HideScroll =
/*#__PURE__*/
function () {
  function HideScroll() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, HideScroll);

    this._debug = debug;
    if (this._debug) console.log('EServices init');
    if (this.setVars()) this.setEvents();
  }

  _createClass(HideScroll, [{
    key: "setVars",
    value: function setVars() {
      this.items = document.querySelectorAll('.hideScroll');
      if (!this.items) return;
      this.offsetTop = 70;
      this.offsetBottom = 50;
      this.delay = 100;
      this.list = [];
      this.showList = [];
      return true;
    }
  }, {
    key: "setEvents",
    value: function setEvents() {
      var _this = this;

      /*window.addEvent('load', () => {
      	setTimeout(() => {
      		this.findItems()
      		window.addEvent( 'scroll.HideScroll', throttle(() => {
      			this.showItems()
      			if (this._debug) console.info('HideScroll throttling...', new Date().toUTCString());
      		}, 50));
      	}, 0)
      })*/
      this.findItems();
      window.addEvent('scroll.HideScroll', throttle(function () {
        _this.showItems();

        if (_this._debug) console.info('HideScroll throttling...', new Date().toUTCString());
      }, 50));
    }
  }, {
    key: "getCurrentScroll",
    value: function getCurrentScroll() {
      var scroll = window.scrollY || window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
      if (document.body.style.position == 'fixed') scroll = -parseInt(document.body.style.top);
      return scroll;
    }
  }, {
    key: "findItems",
    value: function findItems() {
      var reload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (reload) this.items = document.querySelectorAll('.hideScroll');
      var scroll = this.getCurrentScroll();
      var length = this.items.length;
      var list = [];

      for (var i = 0; i < length; i++) {
        if (this.items[i].hasClass('hideScroll--active')) continue;
        var isFixed = this.detectParentFixed(this.items[i]);
        var position = this.items[i].getBoundingClientRect();
        this.items[i].addClass('hideScroll--hidden');
        list.push({
          index: i,
          dom: this.items[i],
          top: isFixed ? position.top : position.top + scroll,
          left: position.left
        });
      }

      list.sort(function (a, b) {
        if (a.top == b.top) {
          if (a.left == b.left) return 0;
          return a.left < b.left ? -1 : 1;
        }

        return a.top < b.top ? -1 : 1;
      });
      this.showItems(list, reload);
    }
  }, {
    key: "detectParentFixed",
    value: function detectParentFixed(element) {
      if (window.getComputedStyle(element).getPropertyValue('position') == 'fixed') return true;
      if (element.parentNode.nodeType == 1) return this.detectParentFixed(element.parentNode);
    }
  }, {
    key: "showItems",
    value: function showItems() {
      var _this2 = this;

      var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.list;
      var noDelay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!list.length) return;
      this.currentTop = this.getCurrentScroll() + this.offsetTop;
      this.currentBottom = this.currentTop + window.innerHeight - this.offsetTop - this.offsetBottom;
      var length = list.length;
      var others = [];

      for (var i = 0; i < length; i++) {
        if (list[i].top <= this.currentBottom) this.showList.push(list[i]);else others.push(list[i]);
      }

      this.list = others;
      if (!this.timeout && this.showList.length) this.timeout = setTimeout(function () {
        _this2.showItem();
      }, !noDelay ? this.delay : 0);
    }
  }, {
    key: "showItem",
    value: function showItem() {
      var _this3 = this;

      clearTimeout(this.timeout);
      this.timeout = undefined;
      if (!this.showList.length) return;
      var item = this.showList.shift();
      var time = this.delay;

      if (item !== undefined) {
        time = item.top > this.currentTop ? time : 0;
        item.dom.addClass('hideScroll--active'); // item.dom.bindCustomEvent('show-item') - what does it do? still works after removing :)

        setTimeout(function () {
          item.dom.removeClass('hideScroll');
          item.dom.removeClass('hideScroll--left');
          item.dom.removeClass('hideScroll--right');
          item.dom.removeClass('hideScroll--hidden');
          item.dom.removeClass('hideScroll--active');
        }, 1000);
      }

      this.timeout = setTimeout(function () {
        _this3.showItem();
      }, time);
    }
  }]);

  return HideScroll;
}();

"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EServices =
/*#__PURE__*/
function () {
  function EServices() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, EServices);

    this._debug = debug;
    if (this._debug) console.log('EServices init');

    if (this._setVars()) {
      if (this._debug) console.log('EServices vars init done');

      this._setEvents();
    }
  }

  _createClass(EServices, [{
    key: "_setVars",
    value: function _setVars() {
      this._eServicesWrapper = document.querySelector('.jsEServices');
      if (!this._eServicesWrapper) return false; //this._linksArr = [...this._eServicesWrapper.querySelectorAll('[data-eservices="link"]')]

      this._linksArr = [].concat(_toConsumableArray(this._eServicesWrapper.querySelectorAll('[data-eservices="link"]')));
      if (!this._linksArr.length) return false;
      return true;
    }
  }, {
    key: "_setEvents",
    value: function _setEvents() {
      var _this = this;

      this._linksArr.each(function (itemEl) {
        itemEl.addEvent('mouseenter.EServices', function (e) {
          _this._mouseEnter(e.target);
        });
      });
    }
  }, {
    key: "_mouseEnter",
    value: function _mouseEnter(el) {
      var hoveredLink = el.closest('.eServices__itemWrapper');

      if (!hoveredLink.hasClass('active')) {
        this._linksArr.each(function (itemEl) {
          itemEl.removeClass('active');
        });

        hoveredLink.addClass('active');
      }
    }
  }]);

  return EServices;
}();

var EServicesSlider =
/*#__PURE__*/
function () {
  function EServicesSlider() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, EServicesSlider);

    this._debug = debug;
    if (this._debug) console.log('EServicesSlider init');

    if (this._setVars()) {
      if (this._debug) console.log('EServicesSlider vars init done');

      this._setEvents();
    }
  }

  _createClass(EServicesSlider, [{
    key: "_setVars",
    value: function _setVars() {
      this._eServicesSlider = document.querySelector('.jsEServicesSlider');
      if (!this._eServicesSlider) return false;
      this.textDirection = getComputedStyle(document.querySelector('html')).direction; // https://github.com/ganlanyuan/tiny-slider
      // http://ganlanyuan.github.io/tiny-slider/tests/index.html

      this._slider = tns({
        container: this._eServicesSlider,
        items: 5,
        controls: true,
        loop: false,
        //nav: true,
        //navContainer: '#bigSlider__dotsWrapper',
        //fixedWidth: 308,
        ////slideBy: 1,
        //gutter: 28,
        edgePadding: 0,
        mouseDrag: true,
        touch: true,
        speed: 500,
        autoplay: false,
        autoplayButton: true,
        autoplayHoverPause: true,
        autoplayTimeout: 3000,
        textDirection: this.textDirection === 'rtl' ? 'rtl' : 'ltr',
        responsive: {
          320: {
            items: 1
          },
          600: {
            items: 1
          },
          769: {
            items: 5
          }
        }
      });
      return true;
    }
  }, {
    key: "_setEvents",
    value: function _setEvents() {
      var _this2 = this;

      document.querySelector('.tns-controls [data-controls="next"]').onclick = function () {
        // get slider info
        console.log('doing something for next');

        var info = _this2._slider.getInfo(),
            indexPrev = info.indexCached,
            indexCurrent = info.index;
      };
    }
  }, {
    key: "customizedFunction",
    value: function customizedFunction(info, eventName) {
      console.log('customized function here', info, eventName);
      info.container.goTo(3);
    }
  }]);

  return EServicesSlider;
}();

"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Hamburger =
/*#__PURE__*/
function () {
  function Hamburger() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, Hamburger);

    this._debug = debug;
    if (this._debug) console.log('Hamburger init');
    if (!this.setVars()) return;
    if (this._debug) console.log('Hamburger vars init done');
    this.setEvents();
  }

  _createClass(Hamburger, [{
    key: "setVars",
    value: function setVars() {
      this.hamburger = document.querySelector('.jsHamburger');
      this.hamburgerClose = document.querySelector('[data-hamburger="close"]');
      this.hamburgerMenu = document.querySelector('[data-hamburger="menu"]');
      this.hamburgerMobileMenu = document.querySelector('[data-hamburger="mobileMenu"]');
      this.header = document.querySelector('header');
      this.main = document.querySelector('main');
      this.footer = document.querySelector('footer');
      this._linksArr = [].concat(_toConsumableArray(document.querySelectorAll('.mobileMenu__menuSubmenuItemLink')));
      if (!this.hamburger || !this.hamburgerMenu || !this.hamburgerClose || !this.hamburgerMobileMenu) return;
      return true;
    }
  }, {
    key: "setEvents",
    value: function setEvents() {
      var _this2 = this;

      this.hamburgerClose.addEvent('click', function (e) {
        _this2.closeHamburger();
      });
      this.hamburger.addEvent('click', function (e) {
        e.preventDefault();

        if (_this2.hamburger.hasClass('active')) {
          _this2.closeHamburger();
        } else {
          _this2.openHamburger();
        }
      });
      /*this._linksArr.each(itemEl => {
      	itemEl.addEvent('click', (e) => {
      		console.log("redirect");
      		e.stopPropagation();
      		//this._click(e.target, e)
      			
      	})
      })*/
    }
    /*_click(el, e)
    {
    	const url = el.getAttribute('href')
    	window.document.location.href = url;
    }*/

  }, {
    key: "closeHamburger",
    value: function closeHamburger() {
      var _this3 = this;

      this.hamburger.removeClass('active');
      this.hamburgerMenu.removeClass('active');
      setTimeout(function () {
        _this3.hamburgerMobileMenu.removeClass('active');
      }, 500);
      this.header.removeClass('hamburgerOn');
      this.main.removeClass('hamburgerOn');
      this.footer.removeClass('hamburgerOn');
    }
  }, {
    key: "openHamburger",
    value: function openHamburger() {
      this.hamburger.addClass('active');
      this.hamburgerMenu.addClass('active');
      this.hamburgerMobileMenu.addClass('active');
      this.header.addClass('hamburgerOn');
      this.main.addClass('hamburgerOn');
      this.footer.addClass('hamburgerOn');
    }
  }]);

  return Hamburger;
}();

var Header =
/*#__PURE__*/
function () {
  function Header() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, Header);

    this._debug = debug;
    if (this._debug) console.log('Header init');
    if (!this.setVars()) return;
    this.setEvents();
  }

  _createClass(Header, [{
    key: "setVars",
    value: function setVars() {
      this.header = document.querySelector('.header');
      if (!this.header) return;
      this.classes = {
        // menu: 'is-active',
        // search: 'header__search--active',
        // notify: 'header__notify--active',
        // profile: 'header__profile--active',
        sticky: 'header--sticky'
      };
      return true;
    }
  }, {
    key: "setEvents",
    value: function setEvents() {
      var _this4 = this;

      window.addEvent('scroll.Header', function () {
        _this4.headerSticky();
      });
    }
  }, {
    key: "headerSticky",
    value: function headerSticky() {
      var TOP = 0;
      if (this._debug) console.log(window.scrollTop());

      if (window.scrollTop() > TOP) {
        this.header.addClass(this.classes.sticky);
      } else {
        this.header.removeClass(this.classes.sticky);
      }
    }
  }, {
    key: "runThrottleCausedTopDetectionProblem",
    value: function runThrottleCausedTopDetectionProblem() {
      var _this5 = this;

      if (this._intervalID) return;
      this._intervalID = setInterval(function () {
        if (_this5._debug) console.log('checking if sticky is to be turned off ', _this5._intervalID);

        if (window.scrollTop() === 0) {
          if (_this5._debug) console.log('we are on top - time to clear interval');

          if (_this5.header.hasClass(_this5.classes.sticky)) {
            _this5.header.removeClass(_this5.classes.sticky); // clearInterval(this._intervalID);

          }
        }
      }, 500);
    }
  }]);

  return Header;
}();

var QuickLinks =
/*#__PURE__*/
function () {
  function QuickLinks() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, QuickLinks);

    this._debug = debug;
    if (this._debug) console.log('QuickLinks init');

    if (this._setVars()) {
      if (this._debug) console.log('QuickLinks vars init done');

      this._setEvents();
    }
  }

  _createClass(QuickLinks, [{
    key: "_setVars",
    value: function _setVars() {
      this._quickLinksWrapper = document.querySelector('.jsQuickLinks');
      if (!this._quickLinksWrapper) return false;
      this._quickLinksBigWrapper = this._quickLinksWrapper.closest('.quickLinks__innerWrapper');
      if (!this._quickLinksBigWrapper) return false; //this._linksArr = [...this._quickLinksWrapper.querySelectorAll('[data-quicklinks-back]')]

      this._linksArr = [].concat(_toConsumableArray(this._quickLinksWrapper.querySelectorAll('[data-quicklinks-back]')));
      if (!this._linksArr.length) return false;
      return true;
    }
  }, {
    key: "_setEvents",
    value: function _setEvents() {
      var _this6 = this;

      this._linksArr.each(function (itemEl) {
        itemEl.addEvent('mouseenter.QuickLinks', function (e) {
          _this6._mouseEnter(e.target);
        });
      });
    }
  }, {
    key: "_mouseEnter",
    value: function _mouseEnter(el) {
      var wrapperBack = el.getAttribute('data-quicklinks-back');
      if (this._debug) console.log(wrapperBack);
      this._quickLinksBigWrapper.style.backgroundImage = "url('".concat(wrapperBack, "')");
    }
  }]);

  return QuickLinks;
}();

var MenuSearch =
/*#__PURE__*/
function () {
  function MenuSearch() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, MenuSearch);

    this._debug = debug;
    if (this._debug) console.log('MenuSearch init');
    if (!this.setVars()) return;
    this.setEvents();
  }

  _createClass(MenuSearch, [{
    key: "setVars",
    value: function setVars() {
      this.searchButton = document.querySelector('.jsMenuSearch');
      if (!this.searchButton) return;
      this.searchForm = document.querySelector('[data-menu-search="form"]');
      if (!this.searchForm) return; //this.mouseoverHideArr = [...document.querySelectorAll('[data-menu-search="hide-form"]')];

      this.mouseoverHideArr = [].concat(_toConsumableArray(document.querySelectorAll('[data-menu-search="hide-form"]')));
      if (!this.mouseoverHideArr.length) return;
      this.classes = {// searchForm: 'searchForm',
      };
      return true;
    }
  }, {
    key: "setEvents",
    value: function setEvents() {
      var _this7 = this;

      this.searchButton.addEvent('click.MenuSearch', function (e) {
        e.preventDefault();

        _this7.toggleSearchForm();
      });
      this.mouseoverHideArr.forEach(function (el) {
        el.addEvent('mouseover.MenuSearch', function () {
          //console.log('auto hiding search2');
          _this7.searchForm.removeClass('active');
        });
      });
    }
  }, {
    key: "toggleSearchForm",
    value: function toggleSearchForm() {
      if (this.searchForm.hasClass('active')) {
        this.searchForm.removeClass('active');
      } else {
        this.searchForm.addClass('active');
      }
    }
  }]);

  return MenuSearch;
}();

var KeepYourselfSlider =
/*#__PURE__*/
function () {
  function KeepYourselfSlider() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, KeepYourselfSlider);

    this._debug = debug;
    if (this._debug) console.log('KeepYourselfSlider init');

    if (this._setVars()) {
      if (this._debug) console.log('KeepYourselfSlider vars init done');

      this._setEvents();
    }
  }

  _createClass(KeepYourselfSlider, [{
    key: "_setVars",
    value: function _setVars() {
      this._keepYourselfSlider = document.querySelector('.jsKeepYourselfSlider');
      if (!this._keepYourselfSlider) return false;
      this._buttonPrev = document.querySelector('.keepYourselfSlider__navigationButton--prev');
      this._buttonNext = document.querySelector('.keepYourselfSlider__navigationButton--next');
      if (!this._buttonPrev) return false;
      if (!this._buttonNext) return false;
      this.textDirection = getComputedStyle(document.querySelector('html')).direction; // https://github.com/ganlanyuan/tiny-slider
      // http://ganlanyuan.github.io/tiny-slider/tests/index.html

      this._slider = tns({
        container: this._keepYourselfSlider,
        onInit: this.showSlider.bind(this),
        items: 1,
        controls: true,
        loop: false,
        // nav: true,
        // navContainer: '#bigSlider__dotsWrapper',
        // fixedWidth: 308,
        // slideBy: 1,
        gutter: 24,
        edgePadding: 0,
        mouseDrag: true,
        touch: true,
        speed: 500,
        autoplay: false,
        autoplayButton: true,
        autoplayHoverPause: true,
        autoplayTimeout: 3000,
        prevButton: this._buttonPrev,
        nextButton: this._buttonNext,
        textDirection: this.textDirection === 'rtl' ? 'rtl' : 'ltr',
        // autoplayText: [
        // 	"▶",
        // 	"❚❚"
        // ]
        responsive: {
          // 320: {
          // 	//edgePadding: 20,
          // 	//gutter: 20,
          // 	items: 1
          // },
          600: {
            items: 2
          },
          769: {
            items: 3
          }
        }
      });
      return true;
    }
  }, {
    key: "_setEvents",
    value: function _setEvents() {}
  }, {
    key: "showSlider",
    value: function showSlider() {
      this._keepYourselfSlider.removeClass('noJs');
    }
  }, {
    key: "customizedFunction",
    value: function customizedFunction(info, eventName) {
      console.log('customized function here', info, eventName);
      info.container.goTo(3);
    }
  }]);

  return KeepYourselfSlider;
}();

var TopAnnouncementsSlider =
/*#__PURE__*/
function () {
  function TopAnnouncementsSlider() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, TopAnnouncementsSlider);

    this._debug = debug;
    if (this._debug) console.log('TopAnnouncementsSlider init');

    if (this._setVars()) {
      if (this._debug) console.log('TopAnnouncementsSlider vars init done');

      this._setEvents();
    }
  }

  _createClass(TopAnnouncementsSlider, [{
    key: "_setVars",
    value: function _setVars() {
      this._topAnnouncementsSlider = document.querySelector('.jsTopAnnouncementsSlider');
      if (!this._topAnnouncementsSlider) return false;
      this._buttonPrev = document.querySelector('.topAnnouncementsSlider__navigationButton--prev');
      this._buttonNext = document.querySelector('.topAnnouncementsSlider__navigationButton--next');
      if (!this._buttonPrev) return false;
      if (!this._buttonNext) return false;
      this.textDirection = getComputedStyle(document.querySelector('html')).direction; // https://github.com/ganlanyuan/tiny-slider
      // http://ganlanyuan.github.io/tiny-slider/tests/index.html

      this._slider = tns({
        container: this._topAnnouncementsSlider,
        items: 1,
        controls: true,
        loop: false,
        // nav: true,
        // navContainer: '#bigSlider__dotsWrapper',
        // fixedWidth: 308,
        // slideBy: 1,
        axis: 'vertical',
        gutter: 24,
        edgePadding: 0,
        mouseDrag: true,
        touch: true,
        speed: 500,
        autoplay: false,
        autoplayButton: true,
        autoplayHoverPause: true,
        autoplayTimeout: 3000,
        prevButton: this._buttonPrev,
        nextButton: this._buttonNext,
        textDirection: this.textDirection === 'rtl' ? 'rtl' : 'ltr',
        // autoplayText: [
        // 	"▶",
        // 	"❚❚"
        // ]
        responsive: {
          // 320: {
          // 	//edgePadding: 20,
          // 	//gutter: 20,
          // 	items: 1
          // },
          // 600: {
          // 	items: 1
          // },
          769: {
            items: 1
          }
        }
      });
      return true;
    }
  }, {
    key: "_setEvents",
    value: function _setEvents() {}
  }, {
    key: "customizedFunction",
    value: function customizedFunction(info, eventName) {
      console.log('customized function here', info, eventName);
      info.container.goTo(3);
    }
  }]);

  return TopAnnouncementsSlider;
}();

var SvgWorldMap =
/*#__PURE__*/
function () {
  function SvgWorldMap() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, SvgWorldMap);

    this._debug = debug;
    if (this._debug) console.log('SvgWorldMap init');
    if (this.setVars()) this.loadGeoJson('', this.initMap.bind(this));
  }

  _createClass(SvgWorldMap, [{
    key: "setVars",
    value: function setVars() {
      this.container = document.querySelector('.svgWorldMap');
      if (!this.container) return;
      this.mapContainer = this.container.querySelector('.svgWorldMap__map');
      this.mapInfoBox = this.container.querySelector('.svgWorldMap__infoBox');
      this.mapInfoClose = this.container.querySelector('.svgWorldMap__infoClose');
      this.mapInfo = this.container.querySelector('.svgWorldMap__info');
      this.infoTemplateString = this.container.querySelector('.svgWorldMap__template').innerHTML;
      this.zoomButtonIn = this.mapContainer.querySelector('.svgWorldMap__zoomBtn--in');
      this.zoomButtonOut = this.mapContainer.querySelector('.svgWorldMap__zoomBtn--out');
      this.zoomButtonReset = this.mapContainer.querySelector('.svgWorldMap__zoomBtn--reset'); //this.conventionsJson = JSON.parse(this.mapContainer.getAttribute('data-conventions'));

      this.conventionsJson = conventions;
      return true;
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      this.mapZoom.filter(function () {
        return !(d3.event.button || d3.event.type === 'wheel');
      });
      this.mapZoom.on('zoom', this.onZoom.bind(this));
      d3.select(this.zoomButtonIn).on('click', this.onZoomIn.bind(this));
      d3.select(this.zoomButtonOut).on('click', this.onZoomOut.bind(this));
      d3.select(this.zoomButtonReset).on('click', this.onZoomReset.bind(this));
      d3.select(this.zoomButtonReset).on('click', this.onZoomReset.bind(this));
      this.map.selectAll('path').on('click', this.onCountryClick.bind(this));
      this.mapInfoClose.addEvent('click.SvgWorldMap', this.onCloseClick.bind(this));
      window.addEvent('resize.SvgWorldMap', this.onResize.bind(this));
    }
  }, {
    key: "loadGeoJson",
    value: function loadGeoJson(url, onLoadFn) {
      onLoadFn(mapData);
    }
  }, {
    key: "initMap",
    value: function initMap(mapData) {
      var _this8 = this;

      var _this = this;
      /*const geoJsonFeatures = mapData.features.map(country => ({
      	...country,
      	properties: {
      		...country.properties,
      		...this.getCountryInfo(country.id),
      	}
      }));*/


      var geoJsonFeatures = mapData.features.map(function (country) {
        return _extends({}, country, {
          properties: _extends({}, country.properties, _this.getCountryInfo(country.id))
        });
      });
      var width = this.container.offsetWidth;
      var height = this.container.offsetHeight;
      var projection = d3.geoMercator(); // const projection = d3.geoEquirectangular();

      var projectionGeoPath = d3.geoPath().projection(projection);
      this.svg = d3.select(this.mapContainer).append('svg').attr('class', 'svgWorldMap__svg').attr('width', width).attr('height', height);
      this.map = this.svg.append('g').attr('class', 'svgWorldMap__countries');
      this.map.selectAll('path').data(geoJsonFeatures).enter().append('path').attr('class', function (datum) {
        return "svgWorldMap__country".concat(datum.properties.hasConvention ? ' svgWorldMap__country--clickable' : '');
      }).attr('d', projectionGeoPath);
      this.mapZoom = d3.zoom();
      this.svg.call(this.mapZoom);
      setTimeout(function () {
        _this8.defaultTransform = _this8.getDefaultTransform(width, height);

        _this8.svg.call(_this8.mapZoom.transform, _this8.defaultTransform);
      });
      this.bindEvents();
    }
  }, {
    key: "getDefaultTransform",
    value: function getDefaultTransform(width, height) {
      var mapBoundRect = this.map.node().getBoundingClientRect();
      var center = [(width - mapBoundRect.width) / 2, (height - mapBoundRect.height) / 2 + mapBoundRect.height * 0.3];
      return d3.zoomIdentity.translate(center[0], center[1]).scale(0.9);
    }
  }, {
    key: "onResize",
    value: function onResize() {
      var _this9 = this;

      clearTimeout(this.resizeTImeout);
      this.resizeTImeout = setTimeout(function () {
        _this9.onResizeTimeout();
      }, 200);
    }
  }, {
    key: "onResizeTimeout",
    value: function onResizeTimeout() {
      var width = this.container.offsetWidth;
      var height = this.container.offsetHeight;
      this.svg.attr('width', width).attr('height', height);
      this.defaultTransform = this.getDefaultTransform(width, height);
      this.svg.call(this.mapZoom.transform, this.defaultTransform);
    }
  }, {
    key: "onCloseClick",
    value: function onCloseClick(e) {
      this.mapInfoBox.removeClass('svgWorldMap__infoBox--active');
    }
  }, {
    key: "onZoom",
    value: function onZoom() {
      this.map.attr('transform', d3.event.transform);
    }
  }, {
    key: "onZoomIn",
    value: function onZoomIn() {
      this.mapZoom.scaleBy(this.svg.transition().duration(500), 2);
      return false;
    }
  }, {
    key: "onZoomOut",
    value: function onZoomOut() {
      this.mapZoom.scaleBy(this.svg.transition().duration(500), 0.5);
    }
  }, {
    key: "onZoomReset",
    value: function onZoomReset() {
      this.svg.transition().duration(500).call(this.mapZoom.transform, this.defaultTransform);
    }
  }, {
    key: "onCountryClick",
    value: function onCountryClick(e) {
      if (this._debug) console.log('SvgWorldMap country clicked', e);
      if (!e.properties.hasConvention) return;
      this.mapInfo.innerHTML = this.infoTemplateString.replace(/{title}/, e.properties.title).replace(/{text}/, e.properties.text).replace(/{link}/, e.properties.link);
      this.mapInfoBox.addClass('svgWorldMap__infoBox--active');
    }
  }, {
    key: "getCountryInfo",
    value: function getCountryInfo(countryCode) {
      var countryInfo = this.conventionsJson[countryCode];
      /*return {
      	...countryInfo,
      	hasConvention: countryInfo !== undefined,
      };*/

      return _extends({}, countryInfo, {
        hasConvention: countryInfo !== undefined
      });
    }
  }]);

  return SvgWorldMap;
}();

var Accordion =
/*#__PURE__*/
function () {
  function Accordion() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, Accordion);

    this._debug = debug;
    if (this._debug) console.log('Accordion init');
    if (this.setVars()) this.initAccordions();
  }

  _createClass(Accordion, [{
    key: "setVars",
    value: function setVars() {
      this.accordionsArr = document.querySelectorAll('.accordion__items');
      if (!this.accordionsArr.length) return;
      return true;
    }
  }, {
    key: "initAccordions",
    value: function initAccordions() {
      this.accordionsArr.forEach(function (accordion) {
        new AccordionInstance(accordion);
      });
    }
  }]);

  return Accordion;
}();

var AccordionInstance =
/*#__PURE__*/
function () {
  function AccordionInstance(el) {
    var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, AccordionInstance);

    this._debug = debug;
    if (this._debug) console.log('AccordionInstance init');

    if (this.setVars(el)) {
      this.prepareItems();
      this.setEvents();
    }
  }

  _createClass(AccordionInstance, [{
    key: "setVars",
    value: function setVars(el) {
      this.container = el;
      if (!this.container) return;
      this.itemsArr = this.container.querySelectorAll('.accordion__item');
      this.activeItemClass = 'accordion__item--active';
      this.duration = 500;
      return true;
    }
  }, {
    key: "prepareItems",
    value: function prepareItems() {
      this.itemsArr.forEach(function (item) {
        var button = item.querySelector('.accordion__question');
        button._accordion = {};
        button._accordion.item = item;
        item._accordion = {};
        item._accordion.button = button;
        item._accordion.content = item.querySelector('.accordion__answer');
      });
    }
  }, {
    key: "setEvents",
    value: function setEvents() {
      var onClick = this.onItemClick.bind(this);
      this.itemsArr.forEach(function (item) {
        item._accordion.button.addEvent('click.Accordion', onClick);
      });
    }
  }, {
    key: "onItemClick",
    value: function onItemClick(e) {
      e.preventDefault();
      this.toggle(e.target._accordion.item);
    }
  }, {
    key: "toggle",
    value: function toggle(item) {
      if (item.hasClass(this.activeItemClass)) {
        this.close(item);
      } else {
        this.open(item);
      }
    }
  }, {
    key: "open",
    value: function open(item) {
      if (item.hasClass(this.activeItemClass)) return;
      clearTimeout(this.timeout);
      var content = item._accordion.content;
      content.style.height = 0;
      content.style.opacity = 0;
      content.style.transition = "height ".concat(this.duration, "ms, opacity ").concat(this.duration, "ms");
      item.addClass(this.activeItemClass);
      var height = content.scrollHeight;
      content.style.height = "".concat(height, "px");
      content.style.opacity = 1;
      this.timeout = setTimeout(function () {
        content.style.transition = '';
        content.style.height = '';
        content.style.opacity = '';
      }, this.duration);
    }
  }, {
    key: "close",
    value: function close(item) {
      var _this10 = this;

      if (!item.hasClass(this.activeItemClass)) return;
      clearTimeout(this.timeout);
      var content = item._accordion.content;
      var height = content.scrollHeight;
      content.style.height = "".concat(height, "px");
      content.style.opacity = 1;
      content.style.transition = "height ".concat(this.duration, "ms, opacity ").concat(this.duration, "ms");
      content.offsetHeight; // force reflow

      content.style.height = 0;
      content.style.opacity = 0;
      this.timeout = setTimeout(function () {
        item.removeClass(_this10.activeItemClass);
        content.style.transition = '';
        content.style.height = '';
        content.style.opacity = '';
      }, this.duration);
    }
  }]);

  return AccordionInstance;
}();

var SideMenu =
/*#__PURE__*/
function () {
  function SideMenu(el) {
    var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, SideMenu);

    this._debug = debug;
    if (this._debug) console.log('SideMenu init');

    if (this.setVars(el)) {
      this.prepareItems();
      this.setEvents();
    }
  }

  _createClass(SideMenu, [{
    key: "setVars",
    value: function setVars(el) {
      this.container = document.querySelector('.sideMenu');
      if (!this.container) return;
      this.itemsArr = this.container.querySelectorAll('.sideMenu__item');
      this.activeItemClass = 'sideMenu__item--active';
      this.duration = 500;
      return true;
    }
  }, {
    key: "prepareItems",
    value: function prepareItems() {
      this.itemsArr.forEach(function (item) {
        var button = item.querySelector('.sideMenu__link');
        button._sideMenu = {};
        button._sideMenu.item = item;
        item._sideMenu = {};
        item._sideMenu.button = button;
        item._sideMenu.content = item.querySelector('.sideMenu__subList');
      });
    }
  }, {
    key: "setEvents",
    value: function setEvents() {
      var onClick = this.onItemClick.bind(this);
      this.itemsArr.forEach(function (item) {
        item._sideMenu.button.addEvent('click.SubMenu', onClick);
      });
    }
  }, {
    key: "onItemClick",
    value: function onItemClick(e) {
      e.preventDefault();
      this.toggle(e.target._sideMenu.item);
    }
  }, {
    key: "toggle",
    value: function toggle(item) {
      if (item.hasClass(this.activeItemClass)) {
        this.close(item);
      } else {
        this.open(item);
      }
    }
  }, {
    key: "open",
    value: function open(item) {
      if (item.hasClass(this.activeItemClass)) return;
      clearTimeout(this.timeout);
      var content = item._sideMenu.content;

      if (content != null) {
        content.style.height = 0;
        content.style.opacity = 0;
        content.style.transition = "height ".concat(this.duration, "ms, opacity ").concat(this.duration, "ms");
        item.addClass(this.activeItemClass);
        var height = content.scrollHeight;
        content.style.height = "".concat(height, "px");
        content.style.opacity = 1;
        this.timeout = setTimeout(function () {
          content.style.transition = '';
          content.style.height = '';
          content.style.opacity = '';
        }, this.duration);
      }
    }
  }, {
    key: "close",
    value: function close(item) {
      var _this11 = this;

      if (!item.hasClass(this.activeItemClass)) return;
      clearTimeout(this.timeout);
      var content = item._sideMenu.content;
      var height = content.scrollHeight;
      content.style.height = "".concat(height, "px");
      content.style.opacity = 1;
      content.style.transition = "height ".concat(this.duration, "ms, opacity ").concat(this.duration, "ms");
      content.offsetHeight; // force reflow

      content.style.height = 0;
      content.style.opacity = 0;
      this.timeout = setTimeout(function () {
        item.removeClass(_this11.activeItemClass);
        content.style.transition = '';
        content.style.height = '';
        content.style.opacity = '';
      }, this.duration);
    }
  }]);

  return SideMenu;
}();

var Archives =
/*#__PURE__*/
function () {
  function Archives() {
    _classCallCheck(this, Archives);

    if (!this.setVars()) return;
    this.initCategories(); //this.initSearch();

    this.initMoreButton();
  }

  _createClass(Archives, [{
    key: "setVars",
    value: function setVars() {
      this.atts = {
        catActive: 'data-archive-categories-class',
        // add to categories wrapper, as value add hover category item class
        cat: 'data-archive-category',
        // add to category link, as value add category id
        item: 'data-archive-item',
        // add to item, value is empty, required
        itemCat: 'data-archive-item-category',
        // add to item, as value add category id
        itemSubCat: 'data-archive-item-subcategory',
        // add to submenu item, as value add subcategory id
        itemSearch: 'data-archive-item-search',
        // add to item, as value add item descrption
        searchForm: 'data-archive-search-form',
        // add to search form, value is empty
        search: 'data-archive-search',
        // add to search input, value is empty
        perPage: 'data-archive-items-per-page',
        // add to items wrapper, value is number of items per page
        more: 'data-archive-more',
        // add to more button, value is empty
        notFound: 'data-archive-not-found' // add to not found wrapper, value is empty

      };
      this.catsOuter = document.querySelector("*[".concat(this.atts.catActive, "]"));
      this.categories = document.querySelectorAll("*[".concat(this.atts.cat, "]"));
      this.subCategories = document.querySelectorAll("*[".concat(this.atts.subCat, "]"));
      this.items = document.querySelectorAll("*[".concat(this.atts.item, "]"));
      this.searchForm = document.querySelector("*[".concat(this.atts.searchForm, "]"));
      this.searchInput = document.querySelector("*[".concat(this.atts.search, "]"));
      this.moreButton = document.querySelector("*[".concat(this.atts.more, "]"));
      this.notFound = document.querySelector("*[".concat(this.atts.notFound, "]"));
      this.itemsPerPage = document.querySelector("*[".concat(this.atts.perPage, "]"));
      this.itemsAvaiable = this.items;
      this.config = {
        perPage: this.itemsPerPage ? this.itemsPerPage.getAttribute(this.atts.perPage) : '',
        currentPage: 1,
        itemsActive: this.items.length,
        catsActive: this.catsOuter ? this.catsOuter.getAttribute(this.atts.catActive) : ''
      };
      if (!this.items.length) return;
      return true;
    }
  }, {
    key: "initCategories",
    value: function initCategories() {
      var _this12 = this;

      if (!this.categories.length) return;
      this.categories.forEach(function (category, index) {
        category.addEventListener('click', function (e) {
          e.preventDefault();

          _this12.setCategory(category, index);

          window.trigger('cftn-filters-category-change');
        });

        if (_this12.catsOuter.hasAttribute('data-pre-sort')) {
          window.addEventListener('load', function () {
            _this12.setCategory(category, index);
          });
        }
      });
    }
  }, {
    key: "setCategory",
    value: function setCategory(category, index) {
      var _this13 = this;

      var catId = category.getAttribute(this.atts.cat);
      this.config.currentPage = 1;
      var shownItems = [];
      this.itemsAvaiable = [];
      var maxItems = this.config.currentPage * this.config.perPage;
      this.items.forEach(function (item) {
        if (catId !== '' && item.getAttribute(_this13.atts.itemCat).indexOf(catId) != 0 && item.getAttribute(_this13.atts.itemSubCat).indexOf(catId) != 0) {
          item.setAttribute('hidden', true);
        } else if (shownItems.length >= maxItems) {
          item.setAttribute('hidden', true);

          _this13.itemsAvaiable.push(item);
        } else {
          item.removeAttribute('hidden');
          shownItems.push(item);

          _this13.itemsAvaiable.push(item);
        }
      });
      this.setCategories(index);
      this.checkMoreButton(shownItems);
      this.checkNotFound(shownItems); //this.searchItems(this.itemsAvaiable, false);

      window.trigger('cftn-after-filters', {});
    }
  }, {
    key: "setCategories",
    value: function setCategories(index) {
      // this.categories.removeClass(this.config.catsActive);
      // this.categories[index].addClass(this.config.catsActive);
      $(".sideMenu__subItem").removeClass("sideMenu__subItem--active");
      $(this.categories[index]).parent().addClass("sideMenu__subItem--active"); // reset the role to all 

      $('a.textTabs__link').removeClass("textTabs__link--active");
      $('a.textTabs__link:first').addClass("textTabs__link--active");
    }
  }, {
    key: "calculateCategories",
    value: function calculateCategories() {
      var _this14 = this;

      var search = this.searchInput.value;
      search = search.toLowerCase();
      var cats = {};
      this.items.forEach(function (item) {
        var category = item.getAttribute(_this14.atts.itemSubCat) || item.getAttribute(_this14.atts.itemCat);
        var current = item.getAttribute(_this14.atts.itemSearch);
        current = current !== undefined ? current.toLowerCase() : current;
        if (current !== undefined && current.indexOf(search) === -1) return;

        if (cats[category] === undefined) {
          cats[category] = 1;
        } else {
          cats[category]++;
        }
      });
      var totalItems = Object.values(cats).reduce(function (a, b) {
        return a + b;
      }, 0);
      this.categories.forEach(function (item) {
        if (item.hasClass("main__categoryLink") && item.hasClass("sidebar__categoryLink")) return;
        var category = item.getAttribute(_this14.atts.cat);
        var inner = item.children[0];
        var value = cats[category] !== undefined ? cats[category] : 0;
        if (!inner) return;
        inner.innerHTML = '(' + (category === undefined || category === '' ? totalItems : value) + ')';
      });
    } // initSearch() {
    // if (!this.searchForm || !this.searchInput) return;
    // this.searchForm.addEventListener('submit', (e) => {
    // e.preventDefault();
    // });
    // this.searchInput.addEventListener('keyup', () => {
    // this.searchItems();
    // });
    // }
    // searchItems(items = this.items, setCats = true) {
    // if (!this.searchInput) return;
    // let search = this.searchInput.value;
    // search = search.toLowerCase();
    // if (setCats) this.config.currentPage = 1;
    // const shownItems = [];
    // this.itemsAvaiable = [];
    // const maxItems = this.config.currentPage * this.config.perPage;
    // items.forEach((item) => {
    // let current = item.getAttribute(this.atts.itemSearch);
    // current = (current !== undefined) ? current.toLowerCase() : current;
    // if ((current !== undefined) && (current.indexOf(search) === -1)) {
    // item.setAttribute('hidden', true);
    // } else if (shownItems.length >= maxItems) {
    // item.setAttribute('hidden', true);
    // this.itemsAvaiable.push(item);
    // } else {
    // item.removeAttribute('hidden');
    // shownItems.push(item);
    // this.itemsAvaiable.push(item);
    // }
    // });
    // if (setCats) this.setCategories(this.categories.length - 1);
    // this.calculateCategories();
    // this.checkMoreButton(shownItems);
    // this.checkNotFound(shownItems);
    // }

  }, {
    key: "initMoreButton",
    value: function initMoreButton() {
      var _this15 = this;

      if (!this.moreButton) return;
      this.moreButton.addEventListener('click', function (e) {
        e.preventDefault();

        _this15.showNextPage();

        window.trigger('cftn-after-more');
      });
    }
  }, {
    key: "showNextPage",
    value: function showNextPage() {
      this.config.currentPage++;
      var maxItems = this.config.currentPage * this.config.perPage;
      var shownItems = [];
      this.itemsAvaiable.forEach(function (item) {
        if (shownItems.length >= maxItems) {
          item.setAttribute('hidden', true);
        } else {
          item.removeAttribute('hidden');
          shownItems.push(item);
        }
      });
      this.checkMoreButton(shownItems);
    }
  }, {
    key: "checkMoreButton",
    value: function checkMoreButton(showItems) {
      if (!this.moreButton) return;
      var count = this.itemsAvaiable.length - showItems.length;
      var maxPage = Math.ceil(this.config.activeItems / this.config.perPage);

      if (count > 0 || count === -1 && this.config.currentPage >= maxPage) {
        this.moreButton.removeAttribute('hidden');
        window.trigger('cftn-filters-show-more');
      } else {
        this.moreButton.setAttribute('hidden', true);
        window.trigger('cftn-filters-hide-more');
      }
    }
  }, {
    key: "checkNotFound",
    value: function checkNotFound(items) {
      if (!this.notFound) return;

      if (items.length > 0) {
        this.notFound.setAttribute('hidden', true);
      } else {
        this.notFound.removeAttribute('hidden');
      }
    }
  }]);

  return Archives;
}();

var CircleModal =
/*#__PURE__*/
function () {
  function CircleModal() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, CircleModal);

    this._debug = debug;
    if (this._debug) console.log('CircleModal init');

    if (this.setVars()) {
      this.setEvents();
    }
  }

  _createClass(CircleModal, [{
    key: "setVars",
    value: function setVars() {
      this.container = document.querySelector('.circleModal');
      if (!this.container) return;
      this.outer = this.container.querySelector('.circleModal__outer');
      this.inner = this.container.querySelector('.circleModal__inner');
      this.center = this.container.querySelector('.circleModal__center');
      this.button = this.container.querySelector('.circleModal__button');
      this.close = this.container.querySelector('.circleModal__close');
      this.isRtl = getComputedStyle(document.querySelector('html')).direction === 'rtl';
      this.activeClass = 'valueAddedTax__circleOverlay--active';
      this.duration = 1;
      this.animObj = {
        scale: 500
      };
      return true;
    }
  }, {
    key: "setEvents",
    value: function setEvents() {
      var _this16 = this;

      this.button.addEvent('click.CircleModal', function (e) {
        e.preventDefault();

        _this16.openModal();
      });
      this.close.addEvent('click.CircleModal', function (e) {
        e.preventDefault();

        _this16.closeModal();
      });
    }
  }, {
    key: "toggleModal",
    value: function toggleModal() {
      if (this.outer.hasClass(this.activeClass)) {
        this.closeModal();
      } else {
        this.openModal();
      }
    }
  }, {
    key: "openModal",
    value: function openModal() {
      var _this17 = this;

      if (this.outer.hasClass(this.activeClass)) return;
      TweenLite.killTweensOf(this.animObj);
      this.outer.style.visibility = 'hidden';
      this.outer.addClass(this.activeClass);
      this.setInnerOuterStyles();
      this.outer.style.visibility = 'visible';
      this.animObj.scale = 500;
      this.setScale(this.animObj.scale);
      this.animObj.centerScale = 1;
      this.setCenterScale(this.animObj.centerScale);
      TweenLite.to(this.animObj, 0.1, {
        centerScale: 0.1,
        onUpdate: function onUpdate() {
          _this17.setCenterScale(_this17.animObj.centerScale);
        },
        onComplete: function onComplete() {
          TweenLite.to(_this17.animObj, _this17.duration, {
            scale: 1,
            ease: Power3.easeOut,
            onUpdate: function onUpdate() {
              _this17.setScale(_this17.animObj.scale);
            },
            onComplete: function onComplete() {
              _this17.setScale(false);

              _this17.setCenterScale(false);

              _this17.unsetInnerOuterStyles();
            }
          });
        }
      });
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      var _this18 = this;

      if (!this.outer.hasClass(this.activeClass)) return;
      TweenLite.killTweensOf(this.animObj);
      this.setInnerOuterStyles();
      this.animObj.scale = 1;
      this.setScale(this.animObj.scale);
      this.animObj.centerScale = 0.1;
      this.setCenterScale(this.animObj.centerScale);
      TweenLite.to(this.animObj, this.duration, {
        scale: 500,
        ease: Power3.easeIn,
        onUpdate: function onUpdate() {
          _this18.setScale(_this18.animObj.scale);
        },
        onComplete: function onComplete() {
          _this18.outer.removeClass(_this18.activeClass);

          _this18.setScale(false);

          _this18.setCenterScale(false);

          _this18.unsetInnerOuterStyles();

          TweenLite.to(_this18.animObj, 0.1, {
            centerScale: 1,
            onUpdate: function onUpdate() {
              _this18.setCenterScale(_this18.animObj.centerScale);
            }
          });
        }
      });
    }
  }, {
    key: "setInnerOuterStyles",
    value: function setInnerOuterStyles() {
      var centerRect = this.center.getBoundingClientRect();
      var containerRect = this.container.getBoundingClientRect();
      var centerPoint = {
        x: centerRect.x - containerRect.x + centerRect.width / 2,
        y: centerRect.y - containerRect.y + centerRect.height / 2
      };
      var width = this.container.offsetWidth;
      var height = this.container.offsetHeight;
      var a = Math.max(width, height);
      var r = Math.ceil(a * 0.707107); // 0.707107 ~= Math.sqrt(2) / 2

      var r2 = r * 2;
      var diff = {
        x: Math.ceil((r2 - width) / 2),
        y: Math.ceil((r2 - height) / 2)
      };
      var full = {
        x: width + diff.x * 2,
        y: height + diff.y * 2
      };
      var origin = {
        x: (centerPoint.x + diff.x) / full.x * 100,
        y: (centerPoint.y + diff.y) / full.y * 100
      };
      this.outer.style.width = "".concat(full.x, "px");
      this.outer.style.height = "".concat(full.y, "px");
      this.outer.style.top = "".concat(-diff.y, "px");
      this.outer.style.left = "".concat(-diff.x, "px");
      this.outer.style.borderRadius = "".concat(r, "px");
      this.outer.style.transformOrigin = "".concat(origin.x, "% ").concat(origin.y, "%");
      this.inner.style.paddingTop = "".concat(diff.y, "px");
      this.inner.style.paddingBottom = "".concat(diff.y, "px");
      this.inner.style.paddingLeft = "".concat(diff.x, "px");
      this.inner.style.paddingRight = "".concat(diff.x, "px");
      this.inner.style.transformOrigin = "".concat(origin.x, "% ").concat(origin.y, "%");
    }
  }, {
    key: "unsetInnerOuterStyles",
    value: function unsetInnerOuterStyles() {
      this.outer.style.width = '';
      this.outer.style.height = '';
      this.outer.style.top = '';
      this.outer.style.left = '';
      this.outer.style.borderRadius = '';
      this.outer.style.transformOrigin = '';
      this.inner.style.paddingTop = '';
      this.inner.style.paddingBottom = '';
      this.inner.style.paddingLeft = '';
      this.inner.style.paddingRight = '';
      this.inner.style.transformOrigin = '';
    }
  }, {
    key: "setScale",
    value: function setScale(scale) {
      if (scale) {
        this.outer.style.transform = "scale(".concat(1 / scale, ")");
        this.inner.style.transform = "scale(".concat(scale, ")");
        return;
      }

      this.outer.style.transform = '';
      this.inner.style.transform = '';
    }
  }, {
    key: "setCenterScale",
    value: function setCenterScale(scale) {
      if (scale) {
        this.center.style.transform = "scale(".concat(scale, ")");
        return;
      }

      this.center.style.transform = '';
    }
  }]);

  return CircleModal;
}();

var CompareSlider =
/*#__PURE__*/
function () {
  function CompareSlider() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, CompareSlider);

    this._debug = debug;
    if (this._debug) console.log('CompareSlider init');

    if (this.setVars()) {
      this.updateWidth();
      this.setEvents();
    }
  }

  _createClass(CompareSlider, [{
    key: "setVars",
    value: function setVars() {
      this.container = document.querySelector('.compareSlider');
      if (!this.container) return;
      this.outer = this.container.querySelector('.compareSlider__outer');
      this.inner = this.container.querySelector('.compareSlider__inner');
      this.handler = this.container.querySelector('.compareSlider__handler');
      this.isRtl = getComputedStyle(document.querySelector('html')).direction === 'rtl';
      this.startX = null;
      this.moveX = null;
      this.percentageOffsetX = this.isRtl ? -96 : 96;
      return true;
    }
  }, {
    key: "setEvents",
    value: function setEvents() {
      this.handler.addEvent('mousedown.CompareSlider', this.onMouseDown.bind(this));
      this.handler.addEvent('touchstart.CompareSlider', this.onTouchStart.bind(this));
      window.addEvent('resize.CompareSlider', this.onResize.bind(this));
    }
  }, {
    key: "updateWidth",
    value: function updateWidth() {
      this.setOffset(this.percentageOffsetX);
      this.width = this.container.offsetWidth;
      this.offsetX = this.width * (this.percentageOffsetX / 100);
    }
  }, {
    key: "onResize",
    value: function onResize() {
      var _this19 = this;

      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(function () {
        _this19.updateWidth();
      }, 200);
    }
  }, {
    key: "bindWinMouseEvents",
    value: function bindWinMouseEvents() {
      window.addEvent('mousemove.CompareSlider', this.onMouseMove.bind(this));
      window.addEvent('mouseup.CompareSlider', this.onMouseUp.bind(this));
    }
  }, {
    key: "unbindWinMouseEvents",
    value: function unbindWinMouseEvents() {
      window.removeEvent('mousemove.CompareSlider');
      window.removeEvent('mouseup.CompareSlider');
    }
  }, {
    key: "bindWinTouchEvents",
    value: function bindWinTouchEvents() {
      window.addEvent('touchmove.CompareSlider', this.onTouchMove.bind(this));
      window.addEvent('touchend.CompareSlider', this.onTouchEnd.bind(this));
    }
  }, {
    key: "unbindWinTouchEvents",
    value: function unbindWinTouchEvents() {
      window.removeEvent('touchmove.CompareSlider');
      window.removeEvent('touchend.CompareSlider');
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(e) {
      this.bindWinMouseEvents();
      this.moveBegin(e);
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      this.moveUpdate(e);
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(e) {
      this.unbindWinMouseEvents();
      this.moveEnd(e);
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(e) {
      this.bindWinTouchEvents();
      this.moveBegin(e);
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      this.moveUpdate(e);
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      this.unbindWinTouchEvents();
      this.moveEnd(e);
    }
  }, {
    key: "moveBegin",
    value: function moveBegin(e) {
      this.container.userSelect = 'none'; // this.container.pointerEvents = 'none'

      this.startX = this.getEventX(e);
    }
  }, {
    key: "moveUpdate",
    value: function moveUpdate(e) {
      this.moveX = this.getEventX(e) - this.startX;
      this.setOffset(this.limitOffset((this.moveX + this.offsetX) / this.width * 100));
    }
  }, {
    key: "moveEnd",
    value: function moveEnd(e) {
      this.offsetX = this.moveX + this.offsetX;
      this.percentageOffsetX = this.limitOffset(this.offsetX / this.width * 100);
      this.startX = null;
      this.moveX = null;
      this.container.userSelect = ''; // this.container.pointerEvents = ''
    }
  }, {
    key: "getEventX",
    value: function getEventX(e) {
      var touch = e.touch || (e.touches ? e.touches[0] : false);
      return touch ? touch.clientX : e.clientX;
    }
  }, {
    key: "limitOffset",
    value: function limitOffset(offset) {
      if (this.isRtl) {
        if (offset > 0) offset = 0;
        if (offset < -100) offset = -100;
      } else {
        if (offset < 0) offset = 0;
        if (offset > 100) offset = 100;
      }

      return offset;
    }
  }, {
    key: "setOffset",
    value: function setOffset(x) {
      this.outer.style.transform = "translate(".concat(x, "%, 0)");
      this.inner.style.transform = "translate(".concat(-x, "%, 0)");
    }
  }]);

  return CompareSlider;
}();

var ScrollingSection =
/*#__PURE__*/
function () {
  function ScrollingSection() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, ScrollingSection);

    this._debug = debug;
    if (this._debug) console.log('ScrollingSection init');
    if (!this.setVars()) return;
    if (this._debug) console.log('ScrollingSection vars init done');
    this.setEvents();
  }

  _createClass(ScrollingSection, [{
    key: "setVars",
    value: function setVars() {
      this.scrollBox = document.querySelector('.scrollingSection__scrollingBlock');
      if (!this.scrollBox) return;
      this.setPosition();
      return true;
    }
  }, {
    key: "setEvents",
    value: function setEvents() {
      var _this20 = this;

      window.addEventListener('scroll', function () {
        _this20.setPosition();
      });
    }
  }, {
    key: "setPosition",
    value: function setPosition() {
      var coordTop = this.scrollBox.getBoundingClientRect().top;
      var windowHeight = window.innerHeight;
      var newValue = 100 - coordTop / windowHeight * 100;
      if (newValue < 100) this.scrollBox.style.transform = "translateX( ".concat(newValue, "%)");else this.scrollBox.style.transform = 'translateX(100%)';
    }
  }]);

  return ScrollingSection;
}();

var ChatButton =
/*#__PURE__*/
function () {
  function ChatButton() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, ChatButton);

    this._debug = debug;
    if (this._debug) console.log('ChatButton init');

    if (this._setVars()) {
      if (this._debug) console.log('ChatButton vars init done');

      this._setEvents();
    }
  }

  _createClass(ChatButton, [{
    key: "_setVars",
    value: function _setVars() {
      this._chatButton = document.querySelector('.jsChatButton');
      this.chatWrapper = document.querySelector('.footerTopMenu__chatButton');
      this.pageHeader = document.querySelector('header');
      this.closeButton = document.querySelector('.chatForm__minimaxButton--close');
      this.maximized = false;
      if (!this._chatButton) return false;
      return true;
    }
  }, {
    key: "_setEvents",
    value: function _setEvents() {
      var _this21 = this;

      this._chatButton.addEvent('click.ChatButton', function (e) {
        e.preventDefault();

        _this21.chatToggle(e);
      });

      this.closeButton.addEvent('click.ChatCloseButton', function (e) {
        e.preventDefault();

        _this21.close(e);
      });
    }
  }, {
    key: "chatToggle",
    value: function chatToggle(e) {
      this.chatWrapper.hasClass('active') ? this.close(e) : this.open(e);
    }
  }, {
    key: "open",
    value: function open(e) {
      this.chatWrapper.addClass('active');
      var largePhone = window.matchMedia("(max-width: 480px)");
      if (largePhone.matches) this.pageHeader.addClass('hidden');
    }
  }, {
    key: "close",
    value: function close(e) {
      this.chatWrapper.removeClass('active');
      this.pageHeader.removeClass('hidden');
      this.chatWrapper.removeClass('maximized');
      this.maximized = false;
    }
  }]);

  return ChatButton;
}();


"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Core =
/*#__PURE__*/
function () {
  function Core() {
    _classCallCheck(this, Core);

    //console.log('running JS core..')
    this._run();
  }

  _createClass(Core, [{
    key: "_run",
    value: function _run() {
      new ScrollTo(); // new Parallax()

      if (document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode == undefined || document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode !== undefined && document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value != 1) {
        new HideScroll();
        new ChatButton();
      }
    }
  }]);

  return Core;
}();