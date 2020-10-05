/* esm.sh - esbuild bundle(react-helmet@6.1.0) esnext development */
import react from "/react@16.13.1/esnext/react.development.js";
var __peerModules = {
  "react": react
};
var require = name => {
  if (name in __peerModules) {
    return __peerModules[name];
  }
  throw new Error("[esm.sh] Could not resolve \"" + name + "\"");
};
if (typeof global === 'undefined') var global = window;
var __defineProperty = Object.defineProperty;
var __hasOwnProperty = Object.prototype.hasOwnProperty;
var __commonJS = (callback, module) => () => {
  if (!module) {
    module = {exports: {}};
    callback(module.exports, module);
  }
  return module.exports;
};
var __markAsModule = (target) => {
  return __defineProperty(target, "__esModule", {value: true});
};
var __exportStar = (target, module) => {
  __markAsModule(target);
  if (typeof module === "object" || typeof module === "function") {
    for (let key in module)
      if (!__hasOwnProperty.call(target, key) && key !== "default")
        __defineProperty(target, key, {get: () => module[key], enumerable: true});
  }
  return target;
};
var __toModule = (module) => {
  if (module && module.__esModule)
    return module;
  return __exportStar(__defineProperty({}, "default", {value: module, enumerable: true}), module);
};

// node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS((exports) => {
  /** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  "use strict";
  if (true) {
    (function() {
      "use strict";
      var hasSymbol = typeof Symbol === "function" && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
      var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
      var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
      var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
      var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
      var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
      function isValidElementType(type) {
        return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
      }
      function typeOf(object) {
        if (typeof object === "object" && object !== null) {
          var $$typeof = object.$$typeof;
          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;
              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;
                default:
                  var $$typeofType = type && type.$$typeof;
                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;
                    default:
                      return $$typeof;
                  }
              }
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }
        return void 0;
      }
      var AsyncMode = REACT_ASYNC_MODE_TYPE;
      var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element2 = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false;
      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
          }
        }
        return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }
      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }
      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }
      function isElement(object) {
        return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }
      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }
      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }
      exports.AsyncMode = AsyncMode;
      exports.ConcurrentMode = ConcurrentMode;
      exports.ContextConsumer = ContextConsumer;
      exports.ContextProvider = ContextProvider;
      exports.Element = Element2;
      exports.ForwardRef = ForwardRef;
      exports.Fragment = Fragment;
      exports.Lazy = Lazy;
      exports.Memo = Memo;
      exports.Portal = Portal;
      exports.Profiler = Profiler;
      exports.StrictMode = StrictMode;
      exports.Suspense = Suspense;
      exports.isAsyncMode = isAsyncMode;
      exports.isConcurrentMode = isConcurrentMode;
      exports.isContextConsumer = isContextConsumer;
      exports.isContextProvider = isContextProvider;
      exports.isElement = isElement;
      exports.isForwardRef = isForwardRef;
      exports.isFragment = isFragment;
      exports.isLazy = isLazy;
      exports.isMemo = isMemo;
      exports.isPortal = isPortal;
      exports.isProfiler = isProfiler;
      exports.isStrictMode = isStrictMode;
      exports.isSuspense = isSuspense;
      exports.isValidElementType = isValidElementType;
      exports.typeOf = typeOf;
    })();
  }
});

// node_modules/react-is/index.js
var require_react_is = __commonJS((exports, module) => {
  "use strict";
  if (false) {
    module.exports = null;
  } else {
    module.exports = require_react_is_development();
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS((exports, module) => {
  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  "use strict";
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  function toObject(val) {
    if (val === null || val === void 0) {
      throw new TypeError("Object.assign cannot be called with null or undefined");
    }
    return Object(val);
  }
  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }
      var test1 = new String("abc");
      test1[5] = "de";
      if (Object.getOwnPropertyNames(test1)[0] === "5") {
        return false;
      }
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2["_" + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
        return test2[n];
      });
      if (order2.join("") !== "0123456789") {
        return false;
      }
      var test3 = {};
      "abcdefghijklmnopqrst".split("").forEach(function(letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  module.exports = shouldUseNative() ? Object.assign : function(target, source) {
    var from;
    var to = toObject(target);
    var symbols;
    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }
    return to;
  };
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS((exports, module) => {
  "use strict";
  var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  module.exports = ReactPropTypesSecret;
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS((exports, module) => {
  "use strict";
  var printWarning = function() {
  };
  if (true) {
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var loggedTypeFailures = {};
    var has = Function.call.bind(Object.prototype.hasOwnProperty);
    printWarning = function(text) {
      var message = "Warning: " + text;
      if (typeof console !== "undefined") {
        console.error(message);
      }
      try {
        throw new Error(message);
      } catch (x) {
      }
    };
  }
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    if (true) {
      for (var typeSpecName in typeSpecs) {
        if (has(typeSpecs, typeSpecName)) {
          var error;
          try {
            if (typeof typeSpecs[typeSpecName] !== "function") {
              var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.");
              err.name = "Invariant Violation";
              throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning((componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).");
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            loggedTypeFailures[error.message] = true;
            var stack = getStack ? getStack() : "";
            printWarning("Failed " + location + " type: " + error.message + (stack != null ? stack : ""));
          }
        }
      }
    }
  }
  checkPropTypes.resetWarningCache = function() {
    if (true) {
      loggedTypeFailures = {};
    }
  };
  module.exports = checkPropTypes;
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS((exports, module) => {
  "use strict";
  var ReactIs = require_react_is();
  var assign = require_object_assign();
  var ReactPropTypesSecret = require_ReactPropTypesSecret();
  var checkPropTypes = require_checkPropTypes();
  var has = Function.call.bind(Object.prototype.hasOwnProperty);
  var printWarning = function() {
  };
  if (true) {
    printWarning = function(text) {
      var message = "Warning: " + text;
      if (typeof console !== "undefined") {
        console.error(message);
      }
      try {
        throw new Error(message);
      } catch (x) {
      }
    };
  }
  function emptyFunctionThatReturnsNull() {
    return null;
  }
  module.exports = function(isValidElement, throwOnDirectAccess) {
    var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = "@@iterator";
    function getIteratorFn(maybeIterable) {
      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn === "function") {
        return iteratorFn;
      }
    }
    var ANONYMOUS = "<<anonymous>>";
    var ReactPropTypes = {
      array: createPrimitiveTypeChecker("array"),
      bool: createPrimitiveTypeChecker("boolean"),
      func: createPrimitiveTypeChecker("function"),
      number: createPrimitiveTypeChecker("number"),
      object: createPrimitiveTypeChecker("object"),
      string: createPrimitiveTypeChecker("string"),
      symbol: createPrimitiveTypeChecker("symbol"),
      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      elementType: createElementTypeTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker
    };
    function is(x, y) {
      if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
      } else {
        return x !== x && y !== y;
      }
    }
    function PropTypeError(message) {
      this.message = message;
      this.stack = "";
    }
    PropTypeError.prototype = Error.prototype;
    function createChainableTypeChecker(validate) {
      if (true) {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }
      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;
        if (secret !== ReactPropTypesSecret) {
          if (throwOnDirectAccess) {
            var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
            err.name = "Invariant Violation";
            throw err;
          } else if (typeof console !== "undefined") {
            var cacheKey = componentName + ":" + propName;
            if (!manualPropTypeCallCache[cacheKey] && manualPropTypeWarningCount < 3) {
              printWarning("You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.");
              manualPropTypeCallCache[cacheKey] = true;
              manualPropTypeWarningCount++;
            }
          }
        }
        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
            }
            return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
          }
          return null;
        } else {
          return validate(props, propName, componentName, location, propFullName);
        }
      }
      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);
      return chainedCheckType;
    }
    function createPrimitiveTypeChecker(expectedType) {
      function validate(props, propName, componentName, location, propFullName, secret) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== expectedType) {
          var preciseType = getPreciseType(propValue);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }
    function createArrayOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== "function") {
          return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
        }
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createElementTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createElementTypeTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!ReactIs.isValidElementType(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createInstanceTypeChecker(expectedClass) {
      function validate(props, propName, componentName, location, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        if (true) {
          if (arguments.length > 1) {
            printWarning("Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).");
          } else {
            printWarning("Invalid argument supplied to oneOf, expected an array.");
          }
        }
        return emptyFunctionThatReturnsNull;
      }
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }
        var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
          var type = getPreciseType(value);
          if (type === "symbol") {
            return String(value);
          }
          return value;
        });
        return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
      }
      return createChainableTypeChecker(validate);
    }
    function createObjectOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== "function") {
          return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
        }
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== "object") {
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
        }
        for (var key in propValue) {
          if (has(propValue, key)) {
            var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
        printWarning("Invalid argument supplied to oneOfType, expected an instance of array.");
        return emptyFunctionThatReturnsNull;
      }
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (typeof checker !== "function") {
          printWarning("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + ".");
          return emptyFunctionThatReturnsNull;
        }
      }
      function validate(props, propName, componentName, location, propFullName) {
        for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
          var checker2 = arrayOfTypeCheckers[i2];
          if (checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
            return null;
          }
        }
        return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`."));
      }
      return createChainableTypeChecker(validate);
    }
    function createNodeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        if (!isNode(props[propName])) {
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== "object") {
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (!checker) {
            continue;
          }
          var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createStrictShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== "object") {
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
        }
        var allKeys = assign({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (!checker) {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  "));
          }
          var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function isNode(propValue) {
      switch (typeof propValue) {
        case "number":
        case "string":
        case "undefined":
          return true;
        case "boolean":
          return !propValue;
        case "object":
          if (Array.isArray(propValue)) {
            return propValue.every(isNode);
          }
          if (propValue === null || isValidElement(propValue)) {
            return true;
          }
          var iteratorFn = getIteratorFn(propValue);
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue);
            var step;
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              while (!(step = iterator.next()).done) {
                var entry = step.value;
                if (entry) {
                  if (!isNode(entry[1])) {
                    return false;
                  }
                }
              }
            }
          } else {
            return false;
          }
          return true;
        default:
          return false;
      }
    }
    function isSymbol(propType, propValue) {
      if (propType === "symbol") {
        return true;
      }
      if (!propValue) {
        return false;
      }
      if (propValue["@@toStringTag"] === "Symbol") {
        return true;
      }
      if (typeof Symbol === "function" && propValue instanceof Symbol) {
        return true;
      }
      return false;
    }
    function getPropType(propValue) {
      var propType = typeof propValue;
      if (Array.isArray(propValue)) {
        return "array";
      }
      if (propValue instanceof RegExp) {
        return "object";
      }
      if (isSymbol(propType, propValue)) {
        return "symbol";
      }
      return propType;
    }
    function getPreciseType(propValue) {
      if (typeof propValue === "undefined" || propValue === null) {
        return "" + propValue;
      }
      var propType = getPropType(propValue);
      if (propType === "object") {
        if (propValue instanceof Date) {
          return "date";
        } else if (propValue instanceof RegExp) {
          return "regexp";
        }
      }
      return propType;
    }
    function getPostfixForTypeWarning(value) {
      var type = getPreciseType(value);
      switch (type) {
        case "array":
        case "object":
          return "an " + type;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + type;
        default:
          return type;
      }
    }
    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS;
      }
      return propValue.constructor.name;
    }
    ReactPropTypes.checkPropTypes = checkPropTypes;
    ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  };
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS((exports, module) => {
  if (true) {
    var ReactIs = require_react_is();
    var throwOnDirectAccess = true;
    module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
  } else {
    module.exports = null();
  }
});

// node_modules/react-side-effect/lib/index.js
var require_lib = __commonJS((exports, module) => {
  "use strict";
  function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
  }
  var React2 = require("react");
  var React__default = _interopDefault(React2);
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
  function withSideEffect2(reducePropsToState3, handleStateChangeOnClient, mapStateOnServer3) {
    if (typeof reducePropsToState3 !== "function") {
      throw new Error("Expected reducePropsToState to be a function.");
    }
    if (typeof handleStateChangeOnClient !== "function") {
      throw new Error("Expected handleStateChangeOnClient to be a function.");
    }
    if (typeof mapStateOnServer3 !== "undefined" && typeof mapStateOnServer3 !== "function") {
      throw new Error("Expected mapStateOnServer to either be undefined or a function.");
    }
    function getDisplayName(WrappedComponent) {
      return WrappedComponent.displayName || WrappedComponent.name || "Component";
    }
    return function wrap(WrappedComponent) {
      if (typeof WrappedComponent !== "function") {
        throw new Error("Expected WrappedComponent to be a React component.");
      }
      var mountedInstances = [];
      var state;
      function emitChange() {
        state = reducePropsToState3(mountedInstances.map(function(instance) {
          return instance.props;
        }));
        if (SideEffect.canUseDOM) {
          handleStateChangeOnClient(state);
        } else if (mapStateOnServer3) {
          state = mapStateOnServer3(state);
        }
      }
      var SideEffect = /* @__PURE__ */ function(_PureComponent) {
        _inheritsLoose(SideEffect2, _PureComponent);
        function SideEffect2() {
          return _PureComponent.apply(this, arguments) || this;
        }
        SideEffect2.peek = function peek() {
          return state;
        };
        SideEffect2.rewind = function rewind() {
          if (SideEffect2.canUseDOM) {
            throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");
          }
          var recordedState = state;
          state = void 0;
          mountedInstances = [];
          return recordedState;
        };
        var _proto = SideEffect2.prototype;
        _proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
          mountedInstances.push(this);
          emitChange();
        };
        _proto.componentDidUpdate = function componentDidUpdate() {
          emitChange();
        };
        _proto.componentWillUnmount = function componentWillUnmount() {
          var index = mountedInstances.indexOf(this);
          mountedInstances.splice(index, 1);
          emitChange();
        };
        _proto.render = function render() {
          return React__default.createElement(WrappedComponent, this.props);
        };
        return SideEffect2;
      }(React2.PureComponent);
      _defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");
      _defineProperty(SideEffect, "canUseDOM", canUseDOM);
      return SideEffect;
    };
  }
  module.exports = withSideEffect2;
});

