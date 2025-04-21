window.BurpDOMInvader = function () {
  const _0x30f20d = window.localStorage.getItem("DOMInvaderSettings");
  if (typeof _0x30f20d !== 'string') {
    if (top === window) {
      _0x46a3bb("DOM Invader is NOT enabled.", 'red');
    }
    return;
  }
  let _0x50e72d = JSON.parse(_0x30f20d);
  _0x50e72d.__proto__ = null;
  if (top === window && !_0x50e72d.enabled) {
    _0x46a3bb("DOM Invader is NOT enabled.", 'red');
    return;
  }
  if (top === window) {
    _0x46a3bb("DOM Invader is enabled.", '#2980B9');
  }
  let _0x51e1cc;
  try {
    _0x51e1cc = JSON.parse(_0x50e72d.customSinks);
  } catch (_0x36c516) {
    _0x51e1cc = [];
  }
  let _0x43fe36 = false;
  let _0xca8738 = -0x1;
  let _0x176fb0 = false;
  let _0xe3e6dc = Symbol("Proxy identifier");
  let _0x4e9bb3 = [];
  let _0x57ba5b = location.href;
  let _0x51b70b = _0x57ba5b;
  let _0x2fa45f = Object.getOwnPropertyDescriptor(location, "search");
  let _0x285eff = window.history;
  let _0x500770 = window.history.pushState;
  let _0x1af03a = false;
  let _0x491917 = {
    '__proto__': null
  };
  let _0x50862e = {
    '__proto__': null
  };
  let _0x49af93 = JSON.stringify;
  let _0x9c3777 = JSON.parse;
  let _0x41142a = _0x50e72d.filterStack;
  let _0x196c75 = _0x50e72d.fireEvents;
  let _0x10471d = _0x50e72d.injectIntoSources;
  let _0x2effea = _0x50e72d.prototypePollutionSeparateFrame;
  let _0x5eaf7c = [];
  let _0x49ddef = Object.create(null);
  let _0x1a3873 = Object.create(null);
  let _0x494950 = _0x50e72d.prototypePollution;
  let _0x25b55c = _0x50e72d.prototypePollutionDiscoverProperties;
  let _0x4260df = _0x50e72d.prototypePollutionQueryString;
  let _0x82bfe4 = _0x50e72d.prototypePollutionHash;
  let _0x12a669 = new Set();
  if (window.name.includes("DOM_INVADER_GADGET_SCAN")) {
    _0x43fe36 = true;
    let _0x489877 = window.name.split('=');
    if (/^\d+$/.test(_0x489877[0x1])) {
      _0xca8738 = +_0x489877[0x1];
    }
    window.name = '';
  } else if (window.name.includes("DOM_INVADER_EXPLOIT")) {
    _0x176fb0 = true;
    window.name = '';
  }
  let _0x502e4b = function () {
    let _0x2fa5f5 = false;
    try {
      localStorage.setItem("BURPDOMINVADER", '1');
      if (localStorage.getItem("BURPDOMINVADER")) {
        _0x2fa5f5 = true;
      }
      localStorage.removeItem('BURPDOMINVADER');
      return _0x2fa5f5;
    } catch (_0x43239d) {
      return false;
    }
  }();
  function _0x46a3bb(_0x5b89c8, _0x22afb5) {
    console.log('%c' + _0x5b89c8, "color:" + _0x22afb5 + ";font-family:system-ui;font-weight:bold;font-size:1.1rem;");
  }
  function _0x41b4bb(_0xd04ee8) {
    _0xd04ee8.__proto__ = null;
    if (_0x4260df) {
      _0xd04ee8.stackTrace = _0x1a3fa1(_0xd04ee8.stackTrace, _0x51b70b, _0x57ba5b);
    }
    if (_0xd04ee8.sink && _0xa1f485.includes(_0xd04ee8.sink)) {
      return;
    }
    let _0x15af33 = _0xd04ee8.source && _0x41142a && _0x2fbe22(_0xd04ee8.source + '' + _0xd04ee8.stackTrace);
    let _0x517903 = _0xd04ee8.sink && _0x41142a && _0x2fbe22(_0xd04ee8.sink + '' + _0xd04ee8.value + _0xd04ee8.stackTrace);
    let _0x2ada27 = _0x50e72d.canary;
    try {
      let _0x5203c3 = new RegExp(_0x4164f9(_0x2ada27) + "\\d*prototypepollution");
      if (_0xd04ee8.sink && _0x21ada6() && _0x5203c3.test(_0xd04ee8.value)) {
        if (typeof window.frameElement.dataset.sinks === "undefined") {
          window.frameElement.dataset.sinks = '[]';
        }
        let _0x2f005e = JSON.parse(window.frameElement.dataset.sinks);
        _0x2f005e.push(_0xd04ee8.sink);
        window.frameElement.dataset.sinks = JSON.stringify(_0x2f005e);
      }
    } catch (_0x3f4e7b) {}
    try {
      let _0x3c182e = new RegExp("^Prototype pollution: ");
      if (_0xd04ee8.source && _0x21ada6() && _0x3c182e.test(_0xd04ee8.source)) {
        if (typeof window.frameElement.dataset.sources === 'undefined') {
          window.frameElement.dataset.sources = '[]';
        }
        let _0x54185b = JSON.parse(window.frameElement.dataset.sources);
        _0x54185b.push(_0xd04ee8.source);
        window.frameElement.dataset.sources = JSON.stringify(_0x54185b);
      }
    } catch (_0x72fd35) {}
    _0xd04ee8.event = window.event ? window.event.type : '';
    _0xd04ee8.framePath = _0x32d28f(window);
    _0xd04ee8.url = _0x57ba5b;
    if (_0xd04ee8.sink) {
      if (typeof _0xd04ee8.outerHTML !== "string") {
        _0xd04ee8.outerHTML = '';
      }
      if (typeof _0xd04ee8.tagName !== 'string') {
        _0xd04ee8.tagName = '';
      }
    }
    if (Array.isArray(_0x1a3873[_0xd04ee8.sink])) {
      for (let _0x1c535e of _0x1a3873[_0xd04ee8.sink]) {
        _0x1c535e(_0xd04ee8);
      }
    }
    if (Array.isArray(_0x1a3873[_0xd04ee8.source])) {
      for (let _0x2ebb91 of _0x1a3873[_0xd04ee8.source]) {
        _0x2ebb91(_0xd04ee8);
      }
    }
    if (_0xd04ee8.sink && Array.isArray(_0x1a3873.allSinks)) {
      for (let _0x8e4adf of _0x1a3873.allSinks) {
        _0x8e4adf(_0xd04ee8);
      }
    }
    if (_0xd04ee8.source && Array.isArray(_0x1a3873.allSources)) {
      for (let _0x471a86 of _0x1a3873.allSources) {
        _0x471a86(_0xd04ee8);
      }
    }
    if (_0x41142a && _0xd04ee8.source && _0x491917[_0x15af33]) {
      return;
    }
    if (_0x41142a && _0xd04ee8.sink && _0x50862e[_0x517903]) {
      return;
    }
    let sinkCallback = false;
    try {
      if (_0x50e72d.sinkCallback) {
        sinkCallback = Function('return ' + _0x50e72d.sinkCallback)();
      }
    } catch (e) {
      console.error('Error in sink callback', e);
    }
    if (_0xd04ee8.sink) {
      try {
        if (!sinkCallback || sinkCallback({
          '__proto__': null,
          ..._0xd04ee8,
          ...{
            '__proto__': null,
            'canary': _0x2ada27,
            'isInteresting': _0x1c2580(_0xd04ee8.sink, _0x2ada27, _0xd04ee8.value)
          }
        }, Object.keys(_0x25f4af), _0x49788b)) {
          _0x4e9bb3.push(_0xd04ee8);
        }
      } catch (_0x1667c1) {
        console.error("Error in sink callback", _0x1667c1);
        _0x4e9bb3.push(_0xd04ee8);
      }
    }
    let sourceCallback = false;
    try {
      if (_0x50e72d.sourceCallback) {
        sourceCallback = Function('return ' + _0x50e72d.sourceCallback)();
      }
    } catch (e) {
      console.error('Error in source callback');
    }
    if (_0xd04ee8.source) {
      try {
        if (!sourceCallback || sourceCallback({
          '__proto__': null,
          ..._0xd04ee8,
          ...{
            '__proto__': null,
            'canary': _0x2ada27,
            'isInteresting': _0xd04ee8.source.includes("Prototype pollution:")
          }
        }, _0xf3517f)) {
          _0x4e9bb3.push(_0xd04ee8);
        }
      } catch (_0x591857) {
        console.error("Error in source callback", _0x591857);
        _0x4e9bb3.push(_0xd04ee8);
      }
    }
    if (_0x1af03a || window != top) {
      _0x3eeed0();
    }
    if (_0x41142a && _0xd04ee8.sink) {
      _0x50862e[_0x517903] = 0x1;
    }
    if (_0x41142a && _0xd04ee8.source) {
      _0x491917[_0x15af33] = 0x1;
    }
  }
  function _0x3eeed0() {
    _0x4e9bb3.toJSON = undefined;
    if (!_0x4e9bb3.length) {
      return;
    }
    _0x4e9bb3.canary = _0x50e72d.canary;
    let _0xb92f7 = new CustomEvent("DOMInvaderAugmentedDOM", {
      'detail': JSON.stringify(_0x4e9bb3)
    });
    document.dispatchEvent(_0xb92f7);
    _0x4e9bb3 = [];
  }
  function _0x2fbe22(_0x33223f) {
    let _0x1e665f = 0x0;
    for (let _0x4ee788 = 0x0; _0x4ee788 < _0x33223f.length; ++_0x4ee788) {
      _0x1e665f = Math.imul(0x1f, _0x1e665f) + _0x33223f.charCodeAt(_0x4ee788) | 0x0;
    }
    return _0x1e665f;
  }
  function _0x4f582f(_0x4bd40d) {
    const _0x5532fc = _0x50e72d.canary;
    _0x4bd40d = '' + _0x4bd40d;
    return _0x4bd40d.includes(_0x5532fc);
  }
  function _0x53d278(_0x321ab7, _0x5b28d3, _0x4a3508) {
    if (!_0x4a3508 || typeof _0x321ab7[0x0] === 'string') {
      if (_0x4f582f(_0x321ab7[0x0])) {
        _0x41b4bb({
          'sink': _0x5b28d3,
          'value': _0x321ab7[0x0],
          'stackTrace': _0x7baff0()
        });
      }
    }
  }
  function _0x3383ef(_0x233c77, _0x4b5a7c) {
    if (_0x4f582f(_0x233c77[0x1])) {
      _0x41b4bb({
        'sink': _0x4b5a7c + _0x233c77[0x0],
        'value': _0x233c77[0x1],
        'stackTrace': _0x7baff0()
      });
    }
  }
  const _0xa5fe9b = [{
    '__proto__': null,
    'source': 'constructor[prototype][property]=value',
    'createParam'(_0x4326b7, _0x8df9f0) {
      if (typeof _0x4326b7 === 'string') {
        _0x4326b7 = [_0x4326b7];
      }
      return this.createParamName(_0x4326b7) + '=' + _0x8df9f0;
    },
    'createParamName'(_0x14fbf8) {
      if (typeof _0x14fbf8 === "string") {
        _0x14fbf8 = [_0x14fbf8];
      }
      return "constructor[prototype][" + _0x14fbf8.join('][') + ']';
    },
    'hashIdentifier': "a3aa3232",
    'searchIdentifier': "a42e5579"
  }, {
    '__proto__': null,
    'source': "constructor.prototype.property=value",
    'createParam'(_0x35e11b, _0x32f377) {
      if (typeof _0x35e11b === 'string') {
        _0x35e11b = [_0x35e11b];
      }
      return this.createParamName(_0x35e11b) + '=' + _0x32f377;
    },
    'createParamName'(_0x37d706) {
      if (typeof _0x37d706 === 'string') {
        _0x37d706 = [_0x37d706];
      }
      return 'constructor.prototype.' + _0x37d706.join('.');
    },
    'hashIdentifier': "bf1e103d",
    'searchIdentifier': 'b1a3fd5b'
  }, {
    '__proto__': null,
    'source': "__proto__.property=value",
    'createParam'(_0x4babe0, _0x24dc7d) {
      if (typeof _0x4babe0 === 'string') {
        _0x4babe0 = [_0x4babe0];
      }
      return this.createParamName(_0x4babe0) + '=' + _0x24dc7d;
    },
    'createParamName'(_0x179b72) {
      if (typeof _0x179b72 === 'string') {
        _0x179b72 = [_0x179b72];
      }
      return "__proto__." + _0x179b72.join('.');
    },
    'hashIdentifier': "c5e2cbce",
    'searchIdentifier': 'ccd80966'
  }, {
    '__proto__': null,
    'source': "__proto__[property]=value",
    'createParam'(_0x10b1df, _0x53fdd9) {
      if (typeof _0x10b1df === 'string') {
        _0x10b1df = [_0x10b1df];
      }
      return this.createParamName(_0x10b1df) + '=' + _0x53fdd9;
    },
    'createParamName'(_0x1a113e) {
      if (typeof _0x1a113e === "string") {
        _0x1a113e = [_0x1a113e];
      }
      return "__proto__[" + _0x1a113e.join('][') + ']';
    },
    'hashIdentifier': "d0992d86",
    'searchIdentifier': "dcb52823"
  }, {
    '__proto__': null,
    'source': 'constrconstructoructor[prototype][property]=value',
    'createParam'(_0x23f805, _0x911b41) {
      if (typeof _0x23f805 === 'string') {
        _0x23f805 = [_0x23f805];
      }
      return this.createParamName(_0x23f805) + '=' + _0x911b41;
    },
    'createParamName'(_0x5a9659) {
      if (typeof _0x5a9659 === 'string') {
        _0x5a9659 = [_0x5a9659];
      }
      return 'constrconstructoructor[prototype][' + _0x5a9659.join('][') + ']';
    },
    'hashIdentifier': "af3a3098",
    'searchIdentifier': "a55a1ee1"
  }, {
    '__proto__': null,
    'source': "constrconstructoructor.prototype.property=value",
    'createParam'(_0x11e616, _0x4fb344) {
      if (typeof _0x11e616 === 'string') {
        _0x11e616 = [_0x11e616];
      }
      return this.createParamName(_0x11e616) + '=' + _0x4fb344;
    },
    'createParamName'(_0x372b5a) {
      if (typeof _0x372b5a === 'string') {
        _0x372b5a = [_0x372b5a];
      }
      return "constrconstructoructor.prototype." + _0x372b5a.join('.');
    },
    'hashIdentifier': "bac11f2e",
    'searchIdentifier': 'b2f55e1f'
  }, {
    '__proto__': null,
    'source': "__pro__proto__to__.property=value",
    'createParam'(_0x2c139f, _0x56aeaf) {
      if (typeof _0x2c139f === 'string') {
        _0x2c139f = [_0x2c139f];
      }
      return this.createParamName(_0x2c139f) + '=' + _0x56aeaf;
    },
    'createParamName'(_0x3f7c6c) {
      if (typeof _0x3f7c6c === 'string') {
        _0x3f7c6c = [_0x3f7c6c];
      }
      return "__pro__proto__to__." + _0x3f7c6c.join('.');
    },
    'hashIdentifier': 'e1a3af2f',
    'searchIdentifier': "eab10255"
  }, {
    '__proto__': null,
    'source': "__pro__proto__to__[property]=value",
    'createParam'(_0x27d010, _0xdbb4db) {
      if (typeof _0x27d010 === 'string') {
        _0x27d010 = [_0x27d010];
      }
      return this.createParamName(_0x27d010) + '=' + _0xdbb4db;
    },
    'createParamName'(_0x3a5379) {
      if (typeof _0x3a5379 === 'string') {
        _0x3a5379 = [_0x3a5379];
      }
      return "__pro__proto__to__[" + _0x3a5379.join('][') + ']';
    },
    'hashIdentifier': "f122de92",
    'searchIdentifier': "f33fdea1"
  }];
  Error.stackTraceLimit = 0x14;
  function _0x468f7c() {
    var _0x3bf68b;
    var _0x18ffd2 = document.forms.length;
    for (_0x3bf68b = 0x0; _0x3bf68b < _0x18ffd2; _0x3bf68b++) {
      document.forms[_0x3bf68b].reset();
    }
  }
  function _0x1c2580(_0x4c4c8b, _0x5be6ac, _0x17865e) {
    if (typeof _0x5be6ac !== "undefined") {
      if (_0x49788b.includes(_0x4c4c8b)) {
        if (_0x213901.includes(_0x4c4c8b)) {
          let _0x10488f = new RegExp("^(?:(?:https?|data|javascript):)?([/\\\\]{2,})?" + _0x4164f9(_0x5be6ac));
          if (_0x10488f.test(_0x17865e)) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      }
    } else {
      return _0x49788b.includes(_0x4c4c8b);
    }
    return false;
  }
  function _0x4de548(_0x30b5dd) {
    try {
      let _0x3d4444 = _0x30b5dd.parent;
      let _0x5a60fd = 0x32;
      try {
        _0x5a60fd = _0x3d4444.length;
      } catch (_0x5b121c) {
        _0x5a60fd = 0x32;
      }
      for (let _0x3faa9e = 0x0; _0x3faa9e < _0x5a60fd; _0x3faa9e++) {
        if (_0x3d4444[_0x3faa9e] === _0x30b5dd) {
          return _0x3faa9e;
        }
      }
    } catch (_0x3ab43e) {}
    return -0x1;
  }
  function _0x32d28f(_0x407d51) {
    let _0x16bb8e = ["top"];
    let _0x2ec7fb = 0x0;
    while (_0x407d51 !== top) {
      try {
        let _0x44f161 = _0x407d51.frameElement;
        if (_0x44f161 && _0x44f161.dataset && _0x44f161.dataset.dominvaderframe) {
          break;
        }
      } catch (_0x13708d) {}
      try {
        let _0x5a2894 = _0x4de548(_0x407d51);
        _0x407d51 = _0x407d51.parent;
        _0x16bb8e.push(_0x5a2894 !== -0x1 ? "frame[" + _0x5a2894 + ']' : 'frame');
      } catch (_0x56b427) {}
      if (_0x2ec7fb > 0x14) {
        break;
      }
      _0x2ec7fb++;
    }
    return _0x16bb8e.length > 0x1 ? _0x16bb8e.join('->') : _0x16bb8e.join('');
  }
  function _0x4f238c(_0x31819b, _0x423446) {
    let _0xfb806b;
    _0x49c1ed.DO_NOT_CHECK = true;
    _0x31819b.addEventListener(_0x423446, _0x49c1ed, true);
    _0xfb806b = document.createEvent("MouseEvent");
    _0xfb806b.initMouseEvent(_0x423446, true, true, window, 0x0, 0x0, 0x0, 0x0, 0x0, false, false, false, false, 0x0, null);
    _0x31819b.dispatchEvent(_0xfb806b);
    _0x31819b.removeEventListener(_0x423446, _0x49c1ed, true);
  }
  function _0xd170e8(_0x55f824, _0x21d816, _0x575e23) {
    let _0x1f8778 = new Event(_0x21d816);
    _0x1f8778.keyCode = _0x1f8778.which = _0x575e23;
    _0x1f8778.key = String.fromCharCode(_0x575e23);
    _0x49c1ed.DO_NOT_CHECK = true;
    _0x55f824.addEventListener(_0x21d816, _0x49c1ed, true);
    _0x55f824.dispatchEvent(_0x1f8778);
    _0x55f824.removeEventListener(_0x21d816, _0x49c1ed, true);
  }
  function _0x49c1ed(_0x59b95a) {
    _0x59b95a.preventDefault();
    return false;
  }
  function _0x290db8() {
    var _0x112906;
    var _0x3ee056;
    var _0x3c4dfd;
    var _0x3e27e8 = document.getElementsByTagName('*');
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    _0x3ee056 = _0x5eaf7c.length;
    for (_0x112906 = 0x0; _0x112906 < _0x3ee056; _0x112906++) {
      _0x3c4dfd = _0x5eaf7c[_0x112906].element;
      if (_0x3c4dfd) {
        if (_0x19165b.includes(_0x5eaf7c[_0x112906].type)) {
          _0x4f238c(_0x3c4dfd, _0x5eaf7c[_0x112906].type);
        } else if (_0x2dff12.includes(_0x5eaf7c[_0x112906].type)) {
          _0xd170e8(_0x3c4dfd, _0x5eaf7c[_0x112906].type, 0xd);
        }
        _0x3c4dfd.firedEvent = true;
        _0x468f7c();
      }
    }
    _0x3ee056 = _0x3e27e8.length;
    for (_0x112906 = 0x0; _0x112906 < _0x3ee056; _0x112906++) {
      _0x3c4dfd = _0x3e27e8[_0x112906];
      if (!_0x3c4dfd) {
        continue;
      }
      if (_0x3c4dfd.firedEvent) {
        continue;
      }
      if (_0x3c4dfd.onmouseover) {
        _0x4f238c(_0x3c4dfd, "mouseover");
        _0x3c4dfd.firedEvent = true;
        _0x468f7c();
      }
      if (_0x3c4dfd.onclick) {
        _0x4f238c(_0x3c4dfd, 'click');
        _0x3c4dfd.firedEvent = true;
        _0x468f7c();
      }
      if (_0x3c4dfd.onmousedown) {
        _0x4f238c(_0x3c4dfd, "mousedown");
        _0x3c4dfd.firedEvent = true;
        _0x468f7c();
      }
      if (_0x3c4dfd.onmouseup) {
        _0x4f238c(_0x3c4dfd, 'mouseup');
        _0x3c4dfd.firedEvent = true;
        _0x468f7c();
      }
      if (_0x3c4dfd.onkeydown) {
        _0xd170e8(_0x3c4dfd, "keydown", 0xd);
        _0x3c4dfd.firedEvent = true;
        _0x468f7c();
      }
      if (_0x3c4dfd.onkeypress) {
        _0xd170e8(_0x3c4dfd, 'keypress', 0xd);
        _0x3c4dfd.firedEvent = true;
        _0x468f7c();
      }
      if (_0x3c4dfd.onkeyup) {
        _0xd170e8(_0x3c4dfd, 'keyup', 0xd);
        _0x3c4dfd.firedEvent = true;
        _0x468f7c();
      }
    }
  }
  function _0x1a3fa1(_0x1e1394, _0x41c5fe, _0x38c640) {
    _0x41c5fe = _0x41c5fe.replace(/#.*/, '');
    _0x38c640 = _0x38c640.replace(/#.*/, '');
    return String(_0x1e1394).replaceAll(_0x41c5fe, _0x38c640);
  }
  function _0x2fbe22(_0x4def01) {
    _0x4def01 = _0x4def01 + '';
    let _0x23a0b0 = 0x0;
    let _0x3d4089 = _0x4def01.length;
    for (let _0x2189e8 = 0x0; _0x2189e8 < _0x3d4089; ++_0x2189e8) {
      _0x23a0b0 = Math.imul(0x1f, _0x23a0b0) + _0x4def01.charCodeAt(_0x2189e8) | 0x0;
    }
    return _0x23a0b0;
  }
  function _0x4164f9(_0x4398a8) {
    return String(_0x4398a8).replace(/[\/\\^$*+?.()|[\]{}]/g, "\\$&").replace(/[\r\n\t]/g, function (_0x1bce14) {
      var _0x250601 = {
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t"
      };
      return _0x250601[_0x1bce14];
    });
  }
  function _0x146e00(_0x1573ea, _0x3617d1, _0x4433be) {
    if (Array.isArray(_0x1573ea)) {
      for (let _0x197fdb = 0x0; _0x197fdb < _0x1573ea.length; _0x197fdb++) {
        if (_0x1573ea[_0x197fdb] && typeof _0x1573ea[_0x197fdb] === 'object') {
          _0x1573ea[_0x197fdb] = _0x146e00(_0x1573ea[_0x197fdb], _0x3617d1, _0x4433be);
        } else {
          if (_0x4433be) {
            if (!(_0x1573ea[_0x197fdb] === '' || /(?:mailto|ftp|https?):|[<>()\s]/.test(_0x1573ea[_0x197fdb]))) {
              continue;
            }
          }
          _0x1573ea[_0x197fdb] = _0x3617d1(_0x1573ea[_0x197fdb], _0x197fdb);
        }
      }
    } else {
      for (let _0xbef293 in _0x1573ea) {
        if (_0x1573ea.hasOwnProperty(_0xbef293)) {
          if (_0x1573ea[_0xbef293] && typeof _0x1573ea[_0xbef293] === 'object') {
            _0x1573ea[_0xbef293] = _0x146e00(_0x1573ea[_0xbef293], _0x3617d1, _0x4433be);
          } else {
            if (_0x4433be) {
              if (!/(script|js|html|external|src|href|url|code|exec)/i.test(_0xbef293) && !(_0x1573ea[_0xbef293] === '' || /(?:mailto|ftp|https?):|[<>()\s]/.test(_0x1573ea[_0xbef293]))) {
                continue;
              }
            }
            _0x1573ea[_0xbef293] = _0x3617d1(_0x1573ea[_0xbef293], _0xbef293);
          }
        }
      }
    }
    return _0x1573ea;
  }
  function _0x7baff0(_0x1da4bd) {
    var _0x33048d = {};
    if (!Error.captureStackTrace) {
      return new Error().stack.replace(/^Error\n/, '');
    }
    if (_0x1da4bd === "source") {
      Error.captureStackTrace(_0x33048d, generateToken);
    } else {
      if (_0x1da4bd === "eventListener") {
        Error.captureStackTrace(_0x33048d, _0x7baff0);
      } else if (typeof checkSinks !== "undefined") {
        Error.captureStackTrace(_0x33048d, checkSinks);
      } else {
        Error.captureStackTrace(_0x33048d, _0x7baff0);
      }
    }
    return _0x33048d.stack.replace(/^Error\n/, '');
  }
  function _0xe8337c(_0x746f9e, _0x39cf6b, _0x3046ab) {
    const _0x1d2dd0 = _0x746f9e.location;
    const _0x2842ca = Object.getOwnPropertyDescriptors(_0x746f9e.location);
    const _0x3f12f8 = Object.getOwnPropertyDescriptor(_0x746f9e, "location");
    let _0x73c658;
    const _0x1069aa = {
      'toString': function () {
        const _0x58581e = _0x1d2dd0.toString();
        return _0x39cf6b.locationToStringCallback(_0x58581e, _0x1d2dd0);
      },
      set 'href'(_0x3ca153) {
        _0x39cf6b.proxiedSetterCallback(_0x3ca153, "href", _0x2842ca, _0x1d2dd0);
      },
      set 'protocol'(_0x4273f2) {
        _0x39cf6b.proxiedSetterCallback(_0x4273f2, "protocol", _0x2842ca, _0x1d2dd0);
      },
      set 'host'(_0x7e48cb) {
        _0x39cf6b.proxiedSetterCallback(_0x7e48cb, "host", _0x2842ca, _0x1d2dd0);
      },
      set 'hostname'(_0x23b1b1) {
        _0x39cf6b.proxiedSetterCallback(_0x23b1b1, 'hostname', _0x2842ca, _0x1d2dd0);
      },
      set 'pathname'(_0x34cc83) {
        _0x39cf6b.proxiedSetterCallback(_0x34cc83, "pathname", _0x2842ca, _0x1d2dd0);
      },
      set 'hash'(_0xd38d75) {
        _0x39cf6b.proxiedSetterCallback(_0xd38d75, 'hash', _0x2842ca, _0x1d2dd0);
      },
      set 'search'(_0x2ed255) {
        _0x39cf6b.proxiedSetterCallback(_0x2ed255, "search", _0x2842ca, _0x1d2dd0);
      },
      'replace': function (_0x250a53) {
        _0x39cf6b.proxiedLocationFunctionCallback(_0x250a53, "replace", _0x1d2dd0, {
          'checkToken': true
        });
      },
      'assign': function (_0x5a244b) {
        _0x39cf6b.proxiedLocationFunctionCallback(_0x5a244b, "assign", _0x1d2dd0, {
          'checkToken': true
        });
      },
      'reload': function () {
        _0x39cf6b.proxiedLocationFunctionCallback(arguments[0x0], "reload", _0x1d2dd0, {
          'checkToken': false
        });
      },
      get 'search'() {
        return _0x39cf6b.proxiedGetterCallback("search", _0x1d2dd0);
      },
      get 'hash'() {
        return _0x39cf6b.proxiedGetterCallback('hash', _0x1d2dd0);
      },
      get 'href'() {
        return _0x39cf6b.proxiedGetterCallback("href", _0x1d2dd0);
      },
      get 'pathname'() {
        return _0x39cf6b.proxiedGetterCallback("pathname", _0x1d2dd0);
      },
      get 'constructor'() {
        return Location;
      },
      get 'origin'() {
        return _0x1d2dd0.origin;
      },
      get 'host'() {
        return _0x1d2dd0.host;
      },
      get 'hostname'() {
        return _0x1d2dd0.hostname;
      },
      get 'port'() {
        return _0x1d2dd0.port;
      },
      get 'protocol'() {
        return _0x1d2dd0.protocol;
      }
    };
    _0x73c658 = {
      '__proto__': null,
      'configurable': true,
      'set': function (_0x1bd6d4) {
        _0x39cf6b.locationSetterCallback(_0x1bd6d4, _0x3f12f8);
      },
      'get': function () {
        return _0x1069aa;
      }
    };
    if (!_0x3046ab || !_0x3046ab.includes("location")) {
      Object.defineProperty(_0x746f9e.window, "location", _0x73c658);
      Object.defineProperty(_0x746f9e.document, "location", _0x73c658);
    }
  }
  function _0x16f7db(_0x3a87a1, _0x4fdc0a, _0x537b74, _0x3a3ad0) {
    if (!_0x3a87a1) {
      _0x3a87a1 = window;
    }
    _0x3a87a1.EventTarget.prototype.addEventListener = function (_0x98c129) {
      return function () {
        if (arguments[0x1] && !arguments[0x1].DO_NOT_CHECK) {
          let _0x587284 = _0x2fbe22(arguments[0x1]);
          if ((arguments[0x0] === "click" || arguments[0x0] === "mouseover" || arguments[0x0] === "mousedown" || arguments[0x0] === 'mouseup' || arguments[0x0] === "keyup" || arguments[0x0] === "keydown" || arguments[0x0] === "keypress") && !_0x49ddef[_0x587284]) {
            _0x5eaf7c.push({
              'element': this,
              'type': arguments[0x0].toLowerCase()
            });
            _0x49ddef[_0x587284] = 0x1;
          }
        }
        return _0x98c129.apply(this, arguments);
      };
    }(_0x3a87a1.EventTarget.prototype.addEventListener);
    if (!_0x3a3ad0 || !_0x3a3ad0.includes("fetch.url")) {
      _0x3a87a1.fetch = function (_0x332801) {
        return function () {
          arguments[0x0] = _0x4fdc0a(arguments[0x0], "fetch.url");
          if (arguments[0x1] && arguments[0x1].body) {
            if (!_0x3a3ad0 || !_0x3a3ad0.includes('fetch.body')) {
              arguments[0x1].body = _0x4fdc0a(arguments[0x1].body, 'fetch.body');
            }
          }
          if (arguments[0x1] && arguments[0x1].headers) {
            let _0x13c263;
            if (arguments[0x1].headers instanceof Headers) {
              _0x13c263 = arguments[0x1].headers.values();
            } else {
              _0x13c263 = Object.values(arguments[0x1].headers);
            }
            for (let _0x30c974 of _0x13c263) {
              if (!_0x3a3ad0 || !_0x3a3ad0.includes("fetch.header")) {
                _0x4fdc0a(_0x30c974, "fetch.header");
              }
            }
          }
          return _0x332801.apply(_0x3a87a1, arguments);
        };
      }(_0x3a87a1.fetch);
    }
    if (!_0x3a3ad0 || !_0x3a3ad0.includes('document.title')) {
      !function (_0x32f1d2, _0x42bb83) {
        _0x3a87a1.Object.defineProperty(_0x3a87a1.document, "title", {
          '__proto__': null,
          'configurable': true,
          'get': function () {
            return _0x42bb83.call(_0x3a87a1.document);
          },
          'set': function (_0x87483f) {
            _0x4fdc0a(_0x87483f, "document.title");
            _0x32f1d2.apply(_0x3a87a1.document, arguments);
          }
        });
      }(_0x3a87a1.document.__lookupSetter__("title"), _0x3a87a1.document.__lookupGetter__('title'));
    }
    if (!_0x3a3ad0 || !_0x3a3ad0.includes("document.domain")) {
      !function (_0x509ea5, _0x3bc056) {
        _0x3a87a1.Object.defineProperty(_0x3a87a1.document, "domain", {
          '__proto__': null,
          'configurable': true,
          'get': function () {
            return _0x3bc056.call(_0x3a87a1.document);
          },
          'set': function (_0x233ab6) {
            _0x4fdc0a(_0x233ab6, "document.domain");
            _0x509ea5.apply(_0x3a87a1.document, arguments);
          }
        });
      }(_0x3a87a1.document.__lookupSetter__("domain"), _0x3a87a1.document.__lookupGetter__("domain"));
    }
    if (_0x502e4b && _0x3a87a1.localStorage) {
      _0x3a87a1.localStorage.setItem = function (_0xa93e4b) {
        return function () {
          if (!_0x3a3ad0 || !_0x3a3ad0.includes('localStorage.setItem.name')) {
            _0x4fdc0a(arguments[0x0], 'localStorage.setItem.name');
          }
          if (!_0x3a3ad0 || !_0x3a3ad0.includes("localStorage.setItem.value")) {
            _0x4fdc0a(arguments[0x1], "localStorage.setItem.value");
          }
          return _0xa93e4b.apply(_0x3a87a1.localStorage, arguments);
        };
      }(_0x3a87a1.localStorage.setItem);
    }
    if (_0x502e4b && _0x3a87a1.sessionStorage) {
      _0x3a87a1.sessionStorage.setItem = function (_0x355e2a) {
        return function () {
          if (!_0x3a3ad0 || !_0x3a3ad0.includes("sessionStorage.setItem.name")) {
            _0x4fdc0a(arguments[0x0], "sessionStorage.setItem.name");
          }
          if (!_0x3a3ad0 || !_0x3a3ad0.includes("sessionStorage.setItem.name")) {
            _0x4fdc0a(arguments[0x1], "sessionStorage.setItem.value");
          }
          return _0x355e2a.apply(_0x3a87a1.sessionStorage, arguments);
        };
      }(_0x3a87a1.sessionStorage.setItem);
    }
    [{
      'functionName': "open",
      'argumentIndex': 0x1
    }, {
      'functionName': "send",
      'argumentIndex': 0x0
    }].forEach(({
      functionName: _0x1a9565,
      argumentIndex: _0x1285e6
    }) => {
      !function (_0x406ff3) {
        if (!_0x3a3ad0 || !_0x3a3ad0.includes("xhr." + _0x1a9565)) {
          _0x3a87a1.XMLHttpRequest.prototype[_0x1a9565] = function () {
            arguments[_0x1285e6] = _0x4fdc0a(arguments[_0x1285e6], 'xhr.' + _0x1a9565);
            return _0x406ff3.apply(this, arguments);
          };
        }
      }(_0x3a87a1.XMLHttpRequest.prototype[_0x1a9565]);
    });
    !function (_0x503e84) {
      _0x3a87a1.XMLHttpRequest.prototype.setRequestHeader = function () {
        if (!_0x3a3ad0 || !_0x3a3ad0.includes("xhr.setRequestHeader.name")) {
          _0x4fdc0a(arguments[0x0], "xhr.setRequestHeader.name");
        }
        if (!_0x3a3ad0 || !_0x3a3ad0.includes("xhr.setRequestHeader.value")) {
          _0x4fdc0a(arguments[0x1], "xhr.setRequestHeader.value");
        }
        return _0x503e84.apply(this, arguments);
      };
    }(_0x3a87a1.XMLHttpRequest.prototype.setRequestHeader);
    if (!_0x3a3ad0 || !_0x3a3ad0.includes("websocket")) {
      _0x3a87a1.WebSocket = new Proxy(_0x3a87a1.WebSocket, {
        '__proto__': null,
        'construct'(_0x1a6980, _0x4522fd) {
          var _0x38c120;
          _0x4fdc0a(_0x4522fd[0x0], "websocket");
          _0x38c120 = new _0x1a6980(..._0x4522fd);
          return _0x38c120;
        }
      });
    }
    [{
      'functionName': "eval",
      'obj': _0x3a87a1,
      'sink': "eval"
    }, {
      'functionName': "parse",
      'obj': _0x3a87a1.JSON,
      'sink': 'JSON.parse'
    }, {
      'functionName': 'evaluate',
      'obj': _0x3a87a1.document,
      'sink': "document.evaluate"
    }, {
      'functionName': 'open',
      'obj': _0x3a87a1,
      'sink': "window.open"
    }].forEach(({
      functionName: _0x3e4617,
      obj: _0x314ee3,
      sink: _0x41c63f
    }) => {
      let _0x26782a = _0x314ee3[_0x3e4617];
      if (!_0x3a3ad0 || !_0x3a3ad0.includes(_0x41c63f)) {
        _0x314ee3[_0x3e4617] = function () {
          arguments[0x0] = _0x4fdc0a(arguments[0x0], _0x41c63f);
          return _0x26782a.apply(_0x314ee3, arguments);
        };
      }
    });
    ['write', "writeln"].forEach(_0x4fdef2 => {
      if (!_0x3a3ad0 || !_0x3a3ad0.includes("document." + _0x4fdef2)) {
        _0x3a87a1.document[_0x4fdef2] = function (_0x17b9bf) {
          return function () {
            let _0x27fc7e = _0x3a87a1.document.readyState;
            let _0x2b5d2d;
            let _0x561350 = arguments.length;
            let _0x316d9b = '';
            for (_0x2b5d2d = 0x0; _0x2b5d2d < _0x561350; _0x2b5d2d++) {
              _0x316d9b += '' + arguments[_0x2b5d2d];
            }
            _0x316d9b = _0x4fdc0a(_0x316d9b, "document." + _0x4fdef2);
            _0x17b9bf.call(_0x3a87a1.document, _0x316d9b);
            if (_0x27fc7e === "interactive") {
              _0x3a87a1.document.close();
            }
          };
        }(_0x3a87a1.document[_0x4fdef2]);
      }
    });
    if (!_0x3a3ad0 || !_0x3a3ad0.includes("Function")) {
      _0x3a87a1.Function.prototype.toString = new Proxy(Function.prototype.toString, {
        '__proto__': null,
        'apply'(_0x60e591, _0x367412, _0x1514b0) {
          if (_0x367412 === _0x3a87a1.Function.prototype.toString) {
            return "function toString() { [native code] }";
          } else {
            if (_0x367412 === _0x3a87a1.Function) {
              return "function Function() { [native code] }";
            }
          }
          return Reflect.apply(_0x60e591, _0x367412, _0x1514b0);
        }
      });
      _0x3a87a1.Function = new Proxy(_0x3a87a1.Function, {
        '__proto__': null,
        'construct'(_0x29915b, _0x280560) {
          let _0x4a85d6 = _0x280560.length > 0x1 ? _0x280560[_0x280560.length - 0x1] : _0x280560[0x0];
          _0x4fdc0a(_0x4a85d6, "Function");
          return new _0x29915b(..._0x280560);
        },
        'apply'(_0x24d3af, _0x4a866e, _0xf74ad5) {
          let _0x50f550 = _0xf74ad5.length > 0x1 ? _0xf74ad5[_0xf74ad5.length - 0x1] : _0xf74ad5[0x0];
          _0x4fdc0a(_0x50f550, "Function");
          return Reflect.apply(_0x24d3af, _0x4a866e, _0xf74ad5);
        }
      });
    }
    const _0x1108ac = [{
      'property': "srcdoc",
      'obj': _0x3a87a1.HTMLIFrameElement.prototype,
      'sink': "iframe.srcdoc",
      'attr': true,
      'nodeName': 'iframe'
    }, {
      'property': "formAction",
      'obj': _0x3a87a1.HTMLInputElement.prototype,
      'sink': "input.formaction",
      'attr': true,
      'nodeName': "input"
    }, {
      'property': 'formAction',
      'obj': _0x3a87a1.HTMLButtonElement.prototype,
      'sink': "button.formaction",
      'attr': true,
      'nodeName': "button"
    }, {
      'property': "action",
      'obj': _0x3a87a1.HTMLFormElement.prototype,
      'sink': 'form.action',
      'attr': true,
      'nodeName': "form"
    }, {
      'property': "outerHTML",
      'obj': _0x3a87a1.Element.prototype,
      'sink': "element.outerHTML"
    }, {
      'property': "src",
      'obj': _0x3a87a1.HTMLScriptElement.prototype,
      'sink': "script.src",
      'attr': true,
      'nodeName': "script"
    }, {
      'property': "text",
      'obj': _0x3a87a1.HTMLScriptElement.prototype,
      'sink': "script.text"
    }];
    [..._0x1108ac, ..._0x537b74].forEach(({
      property: _0x192864,
      obj: _0x3289e4,
      sink: _0xec5b3e
    }) => {
      if (!_0x3a3ad0 || !_0x3a3ad0.includes(_0xec5b3e)) {
        let _0x4fd96a = Object.getOwnPropertyDescriptor(_0x3289e4, _0x192864);
        if (_0x4fd96a) {
          Object.defineProperty(_0x3289e4, _0x192864, {
            '__proto__': null,
            'configurable': true,
            'get': function () {
              return _0x4fd96a.get.call(this);
            },
            'set': function () {
              if (this.dataset && !this.dataset.dominvaderframe) {
                _0x4fdc0a(arguments[0x0] + '', _0xec5b3e, this);
              }
              return _0x4fd96a.set.call(this, arguments[0x0]);
            }
          });
        } else {
          console.log("Failed to set", _0xec5b3e);
        }
      }
    });
    let _0x293076 = Object.getOwnPropertyDescriptor(Attr.prototype, "value");
    Object.defineProperty(Attr.prototype, "value", {
      '__proto__': null,
      'get'() {
        return _0x293076.get.apply(this);
      },
      'set'(_0x5acf24) {
        _0x1108ac.forEach(({
          property: _0x1a53e1,
          obj: _0x477df1,
          sink: _0x127ae5,
          attr: _0x332f42,
          nodeName: _0x58aa50
        }) => {
          if (!_0x3a3ad0 || !_0x3a3ad0.includes(_0x127ae5)) {
            if (_0x332f42 && this.ownerElement && _0x58aa50 === this.ownerElement.tagName.toLowerCase() && _0x1a53e1 === this.name) {
              _0x4fdc0a(_0x5acf24 + '', _0x127ae5, this.ownerElement);
            }
          }
        });
        return _0x293076.set.apply(this, arguments);
      }
    });
    let _0x31eaf9 = Object.getOwnPropertyDescriptor(Node.prototype, "nodeValue");
    Object.defineProperty(Node.prototype, 'nodeValue', {
      '__proto__': null,
      'get'() {
        return _0x31eaf9.get.apply(this);
      },
      'set'(_0x4187db) {
        _0x1108ac.forEach(({
          property: _0x2e3c4d,
          obj: _0x4584aa,
          sink: _0x257329,
          attr: _0x5decd9,
          nodeName: _0x3d4930
        }) => {
          if (!_0x3a3ad0 || !_0x3a3ad0.includes(_0x257329)) {
            if (_0x5decd9 && this.ownerElement && _0x3d4930 === this.ownerElement.tagName.toLowerCase() && _0x2e3c4d === this.name) {
              _0x4fdc0a(_0x4187db + '', _0x257329, this.ownerElement);
            }
          }
        });
        return _0x31eaf9.set.apply(this, arguments);
      }
    });
    !function (_0x40c2d1) {
      if (_0x40c2d1) {
        Object.defineProperty(_0x3a87a1.Node.prototype, "textContent", {
          '__proto__': null,
          'configurable': true,
          'get': function () {
            return _0x40c2d1.get.call(this);
          },
          'set': function (_0x4a6259) {
            if (typeof this.tagName === "string") {
              let _0x5135ff = this.tagName.toLowerCase();
              if (_0x5135ff === "script") {
                if (!_0x3a3ad0 || !_0x3a3ad0.includes("script.textContent")) {
                  _0x4fdc0a(arguments[0x0], "script.textContent");
                }
              }
            } else {
              _0x1108ac.forEach(({
                property: _0x22506d,
                obj: _0x455d0f,
                sink: _0x3bb3da,
                attr: _0x36031a,
                nodeName: _0x17477d
              }) => {
                if (!_0x3a3ad0 || !_0x3a3ad0.includes(_0x3bb3da)) {
                  if (_0x36031a && this.ownerElement && _0x17477d === this.ownerElement.tagName.toLowerCase() && _0x22506d === this.name) {
                    _0x4fdc0a(_0x4a6259 + '', _0x3bb3da, this.ownerElement);
                  }
                }
              });
            }
            return _0x40c2d1.set.call(this, arguments[0x0]);
          }
        });
      }
    }(Object.getOwnPropertyDescriptor(_0x3a87a1.Node.prototype, "textContent"));
    function _0x3dc39d(_0x47946e, _0x53565e, _0x2617e9) {
      switch (_0x47946e) {
        case 'href':
        case "src":
        case 'data':
        case "action":
        case "formaction":
          _0x4fdc0a(_0x53565e, 'element.setAttribute.' + _0x47946e, _0x2617e9);
          break;
      }
      if (/^on/i.test(_0x47946e)) {
        _0x4fdc0a(_0x53565e, 'element.setAttribute.' + _0x47946e, _0x2617e9);
      }
    }
    if (_0x3a87a1.HTMLElement.prototype.setAttribute) {
      _0x3a87a1.HTMLElement.prototype.setAttribute = function (_0x20112a) {
        return function () {
          if (typeof arguments[0x1] === "string") {
            let _0x56972b = true;
            if (_0x3a3ad0) {
              if (_0x3a3ad0.includes("element.setAttribute." + arguments[0x0])) {
                _0x56972b = false;
              }
              if (String(arguments[0x0]).toLowerCase().startsWith('on')) {
                if (_0x3a3ad0.includes("element.setAttribute.on*")) {
                  _0x56972b = false;
                }
              }
            }
            if (_0x56972b) {
              _0x3dc39d(arguments[0x0], arguments[0x1], this);
            }
          }
          return _0x20112a.apply(this, arguments);
        };
      }(_0x3a87a1.HTMLElement.prototype.setAttribute);
    } else {
      console.log("Failed to set HTMLElement.prototype.setAttribute");
    }
    if (!_0x3a3ad0 || !_0x3a3ad0.includes("element.insertAdjacentHTML")) {
      if (_0x3a87a1.HTMLElement.prototype.insertAdjacentHTML) {
        _0x3a87a1.HTMLElement.prototype.insertAdjacentHTML = function (_0x1c984b) {
          return function () {
            _0x4fdc0a(arguments[0x1], "element.insertAdjacentHTML");
            return _0x1c984b.apply(this, arguments);
          };
        }(_0x3a87a1.HTMLElement.prototype.insertAdjacentHTML);
      } else {
        console.log("Failed to set Element.prototype.insertAdjacentHTML");
      }
    }
    !function (_0x3e7b97) {
      if (_0x3e7b97) {
        Object.defineProperty(_0x3a87a1.Element.prototype, "innerHTML", {
          '__proto__': null,
          'configurable': true,
          'get': function () {
            return _0x3e7b97.get.call(this);
          },
          'set': function () {
            if (typeof this.tagName === 'string') {
              let _0x51682a = this.tagName.toLowerCase();
              let _0x46a4e9 = _0x51682a === "script" ? 'script.innerHTML' : "element.innerHTML";
              if (!_0x3a3ad0 || !_0x3a3ad0.includes(_0x46a4e9)) {
                _0x4fdc0a(arguments[0x0] + '', _0x46a4e9, this);
              }
            }
            return _0x3e7b97.set.call(this, arguments[0x0]);
          }
        });
      } else {
        console.log("Failed to set Element.prototype.innerHTML");
      }
    }(Object.getOwnPropertyDescriptor(_0x3a87a1.Element.prototype, "innerHTML"));
    !function (_0xd872c0) {
      if (_0xd872c0) {
        Object.defineProperty(_0x3a87a1.HTMLElement.prototype, "innerText", {
          '__proto__': null,
          'configurable': true,
          'get': function () {
            return _0xd872c0.get.call(this);
          },
          'set': function () {
            if (typeof this.tagName === 'string') {
              let _0x2aee70 = this.tagName.toLowerCase();
              let _0xd3e0c6 = _0x2aee70 === "script" ? "script.innerText" : "element.innerText";
              if (_0x2aee70 === "script") {
                if (!_0x3a3ad0 || !_0x3a3ad0.includes(_0xd3e0c6)) {
                  _0x4fdc0a(arguments[0x0], "script.innerText");
                }
              } else if (!_0x3a3ad0 || !_0x3a3ad0.includes(_0xd3e0c6)) {
                _0x4fdc0a(arguments[0x0], "element.innerText", this);
              }
            }
            return _0xd872c0.set.call(this, arguments[0x0]);
          }
        });
      } else {
        console.log("Failed to set HTMLElement.prototype.innerText");
      }
    }(Object.getOwnPropertyDescriptor(_0x3a87a1.HTMLElement.prototype, 'innerText'));
    if (!_0x3a3ad0 || !_0x3a3ad0.includes('script.appendChild')) {
      if (_0x3a87a1.HTMLScriptElement.prototype.appendChild) {
        _0x3a87a1.HTMLScriptElement.prototype.appendChild = function (_0x199b7f) {
          return function () {
            if (typeof arguments[0x0].data === 'string' && arguments[0x0].data.length) {
              _0x4fdc0a(arguments[0x0].data, 'script.appendChild');
            }
            return _0x199b7f.apply(this, arguments);
          };
        }(_0x3a87a1.HTMLScriptElement.prototype.appendChild);
      }
    }
    if (!_0x3a3ad0 || !_0x3a3ad0.includes("script.append")) {
      if (_0x3a87a1.HTMLScriptElement.prototype.append) {
        _0x3a87a1.HTMLScriptElement.prototype.append = function (_0x345ae8) {
          return function () {
            if (typeof arguments[0x0].data === "string" && arguments[0x0].data.length) {
              _0x4fdc0a(arguments[0x0].data, 'script.append');
            } else if (typeof arguments[0x0] === "string") {
              _0x4fdc0a(arguments[0x0], 'script.append');
            }
            return _0x345ae8.apply(this, arguments);
          };
        }(_0x3a87a1.HTMLScriptElement.prototype.append);
      }
    }
    _0x2ead0d(_0x3a87a1, _0x53d278, _0x3383ef, _0x3a3ad0);
  }
  function _0x2ead0d(_0xf26f03, _0x41f916, _0x5607a7, _0x224683) {
    if (!_0xf26f03) {
      _0xf26f03 = window;
    }
    !function () {
      var _0x5e8084;
      if (!_0x224683 || !_0x224683.includes("jQuery")) {
        Object.defineProperty(_0xf26f03, "jQuery", {
          '__proto__': null,
          'configurable': true,
          'set': function (_0x5f2f91) {
            if (typeof _0x5f2f91 === "function") {
              _0x5e8084 = new Proxy(_0x5f2f91, {
                '__proto__': null,
                'apply': function (_0x566c81, _0x3583bd, _0x2d38f9) {
                  _0x41f916(_0x2d38f9, "jQuery", true, true);
                  return Reflect.apply(_0x566c81, _0x3583bd, _0x2d38f9);
                }
              });
              const _0x245f39 = [{
                'object': _0x5f2f91,
                'functionName': "parseJSON",
                'sink': "JSON.parse",
                'checkFirstArgIsString': false,
                'replaceTokenForjQuery': false
              }, {
                'object': _0x5f2f91,
                'functionName': 'parseXML',
                'sink': "jQuery.parseXML",
                'checkFirstArgIsString': false,
                'replaceTokenForjQuery': false
              }, {
                'object': _0x5f2f91,
                'functionName': 'parseHTML',
                'sink': "jQuery.parseHTML",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91,
                'functionName': "globalEval",
                'sink': 'jQuery.globalEval',
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': 'constructor',
                'sink': 'jQuery.constructor',
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': 'has',
                'sink': "jQuery.has",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': "init",
                'sink': "jQuery.init",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': "index",
                'sink': "jQuery.index",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': 'add',
                'sink': "jQuery.add",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': "append",
                'sink': "jQuery.append",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': 'appendTo',
                'sink': 'jQuery.appendTo',
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': "after",
                'sink': "jQuery.after",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': "insertAfter",
                'sink': "jQuery.insertAfter",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': "before",
                'sink': "jQuery.before",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': 'insertBefore',
                'sink': 'jQuery.insertBefore',
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': 'html',
                'sink': "jQuery.html",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': "prepend",
                'sink': "jQuery.prepend",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': "prependTo",
                'sink': "jQuery.prependTo",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': "replaceWith",
                'sink': "jQuery.replaceWith",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': false
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': 'replaceAll',
                'sink': "jQuery.replaceAll",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': false
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': "wrap",
                'sink': "jQuery.wrap",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': 'wrapAll',
                'sink': "jQuery.wrapAll",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }, {
                'object': _0x5f2f91.prototype,
                'functionName': 'wrapInner',
                'sink': "jQuery.wrapInner",
                'checkFirstArgIsString': true,
                'replaceTokenForjQuery': true
              }];
              _0x245f39.forEach(_0x3420d5 => {
                if (_0x3420d5.object[_0x3420d5.functionName]) {
                  _0x3420d5.object[_0x3420d5.functionName] = new Proxy(_0x3420d5.object[_0x3420d5.functionName], {
                    '__proto__': null,
                    'apply': function (_0xcfb96d, _0x14586c, _0x2d35eb) {
                      if (!_0x224683 || !_0x224683.includes(_0x3420d5.sink)) {
                        _0x41f916(_0x2d35eb, _0x3420d5.sink, _0x3420d5.checkFirstArgIsString, _0x3420d5.replaceTokenForjQuery);
                      }
                      return Reflect.apply(_0xcfb96d, _0x14586c, _0x2d35eb);
                    }
                  });
                }
              });
              if (_0x5f2f91.prototype.attr) {
                _0x5f2f91.prototype.attr = new Proxy(jQuery.prototype.attr, {
                  '__proto__': null,
                  'apply': function (_0x534fb6, _0x36b138, _0x5e1f39) {
                    if (typeof _0x5e1f39[0x1] === "string") {
                      if (_0x5e1f39[0x0] === "href" || _0x5e1f39[0x0] === 'src' || _0x5e1f39[0x0] === "data" || _0x5e1f39[0x0] === "action" || _0x5e1f39[0x0] === "formaction" || /^on/i.test(_0x5e1f39[0x0])) {
                        if (!_0x224683 || !_0x224683.includes("jQuery.attr." + _0x5e1f39[0x0])) {
                          _0x5607a7(_0x5e1f39, "jQuery.attr.", _0x36b138);
                        }
                      }
                    }
                    return Reflect.apply(_0x534fb6, _0x36b138, _0x5e1f39);
                  }
                });
              }
              if (_0x5f2f91.prototype.prop) {
                _0x5f2f91.prototype.prop = new Proxy(jQuery.prototype.prop, {
                  '__proto__': null,
                  'apply': function (_0x26176a, _0x14073c, _0x261ccf) {
                    if (typeof _0x261ccf[0x1] === 'string') {
                      if (_0x261ccf[0x0] === "href" || _0x261ccf[0x0] === "src" || _0x261ccf[0x0] === "data" || _0x261ccf[0x0] === "action" || _0x261ccf[0x0] === "formaction" || _0x261ccf[0x0] === "innerHTML" || _0x261ccf[0x0] === "outerHTML") {
                        if (!_0x224683 || !_0x224683.includes('jQuery.prop.' + _0x261ccf[0x0])) {
                          _0x5607a7(_0x261ccf, "jQuery.prop.", _0x14073c);
                        }
                      }
                    }
                    return Reflect.apply(_0x26176a, _0x14073c, _0x261ccf);
                  }
                });
              }
            } else {
              _0x5e8084 = _0x5f2f91;
            }
          },
          'get': function () {
            return _0x5e8084;
          }
        });
      }
    }();
    !function () {
      var _0x41ee44;
      if (!_0x224683 || !_0x224683.includes("jQuery.$")) {
        Object.defineProperty(_0xf26f03, '$', {
          '__proto__': null,
          'configurable': true,
          'set': function (_0x2a24c8) {
            if (typeof _0x2a24c8 === "function" && _0x2a24c8.name === "jQuery") {
              _0x41ee44 = new Proxy(_0x2a24c8, {
                '__proto__': null,
                'apply': function (_0x159b1a, _0x48bb59, _0x4eff71) {
                  _0x41f916(_0x4eff71, "jQuery.$", true, true);
                  return Reflect.apply(_0x159b1a, _0x48bb59, _0x4eff71);
                }
              });
            } else {
              _0x41ee44 = _0x2a24c8;
            }
          },
          'get': function () {
            return _0x41ee44;
          }
        });
      }
    }();
  }
  function _0x2b3484(_0x38c9cd) {
    let _0x2f7a17 = _0x50e72d.disabledTrackingSources;
    return !_0x2f7a17.includes(_0x38c9cd);
  }
  function _0x1d726c(_0x582c07) {
    let _0x4cbe55 = _0x50e72d.disabledSinks;
    return !_0x4cbe55.includes(_0x582c07);
  }
  function _0x5f5834(_0x16a852) {
    let _0x1e4e4e = _0x50e72d.disabledTechniques;
    return !_0x1e4e4e.includes(_0x16a852);
  }
  function _0x31e79f(_0x1ea4ce) {
    let _0x49685e = _0x50e72d.disabledSources;
    if (!_0x10471d) {
      return false;
    }
    return !_0x49685e.includes(_0x1ea4ce);
  }
  function _0x377e88(_0x122f11, _0x64da69) {
    _0x122f11 = String(_0x122f11);
    return _0x122f11.includes(_0x64da69);
  }
  function _0x14e2aa(_0x44c636, _0x5d93d3) {
    let _0x494880 = _0x50e72d.domClobbering;
    if (_0x1d726c("createContextualFragment")) {
      _0x44c636.document.createRange = function (_0x5407dc) {
        return function () {
          let _0x255790 = _0x5407dc.apply(document, arguments);
          _0x255790.createContextualFragment = function (_0x547ac3) {
            return function (_0x236e9a) {
              _0x5d93d3(_0x236e9a, "createContextualFragment");
              return _0x547ac3.apply(_0x255790, arguments);
            };
          }(_0x255790.createContextualFragment);
          return _0x255790;
        };
      }(document.createRange);
    }
    ['setTimeout', "setInterval"].forEach(_0x2d3b37 => {
      if (_0x1d726c(_0x2d3b37)) {
        _0x44c636[_0x2d3b37] = function (_0x17a4c6) {
          return function () {
            if (typeof arguments[0x0] === 'string' || typeof arguments[0x0] === "object") {
              _0x5d93d3(arguments[0x0], _0x2d3b37);
            }
            return _0x17a4c6.apply(_0x44c636, arguments);
          };
        }(_0x44c636[_0x2d3b37]);
      }
    });
    ["serviceWorker.register"].forEach(_0x40903f => {
      if (_0x1d726c(_0x40903f)) {
        try {
          if (_0x44c636.navigator.serviceWorker) {
            _0x44c636.navigator.serviceWorker.register = function (_0x3fa6f2) {
              return function () {
                _0x5d93d3(arguments[0x0], _0x40903f);
                return _0x3fa6f2.apply(_0x44c636.navigator.serviceWorker, arguments);
              };
            }(_0x44c636.navigator.serviceWorker.register);
          }
        } catch (_0x3d2d9f) {}
      }
    });
    if (_0x494880) {
      _0x4add2e();
    }
    if (_0x494950 && _0x25b55c && window === top && !_0x176fb0) {
      _0x1de098();
    } else if (_0x43fe36 && window === window.top) {
      _0x1de098();
    }
  }
  function _0x4add2e() {
    Object.setPrototypeOf(window, new Proxy(Object.getPrototypeOf(window), {
      __proto__: null,
      get: function (target, prop, receiver) {
        if (typeof target[prop] !== 'undefined') {
          return target[prop];
        }
        return _0x2937c4([prop], 0);
      }
    }));
  }
  function _0x2937c4(_0x469bf1, _0x3515ed) {
    let _0x123d8c = _0x50e72d.canary;
    let _0x559ddb = "domclobbering" + _0x469bf1.join('.') + _0x123d8c;
    if (_0x3515ed >= 0x5) {
      return _0x559ddb;
    }
    return new Proxy({
      'toString'() {
        return _0x559ddb;
      }
    }, {
      'get'(_0x3c150f, _0x306c96) {
        if (typeof _0x306c96 === "symbol") {
          if (_0x306c96 === _0xe3e6dc) {
            return true;
          }
          return function (_0x57b78e) {
            return _0x559ddb;
          };
        }
        return _0x2937c4([..._0x469bf1, _0x306c96], ++_0x3515ed);
      }
    });
  }
  function _0x1de098() {
    let toString = Object.prototype.toString;
    let proxy = new Proxy({
      __proto__: null
    }, {
      __proto__: null,
      get: function (target, prop, receiver) {
        if (typeof prop === 'string') {
          _0x12a669.add(prop);
        }
        return;
      }
    });
    Object.setPrototypeOf(Object.prototype, proxy);
    if (toString.call(function () {}) !== "[object Function]") {
      Object.prototype.toString = function () {
        Object.setPrototypeOf(Object.prototype, null);
        let _0x25a1a1 = toString.call(this);
        Object.setPrototypeOf(Object.prototype, proxy);
        return _0x25a1a1;
      };
    }
  }
  function _0x21ada6() {
    try {
      return !!(window.frameElement && window.frameElement.dataset && window.frameElement.dataset.dominvaderframe);
    } catch (_0x156891) {}
    return false;
  }
  function _0x604210() {
    let _0x380008 = _0x50e72d.canary;
    let _0x1f8c85 = _0x50e72d.prototypePollutionVerify;
    if (_0x1f8c85) {
      return;
    }
    const _0x355eab = function (_0x5d8f59, _0x1eeb72) {
      return {
        '__proto__': null,
        'configurable': true,
        'enumerable': false,
        'set': function (_0x47ee9a) {
          delete Object.prototype[_0x5d8f59];
          Object.prototype[_0x5d8f59] = _0x47ee9a;
          if (String(_0x47ee9a).includes(_0x380008)) {
            _0x41b4bb({
              'source': "Prototype pollution: " + _0x1eeb72,
              'value': _0x47ee9a,
              'stackTrace': _0x7baff0()
            });
          }
        }
      };
    };
    for (const _0x260ff8 of _0xa5fe9b) {
      if (!_0x5f5834(_0x260ff8.source)) {
        continue;
      }
      Object.defineProperty(Object.prototype, _0x260ff8.hashIdentifier, _0x355eab(_0x260ff8.hashIdentifier, _0x260ff8.source + " in hash"));
      Object.defineProperty(Object.prototype, _0x260ff8.searchIdentifier, _0x355eab(_0x260ff8.searchIdentifier, _0x260ff8.source + " in search"));
    }
    Object.defineProperty(Object.prototype, 'e021bc4a', _0x355eab('e021bc4a', "JSON postmessage"));
  }
  function _0xfb9ad5(_0x3474a6, _0x342f22) {
    let _0x32c68a = _0x50e72d.canary;
    let _0x5aa4aa = JSON.stringify(_0x3474a6);
    _0x5aa4aa = _0x5aa4aa.replace(/\}$/, '');
    if (_0x5aa4aa !== '{') {
      _0x5aa4aa += ',';
    }
    let _0x44d8da = _0x32c68a + _0x342f22 + '-';
    _0x5aa4aa += "\"__proto__\":{\"e021bc4a\":" + JSON.stringify(_0x44d8da) + '}';
    _0x5aa4aa += '}';
    try {
      return JSON.parse(_0x5aa4aa);
    } catch (_0x5aa110) {
      return _0x3474a6;
    }
  }
  function _0x17c2b0(_0x4c5f14) {
    let _0x2f70ab = _0x50e72d.canary;
    let _0x4a3f71 = '';
    let _0xe4f9fd = '';
    if (_0x82bfe4) {
      if (!location.hash.includes(_0x2f70ab)) {
        for (const _0x37fced of _0xa5fe9b) {
          if (!_0x5f5834(_0x37fced.source)) {
            continue;
          }
          if (_0x4c5f14 && !_0x4c5f14.includes(_0x37fced.source)) {
            continue;
          }
          if (_0x4a3f71) {
            _0x4a3f71 += '&';
          }
          _0x4a3f71 += _0x37fced.createParam(_0x37fced.hashIdentifier, _0x2f70ab);
        }
      }
    }
    if (_0x4260df) {
      if (!location.search.includes(_0x2f70ab)) {
        for (const _0x122ead of _0xa5fe9b) {
          if (!_0x5f5834(_0x122ead.source)) {
            continue;
          }
          if (_0x4c5f14 && !_0x4c5f14.includes(_0x122ead.source)) {
            continue;
          }
          if (_0xe4f9fd) {
            _0xe4f9fd += '&';
          }
          _0xe4f9fd += _0x122ead.createParam(_0x122ead.searchIdentifier, _0x2f70ab);
        }
      }
    }
    if (_0x4a3f71 || _0xe4f9fd) {
      let _0x11ca95 = location.search ? location.search + '&' : '';
      if (_0xe4f9fd) {
        if (!location.search) {
          _0x11ca95 += '?';
        }
        _0x11ca95 += _0xe4f9fd;
      }
      if (_0x4a3f71) {
        if (location.hash === '') {
          _0x11ca95 += '#';
        }
        _0x11ca95 += (location.hash ? location.hash + '&' : '') + _0x4a3f71;
      }
      try {
        _0x500770.call(_0x285eff, {}, '', _0x11ca95);
        _0x51b70b = location.href;
      } catch (_0x501ba0) {}
    }
  }
  function _0x21acfd(_0x286fd7, _0x35e8cb) {
    let _0xcd9d90 = ["dominvaderframe", "window", "localStorage", 'sessionStorage', "DO_NOT_CHECK", 'autoscansourceindex'];
    let _0x134989 = [..._0x286fd7].map(_0x21d4e3 => _0x21d4e3.replace(/^\d+/, '')).filter((_0x4ba930, _0x3a194c, _0x2ef1d8) => _0x2ef1d8.indexOf(_0x4ba930) != _0x3a194c && _0x4ba930.length > 0x3);
    return _0x286fd7.filter(_0x25e2c3 => !_0x134989.includes(_0x25e2c3.replace(/^\d+/, '')) && !_0xcd9d90.includes(_0x25e2c3) && !_0x35e8cb.includes(_0x25e2c3));
  }
  function _0x1597f3(_0x21e2c9) {
    let _0x56015d = document.createElement("div");
    _0x56015d.style.position = "fixed";
    _0x56015d.style.top = '0';
    _0x56015d.style.width = "100%";
    _0x56015d.style.height = "auto";
    _0x56015d.style.color = "white";
    _0x56015d.style.backgroundColor = _0x21e2c9;
    _0x56015d.style.textAlign = "center";
    _0x56015d.style.padding = '5px';
    _0x56015d.style.zIndex = "100000";
    _0x56015d.style.fontFamily = "Arial";
    _0x56015d.style.borderBottom = "2px solid #f8f9fa";
    return _0x56015d;
  }
  function _0xe339b6() {
    let _0x259dea = document.createElement("progress");
    _0x259dea.max = 0x64;
    _0x259dea.value = 0x0;
    _0x259dea.style.width = "100%";
    _0x259dea.style.color = '#007bff';
    return _0x259dea;
  }
  function _0x553b3e() {
    let _0x38ac06 = document.createElement("div");
    let _0x236e38 = _0xe339b6();
    let _0x54313f = _0x1597f3('#007bff');
    _0x236e38.value = 0x0;
    _0x38ac06.textContent = "Scanning for client side prototype pollution sources...";
    _0x54313f.appendChild(_0x38ac06);
    _0x54313f.appendChild(_0x236e38);
    document.documentElement.appendChild(_0x54313f);
    let _0x3fd7c4 = 0x0;
    let _0x168248 = 0x0;
    let _0x4a044b = [];
    let _0x4b4f25 = new Set();
    for (const _0x50e51d of _0xa5fe9b) {
      if (!_0x5f5834(_0x50e51d.source)) {
        continue;
      }
      let _0x5634ca = false;
      try {
        if (location.href === top.location.href) {
          _0x5634ca = true;
        }
      } catch (_0x6f06a6) {}
      if (_0x5634ca) {
        let _0x55dbec = new WeakRef(document.createElement('iframe'));
        let _0x1583f7 = _0x55dbec.deref();
        _0x1583f7.style.display = 'none';
        _0x1583f7.dataset.dominvaderframe = '1';
        _0x1583f7.dataset.technique = _0x50e51d.source;
        _0x1583f7.onload = function () {
          _0x3fd7c4--;
          let _0x5ec48b = _0x168248 - _0x3fd7c4;
          let _0x4b3b7a = Math.round(0x64 * _0x5ec48b / _0x168248);
          _0x236e38.value = _0x4b3b7a;
          _0x1583f7.onload = function () {
            if (_0x1583f7.dataset && typeof _0x1583f7.dataset.sources !== "undefined") {
              try {
                let _0x15b930 = JSON.parse(_0x1583f7.dataset.sources);
                _0x15b930.forEach(_0x404aec => _0x4b4f25.add(_0x404aec));
              } catch (_0x5e9309) {}
            }
            _0x1583f7.remove();
            delete _0x1583f7.dataset.dominvaderframe;
            delete _0x1583f7.dataset.technique;
            delete _0x1583f7.dataset.sources;
            _0x5634ca = null;
            _0x1583f7.onload = null;
            _0x1583f7 = null;
            _0x55dbec = null;
            if (_0x3fd7c4 === 0x0) {
              _0x4b3b7a = null;
              _0x236e38 = null;
              _0x3fd7c4 = null;
              _0x54313f.remove();
              _0x54313f = null;
              _0x38ac06 = null;
              let _0x54e6d9 = _0x1597f3('#28a745');
              _0x54e6d9.textContent = "Complete.";
              document.documentElement.appendChild(_0x54e6d9);
              setTimeout(function () {
                _0x54e6d9.remove();
                _0x54e6d9 = null;
                let _0x45da00 = _0x1597f3("#dc3545");
                if (_0x4b4f25.size > 0x0) {
                  _0x45da00.textContent = "DOM Invader found " + _0x4b4f25.size + " source" + (_0x4b4f25.size === 0x1 ? '' : 's') + " via prototype pollution. Please check devtools.";
                  document.documentElement.appendChild(_0x45da00);
                  setTimeout(function () {
                    _0x45da00.remove();
                    _0x45da00 = null;
                    _0x4b4f25 = null;
                  }, 0x2710);
                }
              }, 0x5dc);
            }
          };
          _0x4a044b.push(_0x1583f7);
          if (_0x3fd7c4 === 0x0) {
            setTimeout(function () {
              for (let _0x3b2f16 of _0x4a044b) {
                _0x3b2f16.src = "about:blank";
                _0x3b2f16 = null;
              }
              _0x4a044b = null;
              window.BurpDOMInvader.isComplete = true;
            }, 0x1f4);
          }
        };
        _0x1583f7.src = location.href;
        document.documentElement.appendChild(_0x1583f7);
        _0x3fd7c4++;
        _0x168248++;
      }
    }
  }
  function _0x745d28() {
    Object.setPrototypeOf(Object.prototype, null);
    let _0x1b1d33 = new Set();
    let _0x212319 = ["value", "body", "method", 'headers', "get", "set", "has", "writable", "configurable"];
    let _0x2ac733 = [..._0x12a669];
    if (_0x2ac733.length) {
      _0x2ac733 = _0x21acfd(_0x2ac733, _0x212319);
    }
    if (_0x494950 && window === window.top) {
      let _0x76f072 = false;
      try {
        if (location.href === top.location.href) {
          _0x76f072 = true;
        }
      } catch (_0x541182) {}
      if (_0x76f072) {
        let _0x5817c1 = _0xe339b6();
        let _0x1e62b7 = document.createElement("div");
        _0x1e62b7.appendChild(document.createTextNode("DOM Invader client side prototype pollution gadget scanning..."));
        let _0x343536 = _0x1597f3('#007bff');
        let _0xa16309 = _0x1597f3('#dc3545');
        _0x343536.appendChild(_0x1e62b7);
        _0x343536.appendChild(_0x5817c1);
        document.body.appendChild(_0x343536);
        let _0x279ce7 = [];
        let _0x11639f = +_0x50e72d.prototypePollutionPropertiesPerFrame;
        let _0x28ad69 = _0x50e72d.prototypePollutionAutoScale;
        if (_0x28ad69) {
          _0x11639f = Math.ceil(_0x2ac733.length / 0x19);
        }
        while (_0x2ac733.length) {
          _0x279ce7.push(_0x2dad86(_0x2ac733, _0x11639f));
        }
        for (let _0x11ffdf of _0x212319) {
          _0x279ce7.push([_0x11ffdf]);
        }
        let _0xc8c36 = _0x279ce7.length;
        for (let _0x11d354 = 0x0; _0x11d354 < 0x5; _0x11d354++) {
          if (_0x279ce7.length) {
            _0x16961c(_0x279ce7, _0xa16309, _0x1b1d33, _0x343536);
          } else {
            break;
          }
        }
        setTimeout(function _0x50d018() {
          let _0x17c4cf = _0xc8c36 - _0x279ce7.length;
          let _0x24bc1c = Math.round(0x64 * _0x17c4cf / _0xc8c36);
          _0x1e62b7.textContent = "DOM Invader client side prototype pollution gadget scanning..." + _0x24bc1c + '%';
          _0x5817c1.value = +_0x24bc1c;
          if (_0x279ce7.length) {
            setTimeout(_0x50d018, 0x1f4);
          }
        }, 0x1f4);
      }
    }
  }
  function _0x2dad86(_0x25a336, _0x1c2f55) {
    let _0xddefd8 = [];
    let _0x5ecf94;
    let _0xcdb4b = 0x0;
    let _0x472ece = 0x0;
    for (let _0x9fd81c = 0x0; _0x9fd81c < _0x1c2f55; _0x9fd81c++) {
      if (_0x25a336.length) {
        _0xcdb4b = (_0x472ece + _0x9fd81c + _0x1c2f55) % _0x25a336.length;
        _0x5ecf94 = _0x25a336.splice(_0xcdb4b, 0x1)[0x0];
        _0xddefd8.push(_0x5ecf94);
        _0x472ece = _0xcdb4b;
      }
    }
    return _0xddefd8;
  }
  function _0x16961c(_0x33c6cf, _0x5552b5, _0x19aae7, _0x97ae5) {
    let _0x4e5596 = new WeakRef(document.createElement('iframe'));
    let _0x568922 = _0x4e5596.deref();
    _0x568922.style.display = "none";
    _0x568922.dataset.dominvaderframe = '1';
    _0x568922.dataset.autoscansourceindex = _0xca8738;
    _0x568922.src = location.href;
    let _0x495f33 = _0x33c6cf.shift();
    let _0x13f2c7;
    const _0x41c7d2 = function () {
      if (_0x568922.dataset && typeof _0x568922.dataset.sinks !== 'undefined') {
        try {
          let _0x3d1c46 = JSON.parse(_0x568922.dataset.sinks);
          _0x3d1c46.forEach(_0x3ef5dd => _0x19aae7.add(_0x3ef5dd));
        } catch (_0x3d8586) {}
      }
      _0x568922.onload = function () {
        delete _0x568922.dataset.dominvaderframe;
        delete _0x568922.dataset.autoscansourceindex;
        delete _0x568922.dataset.sinks;
        delete _0x568922.dataset.properties;
        _0x568922.onload = null;
        _0x568922.remove();
        _0x4e5596 = null;
        _0x568922 = null;
        _0x13f2c7 = null;
        _0x495f33 = null;
        if (_0x33c6cf.length) {
          _0x16961c(_0x33c6cf, _0x5552b5, _0x19aae7, _0x97ae5);
        } else {
          _0x122168(_0x5552b5, _0x19aae7, _0x97ae5);
        }
        _0x5552b5 = null;
        _0x19aae7 = null;
        _0x33c6cf = null;
      };
      _0x568922.src = "about:blank";
    };
    _0x568922.dataset.properties = _0x495f33.join(',');
    _0x568922.onload = function () {
      clearTimeout(_0x13f2c7);
      _0x41c7d2();
    };
    document.body.appendChild(_0x568922);
    _0x13f2c7 = setTimeout(_0x41c7d2, 0x2710);
  }
  function _0x122168(_0xd5143d, _0x1736fc, _0x3ee140) {
    if (document.querySelectorAll("[data-dominvaderframe]").length > 0x1) {
      return;
    }
    if (document.body.contains(_0x3ee140)) {
      _0x3ee140.remove();
      _0x3ee140 = null;
    }
    let _0x5f0ff4 = _0x1597f3('#28a745');
    _0x5f0ff4.textContent = "Complete.";
    document.body.appendChild(_0x5f0ff4);
    setTimeout(function () {
      _0x5f0ff4.remove();
      _0x5f0ff4 = null;
      if (_0x1736fc.size > 0x0) {
        _0xd5143d.textContent = "DOM Invader found " + _0x1736fc.size + " sink" + (_0x1736fc.size === 0x1 ? '' : 's') + " via prototype pollution. Please check devtools.";
        document.body.appendChild(_0xd5143d);
        setTimeout(function () {
          _0xd5143d.remove();
          _0xd5143d = null;
          _0x1736fc = null;
        }, 0x2710);
      }
    }, 0x5dc);
    window.BurpDOMInvader.isComplete = true;
  }
  function _0x3c50b0(_0x19996f, _0x5ef4e4, _0x1a0130) {
    let _0x1e7fae = _0x50e72d.canary;
    let _0x13823e = 0x0;
    return new Proxy({}, {
      '__proto__': null,
      'get'(_0x5dc8f8, _0xdde137, _0x4f5556) {
        let _0x1f30b9 = _0x1e7fae + (_0x1a0130 > 0x0 ? _0x1a0130 : '') + "prototypepollution" + _0x19996f.join('.') + _0x1e7fae;
        if (_0x13823e >= 0x3e8) {
          throw new Error("DOM Invader: Maximum amount of property reads reached");
        }
        _0x13823e++;
        if (typeof _0xdde137 === "symbol") {
          if (_0xdde137 === _0xe3e6dc) {
            false;
            return true;
          }
          return function (_0xec766a) {
            return _0x1f30b9;
          };
        }
        if (_0x5ef4e4 > 0x5) {
          return _0x1f30b9;
        }
        return _0x3c50b0([..._0x19996f, _0xdde137], ++_0x5ef4e4, _0x1a0130);
      }
    });
  }
  function _0x2c72ff() {
    let _0x963759 = _0x50e72d.canary;
    let _0x170067 = _0x50e72d.prototypePollutionNested;
    let _0x3247cb = window.frameElement;
    if (_0x3247cb) {
      if (_0x3247cb.dataset && _0x3247cb.dataset.dominvaderframe && typeof _0x3247cb.dataset.properties === "string") {
        let _0x4c9f77 = _0x3247cb.dataset.properties.split(',');
        let _0xcc60bc = /^\d+$/.test(_0x3247cb.dataset.autoscansourceindex) ? +_0x3247cb.dataset.autoscansourceindex : -0x1;
        for (let _0x46952c of _0x4c9f77) {
          let _0x5dfe3a = 0x0;
          let _0x44955a = new Map();
          let _0x342732 = _0x170067 ? _0x3c50b0([_0x46952c], 0x0, _0xcc60bc) : _0x963759 + (_0xcc60bc > 0x0 ? _0xcc60bc : '') + 'prototypepollution' + _0x46952c + _0x963759;
          !function (_0x506c8f) {
            Object.defineProperty(Object.prototype, _0x46952c, {
              '__proto__': null,
              'configurable': true,
              'enumerable': false,
              'get': function () {
                if (_0x506c8f === "headers") {
                  return {
                    'x': _0x963759 + (_0xcc60bc > 0x0 ? _0xcc60bc : '') + 'prototypepollution' + _0x46952c + _0x963759
                  };
                }
                if (_0x5dfe3a > 0x3e8) {
                  throw new Error("DOM Invader: Maximum amount of property reads reached");
                }
                _0x5dfe3a++;
                return _0x44955a.has(this) ? _0x44955a.get(this) : _0x342732;
              },
              'set': function (_0x36c506) {
                _0x44955a.set(this, _0x36c506);
              }
            });
          }(_0x46952c);
        }
      }
    }
  }
  function _0x5d2aed() {
    let _0x2530a3 = _0x50e72d.canary;
    for (const _0x203dfb of _0xa5fe9b) {
      if (!_0x5f5834(_0x203dfb.source)) {
        continue;
      }
      let _0x56029f = Object.prototype[_0x203dfb.hashIdentifier];
      if (String(_0x56029f).includes(_0x2530a3)) {
        _0x41b4bb({
          'source': "Prototype pollution: " + _0x203dfb.source + " in hash",
          'value': _0x56029f,
          'stackTrace': "No stack trace available. Try running without verify onload."
        });
      }
      let _0x49d055 = Object.prototype[_0x203dfb.searchIdentifier];
      if (String(_0x49d055).includes(_0x2530a3)) {
        _0x41b4bb({
          'source': "Prototype pollution: " + _0x203dfb.source + " in search",
          'value': _0x49d055,
          'stackTrace': "No stack trace available. Try running without verify onload."
        });
      }
    }
    let _0x49e70b = Object.prototype.e021bc4a;
    if (String(_0x49e70b).includes(_0x2530a3)) {
      _0x41b4bb({
        'source': "Prototype pollution: postmessage JSON",
        'value': _0x49e70b,
        'stackTrace': "No stack trace available. Try running without verify onload."
      });
    }
  }
  function _0x42ed01(_0x55b417, _0x218f0f, _0x42d1e3, _0x29067b) {
    let _0x35a75c = Object.getOwnPropertyDescriptor(_0x55b417, _0x218f0f);
    let _0x396067 = _0x55b417[_0x218f0f];
    Object.defineProperty(_0x55b417, _0x218f0f, {
      '__proto__': null,
      'configurable': true,
      'get': function () {
        let _0x1184ed;
        if (_0x35a75c) {
          _0x1184ed = _0x35a75c.get.call(this);
        } else {
          _0x1184ed = _0x396067;
        }
        if (_0x42d1e3 === "document.referrer" && _0x1184ed === '' && _0x31e79f(_0x42d1e3)) {
          _0x1184ed = "https://example.com/";
        }
        let _0x15e20e = _0x50e72d.canary;
        let _0xc9eab = _0x15e20e + _0x42d1e3;
        _0x1184ed = _0x31e79f(_0x42d1e3) && !_0x377e88(_0x1184ed, _0xc9eab) ? _0x1184ed + _0xc9eab : _0x1184ed;
        if (_0x2b3484(_0x42d1e3) && _0x4f582f(_0x1184ed)) {
          _0x41b4bb({
            'source': _0x42d1e3,
            'value': _0x1184ed,
            'stackTrace': _0x7baff0()
          });
        }
        return _0x1184ed;
      },
      'set': function () {
        let _0x3b097f = arguments[0x0];
        if (_0x29067b) {
          _0x29067b(_0x3b097f);
        }
        if (_0x35a75c) {
          return _0x35a75c.set.call(this, _0x3b097f);
        }
      }
    });
  }
  function _0x25d0fa(_0x400bde) {
    if (!_0x400bde) {
      _0x400bde = window;
    }
    _0x42ed01(_0x400bde.document, "URL", "document.URL");
    _0x42ed01(_0x400bde.document, "documentURI", "document.documentURI");
    _0x42ed01(_0x400bde.document, "baseURI", "document.baseURI");
    _0x42ed01(_0x400bde.document, 'referrer', 'document.referrer');
    _0x42ed01(_0x400bde, 'name', "window.name", function (_0x55e424) {
      if (_0x1d726c('window.name') && _0x4f582f(_0x55e424)) {
        _0x41b4bb({
          'sink': "window.name",
          'value': _0x55e424,
          'stackTrace': _0x7baff0()
        });
      }
    });
    if (_0x2b3484("URLSearchParams")) {
      let _0xc9c92b = URLSearchParams.prototype.get;
      URLSearchParams.prototype.get = function (_0x3cfb03) {
        let _0x5ee93c = _0xc9c92b.apply(this, arguments);
        let _0x2e4646 = _0x50e72d.canary;
        if (_0x31e79f("URLSearchParams") && _0x5ee93c === null) {
          _0x5ee93c = '';
        }
        let _0x4cdb41 = _0x31e79f("URLSearchParams") ? _0x2e4646 + "URLSearchParams" + _0x3cfb03 + _0x2e4646 : '';
        _0x41b4bb({
          'source': "URLSearchParams",
          'value': _0x3cfb03 + '=' + _0x5ee93c + (!_0x377e88(_0x5ee93c, _0x4cdb41) ? _0x4cdb41 : ''),
          'stackTrace': _0x7baff0()
        });
        return _0x31e79f("URLSearchParams") && !_0x377e88(_0x5ee93c, _0x4cdb41) ? _0x5ee93c + _0x4cdb41 : _0x5ee93c;
      };
    }
  }
  function _0x59988f() {
    let _0x3269c0 = _0x50e72d.prototypePollutionVerify;
    if (_0x494950 && _0x25b55c && window.top === window && !_0x176fb0) {
      _0x745d28();
    } else if (_0x43fe36 && window === top) {
      _0x745d28();
    }
    if (_0x494950 && _0x3269c0) {
      _0x5d2aed();
    }
    if (_0x494950 && (_0x4260df || _0x82bfe4)) {
      try {
        _0x500770.call(_0x285eff, {}, '', _0x57ba5b);
      } catch (_0xc25e47) {}
    }
    if (Object.prototype.testproperty === 'DOM_INVADER_PP_POC') {
      console.log("Showing Object.prototype for prototype pollution", Object.prototype);
    }
    if (!_0x494950 || !_0x25b55c && !_0x2effea) {
      window.BurpDOMInvader.isComplete = true;
    }
  }
  function _0x133af8(_0x122582, _0x2e24dd, _0x10135d) {
    window[_0x122582][_0x2e24dd] = function (_0x91bf66) {
      return function () {
        const _0x16d6e7 = Array.from(arguments);
        for (let _0xde8052 = 0x0; _0xde8052 < _0x16d6e7.length; _0xde8052++) {
          if (!_0x10135d || _0x10135d && _0x4f582f(_0x16d6e7[_0xde8052])) {
            _0x41b4bb({
              '__proto__': null,
              'sink': _0x122582 + '.' + _0x2e24dd + ".arg" + _0xde8052,
              'value': _0x16d6e7[_0xde8052],
              'stackTrace': _0x7baff0()
            });
          }
        }
        return _0x91bf66.apply(window[_0x122582], arguments);
      };
    }(window[_0x122582][_0x2e24dd]);
  }
  function _0xcf9d41(_0x1ff519) {
    let _0x3ed75c = window;
    for (let _0x3b3f07 = 0x0; _0x3b3f07 < _0x1ff519.length; _0x3b3f07++) {
      _0x3ed75c = _0x3ed75c[_0x1ff519[_0x3b3f07]];
    }
    if (!_0x3ed75c) {
      throw new Error("Invalid object path. Could not find object.");
    }
    return _0x3ed75c;
  }
  function _0x43d207() {
    _0x51e1cc.forEach(_0x1bf655 => {
      const _0x38e2c8 = _0x1bf655.sinkName;
      const _0x4c3024 = _0x1bf655.lookForCanary;
      const _0x18ca5b = _0x1bf655.objectToInstrument.split('.');
      if (_0x18ca5b.length === 0x1) {
        _0x133af8(_0x18ca5b, _0x38e2c8, _0x4c3024);
      } else {
        _0x133af8(_0xcf9d41(_0x18ca5b), _0x38e2c8, _0x4c3024);
      }
    });
  }
  function _0x2a66e6(_0x134504) {
    if (!_0x134504) {
      _0x134504 = window;
    }
    if (_0x51e1cc && _0x51e1cc.length) {
      _0x43d207();
    }
    if (_0x1d726c('history.pushState')) {
      _0x134504.history.pushState = function (_0x234325) {
        return function () {
          if (_0x4f582f(arguments[0x2])) {
            _0x41b4bb({
              'sink': 'history.pushState',
              'value': arguments[0x2],
              'stackTrace': _0x7baff0()
            });
          }
          return _0x234325.apply(_0x134504.history, arguments);
        };
      }(_0x134504.history.pushState);
    }
    if (_0x1d726c('history.replaceState')) {
      _0x134504.history.replaceState = function (_0x3dddce) {
        return function () {
          if (_0x4f582f(arguments[0x2])) {
            _0x41b4bb({
              'sink': 'history.replaceState',
              'value': arguments[0x2],
              'stackTrace': _0x7baff0()
            });
          }
          return _0x3dddce.apply(_0x134504.history, arguments);
        };
      }(_0x134504.history.replaceState);
    }
    _0x134504.history.back = function (_0x567a44) {
      return function () {
        if (_0x2b16fa()) {
          return _0x567a44.apply(_0x134504.history, arguments);
        }
      };
    }(_0x134504.history.back);
    _0x134504.history.forward = function (_0x4fc7d4) {
      return function () {
        if (_0x2b16fa()) {
          return _0x4fc7d4.apply(_0x134504.history, arguments);
        }
      };
    }(_0x134504.history.forward);
    _0x134504.history.go = function (_0x2d273a) {
      return function () {
        if (_0x2b16fa()) {
          return _0x2d273a.apply(_0x134504.history, arguments);
        }
      };
    }(_0x134504.history.go);
    if (_0x134504.navigation && _0x134504.navigation.navigate) {
      let _0x4529a5 = _0x134504.navigation.navigate;
      _0x134504.navigation.navigate = function (_0x2ba21e) {
        if (_0x1d726c("navigation.navigate") && _0x4f582f(_0x2ba21e)) {
          _0x41b4bb({
            'sink': "navigation.navigate",
            'value': _0x2ba21e,
            'stackTrace': _0x7baff0()
          });
        }
        if (_0x2b16fa()) {
          return _0x4529a5.apply(_0x134504.navigation, arguments);
        }
      };
      _0x134504.navigation.back = function (_0x5487f4) {
        return function () {
          if (_0x2b16fa()) {
            return _0x5487f4.apply(_0x134504.navigation, arguments);
          }
        };
      }(_0x134504.navigation.back);
      _0x134504.navigation.forward = function (_0x2e0194) {
        return function () {
          if (_0x2b16fa()) {
            return _0x2e0194.apply(_0x134504.navigation, arguments);
          }
        };
      }(_0x134504.navigation.forward);
      _0x134504.navigation.reload = function (_0x285706) {
        return function () {
          if (_0x2b16fa()) {
            return _0x285706.apply(_0x134504.navigation, arguments);
          }
        };
      }(_0x134504.navigation.reload);
    }
    !function (_0x25b935, _0x2d1f1e) {
      Object.defineProperty(_0x134504.document, "cookie", {
        '__proto__': null,
        'configurable': true,
        'set': function (_0x1c0bd9) {
          if (_0x1d726c("document.cookie") && _0x4f582f(_0x1c0bd9)) {
            _0x41b4bb({
              'sink': "document.cookie",
              'value': _0x1c0bd9,
              'stackTrace': _0x7baff0()
            });
          }
          _0x2d1f1e.call(_0x134504.document, _0x1c0bd9);
        },
        'get': function () {
          let _0x3cbbab = _0x50e72d.canary;
          let _0x73061f = _0x25b935.call(_0x134504.document) + '';
          if (!_0x2b3484("document.cookie")) {
            return _0x73061f;
          }
          _0x73061f = _0x73061f.split(';').map(_0xd767b3 => {
            _0xd767b3 = _0xd767b3.trim();
            let [_0xb12849, _0x2950fb] = _0xd767b3.split('=').map(_0x4c581d => decodeURIComponent(_0x4c581d));
            if (_0x4f582f(_0x2950fb)) {
              _0x41b4bb({
                'source': "document.cookie",
                'value': _0xb12849 + '=' + _0x2950fb,
                'stackTrace': _0x7baff0()
              });
            }
            if (_0x31e79f("document.cookie") && !_0x377e88(_0x2950fb, _0x3cbbab)) {
              _0x2950fb = _0x2950fb + _0x3cbbab + "document.cookie";
            }
            return _0xb12849 + '=' + _0x2950fb;
          }).join(';');
          return _0x73061f;
        }
      });
    }(_0x134504.document.__lookupGetter__("cookie"), _0x134504.document.__lookupSetter__("cookie"));
    function _0x2b16fa(_0x6d463c) {
      let _0x5e22b3 = _0x50e72d.preventRedirection;
      let _0xefb550 = _0x50e72d.redirectBreakpoint;
      if (_0xefb550) {
        debugger;
      }
      return !_0x5e22b3 || String(_0x6d463c).startsWith("javascript:");
    }
    function _0xe23be(_0x35044e, _0x526d05) {
      const _0x58863b = _0x50e72d.canary;
      const _0x21eb13 = _0x50e72d.paramsToInject;
      const _0x45f593 = _0x50e72d.injectIntoSources;
      let _0x504425 = false;
      for (let _0x3c47b0 of _0x35044e) {
        let [_0x183652, _0x173713] = _0x3c47b0;
        if (!_0x377e88(_0x173713, _0x58863b)) {
          if (_0x45f593 && _0x21eb13.length && !_0x21eb13.includes(_0x183652)) {
            continue;
          }
          _0x504425 = true;
          _0x173713 += _0x526d05;
          _0x35044e.set(_0x183652, _0x173713);
        }
      }
      if (!_0x504425) {
        if (_0x45f593) {
          if (!_0x377e88(_0x35044e, _0x58863b)) {
            if (!_0x21eb13.length) {
              _0x35044e += _0x526d05;
            }
          }
        }
      }
      return _0x35044e;
    }
    function _0x44ceb1(_0x5021d8, _0x51dbd8) {
      if (_0x5021d8.startsWith('#')) {
        _0x5021d8 = _0x5021d8.slice(0x1);
      }
      const _0x3de2d8 = _0x50e72d.canary;
      const _0x574868 = _0x50e72d.paramsToInject;
      const _0x150fc1 = _0x50e72d.injectIntoSources;
      let _0x328e09 = new URLSearchParams(_0x5021d8.slice(0x1));
      let _0x1f1b92 = false;
      for (let _0x5a87e2 of _0x328e09) {
        let [_0x40f930, _0xd83487] = _0x5a87e2;
        if (!_0x377e88(_0xd83487, _0x3de2d8)) {
          if (_0x150fc1 && _0x574868.length && !_0x574868.includes(_0x40f930)) {
            continue;
          }
          _0x1f1b92 = true;
          _0xd83487 += _0x51dbd8;
          _0x328e09.set(_0x40f930, _0xd83487);
        }
      }
      if (!_0x1f1b92) {
        if (_0x150fc1) {
          if (!_0x377e88(_0x328e09, _0x3de2d8) && !_0x377e88(_0x5021d8, _0x3de2d8)) {
            if (!_0x574868.length) {
              _0x328e09 += _0x51dbd8;
            }
          }
        }
      }
      return _0x328e09;
    }
    function _0x390a0c(_0xa0eb34, _0x262957) {
      _0xa0eb34.search = _0xe23be(_0xa0eb34.searchParams, _0x262957);
      _0xa0eb34.hash = _0x44ceb1(_0xa0eb34.hash, _0x262957);
      return _0xa0eb34.toString();
    }
    function _0x4abf64(_0x7a94a7, _0x254c5e, _0x3c8d33, _0x3da935) {
      if (_0x1d726c("location." + _0x254c5e) && _0x4f582f(_0x7a94a7)) {
        _0x41b4bb({
          'sink': "location." + _0x254c5e,
          'value': _0x7a94a7,
          'stackTrace': _0x7baff0()
        });
      }
      if (_0x2b16fa(_0x7a94a7)) {
        _0x3c8d33[_0x254c5e].set.call(_0x3da935, _0x7a94a7);
      }
    }
    function _0x567ea0(_0x32d113, _0x7d1af) {
      let _0x1664cd;
      let _0x4537c1 = _0x50e72d.canary;
      let _0x1328a0 = "location." + _0x32d113;
      let _0x137731 = _0x4537c1 + _0x1328a0;
      if (_0x31e79f(_0x1328a0)) {
        if (_0x32d113 === 'hash') {
          _0x1664cd = _0x44ceb1(_0x7d1af[_0x32d113], _0x137731).toString();
        } else {
          if (_0x32d113 === 'search') {
            _0x1664cd = _0xe23be(new URLSearchParams(_0x7d1af[_0x32d113]), _0x137731).toString();
          } else {
            _0x1664cd = _0x7d1af[_0x32d113];
          }
        }
        if (_0x32d113 === 'hash' && !_0x1664cd.startsWith('#')) {
          _0x1664cd = '#' + _0x1664cd;
        } else if (_0x32d113 === 'search' && !_0x1664cd.startsWith('?')) {
          _0x1664cd = '?' + _0x1664cd;
        } else {
          _0x1664cd += _0x137731;
        }
      } else {
        _0x1664cd = _0x7d1af[_0x32d113];
      }
      if (_0x2b3484(_0x1328a0) && _0x4f582f(_0x1664cd)) {
        _0x41b4bb({
          'source': _0x1328a0,
          'value': _0x1664cd,
          'stackTrace': _0x7baff0()
        });
      }
      return _0x1664cd;
    }
    function _0x4649e3(_0xa71827, _0x2090bc, _0x3af5b4, _0x3c6001) {
      if (_0x1d726c("location." + _0x2090bc) && _0x3c6001.checkToken && _0x4f582f(_0xa71827)) {
        _0x41b4bb({
          'sink': "location." + _0x2090bc,
          'value': _0xa71827,
          'stackTrace': _0x7baff0()
        });
      }
      if (_0x2b16fa(_0xa71827)) {
        _0x3af5b4[_0x2090bc](_0xa71827);
      }
    }
    function _0x223326(_0x34f3e7, _0x5926b7) {
      if (_0x1d726c("location") && _0x4f582f(_0x34f3e7)) {
        _0x41b4bb({
          'sink': "location",
          'value': _0x34f3e7,
          'stackTrace': _0x7baff0()
        });
      }
      if (_0x2b16fa(_0x34f3e7)) {
        _0x5926b7.set.call(_0x134504, _0x34f3e7);
      }
    }
    function _0x5a0690(_0x578573) {
      let _0xd42159 = _0x50e72d.canary;
      let _0x3564e9 = _0xd42159 + "location";
      if (_0x31e79f("location")) {
        _0x578573 = _0x390a0c(new URL(_0x578573), _0x3564e9);
      }
      if (_0x2b3484("location") && _0x4f582f(_0x578573)) {
        _0x41b4bb({
          'source': "location",
          'value': _0x578573,
          'stackTrace': _0x7baff0()
        });
      }
      return _0x578573;
    }
    function _0x1c370d(_0x19f2f9, _0x2ecaf0, _0x4ca6b7) {
      if (_0x19f2f9 && typeof _0x19f2f9 === "object") {
        if (_0x19f2f9[_0xe3e6dc]) {
          _0x19f2f9 = _0x19f2f9 + '';
        }
      }
      if (_0x4f582f(_0x19f2f9)) {
        _0x41b4bb({
          'sink': _0x2ecaf0,
          'value': _0x19f2f9,
          'outerHTML': _0x4ca6b7 ? _0x4ca6b7.outerHTML?.['substr'](0x0, 0x64) : '',
          'tagName': _0x4ca6b7 && _0x4ca6b7.tagName ? _0x4ca6b7.tagName.toLowerCase() : '',
          'stackTrace': _0x7baff0()
        });
      }
      return _0x19f2f9;
    }
    if (_0x494950) {
      _0x604210();
      _0x2c72ff();
      if (!_0x43fe36 && !_0x21ada6() && !_0x2effea && !_0x176fb0) {
        _0x17c2b0();
      } else {
        if (_0x2effea && window === top && !_0x43fe36 && !_0x176fb0 && !_0x25b55c) {
          _0x553b3e();
        } else {
          if (_0x2effea && _0x21ada6() && !_0x176fb0) {
            let _0x4e82f7 = window.frameElement.dataset.technique;
            _0x17c2b0([_0x4e82f7]);
          }
        }
      }
    }
    _0xe8337c(_0x134504, {
      'proxiedGetterCallback': _0x567ea0,
      'proxiedSetterCallback': _0x4abf64,
      'proxiedLocationFunctionCallback': _0x4649e3,
      'locationSetterCallback': _0x223326,
      'locationToStringCallback': _0x5a0690
    }, _0x50e72d.disabledSinks);
    _0x25d0fa(_0x134504);
    _0x16f7db(_0x134504, _0x1c370d, [{
      'property': "src",
      'obj': _0x134504.HTMLIFrameElement.prototype,
      'sink': 'iframe.src'
    }, {
      'property': "href",
      'obj': _0x134504.HTMLAnchorElement.prototype,
      'sink': "anchor.href"
    }], _0x50e72d.disabledSinks);
    _0x14e2aa(_0x134504, _0x1c370d);
  }
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", _0x3f6f41, false);
  } else {
    _0x3f6f41();
  }
  function _0x3f6f41() {
    _0x3eeed0();
    _0x1af03a = true;
    if (_0x196c75) {
      _0x290db8();
    }
  }
  window.addEventListener('load', function () {
    setTimeout(_0x59988f, 0x1f4);
  });
  _0x2a66e6(window);
  return {
    'addHook'(_0x26af48, _0x289dc9) {
      if (!_0x1a3873[_0x26af48]) {
        _0x1a3873[_0x26af48] = [];
      }
      _0x1a3873[_0x26af48].push(_0x289dc9);
    },
    'removeHook'(_0x5cb81, _0x1500e2) {
      if (!_0x1a3873[_0x5cb81]) {
        return false;
      }
      for (let _0x2d0e34 = 0x0; _0x2d0e34 < _0x1a3873[_0x5cb81].length; _0x2d0e34++) {
        let _0x34007b = _0x1a3873[_0x5cb81][_0x2d0e34];
        if (_0x34007b === _0x1500e2) {
          _0x1a3873[_0x5cb81].splice(_0x2d0e34, 0x1);
          return true;
        }
      }
    },
    'getSearch'() {
      return _0x2fa45f.get.call(location);
    },
    'setSearch'(_0x2d9757) {
      _0x2fa45f.set.call(location, _0x2d9757);
    },
    'getLocation'() {
      return location.toString();
    },
    'getFollowUpCharacters'() {
      return "\\<>'\":";
    },
    'injectPrototypePollutionJson': _0xfb9ad5,
    'isComplete': false
  };
}();