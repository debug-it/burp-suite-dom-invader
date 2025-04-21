window.BurpDOMInvader = function () {
    const domInvaderSettings = window.localStorage.getItem("DOMInvaderSettings");
    if (typeof domInvaderSettings !== 'string') {
      if (top === window) {
        logMessage("DOM Invader is NOT enabled.", 'red');
      }
      return;
    }
    let parsedSettings = JSON.parse(domInvaderSettings);
    parsedSettings.__proto__ = null;
    if (top === window && !parsedSettings.enabled) {
      logMessage("DOM Invader is NOT enabled.", 'red');
      return;
    }
    if (top === window) {
      logMessage("DOM Invader is enabled.", '#2980B9');
    }
    let customSinkConfig;
    try {
      customSinkConfig = JSON.parse(parsedSettings.customSinks);
    } catch (error) {
      customSinkConfig = [];
    }
    let isGadgetScan = false;
    let gadgetScanIndex = -1;
    let isExploit = false;
    let proxyIdentifierSymbol = Symbol("Proxy identifier");
    let detectedIssues = [];
    let currentUrl = location.href;
    let initialUrl = currentUrl;
    let originalSearchDescriptor = Object.getOwnPropertyDescriptor(location, "search");
    let originalHistory = window.history;
    let originalPushState = window.history.pushState;
    let eventsToFire = false;
    let sourceFilterCache = {
      '__proto__': null
    };
    let sinkFilterCache = {
      '__proto__': null
    };
    let jsonStringify = JSON.stringify;
    let jsonParse = JSON.parse;
    let stackFilterEnabled = parsedSettings.filterStack;
    let shouldFireEvents = parsedSettings.fireEvents;
    let shouldInjectIntoSources = parsedSettings.injectIntoSources;
    let prototypePollutionSeparateFrame = parsedSettings.prototypePollutionSeparateFrame;
    let eventQueue = [];
    let eventListenersToFire = Object.create(null);
    let sourceListeners = Object.create(null);
    let prototypePollutionEnabled = parsedSettings.prototypePollution;
    let discoverPrototypePollutionProperties = parsedSettings.prototypePollutionDiscoverProperties;
    let prototypePollutionQueryString = parsedSettings.prototypePollutionQueryString;
    let prototypePollutionHash = parsedSettings.prototypePollutionHash;
    let discoveredProperties = new Set();
    if (window.name.includes("DOM_INVADER_GADGET_SCAN")) {
      isGadgetScan = true;
      let nameParts = window.name.split('=');
      if (/^\d+$/.test(nameParts[1])) {
        gadgetScanIndex = +nameParts[1];
      }
      window.name = '';
    } else if (window.name.includes("DOM_INVADER_EXPLOIT")) {
      isExploit = true;
      window.name = '';
    }
    let canUseLocalStorage = function () {
      let canStore = false;
      try {
        localStorage.setItem("BURPDOMINVADER", '1');
        if (localStorage.getItem("BURPDOMINVADER")) {
          canStore = true;
        }
        localStorage.removeItem('BURPDOMINVADER');
        return canStore;
      } catch (error) {
        return false;
      }
    }();
    function logMessage(message, color) {
      console.log('%c' + message, "color:" + color + ";font-family:system-ui;font-weight:bold;font-size:1.1rem;");
    }
    function processIssue(issueDetails) {
      issueDetails.__proto__ = null;
      if (prototypePollutionQueryString) {
        issueDetails.stackTrace = replaceUrlsInStack(issueDetails.stackTrace, initialUrl, currentUrl);
      }
      if (issueDetails.sink && ignoredSinks.includes(issueDetails.sink)) {
        return;
      }
      let sourceSignature = issueDetails.source && stackFilterEnabled && generateHash(issueDetails.source + '' + issueDetails.stackTrace);
      let sinkSignature = issueDetails.sink && stackFilterEnabled && generateHash(issueDetails.sink + '' + issueDetails.value + issueDetails.stackTrace);
      let canaryToken = parsedSettings.canary;
      try {
        let prototypePollutionRegex = new RegExp(escapeRegExp(canaryToken) + "\\d*prototypepollution");
        if (issueDetails.sink && isNestedFrame() && prototypePollutionRegex.test(issueDetails.value)) {
          if (typeof window.frameElement.dataset.sinks === "undefined") {
            window.frameElement.dataset.sinks = '[]';
          }
          let frameSinks = JSON.parse(window.frameElement.dataset.sinks);
          frameSinks.push(issueDetails.sink);
          window.frameElement.dataset.sinks = JSON.stringify(frameSinks);
        }
      } catch (error) {}
      try {
        let prototypePollutionSourceRegex = new RegExp("^Prototype pollution: ");
        if (issueDetails.source && isNestedFrame() && prototypePollutionSourceRegex.test(issueDetails.source)) {
          if (typeof window.frameElement.dataset.sources === 'undefined') {
            window.frameElement.dataset.sources = '[]';
          }
          let frameSources = JSON.parse(window.frameElement.dataset.sources);
          frameSources.push(issueDetails.source);
          window.frameElement.dataset.sources = JSON.stringify(frameSources);
        }
      } catch (error) {}
      issueDetails.event = window.event ? window.event.type : '';
      issueDetails.framePath = getFramePath(window);
      issueDetails.url = currentUrl;
      if (issueDetails.sink) {
        if (typeof issueDetails.outerHTML !== "string") {
          issueDetails.outerHTML = '';
        }
        if (typeof issueDetails.tagName !== 'string') {
          issueDetails.tagName = '';
        }
      }
      if (Array.isArray(sourceListeners[issueDetails.sink])) {
        for (let listener of sourceListeners[issueDetails.sink]) {
          listener(issueDetails);
        }
      }
      if (Array.isArray(sourceListeners[issueDetails.source])) {
        for (let listener of sourceListeners[issueDetails.source]) {
          listener(issueDetails);
        }
      }
      if (issueDetails.sink && Array.isArray(sourceListeners.allSinks)) {
        for (let listener of sourceListeners.allSinks) {
          listener(issueDetails);
        }
      }
      if (issueDetails.source && Array.isArray(sourceListeners.allSources)) {
        for (let listener of sourceListeners.allSources) {
          listener(issueDetails);
        }
      }
      if (stackFilterEnabled && issueDetails.source && sourceFilterCache[sourceSignature]) {
        return;
      }
      if (stackFilterEnabled && issueDetails.sink && sinkFilterCache[sinkSignature]) {
        return;
      }
      let sinkCallbackResult = false;
      try {
        if (parsedSettings.sinkCallback) {
          sinkCallbackResult = Function('return ' + parsedSettings.sinkCallback)();
        }
      } catch (e) {
        console.error('Error in sink callback', e);
      }
      if (issueDetails.sink) {
        try {
          if (!sinkCallbackResult || sinkCallbackResult({
              '__proto__': null,
              ...issueDetails,
              ...{
                '__proto__': null,
                'canary': canaryToken,
                'isInteresting': isInterestingSink(issueDetails.sink, canaryToken, issueDetails.value)
              }
            }, interestingSinks, ignoredSinks)) {
            detectedIssues.push(issueDetails);
          }
        } catch (error) {
          console.error("Error in sink callback", error);
          detectedIssues.push(issueDetails);
        }
      }
      let sourceCallbackResult = false;
      try {
        if (parsedSettings.sourceCallback) {
          sourceCallbackResult = Function('return ' + parsedSettings.sourceCallback)();
        }
      } catch (e) {
        console.error('Error in source callback');
      }
      if (issueDetails.source) {
        try {
          if (!sourceCallbackResult || sourceCallbackResult({
              '__proto__': null,
              ...issueDetails,
              ...{
                '__proto__': null,
                'canary': canaryToken,
                'isInteresting': issueDetails.source.includes("Prototype pollution:")
              }
            }, sourceCallbackResult)) {
            detectedIssues.push(issueDetails);
          }
        } catch (error) {
          console.error("Error in source callback", error);
          detectedIssues.push(issueDetails);
        }
      }
      if (eventsToFire || window != top) {
        dispatchAugmentedDomEvent();
      }
      if (stackFilterEnabled && issueDetails.sink) {
        sinkFilterCache[sinkSignature] = 1;
      }
      if (stackFilterEnabled && issueDetails.source) {
        sourceFilterCache[sourceSignature] = 1;
      }
    }
    function dispatchAugmentedDomEvent() {
      detectedIssues.toJSON = undefined;
      if (!detectedIssues.length) {
        return;
      }
      detectedIssues.canary = parsedSettings.canary;
      let augmentedDOMEvent = new CustomEvent("DOMInvaderAugmentedDOM", {
        'detail': JSON.stringify(detectedIssues)
      });
      document.dispatchEvent(augmentedDOMEvent);
      detectedIssues = [];
    }
    function generateHash(inputString) {
      let hash = 0x0;
      for (let i = 0x0; i < inputString.length; ++i) {
        hash = Math.imul(0x1f, hash) + inputString.charCodeAt(i) | 0x0;
      }
      return hash;
    }
    function containsCanary(value) {
      const canaryToken = parsedSettings.canary;
      value = '' + value;
      return value.includes(canaryToken);
    }
    function checkFirstArgumentForCanary(args, sinkType, shouldCheck) {
      if (!shouldCheck || typeof args[0x0] === 'string') {
        if (containsCanary(args[0x0])) {
          processIssue({
            'sink': sinkType,
            'value': args[0x0],
            'stackTrace': getStackTrace()
          });
        }
      }
    }
    function checkSecondArgumentForCanary(args, sinkType) {
      if (containsCanary(args[0x1])) {
        processIssue({
          'sink': sinkType + args[0x0],
          'value': args[0x1],
          'stackTrace': getStackTrace()
        });
      }
    }
    const prototypePollutionVectors = [{
      '__proto__': null,
      'source': 'constructor[prototype][property]=value',
      'createParam'(property, value) {
        if (typeof property === 'string') {
          property = [property];
        }
        return this.createParamName(property) + '=' + value;
      },
      'createParamName'(propertyArray) {
        if (typeof propertyArray === "string") {
          propertyArray = [propertyArray];
        }
        return "constructor[prototype][" + propertyArray.join('][') + ']';
      },
      'hashIdentifier': "a3aa3232",
      'searchIdentifier': "a42e5579"
    }, {
      '__proto__': null,
      'source': "constructor.prototype.property=value",
      'createParam'(property, value) {
        if (typeof property === 'string') {
          property = [property];
        }
        return this.createParamName(property) + '=' + value;
      },
      'createParamName'(propertyArray) {
        if (typeof propertyArray === 'string') {
          propertyArray = [propertyArray];
        }
        return 'constructor.prototype.' + propertyArray.join('.');
      },
      'hashIdentifier': "bf1e103d",
      'searchIdentifier': 'b1a3fd5b'
    }, {
      '__proto__': null,
      'source': "__proto__.property=value",
      'createParam'(property, value) {
        if (typeof property === 'string') {
          property = [property];
        }
        return this.createParamName(property) + '=' + value;
      },
      'createParamName'(propertyArray) {
        if (typeof propertyArray === 'string') {
          propertyArray = [propertyArray];
        }
        return "__proto__." + propertyArray.join('.');
      },
      'hashIdentifier': "c5e2cbce",
      'searchIdentifier': 'ccd80966'
    }, {
      '__proto__': null,
      'source': "__proto__[property]=value",
      'createParam'(property, value) {
        if (typeof property === 'string') {
          property = [property];
        }
        return this.createParamName(property) + '=' + value;
      },
      'createParamName'(propertyArray) {
        if (typeof propertyArray === "string") {
          propertyArray = [propertyArray];
        }
        return "__proto__[" + propertyArray.join('][') + ']';
      },
      'hashIdentifier': "d0992d86",
      'searchIdentifier': "dcb52823"
    }, {
      '__proto__': null,
      'source': 'constrconstructoructor[prototype][property]=value',
      'createParam'(property, value) {
        if (typeof property === 'string') {
          property = [property];
        }
        return this.createParamName(property) + '=' + value;
      },
      'createParamName'(propertyArray) {
        if (typeof propertyArray === 'string') {
          propertyArray = [propertyArray];
        }
        return 'constrconstructoructor[prototype][' + propertyArray.join('][') + ']';
      },
      'hashIdentifier': "af3a3098",
      'searchIdentifier': "a55a1ee1"
    }, {
      '__proto__': null,
      'source': "constrconstructoructor.prototype.property=value",
      'createParam'(property, value) {
        if (typeof property === 'string') {
          property = [property];
        }
        return this.createParamName(property) + '=' + value;
      },
      'createParamName'(propertyArray) {
        if (typeof propertyArray === 'string') {
          propertyArray = [propertyArray];
        }
        return "constrconstructoructor.prototype." + propertyArray.join('.');
      },
      'hashIdentifier': "bac11f2e",
      'searchIdentifier': 'b2f55e1f'
    }, {
      '__proto__': null,
      'source': "__pro__proto__to__.property=value",
      'createParam'(property, value) {
        if (typeof property === 'string') {
          property = [property];
        }
        return this.createParamName(property) + '=' + value;
      },
      'createParamName'(propertyArray) {
        if (typeof propertyArray === 'string') {
          propertyArray = [propertyArray];
        }
        return "__pro__proto__to__." + propertyArray.join('.');
      },
      'hashIdentifier': 'e1a3af2f',
      'searchIdentifier': "eab10255"
    }, {
      '__proto__': null,
      'source': "__pro__proto__to__[property]=value",
      'createParam'(property, value) {
        if (typeof property === 'string') {
          property = [property];
        }
        return this.createParamName(property) + '=' + value;
      },
      'createParamName'(propertyArray) {
        if (typeof propertyArray === 'string') {
          propertyArray = [propertyArray];
        }
        return "__pro__proto__to__[" + propertyArray.join('][') + ']';
      },
      'hashIdentifier': "f122de92",
      'searchIdentifier': "f33fdea1"
    }];
    Error.stackTraceLimit = 0x14;
    function resetForms() {
      var i;
      var formCount = document.forms.length;
      for (i = 0x0; i < formCount; i++) {
        document.forms[i].reset();
      }
    }
    function isInterestingSink(sink, canary, value) {
      if (typeof canary !== "undefined") {
        if (interestingSinks.includes(sink)) {
          if (urlBasedSinks.includes(sink)) {
            let urlRegex = new RegExp("^(?:(?:https?|data|javascript):)?([/\\\\]{2,})?" + escapeRegExp(canary));
            if (urlRegex.test(value)) {
              return true;
            } else {
              return false;
            }
          }
          return true;
        }
      } else {
        return interestingSinks.includes(sink);
      }
      return false;
    }
    function getFrameIndex(frameWindow) {
      try {
        let parentWindow = frameWindow.parent;
        let frameCount = 0x32;
        try {
          frameCount = parentWindow.length;
        } catch (error) {
          frameCount = 0x32;
        }
        for (let i = 0x0; i < frameCount; i++) {
          if (parentWindow[i] === frameWindow) {
            return i;
          }
        }
      } catch (error) {}
      return -0x1;
    }
    function getFramePath(currentWindow) {
      let path = ["top"];
      let depth = 0x0;
      while (currentWindow !== top) {
        try {
          let frameElement = currentWindow.frameElement;
          if (frameElement && frameElement.dataset && frameElement.dataset.dominvaderframe) {
            break;
          }
        } catch (error) {}
        try {
          let index = getFrameIndex(currentWindow);
          currentWindow = currentWindow.parent;
          path.push(index !== -0x1 ? "frame[" + index + ']' : 'frame');
        } catch (error) {}
        if (depth > 0x14) {
          break;
        }
        depth++;
      }
      return path.length > 0x1 ? path.join('->') : path.join('');
    }
    function simulateMouseEvent(element, eventType) {
      let event;
      eventPreventer.DO_NOT_CHECK = true;
      element.addEventListener(eventType, eventPreventer, true);
      event = document.createEvent("MouseEvent");
      event.initMouseEvent(eventType, true, true, window, 0x0, 0x0, 0x0, 0x0, 0x0, false, false, false, false, 0x0, null);
      element.dispatchEvent(event);
      element.removeEventListener(eventType, eventPreventer, true);
    }
    function simulateKeyboardEvent(element, eventType, keyCode) {
      let event = new Event(eventType);
      event.keyCode = event.which = keyCode;
      event.key = String.fromCharCode(keyCode);
      eventPreventer.DO_NOT_CHECK = true;
      element.addEventListener(eventType, eventPreventer, true);
      element.dispatchEvent(event);
      element.removeEventListener(eventType, eventPreventer, true);
    }
    function eventPreventer(event) {
      event.preventDefault();
      return false;
    }
    function fireQueuedEvents() {
      var i;
      var element;
      var eventListLength;
      var allElements = document.getElementsByTagName('*');
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      eventListLength = eventQueue.length;
      for (i = 0x0; i < eventListLength; i++) {
        element = eventQueue[i].element;
        if (element) {
          if (mouseEvents.includes(eventQueue[i].type)) {
            simulateMouseEvent(element, eventQueue[i].type);
          } else if (keyboardEvents.includes(eventQueue[i].type)) {
            simulateKeyboardEvent(element, eventQueue[i].type, 0xd);
          }
          element.firedEvent = true;
          resetForms();
        }
      }
      eventListLength = allElements.length;
      for (i = 0x0; i < eventListLength; i++) {
        element = allElements[i];
        if (!element) {
          continue;
        }
        if (element.firedEvent) {
          continue;
        }
        if (element.onmouseover) {
          simulateMouseEvent(element, "mouseover");
          element.firedEvent = true;
          resetForms();
        }
        if (element.onclick) {
          simulateMouseEvent(element, 'click');
          element.firedEvent = true;
          resetForms();
        }
        if (element.onmousedown) {
          simulateMouseEvent(element, "mousedown");
          element.firedEvent = true;
          resetForms();
        }
        if (element.onmouseup) {
          simulateMouseEvent(element, 'mouseup');
          element.firedEvent = true;
          resetForms();
        }
        if (element.onkeydown) {
          simulateKeyboardEvent(element, "keydown", 0xd);
          element.firedEvent = true;
          resetForms();
        }
        if (element.onkeypress) {
          simulateKeyboardEvent(element, 'keypress', 0xd);
          element.firedEvent = true;
          resetForms();
        }
        if (element.onkeyup) {
          simulateKeyboardEvent(element, 'keyup', 0xd);
          element.firedEvent = true;
          resetForms();
        }
      }
    }
    function replaceUrlsInStack(stackTrace, originalUrl, newUrl) {
      originalUrl = originalUrl.replace(/#.*/, '');
      newUrl = newUrl.replace(/#.*/, '');
      return String(stackTrace).replaceAll(originalUrl, newUrl);
    }
    function generateHashFromString(input) {
      input = input + '';
      let hashValue = 0x0;
      let inputLength = input.length;
      for (let i = 0x0; i < inputLength; ++i) {
        hashValue = Math.imul(0x1f, hashValue) + input.charCodeAt(i) | 0x0;
      }
      return hashValue;
    }
    function escapeRegExp(string) {
      return String(string).replace(/[\/\\^$*+?.()|[\]{}]/g, "\\$&").replace(/[\r\n\t]/g, function (match) {
        var replacements = {
          "\n": "\\n",
          "\r": "\\r",
          "\t": "\\t"
        };
        return replacements[match];
      });
    }
    function sanitizeObject(obj, sanitizerFunction, shouldSanitizeUrls) {
      if (Array.isArray(obj)) {
        for (let i = 0x0; i < obj.length; i++) {
          if (obj[i] && typeof obj[i] === 'object') {
            obj[i] = sanitizeObject(obj[i], sanitizerFunction, shouldSanitizeUrls);
          } else {
            if (shouldSanitizeUrls) {
              if (!(obj[i] === '' || /(?:mailto|ftp|https?):|[<>()\s]/.test(obj[i]))) {
                continue;
              }
            }
            obj[i] = sanitizerFunction(obj[i], i);
          }
        }
      } else {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === 'object') {
              obj[key] = sanitizeObject(obj[key], sanitizerFunction, shouldSanitizeUrls);
            } else {
              if (shouldSanitizeUrls) {
                if (!/(script|js|html|external|src|href|url|code|exec)/i.test(key) && !(obj[key] === '' || /(?:mailto|ftp|https?):|[<>()\s]/.test(obj[key]))) {
                  continue;
                }
              }
              obj[key] = sanitizerFunction(obj[key], key);
            }
          }
        }
      }
      return obj;
    }
    function getStackTrace(type) {
      var stack = {};
      if (!Error.captureStackTrace) {
        return new Error().stack.replace(/^Error\n/, '');
      }
      if (type === "source") {
        Error.captureStackTrace(stack, generateToken);
      } else {
        if (type === "eventListener") {
          Error.captureStackTrace(stack, getStackTrace);
        } else if (typeof checkSinks !== "undefined") {
          Error.captureStackTrace(stack, checkSinks);
        } else {
          Error.captureStackTrace(stack, getStackTrace);
        }
      }
      return stack.stack.replace(/^Error\n/, '');
    }
    function proxyLocation(targetWindow, callbacks, disabledSinksArray) {
      const originalLocation = targetWindow.location;
      const locationProperties = Object.getOwnPropertyDescriptors(targetWindow.location);
      const locationDescriptor = Object.getOwnPropertyDescriptor(targetWindow, "location");
      let locationProxy;
      const locationHandler = {
        'toString': function () {
          const stringRepresentation = originalLocation.toString();
          return callbacks.locationToStringCallback(stringRepresentation, originalLocation);
        },
        set 'href'(value) {
          callbacks.proxiedSetterCallback(value, "href", locationProperties, originalLocation);
        },
        set 'protocol'(value) {
          callbacks.proxiedSetterCallback(value, "protocol", locationProperties, originalLocation);
        },
        set 'host'(value) {
          callbacks.proxiedSetterCallback(value, "host", locationProperties, originalLocation);
        },
        set 'hostname'(value) {
          callbacks.proxiedSetterCallback(value, 'hostname', locationProperties, originalLocation);
        },
        set 'pathname'(value) {
          callbacks.proxiedSetterCallback(value, "pathname", locationProperties, originalLocation);
        },
        set 'hash'(value) {
          callbacks.proxiedSetterCallback(value, 'hash', locationProperties, originalLocation);
        },
        set 'search'(value) {
          callbacks.proxiedSetterCallback(value, "search", locationProperties, originalLocation);
        },
        'replace': function (url) {
          callbacks.proxiedLocationFunctionCallback(url, "replace", originalLocation, {
            'checkToken': true
          });
        },
        'assign': function (url) {
          callbacks.proxiedLocationFunctionCallback(url, "assign", originalLocation, {
            'checkToken': true
          });
        },
        'reload': function () {
          callbacks.proxiedLocationFunctionCallback(arguments[0x0], "reload", originalLocation, {
            'checkToken': false
          });
        },
        get 'search'() {
          return callbacks.proxiedGetterCallback("search", originalLocation);
        },
        get 'hash'() {
          return callbacks.proxiedGetterCallback('hash', originalLocation);
        },
        get 'href'() {
          return callbacks.proxiedGetterCallback("href", originalLocation);
        },
        get 'pathname'() {
          return callbacks.proxiedGetterCallback("pathname", originalLocation);
        },
        get 'constructor'() {
          return Location;
        },
        get 'origin'() {
          return originalLocation.origin;
        },
        get 'host'() {
          return originalLocation.host;
        },
        get 'hostname'() {
          return originalLocation.hostname;
        },
        get 'port'() {
          return originalLocation.port;
        },
        get 'protocol'() {
          return originalLocation.protocol;
        }
      };
      locationProxy = {
        '__proto__': null,
        'configurable': true,
        'set': function (value) {
          callbacks.locationSetterCallback(value, locationDescriptor);
        },
        'get': function () {
          return locationHandler;
        }
      };
      if (!disabledSinksArray || !disabledSinksArray.includes("location")) {
        Object.defineProperty(targetWindow.window, "location", locationProxy);
        Object.defineProperty(targetWindow.document, "location", locationProxy);
      }
    }
    function instrumentDom(targetWindow, canaryCheckCallback, sinkExclusions, sourceExclusions) {
      if (!targetWindow) {
        targetWindow = window;
      }
      targetWindow.EventTarget.prototype.addEventListener = function (originalAddEventListener) {
        return function () {
          if (arguments[0x1] && !arguments[0x1].DO_NOT_CHECK) {
            let listenerHash = generateHashFromString(arguments[0x1]);
            if ((arguments[0x0] === "click" || arguments[0x0] === "mouseover" || arguments[0x0] === "mousedown" || arguments[0x0] === 'mouseup' || arguments[0x0] === "keyup" || arguments[0x0] === "keydown" || arguments[0x0] === "keypress") && !eventListenersToFire[listenerHash]) {
              eventQueue.push({
                'element': this,
                'type': arguments[0x0].toLowerCase()
              });
              eventListenersToFire[listenerHash] = 0x1;
            }
          }
          return originalAddEventListener.apply(this, arguments);
        };
      }(targetWindow.EventTarget.prototype.addEventListener);
      if (!sourceExclusions || !sourceExclusions.includes("fetch.url")) {
        targetWindow.fetch = function (originalFetch) {
          return function () {
            arguments[0x0] = canaryCheckCallback(arguments[0x0], "fetch.url");
            if (arguments[0x1] && arguments[0x1].body) {
              if (!sourceExclusions || !sourceExclusions.includes('fetch.body')) {
                arguments[0x1].body = canaryCheckCallback(arguments[0x1].body, 'fetch.body');
              }
            }
            if (arguments[0x1] && arguments[0x1].headers) {
              let headerValues;
              if (arguments[0x1].headers instanceof Headers) {
                headerValues = arguments[0x1].headers.values();
              } else {
                headerValues = Object.values(arguments[0x1].headers);
              }
              for (let headerValue of headerValues) {
                if (!sourceExclusions || !sourceExclusions.includes("fetch.header")) {
                  canaryCheckCallback(headerValue, "fetch.header");
                }
              }
            }
            return originalFetch.apply(targetWindow, arguments);
          };
        }(targetWindow.fetch);
      }
      if (!sourceExclusions || !sourceExclusions.includes('document.title')) {
        !function (originalSetter, originalGetter) {
          targetWindow.Object.defineProperty(targetWindow.document, "title", {
            '__proto__': null,
            'configurable': true,
            'get': function () {
              return originalGetter.call(targetWindow.document);
            },
            'set': function (value) {
              canaryCheckCallback(value, "document.title");
              originalSetter.apply(targetWindow.document, arguments);
            }
          });
        }(targetWindow.document.__lookupSetter__("title"), targetWindow.document.__lookupGetter__('title'));
      }
      if (!sourceExclusions || !sourceExclusions.includes("document.domain")) {
        !function (originalSetter, originalGetter) {
          targetWindow.Object.defineProperty(targetWindow.document, "domain", {
            '__proto__': null,
            'configurable': true,
            'get': function () {
              return originalGetter.call(targetWindow.document);
            },
            'set': function (value) {
              canaryCheckCallback(value, "document.domain");
              originalSetter.apply(targetWindow.document, arguments);
            }
          });
        }(targetWindow.document.__lookupSetter__("domain"), targetWindow.document.__lookupGetter__("domain"));
      }
      if (canUseLocalStorage && targetWindow.localStorage) {
        targetWindow.localStorage.setItem = function (originalSetItem) {
          return function () {
            if (!sourceExclusions || !sourceExclusions.includes('localStorage.setItem.name')) {
              canaryCheckCallback(arguments[0x0], 'localStorage.setItem.name');
            }
            if (!sourceExclusions || !sourceExclusions.includes("localStorage.setItem.value")) {
              canaryCheckCallback(arguments[0x1], "localStorage.setItem.value");
            }
            return originalSetItem.apply(targetWindow.localStorage, arguments);
          };
        }(targetWindow.localStorage.setItem);
      }
      if (canUseLocalStorage && targetWindow.sessionStorage) {
        targetWindow.sessionStorage.setItem = function (originalSetItem) {
          return function () {
            if (!sourceExclusions || !sourceExclusions.includes("sessionStorage.setItem.name")) {
              canaryCheckCallback(arguments[0x0], "sessionStorage.setItem.name");
            }
            if (!sourceExclusions || !sourceExclusions.includes("sessionStorage.setItem.name")) {
              canaryCheckCallback(arguments[0x1], "sessionStorage.setItem.value");
            }
            return originalSetItem.apply(targetWindow.sessionStorage, arguments);
          };
        }(targetWindow.sessionStorage.setItem);
      }
      [{
        'functionName': "open",
        'argumentIndex': 0x1
      }, {
        'functionName': "send",
        'argumentIndex': 0x0
      }].forEach(({
        functionName,
        argumentIndex
      }) => {
        !function (originalFunction) {
          if (!sourceExclusions || !sourceExclusions.includes("xhr." + functionName)) {
            targetWindow.XMLHttpRequest.prototype[functionName] = function () {
              arguments[argumentIndex] = canaryCheckCallback(arguments[argumentIndex], 'xhr.' + functionName);
              return originalFunction.apply(this, arguments);
            };
          }
        }(targetWindow.XMLHttpRequest.prototype[functionName]);
      });
      !function (originalSetRequestHeader) {
        targetWindow.XMLHttpRequest.prototype.setRequestHeader = function () {
          if (!sourceExclusions || !sourceExclusions.includes("xhr.setRequestHeader.name")) {
            canaryCheckCallback(arguments[0x0], "xhr.setRequestHeader.name");
          }
          if (!sourceExclusions || !sourceExclusions.includes("xhr.setRequestHeader.value")) {
            canaryCheckCallback(arguments[0x1], "xhr.setRequestHeader.value");
          }
          return originalSetRequestHeader.apply(this, arguments);
        };
      }(targetWindow.XMLHttpRequest.prototype.setRequestHeader);
      if (!sourceExclusions || !sourceExclusions.includes("websocket")) {
        targetWindow.WebSocket = new Proxy(targetWindow.WebSocket, {
          '__proto__': null,
          'construct'(target, args) {
            var instance;
            canaryCheckCallback(args[0x0], "websocket");
            instance = new target(...args);
            return instance;
          }
        });
      }
      [{
        'functionName': "eval",
        'obj': targetWindow,
        'sink': "eval"
      }, {
        'functionName': "parse",
        'obj': targetWindow.JSON,
        'sink': 'JSON.parse'
      }, {
        'functionName': 'evaluate',
        'obj': targetWindow.document,
        'sink': "document.evaluate"
      }, {
        'functionName': 'open',
        'obj': targetWindow,
        'sink': "window.open"
      }].forEach(({
        functionName,
        obj,
        sink
      }) => {
        let originalFunction = obj[functionName];
        if (!sourceExclusions || !sourceExclusions.includes(sink)) {
          obj[functionName] = function () {
            arguments[0x0] = canaryCheckCallback(arguments[0x0], sink);
            return originalFunction.apply(obj, arguments);
          };
        }
      });
      ['write', "writeln"].forEach(methodName => {
        if (!sourceExclusions || !sourceExclusions.includes("document." + methodName)) {
          targetWindow.document[methodName] = function (originalMethod) {
            return function () {
              let readyState = targetWindow.document.readyState;
              let i;
              let argLength = arguments.length;
              let concatenatedArgs = '';
              for (i = 0x0; i < argLength; i++) {
                concatenatedArgs += '' + arguments[i];
              }
              concatenatedArgs = canaryCheckCallback(concatenatedArgs, "document." + methodName);
              originalMethod.call(targetWindow.document, concatenatedArgs);
              if (readyState === "interactive") {
                targetWindow.document.close();
              }
            };
          }(targetWindow.document[methodName]);
        }
      });
      if (!sourceExclusions || !sourceExclusions.includes("Function")) {
        targetWindow.Function.prototype.toString = new Proxy(Function.prototype.toString, {
          '__proto__': null,
          'apply'(target, thisArg, args) {
            if (thisArg === targetWindow.Function.prototype.toString) {
              return "function toString() { [native code] }";
            } else {
              if (thisArg === targetWindow.Function) {
                return "function Function() { [native code] }";
              }
            }
            return Reflect.apply(target, thisArg, args);
          }
        });
        targetWindow.Function = new Proxy(targetWindow.Function, {
          '__proto__': null,
          'construct'(target, args) {
            let lastArg = args.length > 0x1 ? args[args.length - 0x1] : args[0x0];
            canaryCheckCallback(lastArg, "Function");
            return new target(...args);
          },
          'apply'(target, thisArg, args) {
            let lastArg = args.length > 0x1 ? args[args.length - 0x1] : args[0x0];
            canaryCheckCallback(lastArg, "Function");
            return Reflect.apply(target, thisArg, args);
          }
        });
      }
      const propertySinks = [{
        'property': "srcdoc",
        'obj': targetWindow.HTMLIFrameElement.prototype,
        'sink': "iframe.srcdoc",
        'attr': true,
        'nodeName': 'iframe'
      }, {
        'property': "formAction",
        'obj': targetWindow.HTMLInputElement.prototype,
        'sink': "input.formaction",
        'attr': true,
        'nodeName': "input"
      }, {
        'property': 'formAction',
        'obj': targetWindow.HTMLButtonElement.prototype,
        'sink': "button.formaction",
        'attr': true,
        'nodeName': "button"
      }, {
        'property': "action",
        'obj': targetWindow.HTMLFormElement.prototype,
        'sink': 'form.action',
        'attr': true,
        'nodeName': "form"
      }, {
        'property': "outerHTML",
        'obj': targetWindow.Element.prototype,
        'sink': "element.outerHTML"
      }, {
        'property': "src",
        'obj': targetWindow.HTMLScriptElement.prototype,
        'sink': "script.src",
        'attr': true,
        'nodeName': "script"
      }, {
        'property': "text",
        'obj': targetWindow.HTMLScriptElement.prototype,
        'sink': "script.text"
      }];
      [...propertySinks, ...sinkExclusions].forEach(({
        property,
        obj,
        sink
      }) => {
        if (!sourceExclusions || !sourceExclusions.includes(sink)) {
          let originalDescriptor = Object.getOwnPropertyDescriptor(obj, property);
          if (originalDescriptor) {
            Object.defineProperty(obj, property, {
              '__proto__': null,
              'configurable': true,
              'get': function () {
                return originalDescriptor.get.call(this);
              },
              'set': function () {
                if (this.dataset && !this.dataset.dominvaderframe) {
                  canaryCheckCallback(arguments[0x0] + '', sink, this);
                }
                return originalDescriptor.set.call(this, arguments[0x0]);
              }
            });
          } else {
            console.log("Failed to set", sink);
          }
        }
      });
      let originalAttrValueDescriptor = Object.getOwnPropertyDescriptor(Attr.prototype, "value");
      Object.defineProperty(Attr.prototype, "value", {
        '__proto__': null,
        'get'() {
          return originalAttrValueDescriptor.get.apply(this);
        },
        'set'(_0x5acf24) {
          propertySinks.forEach(({
            property,
            obj,
            sink,
            attr,
            nodeName
          }) => {
            if (!sourceExclusions || !sourceExclusions.includes(sink)) {
              if (attr && this.ownerElement && nodeName === this.ownerElement.tagName.toLowerCase() && property === this.name) {
                canaryCheckCallback(_0x5acf24 + '', sink, this.ownerElement);
              }
            }
          });
          return originalAttrValueDescriptor.set.apply(this, arguments);
        }
      });
      let originalNodeValueDescriptor = Object.getOwnPropertyDescriptor(Node.prototype, "nodeValue");
      Object.defineProperty(Node.prototype, 'nodeValue', {
        '__proto__': null,
        'get'() {
          return originalNodeValueDescriptor.get.apply(this);
        },
        'set'(_0x4187db) {
          propertySinks.forEach(({
            property,
            obj,
            sink,
            attr,
            nodeName
          }) => {
            if (!sourceExclusions || !sourceExclusions.includes(sink)) {
              if (attr && this.ownerElement && nodeName === this.ownerElement.tagName.toLowerCase() && property === this.name) {
                canaryCheckCallback(_0x4187db + '', sink, this.ownerElement);
              }
            }
          });
          return originalNodeValueDescriptor.set.apply(this, arguments);
        }
      });
      !function (originalTextContentDescriptor) {
        if (originalTextContentDescriptor) {
          Object.defineProperty(targetWindow.Node.prototype, "textContent", {
            '__proto__': null,
            'configurable': true,
            'get': function () {
              return originalTextContentDescriptor.get.call(this);
            },
            'set': function (_0x4a6259) {
              if (typeof this.tagName === "string") {
                let tagNameLower = this.tagName.toLowerCase();
                if (tagNameLower === "script") {
                  if (!sourceExclusions || !sourceExclusions.includes("script.textContent")) {
                    canaryCheckCallback(arguments[0x0], "script.textContent");
                  }
                }
              } else {
                propertySinks.forEach(({
                  property,
                  obj,
                  sink,
                  attr,
                  nodeName
                }) => {
                  if (!sourceExclusions || !sourceExclusions.includes(sink)) {
                    if (attr && this.ownerElement && nodeName === this.ownerElement.tagName.toLowerCase() && property === this.name) {
                      canaryCheckCallback(_0x4a6259 + '', sink, this.ownerElement);
                    }
                  }
                });
              }
              return originalTextContentDescriptor.set.call(this, arguments[0x0]);
            }
          });
        }
      }(Object.getOwnPropertyDescriptor(targetWindow.Node.prototype, "textContent"));
      function checkAttributeSink(attributeName, attributeValue, element) {
        switch (attributeName) {
          case 'href':
          case "src":
          case 'data':
          case "action":
          case "formaction":
            canaryCheckCallback(attributeValue, 'element.setAttribute.' + attributeName, element);
            break;
        }
        if (/^on/i.test(attributeName)) {
          canaryCheckCallback(attributeValue, 'element.setAttribute.' + attributeName, element);
        }
      }
      if (targetWindow.HTMLElement.prototype.setAttribute) {
        targetWindow.HTMLElement.prototype.setAttribute = function (originalSetAttribute) {
          return function () {
            if (typeof arguments[0x1] === "string") {
              let shouldCheck = true;
              if (sourceExclusions) {
                if (sourceExclusions.includes("element.setAttribute." + arguments[0x0])) {
                  shouldCheck = false;
                }
                if (String(arguments[0x0]).toLowerCase().startsWith('on')) {
                  if (sourceExclusions.includes("element.setAttribute.on*")) {
                    shouldCheck = false;
                  }
                }
              }
              if (shouldCheck) {
                checkAttributeSink(arguments[0x0], arguments[0x1], this);
              }
            }
            return originalSetAttribute.apply(this, arguments);
          };
        }(targetWindow.HTMLElement.prototype.setAttribute);
      } else {
        console.log("Failed to set HTMLElement.prototype.setAttribute");
      }
      if (!sourceExclusions || !sourceExclusions.includes("element.insertAdjacentHTML")) {
        if (targetWindow.HTMLElement.prototype.insertAdjacentHTML) {
          targetWindow.HTMLElement.prototype.insertAdjacentHTML = function (originalInsertAdjacentHTML) {
            return function () {
              canaryCheckCallback(arguments[0x1], "element.insertAdjacentHTML");
              return originalInsertAdjacentHTML.apply(this, arguments);
            };
          }(targetWindow.HTMLElement.prototype.insertAdjacentHTML);
        } else {
          console.log("Failed to set Element.prototype.insertAdjacentHTML");
        }
      }
      !function (originalInnerHTMLDescriptor) {
        if (originalInnerHTMLDescriptor) {
          Object.defineProperty(targetWindow.Element.prototype, "innerHTML", {
            '__proto__': null,
            'configurable': true,
            'get': function () {
              return originalInnerHTMLDescriptor.get.call(this);
            },
            'set': function () {
              if (typeof this.tagName === 'string') {
                let tagNameLower = this.tagName.toLowerCase();
                let sinkType = tagNameLower === "script" ? 'script.innerHTML' : "element.innerHTML";
                if (!sourceExclusions || !sourceExclusions.includes(sinkType)) {
                  canaryCheckCallback(arguments[0x0] + '', sinkType, this);
                }
              }
              return originalInnerHTMLDescriptor.set.call(this, arguments[0x0]);
            }
          });
        } else {
          console.log("Failed to set Element.prototype.innerHTML");
        }
      }(Object.getOwnPropertyDescriptor(targetWindow.Element.prototype, "innerHTML"));
      !function (originalInnerTextDescriptor) {
        if (originalInnerTextDescriptor) {
          Object.defineProperty(targetWindow.HTMLElement.prototype, "innerText", {
            '__proto__': null,
            'configurable': true,
            'get': function () {
              return originalInnerTextDescriptor.get.call(this);
            },
            'set': function () {
              if (typeof this.tagName === 'string') {
                let tagNameLower = this.tagName.toLowerCase();
                let sinkType = tagNameLower === "script" ? "script.innerText" : "element.innerText";
                if (tagNameLower === "script") {
                  if (!sourceExclusions || !sourceExclusions.includes(sinkType)) {
                    canaryCheckCallback(arguments[0x0], "script.innerText");
                  }
                } else if (!sourceExclusions || !sourceExclusions.includes(sinkType)) {
                  canaryCheckCallback(arguments[0x0], "element.innerText", this);
                }
              }
              return originalInnerTextDescriptor.set.call(this, arguments[0x0]);
            }
          });
        } else {
          console.log("Failed to set HTMLElement.prototype.innerText");
        }
      }(Object.getOwnPropertyDescriptor(targetWindow.HTMLElement.prototype, 'innerText'));
      if (!sourceExclusions || !sourceExclusions.includes('script.appendChild')) {
        if (targetWindow.HTMLScriptElement.prototype.appendChild) {
          targetWindow.HTMLScriptElement.prototype.appendChild = function (originalAppendChild) {
            return function () {
              if (typeof arguments[0x0].data === 'string' && arguments[0x0].data.length) {
                canaryCheckCallback(arguments[0x0].data, 'script.appendChild');
              }
              return originalAppendChild.apply(this, arguments);
            };
          }(targetWindow.HTMLScriptElement.prototype.appendChild);
        }
      }
      if (!sourceExclusions || !sourceExclusions.includes("script.append")) {
        if (targetWindow.HTMLScriptElement.prototype.append) {
          targetWindow.HTMLScriptElement.prototype.append = function (originalAppend) {
            return function () {
              if (typeof arguments[0x0].data === "string" && arguments[0x0].data.length) {
                canaryCheckCallback(arguments[0x0].data, 'script.append');
              } else if (typeof arguments[0x0] === "string") {
                canaryCheckCallback(arguments[0x0], 'script.append');
              }
              return originalAppend.apply(this, arguments);
            };
          }(targetWindow.HTMLScriptElement.prototype.append);
        }
      }
      instrumentJquery(targetWindow, checkFirstArgumentForCanary, checkSecondArgumentForCanary, sourceExclusions);
    }
    function instrumentJquery(targetWindow, checkFirstArgCallback, checkSecondArgCallback, exclusions) {
      if (!targetWindow) {
        targetWindow = window;
      }
      !function () {
        var jqueryReference;
        if (!exclusions || !exclusions.includes("jQuery")) {
          Object.defineProperty(targetWindow, "jQuery", {
            '__proto__': null,
            'configurable': true,
            'set': function (jqueryObject) {
              if (typeof jqueryObject === "function") {
                jqueryReference = new Proxy(jqueryObject, {
                  '__proto__': null,
                  'apply': function (target, thisArg, args) {
                    checkFirstArgCallback(args, "jQuery", true, true);
                    return Reflect.apply(target, thisArg, args);
                  }
                });
                const jquerySinks = [{
                  'object': jqueryObject,
                  'functionName': "parseJSON",
                  'sink': "JSON.parse",
                  'checkFirstArgIsString': false,
                  'replaceTokenForjQuery': false
                }, {
                  'object': jqueryObject,
                  'functionName': 'parseXML',
                  'sink': "jQuery.parseXML",
                  'checkFirstArgIsString': false,
                  'replaceTokenForjQuery': false
                }, {
                  'object': jqueryObject,
                  'functionName': 'parseHTML',
                  'sink': "jQuery.parseHTML",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject,
                  'functionName': "globalEval",
                  'sink': 'jQuery.globalEval',
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': 'constructor',
                  'sink': 'jQuery.constructor',
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': 'has',
                  'sink': "jQuery.has",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': "init",
                  'sink': "jQuery.init",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': "index",
                  'sink': "jQuery.index",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': 'add',
                  'sink': "jQuery.add",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': "append",
                  'sink': "jQuery.append",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': 'appendTo',
                  'sink': 'jQuery.appendTo',
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': "after",
                  'sink': "jQuery.after",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': "insertAfter",
                  'sink': "jQuery.insertAfter",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': "before",
                  'sink': "jQuery.before",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': 'insertBefore',
                  'sink': 'jQuery.insertBefore',
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': 'html',
                  'sink': "jQuery.html",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': "prepend",
                  'sink': "jQuery.prepend",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': "prependTo",
                  'sink': "jQuery.prependTo",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': "replaceWith",
                  'sink': "jQuery.replaceWith",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': false
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': 'replaceAll',
                  'sink': "jQuery.replaceAll",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': false
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': "wrap",
                  'sink': "jQuery.wrap",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': 'wrapAll',
                  'sink': "jQuery.wrapAll",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }, {
                  'object': jqueryObject.prototype,
                  'functionName': 'wrapInner',
                  'sink': "jQuery.wrapInner",
                  'checkFirstArgIsString': true,
                  'replaceTokenForjQuery': true
                }];
                jquerySinks.forEach(sinkConfig => {
                  if (sinkConfig.object[sinkConfig.functionName]) {
                    sinkConfig.object[sinkConfig.functionName] = new Proxy(sinkConfig.object[sinkConfig.functionName], {
                      '__proto__': null,
                      'apply': function (target, thisArg, args) {
                        if (!exclusions || !exclusions.includes(sinkConfig.sink)) {
                          checkFirstArgCallback(args, sinkConfig.sink, sinkConfig.checkFirstArgIsString, sinkConfig.replaceTokenForjQuery);
                        }
                        return Reflect.apply(target, thisArg, args);
                      }
                    });
                  }
                });
                if (jqueryObject.prototype.attr) {
                  jqueryObject.prototype.attr = new Proxy(jQuery.prototype.attr, {
                    '__proto__': null,
                    'apply': function (target, thisArg, args) {
                      if (typeof args[0x1] === "string") {
                        if (args[0x0] === "href" || args[0x0] === 'src' || args[0x0] === "data" || args[0x0] === "action" || args[0x0] === "formaction" || /^on/i.test(args[0x0])) {
                          if (!exclusions || !exclusions.includes("jQuery.attr." + args[0x0])) {
                            checkSecondArgCallback(args, "jQuery.attr.", thisArg);
                          }
                        }
                      }
                      return Reflect.apply(target, thisArg, args);
                    }
                  });
                }
                if (jqueryObject.prototype.prop) {
                  jqueryObject.prototype.prop = new Proxy(jQuery.prototype.prop, {
                    '__proto__': null,
                    'apply': function (target, thisArg, args) {
                      if (typeof args[0x1] === 'string') {
                        if (args[0x0] === "href" || args[0x0] === "src" || args[0x0] === "data" || args[0x0] === "action" || args[0x0] === "formaction" || args[0x0] === "innerHTML" || args[0x0] === "outerHTML") {
                          if (!exclusions || !exclusions.includes('jQuery.prop.' + args[0x0])) {
                            checkSecondArgCallback(args, "jQuery.prop.", thisArg);
                          }
                        }
                      }
                      return Reflect.apply(target, thisArg, args);
                    }
                  });
                }
              } else {
                jqueryReference = jqueryObject;
              }
            },
            'get': function () {
              return jqueryReference;
            }
          });
        }
      }();
      !function () {
        var dollarReference;
        if (!exclusions || !exclusions.includes("jQuery.$")) {
          Object.defineProperty(targetWindow, '$', {
            '__proto__': null,
            'configurable': true,
            'set': function (dollarObject) {
              if (typeof dollarObject === "function" && dollarObject.name === "jQuery") {
                dollarReference = new Proxy(dollarObject, {
                  '__proto__': null,
                  'apply': function (target, thisArg, args) {
                    checkFirstArgCallback(args, "jQuery.$", true, true);
                    return Reflect.apply(target, thisArg, args);
                  }
                });
              } else {
                dollarReference = dollarObject;
              }
            },
            'get': function () {
              return dollarReference;
            }
          });
        }
      }();
    }
    function isTrackingSourceEnabled(source) {
      let disabledSources = parsedSettings.disabledTrackingSources;
      return !disabledSources.includes(source);
    }
    function isSinkEnabled(sink) {
      let disabledSinks = parsedSettings.disabledSinks;
      return !disabledSinks.includes(sink);
    }
    function isTechniqueEnabled(technique) {
      let disabledTechniques = parsedSettings.disabledTechniques;
      return !disabledTechniques.includes(technique);
    }
    function isSourceInjectionEnabled(source) {
      let disabledSources = parsedSettings.disabledSources;
      if (!shouldInjectIntoSources) {
        return false;
      }
      return !disabledSources.includes(source);
    }
    function stringContains(haystack, needle) {
      haystack = String(haystack);
      return haystack.includes(needle);
    }
    function instrumentDomForClobbering(targetWindow, canaryCheckCallback) {
      let domClobberingEnabled = parsedSettings.domClobbering;
      if (isSinkEnabled("createContextualFragment")) {
        targetWindow.document.createRange = function (originalCreateRange) {
          return function () {
            let range = originalCreateRange.apply(document, arguments);
            range.createContextualFragment = function (originalCreateContextualFragment) {
              return function (htmlString) {
                canaryCheckCallback(htmlString, "createContextualFragment");
                return originalCreateContextualFragment.apply(range, arguments);
              };
            }(range.createContextualFragment);
            return range;
          };
        }(document.createRange);
      }
      ['setTimeout', "setInterval"].forEach(timerFunction => {
        if (isSinkEnabled(timerFunction)) {
          targetWindow[timerFunction] = function (originalTimer) {
            return function () {
              if (typeof arguments[0x0] === 'string' || typeof arguments[0x0] === "object") {
                canaryCheckCallback(arguments[0x0], timerFunction);
              }
              return originalTimer.apply(targetWindow, arguments);
            };
          }(targetWindow[timerFunction]);
        }
      });
      ["serviceWorker.register"].forEach(serviceWorkerFunction => {
        if (isSinkEnabled(serviceWorkerFunction)) {
          try {
            if (targetWindow.navigator.serviceWorker) {
              targetWindow.navigator.serviceWorker.register = function (originalRegister) {
                return function () {
                  canaryCheckCallback(arguments[0x0], serviceWorkerFunction);
                  return originalRegister.apply(targetWindow.navigator.serviceWorker, arguments);
                };
              }(targetWindow.navigator.serviceWorker.register);
            }
          } catch (error) {}
        }
      });
      if (domClobberingEnabled) {
        enableDomClobbering();
      }
      if (prototypePollutionEnabled && discoverPrototypePollutionProperties && window === top && !isExploit) {
        discoverPropertiesViaPrototypePollution();
      } else if (isGadgetScan && window === window.top) {
        discoverPropertiesViaPrototypePollution();
      }
    }
    function enableDomClobbering() {
      Object.setPrototypeOf(window, new Proxy(Object.getPrototypeOf(window), {
        __proto__: null,
        get: function (target, prop, receiver) {
          if (typeof target[prop] !== 'undefined') {
            return target[prop];
          }
          return createClobberingProxy([prop], 0);
        }
      }));
    }
    function createClobberingProxy(propertyChain, depth) {
      let canaryToken = parsedSettings.canary;
      let clobberingString = "domclobbering" + propertyChain.join('.') + canaryToken;
      if (depth >= 0x5) {
        return clobberingString;
      }
      return new Proxy({
        'toString'() {
          return clobberingString;
        }
      }, {
        'get'(target, property) {
          if (typeof property === "symbol") {
            if (property === proxyIdentifierSymbol) {
              return true;
            }
            return function (arg) {
              return clobberingString;
            };
          }
          return createClobberingProxy([...propertyChain, property], ++depth);
        }
      });
    }
    function discoverPropertiesViaPrototypePollution() {
      let originalToString = Object.prototype.toString;
      let propertyBag = new Proxy({
        __proto__: null
      }, {
        __proto__: null,
        get: function (target, prop) {
          if (typeof prop === 'string') {
            discoveredProperties.add(prop);
          }
          return;
        }
      });
      Object.setPrototypeOf(Object.prototype, propertyBag);
      if (originalToString.call(function () {}) !== "[object Function]") {
        Object.prototype.toString = function () {
          Object.setPrototypeOf(Object.prototype, null);
          let result = originalToString.call(this);
          Object.setPrototypeOf(Object.prototype, propertyBag);
          return result;
        };
      }
    }
    function isNestedFrame() {
      try {
        return !!(window.frameElement && window.frameElement.dataset && window.frameElement.dataset.dominvaderframe);
      } catch (error) {}
      return false;
    }
    function verifyPrototypePollution() {
      let canaryToken = parsedSettings.canary;
      let shouldVerify = parsedSettings.prototypePollutionVerify;
      if (shouldVerify) {
        return;
      }
      const definePollutedProperty = function (propertyName, source) {
        return {
          '__proto__': null,
          'configurable': true,
          'enumerable': false,
          'set': function (value) {
            delete Object.prototype[propertyName];
            Object.prototype[propertyName] = value;
            if (String(value).includes(canaryToken)) {
              processIssue({
                'source': "Prototype pollution: " + source,
                'value': value,
                'stackTrace': getStackTrace()
              });
            }
          }
        };
      };
      for (const vector of prototypePollutionVectors) {
        if (!isTechniqueEnabled(vector.source)) {
          continue;
        }
        Object.defineProperty(Object.prototype, vector.hashIdentifier, definePollutedProperty(vector.hashIdentifier, vector.source + " in hash"));
        Object.defineProperty(Object.prototype, vector.searchIdentifier, definePollutedProperty(vector.searchIdentifier, vector.source + " in search"));
      }
      Object.defineProperty(Object.prototype, 'e021bc4a', definePollutedProperty('e021bc4a', "JSON postmessage"));
    }
    function injectPrototypePollutionJson(originalObject, identifier) {
      let canaryToken = parsedSettings.canary;
      let jsonString = JSON.stringify(originalObject);
      jsonString = jsonString.replace(/\}$/, '');
      if (jsonString !== '{') {
        jsonString += ',';
      }
      let pollutionString = canaryToken + identifier + '-';
      jsonString += "\"__proto__\":{\"e021bc4a\":" + JSON.stringify(pollutionString) + '}';
      jsonString += '}';
      try {
        return JSON.parse(jsonString);
      } catch (error) {
        return originalObject;
      }
    }
    function injectPrototypePollution(excludedSources) {
      let canaryToken = parsedSettings.canary;
      let hashParams = '';
      let searchParams = '';
      if (prototypePollutionHash) {
        if (!location.hash.includes(canaryToken)) {
          for (const vector of prototypePollutionVectors) {
            if (!isTechniqueEnabled(vector.source)) {
              continue;
            }
            if (excludedSources && !excludedSources.includes(vector.source)) {
              continue;
            }
            if (hashParams) {
              hashParams += '&';
            }
            hashParams += vector.createParam(vector.hashIdentifier, canaryToken);
          }
        }
      }
      if (prototypePollutionQueryString) {
        if (!location.search.includes(canaryToken)) {
          for (const vector of prototypePollutionVectors) {
            if (!isTechniqueEnabled(vector.source)) {
              continue;
            }
            if (excludedSources && !excludedSources.includes(vector.source)) {
              continue;
            }
            if (searchParams) {
              searchParams += '&';
            }
            searchParams += vector.createParam(vector.searchIdentifier, canaryToken);
          }
        }
      }
      if (hashParams || searchParams) {
        let newUrl = location.search ? location.search + '&' : '';
        if (searchParams) {
          if (!location.search) {
            newUrl += '?';
          }
          newUrl += searchParams;
        }
        if (hashParams) {
          if (location.hash === '') {
            newUrl += '#';
          }
          newUrl += (location.hash ? location.hash + '&' : '') + hashParams;
        }
        try {
          originalPushState.call(originalHistory, {}, '', newUrl);
          currentUrl = location.href;
        } catch (error) {}
      }
    }
    function filterUniqueAndLonger(array, excluded) {
      let excludedDefaults = ["dominvaderframe", "window", "localStorage", 'sessionStorage', "DO_NOT_CHECK", 'autoscansourceindex'];
      let numericStripped = [...array].map(item => item.replace(/^\d+/, '')).filter((value, index, self) => self.indexOf(value) != index && value.length > 0x3);
      return array.filter(item => !numericStripped.includes(item.replace(/^\d+/, '')) && !excludedDefaults.includes(item) && !excluded.includes(item));
    }
    function createNotificationElement(backgroundColor) {
      let notification = document.createElement("div");
      notification.style.position = "fixed";
      notification.style.top = '0';
      notification.style.width = "100%";
      notification.style.height = "auto";
      notification.style.color = "white";
      notification.style.backgroundColor = backgroundColor;
      notification.style.textAlign = "center";
      notification.style.padding = '5px';
      notification.style.zIndex = "100000";
      notification.style.fontFamily = "Arial";
      notification.style.borderBottom = "2px solid #f8f9fa";
      return notification;
    }
    function createProgressBar() {
      let progressBar = document.createElement("progress");
      progressBar.max = 0x64;
      progressBar.value = 0x0;
      progressBar.style.width = "100%";
      progressBar.style.color = '#007bff';
      return progressBar;
    }
    function scanForPrototypePollutionSources() {
      let progressContainer = document.createElement("div");
      let progressBar = createProgressBar();
      let messageElement = createNotificationElement('#007bff');
      progressBar.value = 0x0;
      progressContainer.textContent = "Scanning for client side prototype pollution sources...";
      messageElement.appendChild(progressContainer);
      messageElement.appendChild(progressBar);
      document.documentElement.appendChild(messageElement);
      let iframesLoaded = 0x0;
      let totalIframes = 0x0;
      let iframeList = [];
      let foundSources = new Set();
      for (const vector of prototypePollutionVectors) {
        if (!isTechniqueEnabled(vector.source)) {
          continue;
        }
        let canAccessTop = false;
        try {
          if (location.href === top.location.href) {
            canAccessTop = true;
          }
        } catch (error) {}
        if (canAccessTop) {
          let iframeRef = new WeakRef(document.createElement('iframe'));
          let iframe = iframeRef.deref();
          iframe.style.display = 'none';
          iframe.dataset.dominvaderframe = '1';
          iframe.dataset.technique = vector.source;
          iframe.onload = function () {
            iframesLoaded--;
            let completedIframes = totalIframes - iframesLoaded;
            let progress = Math.round(0x64 * completedIframes / totalIframes);
            progressBar.value = progress;
            iframe.onload = function () {
              if (iframe.dataset && typeof iframe.dataset.sources !== "undefined") {
                try {
                  let sources = JSON.parse(iframe.dataset.sources);
                  sources.forEach(source => foundSources.add(source));
                } catch (error) {}
              }
              iframe.remove();
              delete iframe.dataset.dominvaderframe;
              delete iframe.dataset.technique;
              delete iframe.dataset.sources;
              canAccessTop = null;
              iframe.onload = null;
              iframe = null;
              iframeRef = null;
              if (iframesLoaded === 0x0) {
                progress = null;
                progressBar = null;
                iframesLoaded = null;
                messageElement.remove();
                messageElement = null;
                progressContainer = null;
                let completionMessage = createNotificationElement('#28a745');
                completionMessage.textContent = "Complete.";
                document.documentElement.appendChild(completionMessage);
                setTimeout(function () {
                  completionMessage.remove();
                  completionMessage = null;
                  let foundMessage = createNotificationElement("#dc3545");
                  if (foundSources.size > 0x0) {
                    foundMessage.textContent = "DOM Invader found " + foundSources.size + " source" + (foundSources.size === 0x1 ? '' : 's') + " via prototype pollution. Please check devtools.";
                    document.documentElement.appendChild(foundMessage);
                    setTimeout(function () {
                      foundMessage.remove();
                      foundMessage = null;
                      foundSources = null;
                    }, 0x2710);
                  }
                }, 0x5dc);
              }
            };
            iframeList.push(iframe);
            if (iframesLoaded === 0x0) {
              setTimeout(function () {
                for (let frame of iframeList) {
                  frame.src = "about:blank";
                  frame = null;
                }
                iframeList = null;
                window.BurpDOMInvader.isComplete = true;
              }, 0x1f4);
            }
          };
          iframe.src = location.href;
          document.documentElement.appendChild(iframe);
          iframesLoaded++;
          totalIframes++;
        }
      }
    }
    function scanForPrototypePollutionSinks() {
      Object.setPrototypeOf(Object.prototype, null);
      let foundSinks = new Set();
      let excludedProperties = ["value", "body", "method", 'headers', "get", "set", "has", "writable", "configurable"];
      let propertiesToTest = [...discoveredProperties];
      if (propertiesToTest.length) {
        propertiesToTest = filterUniqueAndLonger(propertiesToTest, excludedProperties);
      }
      if (prototypePollutionEnabled && window === window.top) {
        let canAccessTop = false;
        try {
          if (location.href === top.location.href) {
            canAccessTop = true;
          }
        } catch (error) {}
        if (canAccessTop) {
          let progressBar = createProgressBar();
          let messageContainer = document.createElement("div");
          messageContainer.appendChild(document.createTextNode("DOM Invader client side prototype pollution gadget scanning..."));
          let progressMessage = createNotificationElement('#007bff');
          let foundMessage = createNotificationElement('#dc3545');
          progressMessage.appendChild(messageContainer);
          progressMessage.appendChild(progressBar);
          document.body.appendChild(progressMessage);
          let propertyChunks = [];
          let propertiesPerFrame = +parsedSettings.prototypePollutionPropertiesPerFrame;
          let shouldAutoScale = parsedSettings.prototypePollutionAutoScale;
          if (shouldAutoScale) {
            propertiesPerFrame = Math.ceil(propertiesToTest.length / 0x19);
          }
          while (propertiesToTest.length) {
            propertyChunks.push(chunkArray(propertiesToTest, propertiesPerFrame));
          }
          for (let excluded of excludedProperties) {
            propertyChunks.push([excluded]);
          }
          let totalChunks = propertyChunks.length;
          for (let i = 0x0; i < 0x5; i++) {
            if (propertyChunks.length) {
              testPropertiesInIframe(propertyChunks, foundMessage, foundSinks, progressMessage);
            } else {
              break;
            }
          }
          setTimeout(function updateProgress() {
            let completedChunks = totalChunks - propertyChunks.length;
            let progress = Math.round(0x64 * completedChunks / totalChunks);
            messageContainer.textContent = "DOM Invader client side prototype pollution gadget scanning..." + progress + '%';
            progressBar.value = +progress;
            if (propertyChunks.length) {
              setTimeout(updateProgress, 0x1f4);
            }
          }, 0x1f4);
        }
      }
    }
    function chunkArray(array, chunkSize) {
      let chunk = [];
      let element;
      let currentIndex = 0x0;
      let offset = 0x0;
      for (let i = 0x0; i < chunkSize; i++) {
        if (array.length) {
          currentIndex = (offset + i + chunkSize) % array.length;
          element = array.splice(currentIndex, 0x1)[0x0];
          chunk.push(element);
          offset = currentIndex;
        }
      }
      return chunk;
    }
    function testPropertiesInIframe(propertyChunks, foundMessageElement, foundSinksSet, progressMessageElement) {
      let iframeRef = new WeakRef(document.createElement('iframe'));
      let iframe = iframeRef.deref();
      iframe.style.display = "none";
      iframe.dataset.dominvaderframe = '1';
      iframe.dataset.autoscansourceindex = gadgetScanIndex;
      iframe.src = location.href;
      let propertiesToTest = propertyChunks.shift();
      let timeoutId;
      const iframeLoadHandler = function () {
        if (iframe.dataset && typeof iframe.dataset.sinks !== 'undefined') {
          try {
            let sinks = JSON.parse(iframe.dataset.sinks);
            sinks.forEach(sink => foundSinksSet.add(sink));
          } catch (error) {}
        }
        iframe.onload = function () {
          delete iframe.dataset.dominvaderframe;
          delete iframe.dataset.autoscansourceindex;
          delete iframe.dataset.sinks;
          delete iframe.dataset.properties;
          iframe.onload = null;
          iframe.remove();
          iframeRef = null;
          iframe = null;
          timeoutId = null;
          propertiesToTest = null;
          if (propertyChunks.length) {
            testPropertiesInIframe(propertyChunks, foundMessageElement, foundSinksSet, progressMessageElement);
          } else {
            displayScanResults(foundMessageElement, foundSinksSet, progressMessageElement);
          }
          foundMessageElement = null;
          foundSinksSet = null;
          propertyChunks = null;
        };
        iframe.src = "about:blank";
      };
      iframe.dataset.properties = propertiesToTest.join(',');
      iframe.onload = function () {
        clearTimeout(timeoutId);
        iframeLoadHandler();
      };
      document.body.appendChild(iframe);
      timeoutId = setTimeout(iframeLoadHandler, 0x2710);
    }
    function displayScanResults(foundMessageElement, foundSinksSet, progressMessageElement) {
      if (document.querySelectorAll("[data-dominvaderframe]").length > 0x1) {
        return;
      }
      if (document.body.contains(progressMessageElement)) {
        progressMessageElement.remove();
        progressMessageElement = null;
      }
      let completionMessage = createNotificationElement('#28a745');
      completionMessage.textContent = "Complete.";
      document.body.appendChild(completionMessage);
      setTimeout(function () {
        completionMessage.remove();
        completionMessage = null;
        if (foundSinksSet.size > 0x0) {
          foundMessageElement.textContent = "DOM Invader found " + foundSinksSet.size + " sink" + (foundSinksSet.size === 0x1 ? '' : 's') + " via prototype pollution. Please check devtools.";
          document.body.appendChild(foundMessageElement);
          setTimeout(function () {
            foundMessageElement.remove();
            foundMessageElement = null;
            foundSinksSet = null;
          }, 0x2710);
        }
      }, 0x5dc);
      window.BurpDOMInvader.isComplete = true;
    }
    function createPrototypePollutionCanary(propertyChain, depth, startIndex) {
      let canaryToken = parsedSettings.canary;
      let pollutionString = canaryToken + (startIndex > 0x0 ? startIndex : '') + "prototypepollution" + propertyChain.join('.') + canaryToken;
      let readCount = 0x0;
      return new Proxy({}, {
        '__proto__': null,
        'get'(target, property, receiver) {
          let fullString = canaryToken + (startIndex > 0x0 ? startIndex : '') + "prototypepollution" + propertyChain.join('.') + canaryToken;
          if (readCount >= 0x3e8) {
            throw new Error("DOM Invader: Maximum amount of property reads reached");
          }
          readCount++;
          if (typeof property === "symbol") {
            if (property === proxyIdentifierSymbol) {
              false;
              return true;
            }
            return function (arg) {
              return fullString;
            };
          }
          if (depth > 0x5) {
            return fullString;
          }
          return createPrototypePollutionCanary([...propertyChain, property], ++depth, startIndex);
        }
      });
    }
    function triggerPrototypePollution() {
      let canaryToken = parsedSettings.canary;
      let shouldNest = parsedSettings.prototypePollutionNested;
      let currentFrameElement = window.frameElement;
      if (currentFrameElement) {
        if (currentFrameElement.dataset && currentFrameElement.dataset.dominvaderframe && typeof currentFrameElement.dataset.properties === "string") {
          let properties = currentFrameElement.dataset.properties.split(',');
          let startIndex = /^\d+$/.test(currentFrameElement.dataset.autoscansourceindex) ? +currentFrameElement.dataset.autoscansourceindex : -0x1;
          for (let property of properties) {
            let readCounter = 0x0;
            let valueCache = new Map();
            let pollutionValue = shouldNest ? createPrototypePollutionCanary([property], 0x0, startIndex) : canaryToken + (startIndex > 0x0 ? startIndex : '') + 'prototypepollution' + property + canaryToken;
            !function (propertyName) {
              Object.defineProperty(Object.prototype, propertyName, {
                '__proto__': null,
                'configurable': true,
                'enumerable': false,
                'get': function () {
                  if (propertyName === "headers") {
                    return {
                      'x': canaryToken + (startIndex > 0x0 ? startIndex : '') + 'prototypepollution' + property + canaryToken
                    };
                  }
                  if (readCounter > 0x3e8) {
                    throw new Error("DOM Invader: Maximum amount of property reads reached");
                  }
                  readCounter++;
                  return valueCache.has(this) ? valueCache.get(this) : pollutionValue;
                },
                'set': function (value) {
                  valueCache.set(this, value);
                }
              });
            }(property);
          }
        }
      }
    }
    function verifyPrototypePollutionOnLoad() {
      let canaryToken = parsedSettings.canary;
      for (const vector of prototypePollutionVectors) {
        if (!isTechniqueEnabled(vector.source)) {
          continue;
        }
        let hashCheck = Object.prototype[vector.hashIdentifier];
        if (String(hashCheck).includes(canaryToken)) {
          processIssue({
            'source': "Prototype pollution: " + vector.source + " in hash",
            'value': hashCheck,
            'stackTrace': "No stack trace available. Try running without verify onload."
          });
        }
        let searchCheck = Object.prototype[vector.searchIdentifier];
        if (String(searchCheck).includes(canaryToken)) {
          processIssue({
            'source': "Prototype pollution: " + vector.source + " in search",
            'value': searchCheck,
            'stackTrace': "No stack trace available. Try running without verify onload."
          });
        }
      }
      let postMessageCheck = Object.prototype.e021bc4a;
      if (String(postMessageCheck).includes(canaryToken)) {
        processIssue({
          'source': "Prototype pollution: postmessage JSON",
          'value': postMessageCheck,
          'stackTrace': "No stack trace available. Try running without verify onload."
        });
      }
    }
    function proxyProperty(object, propertyName, sourceName, setterCallback) {
      let originalDescriptor = Object.getOwnPropertyDescriptor(object, propertyName);
      let originalValue = object[propertyName];
      Object.defineProperty(object, propertyName, {
        '__proto__': null,
        'configurable': true,
        'get': function () {
          let value;
          if (originalDescriptor) {
            value = originalDescriptor.get.call(this);
          } else {
            value = originalValue;
          }
          if (sourceName === "document.referrer" && value === '' && isSourceInjectionEnabled(sourceName)) {
            value = "https://example.com/";
          }
          let canaryToken = parsedSettings.canary;
          let fullCanary = canaryToken + sourceName;
          value = isSourceInjectionEnabled(sourceName) && !stringContains(value, fullCanary) ? value + fullCanary : value;
          if (isTrackingSourceEnabled(sourceName) && containsCanary(value)) {
            processIssue({
              'source': sourceName,
              'value': value,
              'stackTrace': getStackTrace()
            });
          }
          return value;
        },
        'set': function () {
          let newValue = arguments[0x0];
          if (setterCallback) {
            setterCallback(newValue);
          }
          if (originalDescriptor) {
            return originalDescriptor.set.call(this, newValue);
          }
        }
      });
    }
    function proxyDocumentProperties(targetWindow) {
      if (!targetWindow) {
        targetWindow = window;
      }
      proxyProperty(targetWindow.document, "URL", "document.URL");
      proxyProperty(targetWindow.document, "documentURI", "document.documentURI");
      proxyProperty(targetWindow.document, "baseURI", "document.baseURI");
      proxyProperty(targetWindow.document, 'referrer', 'document.referrer');
      proxyProperty(targetWindow, 'name', "window.name", function (value) {
        if (isSinkEnabled('window.name') && containsCanary(value)) {
          processIssue({
            'sink': "window.name",
            'value': value,
            'stackTrace': getStackTrace()
          });
        }
      });
      if (isTrackingSourceEnabled("URLSearchParams")) {
        let originalGet = URLSearchParams.prototype.get;
        URLSearchParams.prototype.get = function (name) {
          let value = originalGet.apply(this, arguments);
          let canaryToken = parsedSettings.canary;
          if (isSourceInjectionEnabled("URLSearchParams") && value === null) {
            value = '';
          }
          let fullCanary = isSourceInjectionEnabled("URLSearchParams") ? canaryToken + "URLSearchParams" + name + canaryToken : '';
          processIssue({
            'source': "URLSearchParams",
            'value': name + '=' + value + (!stringContains(value, fullCanary) ? fullCanary : ''),
            'stackTrace': getStackTrace()
          });
          return isSourceInjectionEnabled("URLSearchParams") && !stringContains(value, fullCanary) ? value + fullCanary : value;
        };
      }
    }
    function runOnLoadVerifications() {
      let shouldVerify = parsedSettings.prototypePollutionVerify;
      if (prototypePollutionEnabled && discoverPrototypePollutionProperties && window.top === window && !isExploit) {
        scanForPrototypePollutionSinks();
      } else if (isGadgetScan && window === top) {
        scanForPrototypePollutionSinks();
      }
      if (prototypePollutionEnabled && shouldVerify) {
        verifyPrototypePollutionOnLoad();
      }
      if (prototypePollutionEnabled && (prototypePollutionQueryString || prototypePollutionHash)) {
        try {
          originalPushState.call(originalHistory, {}, '', initialUrl);
        } catch (error) {}
      }
      if (Object.prototype.testproperty === 'DOM_INVADER_PP_POC') {
        console.log("Showing Object.prototype for prototype pollution", Object.prototype);
      }
      if (!prototypePollutionEnabled || !discoverPrototypePollutionProperties && !prototypePollutionSeparateFrame) {
        window.BurpDOMInvader.isComplete = true;
      }
    }
    function instrumentObjectProperty(objectName, propertyName, shouldCheckCanary) {
      window[objectName][propertyName] = function (originalFunction) {
        return function () {
          const args = Array.from(arguments);
          for (let i = 0x0; i < args.length; i++) {
            if (!shouldCheckCanary || shouldCheckCanary && containsCanary(args[i])) {
              processIssue({
                '__proto__': null,
                'sink': objectName + '.' + propertyName + ".arg" + i,
                'value': args[i],
                'stackTrace': getStackTrace()
              });
            }
          }
          return originalFunction.apply(window[objectName], arguments);
        };
      }(window[objectName][propertyName]);
    }
    function getObjectByPath(pathArray) {
      let currentObject = window;
      for (let property of pathArray) {
        currentObject = currentObject[property];
      }
      if (!currentObject) {
        throw new Error("Invalid object path. Could not find object.");
      }
      return currentObject;
    }
    function instrumentCustomSinks() {
      customSinkConfig.forEach(sinkConfig => {
        const sinkName = sinkConfig.sinkName;
        const shouldCheck = sinkConfig.lookForCanary;
        const objectPath = sinkConfig.objectToInstrument.split('.');
        if (objectPath.length === 0x1) {
          instrumentObjectProperty(objectPath, sinkName, shouldCheck);
        } else {
          instrumentObjectProperty(getObjectByPath(objectPath), sinkName, shouldCheck);
        }
      });
    }
    function instrumentHistory(targetWindow) {
      if (!targetWindow) {
        targetWindow = window;
      }
      if (isSinkEnabled('history.pushState')) {
        targetWindow.history.pushState = function (originalPushState) {
          return function () {
            if (containsCanary(arguments[0x2])) {
              processIssue({
                'sink': 'history.pushState',
                'value': arguments[0x2],
                'stackTrace': getStackTrace()
              });
            }
            return originalPushState.apply(targetWindow.history, arguments);
          };
        }(targetWindow.history.pushState);
      }
      if (isSinkEnabled('history.replaceState')) {
        targetWindow.history.replaceState = function (originalReplaceState) {
          return function () {
            if (containsCanary(arguments[0x2])) {
              processIssue({
                'sink': 'history.replaceState',
                'value': arguments[0x2],
                'stackTrace': getStackTrace()
              });
            }
            return originalReplaceState.apply(targetWindow.history, arguments);
          };
        }(targetWindow.history.replaceState);
      }
      targetWindow.history.back = function (originalBack) {
        return function () {
          if (shouldPreventRedirect()) {
            return originalBack.apply(targetWindow.history, arguments);
          }
        };
      }(targetWindow.history.back);
      targetWindow.history.forward = function (originalForward) {
        return function () {
          if (shouldPreventRedirect()) {
            return originalForward.apply(targetWindow.history, arguments);
          }
        };
      }(targetWindow.history.forward);
      targetWindow.history.go = function (originalGo) {
        return function () {
          if (shouldPreventRedirect()) {
            return originalGo.apply(targetWindow.history, arguments);
          }
        };
      }(targetWindow.history.go);
      if (targetWindow.navigation && targetWindow.navigation.navigate) {
        let originalNavigate = targetWindow.navigation.navigate;
        targetWindow.navigation.navigate = function (url) {
          if (isSinkEnabled("navigation.navigate") && containsCanary(url)) {
            processIssue({
              'sink': "navigation.navigate",
              'value': url,
              'stackTrace': getStackTrace()
            });
          }
          if (shouldPreventRedirect()) {
            return originalNavigate.apply(targetWindow.navigation, arguments);
          }
        };
        targetWindow.navigation.back = function (originalBack) {
          return function () {
            if (shouldPreventRedirect()) {
              return originalBack.apply(targetWindow.navigation, arguments);
            }
          };
        }(targetWindow.navigation.back);
        targetWindow.navigation.forward = function (originalForward) {
          return function () {
            if (shouldPreventRedirect()) {
              return originalForward.apply(targetWindow.navigation, arguments);
            }
          };
        }(targetWindow.navigation.forward);
        targetWindow.navigation.reload = function (originalReload) {
          return function () {
            if (shouldPreventRedirect()) {
              return originalReload.apply(targetWindow.navigation, arguments);
            }
          };
        }(targetWindow.navigation.reload);
      }
      !function (originalCookieGetter, originalCookieSetter) {
        Object.defineProperty(targetWindow.document, "cookie", {
          '__proto__': null,
          'configurable': true,
          'set': function (value) {
            if (isSinkEnabled("document.cookie") && containsCanary(value)) {
              processIssue({
                'sink': "document.cookie",
                'value': value,
                'stackTrace': getStackTrace()
              });
            }
            originalCookieSetter.call(targetWindow.document, value);
          },
          'get': function () {
            let canaryToken = parsedSettings.canary;
            let cookieString = originalCookieGetter.call(targetWindow.document) + '';
            if (!isTrackingSourceEnabled("document.cookie")) {
              return cookieString;
            }
            cookieString = cookieString.split(';').map(cookie => {
              cookie = cookie.trim();
              let [name, value] = cookie.split('=').map(decodeURIComponent);
              if (containsCanary(value)) {
                processIssue({
                  'source': "document.cookie",
                  'value': name + '=' + value,
                  'stackTrace': getStackTrace()
                });
              }
              if (isSourceInjectionEnabled("document.cookie") && !stringContains(value, canaryToken)) {
                value = value + canaryToken + "document.cookie";
              }
              return name + '=' + value;
            }).join(';');
            return cookieString;
          }
        });
      }(targetWindow.document.__lookupGetter__("cookie"), targetWindow.document.__lookupSetter__("cookie"));
      function shouldPreventRedirect(url) {
        let prevent = parsedSettings.preventRedirection;
        let breakpoint = parsedSettings.redirectBreakpoint;
        if (breakpoint) {
          debugger;
        }
        return !prevent || String(url).startsWith("javascript:");
      }
      function injectCanaryIntoSearchParams(searchParams, canaryToken) {
        const paramsToInject = parsedSettings.paramsToInject;
        const shouldInject = parsedSettings.injectIntoSources;
        let injected = false;
        for (let [key, value] of searchParams) {
          if (!stringContains(value, canaryToken)) {
            if (shouldInject && paramsToInject.length && !paramsToInject.includes(key)) {
              continue;
            }
            injected = true;
            value += canaryToken;
            searchParams.set(key, value);
          }
        }
        if (!injected) {
          if (shouldInject) {
            if (!stringContains(searchParams, canaryToken)) {
              if (!paramsToInject.length) {
                searchParams += canaryToken;
              }
            }
          }
        }
        return searchParams;
      }
      function injectCanaryIntoHash(hashString, canaryToken) {
        if (hashString.startsWith('#')) {
          hashString = hashString.slice(0x1);
        }
        const paramsToInject = parsedSettings.paramsToInject;
        const shouldInject = parsedSettings.injectIntoSources;
        let searchParams = new URLSearchParams(hashString.slice(0x1));
        let injected = false;
        for (let [key, value] of searchParams) {
          if (!stringContains(value, canaryToken)) {
            if (shouldInject && paramsToInject.length && !paramsToInject.includes(key)) {
              continue;
            }
            injected = true;
            value += canaryToken;
            searchParams.set(key, value);
          }
        }
        if (!injected) {
          if (shouldInject) {
            if (!stringContains(searchParams, canaryToken) && !stringContains(hashString, canaryToken)) {
              if (!paramsToInject.length) {
                searchParams += canaryToken;
              }
            }
          }
        }
        return searchParams;
      }
      function updateLocationProperty(newValue, propertyName, originalDescriptor, context) {
        if (isSinkEnabled("location." + propertyName) && containsCanary(newValue)) {
          processIssue({
            'sink': "location." + propertyName,
            'value': newValue,
            'stackTrace': getStackTrace()
          });
        }
        if (shouldPreventRedirect(newValue)) {
          originalDescriptor[propertyName].set.call(context, newValue);
        }
      }
      function getProxiedLocationProperty(propertyName, originalLocation) {
        let value;
        let canaryToken = parsedSettings.canary;
        let sourceName = "location." + propertyName;
        let fullCanary = canaryToken + sourceName;
        if (isSourceInjectionEnabled(sourceName)) {
          if (propertyName === 'hash') {
            value = injectCanaryIntoHash(originalLocation[propertyName], fullCanary).toString();
          } else {
            if (propertyName === 'search') {
              value = injectCanaryIntoSearchParams(new URLSearchParams(originalLocation[propertyName]), fullCanary).toString();
            } else {
              value = originalLocation[propertyName];
            }
          }
          if (propertyName === 'hash' && !value.startsWith('#')) {
            value = '#' + value;
          } else if (propertyName === 'search' && !value.startsWith('?')) {
            value = '?' + value;
          } else {
            value += fullCanary;
          }
        } else {
          value = originalLocation[propertyName];
        }
        if (isTrackingSourceEnabled(sourceName) && containsCanary(value)) {
          processIssue({
            'source': sourceName,
            'value': value,
            'stackTrace': getStackTrace()
          });
        }
        return value;
      }
      function proxyLocationFunction(url, functionName, originalLocation, options) {
        if (isSinkEnabled("location." + functionName) && options.checkToken && containsCanary(url)) {
          processIssue({
            'sink': "location." + functionName,
            'value': url,
            'stackTrace': getStackTrace()
          });
        }
        if (shouldPreventRedirect(url)) {
          originalLocation[functionName](url);
        }
      }
      function setLocationProperty(value, originalDescriptor) {
        if (isSinkEnabled("location") && containsCanary(value)) {
          processIssue({
            'sink': "location",
            'value': value,
            'stackTrace': getStackTrace()
          });
        }
        if (shouldPreventRedirect(value)) {
          originalDescriptor.set.call(targetWindow, value);
        }
      }
      function proxyLocationToString(originalUrl) {
        let canaryToken = parsedSettings.canary;
        let sourceName = "location";
        let fullCanary = canaryToken + sourceName;
        if (isSourceInjectionEnabled(sourceName)) {
          originalUrl = updateUrlWithCanary(new URL(originalUrl), fullCanary);
        }
        if (isTrackingSourceEnabled(sourceName) && containsCanary(originalUrl)) {
          processIssue({
            'source': sourceName,
            'value': originalUrl,
            'stackTrace': getStackTrace()
          });
        }
        return originalUrl;
      }
      function updateUrlWithCanary(urlObject, canary) {
        urlObject.search = injectCanaryIntoSearchParams(urlObject.searchParams, canary);
        urlObject.hash = injectCanaryIntoHash(urlObject.hash, canary);
        return urlObject.toString();
      }
      function checkNodeValueSink(nodeValue, sinkType, element) {
        if (nodeValue && typeof nodeValue === "object") {
          if (nodeValue[proxyIdentifierSymbol]) {
            nodeValue = nodeValue + '';
          }
        }
        if (containsCanary(nodeValue)) {
          processIssue({
            'sink': sinkType,
            'value': nodeValue,
            'outerHTML': element ? element.outerHTML?.['substr'](0x0, 0x64) : '',
            'tagName': element && element.tagName ? element.tagName.toLowerCase() : '',
            'stackTrace': getStackTrace()
          });
        }
        return nodeValue;
      }
      if (prototypePollutionEnabled) {
        verifyPrototypePollution();
        triggerPrototypePollution();
        if (!isGadgetScan && !isNestedFrame() && !prototypePollutionSeparateFrame && !isExploit) {
          injectPrototypePollution();
        } else {
          if (prototypePollutionSeparateFrame && window === top && !isGadgetScan && !isExploit && !discoverPrototypePollutionProperties) {
            scanForPrototypePollutionSources();
          } else {
            if (prototypePollutionSeparateFrame && isNestedFrame() && !isExploit) {
              let technique = window.frameElement.dataset.technique;
              injectPrototypePollution([technique]);
            }
          }
        }
      }
      proxyLocation(targetWindow, {
        'proxiedGetterCallback': getProxiedLocationProperty,
        'proxiedSetterCallback': updateLocationProperty,
        'proxiedLocationFunctionCallback': proxyLocationFunction,
        'locationSetterCallback': setLocationProperty,
        'locationToStringCallback': proxyLocationToString
      }, parsedSettings.disabledSinks);
      proxyDocumentProperties(targetWindow);
      instrumentDom(targetWindow, checkNodeValueSink, [{
        'property': "src",
        'obj': targetWindow.HTMLIFrameElement.prototype,
        'sink': 'iframe.src'
      }, {
        'property': "href",
        'obj': targetWindow.HTMLAnchorElement.prototype,
        'sink': "anchor.href"
      }], parsedSettings.disabledSinks);
      instrumentDomForClobbering(targetWindow, checkNodeValueSink);
    }
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", domContentLoadedHandler, false);
    } else {
      domContentLoadedHandler();
    }
    function domContentLoadedHandler() {
      dispatchAugmentedDomEvent();
      eventsToFire = true;
      if (shouldFireEvents) {
        fireQueuedEvents();
      }
    }
    window.addEventListener('load', function () {
      setTimeout(runOnLoadVerifications, 0x1f4);
    });
    instrumentHistory(window);
    instrumentCustomSinks();
    return {
      'addHook'(hookType, hookFunction) {
        if (!sourceListeners[hookType]) {
          sourceListeners[hookType] = [];
        }
        sourceListeners[hookType].push(hookFunction);
      },
      'removeHook'(hookType, hookFunction) {
        if (!sourceListeners[hookType]) {
          return false;
        }
        for (let i = 0x0; i < sourceListeners[hookType].length; i++) {
          let currentHook = sourceListeners[hookType][i];
          if (currentHook === hookFunction) {
            sourceListeners[hookType].splice(i, 0x1);
            return true;
          }
        }
      },
      'getSearch'() {
        return originalSearchDescriptor.get.call(location);
      },
      'setSearch'(newSearch) {
        originalSearchDescriptor.set.call(location, newSearch);
      },
      'getLocation'() {
        return location.toString();
      },
      'getFollowUpCharacters'() {
        return "\\<>'\":";
      },
      'injectPrototypePollutionJson': injectPrototypePollutionJson,
      'isComplete': false
    };
  }();