// node_modules/react-fast-compare/index.js
var require_react_fast_compare = __commonJS((exports, module) => {
  var hasElementType = typeof Element !== "undefined";
  var hasMap = typeof Map === "function";
  var hasSet = typeof Set === "function";
  var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
  function equal(a, b) {
    if (a === b)
      return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
      if (a.constructor !== b.constructor)
        return false;
      var length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length)
          return false;
        for (i = length; i-- !== 0; )
          if (!equal(a[i], b[i]))
            return false;
        return true;
      }
      var it;
      if (hasMap && a instanceof Map && b instanceof Map) {
        if (a.size !== b.size)
          return false;
        it = a.entries();
        while (!(i = it.next()).done)
          if (!b.has(i.value[0]))
            return false;
        it = a.entries();
        while (!(i = it.next()).done)
          if (!equal(i.value[1], b.get(i.value[0])))
            return false;
        return true;
      }
      if (hasSet && a instanceof Set && b instanceof Set) {
        if (a.size !== b.size)
          return false;
        it = a.entries();
        while (!(i = it.next()).done)
          if (!b.has(i.value[0]))
            return false;
        return true;
      }
      if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
        length = a.length;
        if (length != b.length)
          return false;
        for (i = length; i-- !== 0; )
          if (a[i] !== b[i])
            return false;
        return true;
      }
      if (a.constructor === RegExp)
        return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf)
        return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString)
        return a.toString() === b.toString();
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length)
        return false;
      for (i = length; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
          return false;
      if (hasElementType && a instanceof Element)
        return false;
      for (i = length; i-- !== 0; ) {
        if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) {
          continue;
        }
        if (!equal(a[keys[i]], b[keys[i]]))
          return false;
      }
      return true;
    }
    return a !== a && b !== b;
  }
  module.exports = function isEqual2(a, b) {
    try {
      return equal(a, b);
    } catch (error) {
      if ((error.message || "").match(/stack|recursion/i)) {
        console.warn("react-fast-compare cannot handle circular refs");
        return false;
      }
      throw error;
    }
  };
});

// node_modules/react-helmet/es/Helmet.js
const prop_types = __toModule(require_prop_types());
const react_side_effect = __toModule(require_lib());
const react_fast_compare = __toModule(require_react_fast_compare());
const object_assign = __toModule(require_object_assign());
import React from "/react@16.13.1/esnext/react.development.js";
var ATTRIBUTE_NAMES = {
  BODY: "bodyAttributes",
  HTML: "htmlAttributes",
  TITLE: "titleAttributes"
};
var TAG_NAMES = {
  BASE: "base",
  BODY: "body",
  HEAD: "head",
  HTML: "html",
  LINK: "link",
  META: "meta",
  NOSCRIPT: "noscript",
  SCRIPT: "script",
  STYLE: "style",
  TITLE: "title"
};
var VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function(name) {
  return TAG_NAMES[name];
});
var TAG_PROPERTIES = {
  CHARSET: "charset",
  CSS_TEXT: "cssText",
  HREF: "href",
  HTTPEQUIV: "http-equiv",
  INNER_HTML: "innerHTML",
  ITEM_PROP: "itemprop",
  NAME: "name",
  PROPERTY: "property",
  REL: "rel",
  SRC: "src",
  TARGET: "target"
};
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate"
};
var HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function(obj, key) {
  obj[REACT_TAG_MAP[key]] = key;
  return obj;
}, {});
var SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];
var HELMET_ATTRIBUTE = "data-react-helmet";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
var createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var inherits = function(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};
var objectWithoutProperties = function(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0)
      continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i))
      continue;
    target[i] = obj[i];
  }
  return target;
};
var possibleConstructorReturn = function(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};
var encodeSpecialCharacters = function encodeSpecialCharacters2(str) {
  var encode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var getTitleFromPropsList = function getTitleFromPropsList2(propsList) {
  var innermostTitle = getInnermostProperty(propsList, TAG_NAMES.TITLE);
  var innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, function() {
      return Array.isArray(innermostTitle) ? innermostTitle.join("") : innermostTitle;
    });
  }
  var innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = function getOnChangeClientState2(propsList) {
  return getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function() {
  };
};
var getAttributesFromPropsList = function getAttributesFromPropsList2(tagType, propsList) {
  return propsList.filter(function(props) {
    return typeof props[tagType] !== "undefined";
  }).map(function(props) {
    return props[tagType];
  }).reduce(function(tagAttrs, current) {
    return _extends({}, tagAttrs, current);
  }, {});
};
var getBaseTagFromPropsList = function getBaseTagFromPropsList2(primaryAttributes, propsList) {
  return propsList.filter(function(props) {
    return typeof props[TAG_NAMES.BASE] !== "undefined";
  }).map(function(props) {
    return props[TAG_NAMES.BASE];
  }).reverse().reduce(function(innermostBaseTag, tag) {
    if (!innermostBaseTag.length) {
      var keys = Object.keys(tag);
      for (var i = 0; i < keys.length; i++) {
        var attributeKey = keys[i];
        var lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
          return innermostBaseTag.concat(tag);
        }
      }
    }
    return innermostBaseTag;
  }, []);
};
var getTagsFromPropsList = function getTagsFromPropsList2(tagName, primaryAttributes, propsList) {
  var approvedSeenTags = {};
  return propsList.filter(function(props) {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn("Helmet: " + tagName + ' should be of type "Array". Instead found type "' + _typeof(props[tagName]) + '"');
    }
    return false;
  }).map(function(props) {
    return props[tagName];
  }).reverse().reduce(function(approvedTags, instanceTags) {
    var instanceSeenTags = {};
    instanceTags.filter(function(tag) {
      var primaryAttributeKey = void 0;
      var keys2 = Object.keys(tag);
      for (var i2 = 0; i2 < keys2.length; i2++) {
        var attributeKey2 = keys2[i2];
        var lowerCaseAttributeKey = attributeKey2.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey2) !== -1 && (attributeKey2 === TAG_PROPERTIES.INNER_HTML || attributeKey2 === TAG_PROPERTIES.CSS_TEXT || attributeKey2 === TAG_PROPERTIES.ITEM_PROP)) {
          primaryAttributeKey = attributeKey2;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      var value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach(function(tag) {
      return approvedTags.push(tag);
    });
    var keys = Object.keys(instanceSeenTags);
    for (var i = 0; i < keys.length; i++) {
      var attributeKey = keys[i];
      var tagUnion = object_assign.default({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getInnermostProperty = function getInnermostProperty2(propsList, property) {
  for (var i = propsList.length - 1; i >= 0; i--) {
    var props = propsList[i];
    if (props.hasOwnProperty(property)) {
      return props[property];
    }
  }
  return null;
};
var reducePropsToState = function reducePropsToState2(propsList) {
  return {
    baseTag: getBaseTagFromPropsList([TAG_PROPERTIES.HREF, TAG_PROPERTIES.TARGET], propsList),
    bodyAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.BODY, propsList),
    defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
    encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
    htmlAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.HTML, propsList),
    linkTags: getTagsFromPropsList(TAG_NAMES.LINK, [TAG_PROPERTIES.REL, TAG_PROPERTIES.HREF], propsList),
    metaTags: getTagsFromPropsList(TAG_NAMES.META, [TAG_PROPERTIES.NAME, TAG_PROPERTIES.CHARSET, TAG_PROPERTIES.HTTPEQUIV, TAG_PROPERTIES.PROPERTY, TAG_PROPERTIES.ITEM_PROP], propsList),
    noscriptTags: getTagsFromPropsList(TAG_NAMES.NOSCRIPT, [TAG_PROPERTIES.INNER_HTML], propsList),
    onChangeClientState: getOnChangeClientState(propsList),
    scriptTags: getTagsFromPropsList(TAG_NAMES.SCRIPT, [TAG_PROPERTIES.SRC, TAG_PROPERTIES.INNER_HTML], propsList),
    styleTags: getTagsFromPropsList(TAG_NAMES.STYLE, [TAG_PROPERTIES.CSS_TEXT], propsList),
    title: getTitleFromPropsList(propsList),
    titleAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.TITLE, propsList)
  };
};
var rafPolyfill = function() {
  var clock = Date.now();
  return function(callback) {
    var currentTime = Date.now();
    if (currentTime - clock > 16) {
      clock = currentTime;
      callback(currentTime);
    } else {
      setTimeout(function() {
        rafPolyfill(callback);
      }, 0);
    }
  };
}();
var cafPolyfill = function cafPolyfill2(id) {
  return clearTimeout(id);
};
var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;
var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;
var warn = function warn2(msg) {
  return console && typeof console.warn === "function" && console.warn(msg);
};
var _helmetCallback = null;
var handleClientStateChange = function handleClientStateChange2(newState) {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(function() {
      commitTagChanges(newState, function() {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var commitTagChanges = function commitTagChanges2(newState, cb) {
  var baseTag = newState.baseTag, bodyAttributes = newState.bodyAttributes, htmlAttributes = newState.htmlAttributes, linkTags = newState.linkTags, metaTags = newState.metaTags, noscriptTags = newState.noscriptTags, onChangeClientState = newState.onChangeClientState, scriptTags = newState.scriptTags, styleTags = newState.styleTags, title = newState.title, titleAttributes = newState.titleAttributes;
  updateAttributes(TAG_NAMES.BODY, bodyAttributes);
  updateAttributes(TAG_NAMES.HTML, htmlAttributes);
  updateTitle(title, titleAttributes);
  var tagUpdates = {
    baseTag: updateTags(TAG_NAMES.BASE, baseTag),
    linkTags: updateTags(TAG_NAMES.LINK, linkTags),
    metaTags: updateTags(TAG_NAMES.META, metaTags),
    noscriptTags: updateTags(TAG_NAMES.NOSCRIPT, noscriptTags),
    scriptTags: updateTags(TAG_NAMES.SCRIPT, scriptTags),
    styleTags: updateTags(TAG_NAMES.STYLE, styleTags)
  };
  var addedTags = {};
  var removedTags = {};
  Object.keys(tagUpdates).forEach(function(tagType) {
    var _tagUpdates$tagType = tagUpdates[tagType], newTags = _tagUpdates$tagType.newTags, oldTags = _tagUpdates$tagType.oldTags;
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  cb && cb();
  onChangeClientState(newState, addedTags, removedTags);
};
var flattenArray = function flattenArray2(possibleArray) {
  return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
};
var updateTitle = function updateTitle2(title, attributes) {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes(TAG_NAMES.TITLE, attributes);
};
var updateAttributes = function updateAttributes2(tagName, attributes) {
  var elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  var helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  var attributesToRemove = [].concat(helmetAttributes);
  var attributeKeys = Object.keys(attributes);
  for (var i = 0; i < attributeKeys.length; i++) {
    var attribute = attributeKeys[i];
    var value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    var indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
    elementTag.removeAttribute(attributesToRemove[_i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTags = function updateTags2(type, tags) {
  var headElement = document.head || document.querySelector(TAG_NAMES.HEAD);
  var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
  var oldTags = Array.prototype.slice.call(tagNodes);
  var newTags = [];
  var indexToDelete = void 0;
  if (tags && tags.length) {
    tags.forEach(function(tag) {
      var newElement = document.createElement(type);
      for (var attribute in tag) {
        if (tag.hasOwnProperty(attribute)) {
          if (attribute === TAG_PROPERTIES.INNER_HTML) {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === TAG_PROPERTIES.CSS_TEXT) {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some(function(existingTag, index) {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach(function(tag) {
    return tag.parentNode.removeChild(tag);
  });
  newTags.forEach(function(tag) {
    return headElement.appendChild(tag);
  });
  return {
    oldTags,
    newTags
  };
};
var generateElementAttributesAsString = function generateElementAttributesAsString2(attributes) {
  return Object.keys(attributes).reduce(function(str, key) {
    var attr = typeof attributes[key] !== "undefined" ? key + '="' + attributes[key] + '"' : "" + key;
    return str ? str + " " + attr : attr;
  }, "");
};
var generateTitleAsString = function generateTitleAsString2(type, title, attributes, encode) {
  var attributeString = generateElementAttributesAsString(attributes);
  var flattenedTitle = flattenArray(title);
  return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + '="true" ' + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + '="true">' + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
};
var generateTagsAsString = function generateTagsAsString2(type, tags, encode) {
  return tags.reduce(function(str, tag) {
    var attributeHtml = Object.keys(tag).filter(function(attribute) {
      return !(attribute === TAG_PROPERTIES.INNER_HTML || attribute === TAG_PROPERTIES.CSS_TEXT);
    }).reduce(function(string, attribute) {
      var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + '="' + encodeSpecialCharacters(tag[attribute], encode) + '"';
      return string ? string + " " + attr : attr;
    }, "");
    var tagContent = tag.innerHTML || tag.cssText || "";
    var isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
    return str + "<" + type + " " + HELMET_ATTRIBUTE + '="true" ' + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
  }, "");
};
var convertElementAttributestoReactProps = function convertElementAttributestoReactProps2(attributes) {
  var initProps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return Object.keys(attributes).reduce(function(obj, key) {
    obj[REACT_TAG_MAP[key] || key] = attributes[key];
    return obj;
  }, initProps);
};
var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes2(props) {
  var initAttributes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return Object.keys(props).reduce(function(obj, key) {
    obj[HTML_TAG_MAP[key] || key] = props[key];
    return obj;
  }, initAttributes);
};
var generateTitleAsReactComponent = function generateTitleAsReactComponent2(type, title, attributes) {
  var _initProps;
  var initProps = (_initProps = {
    key: title
  }, _initProps[HELMET_ATTRIBUTE] = true, _initProps);
  var props = convertElementAttributestoReactProps(attributes, initProps);
  return [React.createElement(TAG_NAMES.TITLE, props, title)];
};
var generateTagsAsReactComponent = function generateTagsAsReactComponent2(type, tags) {
  return tags.map(function(tag, i) {
    var _mappedTag;
    var mappedTag = (_mappedTag = {
      key: i
    }, _mappedTag[HELMET_ATTRIBUTE] = true, _mappedTag);
    Object.keys(tag).forEach(function(attribute) {
      var mappedAttribute = REACT_TAG_MAP[attribute] || attribute;
      if (mappedAttribute === TAG_PROPERTIES.INNER_HTML || mappedAttribute === TAG_PROPERTIES.CSS_TEXT) {
        var content = tag.innerHTML || tag.cssText;
        mappedTag.dangerouslySetInnerHTML = {__html: content};
      } else {
        mappedTag[mappedAttribute] = tag[attribute];
      }
    });
    return React.createElement(type, mappedTag);
  });
};
var getMethodsForTag = function getMethodsForTag2(type, tags, encode) {
  switch (type) {
    case TAG_NAMES.TITLE:
      return {
        toComponent: function toComponent() {
          return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
        },
        toString: function toString() {
          return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
        }
      };
    case ATTRIBUTE_NAMES.BODY:
    case ATTRIBUTE_NAMES.HTML:
      return {
        toComponent: function toComponent() {
          return convertElementAttributestoReactProps(tags);
        },
        toString: function toString() {
          return generateElementAttributesAsString(tags);
        }
      };
    default:
      return {
        toComponent: function toComponent() {
          return generateTagsAsReactComponent(type, tags);
        },
        toString: function toString() {
          return generateTagsAsString(type, tags, encode);
        }
      };
  }
};
var mapStateOnServer = function mapStateOnServer2(_ref) {
  var baseTag = _ref.baseTag, bodyAttributes = _ref.bodyAttributes, encode = _ref.encode, htmlAttributes = _ref.htmlAttributes, linkTags = _ref.linkTags, metaTags = _ref.metaTags, noscriptTags = _ref.noscriptTags, scriptTags = _ref.scriptTags, styleTags = _ref.styleTags, _ref$title = _ref.title, title = _ref$title === void 0 ? "" : _ref$title, titleAttributes = _ref.titleAttributes;
  return {
    base: getMethodsForTag(TAG_NAMES.BASE, baseTag, encode),
    bodyAttributes: getMethodsForTag(ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
    htmlAttributes: getMethodsForTag(ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
    link: getMethodsForTag(TAG_NAMES.LINK, linkTags, encode),
    meta: getMethodsForTag(TAG_NAMES.META, metaTags, encode),
    noscript: getMethodsForTag(TAG_NAMES.NOSCRIPT, noscriptTags, encode),
    script: getMethodsForTag(TAG_NAMES.SCRIPT, scriptTags, encode),
    style: getMethodsForTag(TAG_NAMES.STYLE, styleTags, encode),
    title: getMethodsForTag(TAG_NAMES.TITLE, {title, titleAttributes}, encode)
  };
};
var Helmet = function Helmet2(Component) {
  var _class, _temp;
  return _temp = _class = function(_React$Component) {
    inherits(HelmetWrapper, _React$Component);
    function HelmetWrapper() {
      classCallCheck(this, HelmetWrapper);
      return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }
    HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
      return !react_fast_compare.default(this.props, nextProps);
    };
    HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
      if (!nestedChildren) {
        return null;
      }
      switch (child.type) {
        case TAG_NAMES.SCRIPT:
        case TAG_NAMES.NOSCRIPT:
          return {
            innerHTML: nestedChildren
          };
        case TAG_NAMES.STYLE:
          return {
            cssText: nestedChildren
          };
      }
      throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
    };
    HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
      var _babelHelpers$extends;
      var child = _ref.child, arrayTypeChildren = _ref.arrayTypeChildren, newChildProps = _ref.newChildProps, nestedChildren = _ref.nestedChildren;
      return _extends({}, arrayTypeChildren, (_babelHelpers$extends = {}, _babelHelpers$extends[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _babelHelpers$extends));
    };
    HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
      var _babelHelpers$extends2, _babelHelpers$extends3;
      var child = _ref2.child, newProps = _ref2.newProps, newChildProps = _ref2.newChildProps, nestedChildren = _ref2.nestedChildren;
      switch (child.type) {
        case TAG_NAMES.TITLE:
          return _extends({}, newProps, (_babelHelpers$extends2 = {}, _babelHelpers$extends2[child.type] = nestedChildren, _babelHelpers$extends2.titleAttributes = _extends({}, newChildProps), _babelHelpers$extends2));
        case TAG_NAMES.BODY:
          return _extends({}, newProps, {
            bodyAttributes: _extends({}, newChildProps)
          });
        case TAG_NAMES.HTML:
          return _extends({}, newProps, {
            htmlAttributes: _extends({}, newChildProps)
          });
      }
      return _extends({}, newProps, (_babelHelpers$extends3 = {}, _babelHelpers$extends3[child.type] = _extends({}, newChildProps), _babelHelpers$extends3));
    };
    HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
      var newFlattenedProps = _extends({}, newProps);
      Object.keys(arrayTypeChildren).forEach(function(arrayChildName) {
        var _babelHelpers$extends4;
        newFlattenedProps = _extends({}, newFlattenedProps, (_babelHelpers$extends4 = {}, _babelHelpers$extends4[arrayChildName] = arrayTypeChildren[arrayChildName], _babelHelpers$extends4));
      });
      return newFlattenedProps;
    };
    HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
      if (true) {
        if (!VALID_TAG_NAMES.some(function(name) {
          return child.type === name;
        })) {
          if (typeof child.type === "function") {
            return warn("You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.");
          }
          return warn("Only elements types " + VALID_TAG_NAMES.join(", ") + " are allowed. Helmet does not support rendering <" + child.type + "> elements. Refer to our API for more information.");
        }
        if (nestedChildren && typeof nestedChildren !== "string" && (!Array.isArray(nestedChildren) || nestedChildren.some(function(nestedChild) {
          return typeof nestedChild !== "string";
        }))) {
          throw new Error("Helmet expects a string as a child of <" + child.type + ">. Did you forget to wrap your children in braces? ( <" + child.type + ">{``}</" + child.type + "> ) Refer to our API for more information.");
        }
      }
      return true;
    };
    HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
      var _this2 = this;
      var arrayTypeChildren = {};
      React.Children.forEach(children, function(child) {
        if (!child || !child.props) {
          return;
        }
        var _child$props = child.props, nestedChildren = _child$props.children, childProps = objectWithoutProperties(_child$props, ["children"]);
        var newChildProps = convertReactPropstoHtmlAttributes(childProps);
        _this2.warnOnInvalidChildren(child, nestedChildren);
        switch (child.type) {
          case TAG_NAMES.LINK:
          case TAG_NAMES.META:
          case TAG_NAMES.NOSCRIPT:
          case TAG_NAMES.SCRIPT:
          case TAG_NAMES.STYLE:
            arrayTypeChildren = _this2.flattenArrayTypeChildren({
              child,
              arrayTypeChildren,
              newChildProps,
              nestedChildren
            });
            break;
          default:
            newProps = _this2.mapObjectTypeChildren({
              child,
              newProps,
              newChildProps,
              nestedChildren
            });
            break;
        }
      });
      newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
      return newProps;
    };
    HelmetWrapper.prototype.render = function render() {
      var _props = this.props, children = _props.children, props = objectWithoutProperties(_props, ["children"]);
      var newProps = _extends({}, props);
      if (children) {
        newProps = this.mapChildrenToProps(children, newProps);
      }
      return React.createElement(Component, newProps);
    };
    createClass(HelmetWrapper, null, [{
      key: "canUseDOM",
      set: function set$$1(canUseDOM) {
        Component.canUseDOM = canUseDOM;
      }
    }]);
    return HelmetWrapper;
  }(React.Component), _class.propTypes = {
    base: prop_types.default.object,
    bodyAttributes: prop_types.default.object,
    children: prop_types.default.oneOfType([prop_types.default.arrayOf(prop_types.default.node), prop_types.default.node]),
    defaultTitle: prop_types.default.string,
    defer: prop_types.default.bool,
    encodeSpecialCharacters: prop_types.default.bool,
    htmlAttributes: prop_types.default.object,
    link: prop_types.default.arrayOf(prop_types.default.object),
    meta: prop_types.default.arrayOf(prop_types.default.object),
    noscript: prop_types.default.arrayOf(prop_types.default.object),
    onChangeClientState: prop_types.default.func,
    script: prop_types.default.arrayOf(prop_types.default.object),
    style: prop_types.default.arrayOf(prop_types.default.object),
    title: prop_types.default.string,
    titleAttributes: prop_types.default.object,
    titleTemplate: prop_types.default.string
  }, _class.defaultProps = {
    defer: true,
    encodeSpecialCharacters: true
  }, _class.peek = Component.peek, _class.rewind = function() {
    var mappedState = Component.rewind();
    if (!mappedState) {
      mappedState = mapStateOnServer({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: true,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
    return mappedState;
  }, _temp;
};
var NullComponent = function NullComponent2() {
  return null;
};
var HelmetSideEffects = react_side_effect.default(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);
var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;
var Helmet_default = HelmetExport;

// export.js
export {
  HelmetExport as Helmet,
  Helmet_default as default
};
