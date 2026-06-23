import { P as PropTypes, j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { g as getDefaultExportFromCjs, r as reactExports, R as React$1 } from "./vendor-swr-BEHUV5vo.js";
import { h as html2canvas } from "./html2canvas.esm-s7HdUlmq.js";
import "./vendor-maps-DCMhh9kT.js";
const visual_style = {
  colors: {
    royal_purple: "#4B0082",
    metallic_gold: "Gold"
  },
  imagery_keywords: [
    "High-definition feathers",
    "champagne bubbles",
    "confetti",
    "blurred city lights",
    "smartphone interfaces"
  ]
};
const cta_library = [
  "Own the road. Download the app.",
  "Don't get left behind. Map your season now.",
  "The vibes are calling. Are you ready?",
  "Your fete, your rules. Plan it better."
];
const brandConfig = {
  visual_style,
  cta_library
};
var SchemaType;
(function(SchemaType2) {
  SchemaType2["STRING"] = "string";
  SchemaType2["NUMBER"] = "number";
  SchemaType2["INTEGER"] = "integer";
  SchemaType2["BOOLEAN"] = "boolean";
  SchemaType2["ARRAY"] = "array";
  SchemaType2["OBJECT"] = "object";
})(SchemaType || (SchemaType = {}));
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ExecutableCodeLanguage;
(function(ExecutableCodeLanguage2) {
  ExecutableCodeLanguage2["LANGUAGE_UNSPECIFIED"] = "language_unspecified";
  ExecutableCodeLanguage2["PYTHON"] = "python";
})(ExecutableCodeLanguage || (ExecutableCodeLanguage = {}));
var Outcome;
(function(Outcome2) {
  Outcome2["OUTCOME_UNSPECIFIED"] = "outcome_unspecified";
  Outcome2["OUTCOME_OK"] = "outcome_ok";
  Outcome2["OUTCOME_FAILED"] = "outcome_failed";
  Outcome2["OUTCOME_DEADLINE_EXCEEDED"] = "outcome_deadline_exceeded";
})(Outcome || (Outcome = {}));
var HarmCategory;
(function(HarmCategory2) {
  HarmCategory2["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
  HarmCategory2["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
  HarmCategory2["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
  HarmCategory2["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
  HarmCategory2["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
  HarmCategory2["HARM_CATEGORY_CIVIC_INTEGRITY"] = "HARM_CATEGORY_CIVIC_INTEGRITY";
})(HarmCategory || (HarmCategory = {}));
var HarmBlockThreshold;
(function(HarmBlockThreshold2) {
  HarmBlockThreshold2["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
  HarmBlockThreshold2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
  HarmBlockThreshold2["BLOCK_NONE"] = "BLOCK_NONE";
})(HarmBlockThreshold || (HarmBlockThreshold = {}));
var HarmProbability;
(function(HarmProbability2) {
  HarmProbability2["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
  HarmProbability2["NEGLIGIBLE"] = "NEGLIGIBLE";
  HarmProbability2["LOW"] = "LOW";
  HarmProbability2["MEDIUM"] = "MEDIUM";
  HarmProbability2["HIGH"] = "HIGH";
})(HarmProbability || (HarmProbability = {}));
var BlockReason;
(function(BlockReason2) {
  BlockReason2["BLOCKED_REASON_UNSPECIFIED"] = "BLOCKED_REASON_UNSPECIFIED";
  BlockReason2["SAFETY"] = "SAFETY";
  BlockReason2["OTHER"] = "OTHER";
})(BlockReason || (BlockReason = {}));
var FinishReason;
(function(FinishReason2) {
  FinishReason2["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
  FinishReason2["STOP"] = "STOP";
  FinishReason2["MAX_TOKENS"] = "MAX_TOKENS";
  FinishReason2["SAFETY"] = "SAFETY";
  FinishReason2["RECITATION"] = "RECITATION";
  FinishReason2["LANGUAGE"] = "LANGUAGE";
  FinishReason2["BLOCKLIST"] = "BLOCKLIST";
  FinishReason2["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
  FinishReason2["SPII"] = "SPII";
  FinishReason2["MALFORMED_FUNCTION_CALL"] = "MALFORMED_FUNCTION_CALL";
  FinishReason2["OTHER"] = "OTHER";
})(FinishReason || (FinishReason = {}));
var TaskType;
(function(TaskType2) {
  TaskType2["TASK_TYPE_UNSPECIFIED"] = "TASK_TYPE_UNSPECIFIED";
  TaskType2["RETRIEVAL_QUERY"] = "RETRIEVAL_QUERY";
  TaskType2["RETRIEVAL_DOCUMENT"] = "RETRIEVAL_DOCUMENT";
  TaskType2["SEMANTIC_SIMILARITY"] = "SEMANTIC_SIMILARITY";
  TaskType2["CLASSIFICATION"] = "CLASSIFICATION";
  TaskType2["CLUSTERING"] = "CLUSTERING";
})(TaskType || (TaskType = {}));
var FunctionCallingMode;
(function(FunctionCallingMode2) {
  FunctionCallingMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
  FunctionCallingMode2["AUTO"] = "AUTO";
  FunctionCallingMode2["ANY"] = "ANY";
  FunctionCallingMode2["NONE"] = "NONE";
})(FunctionCallingMode || (FunctionCallingMode = {}));
var DynamicRetrievalMode;
(function(DynamicRetrievalMode2) {
  DynamicRetrievalMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
  DynamicRetrievalMode2["MODE_DYNAMIC"] = "MODE_DYNAMIC";
})(DynamicRetrievalMode || (DynamicRetrievalMode = {}));
var Task;
(function(Task2) {
  Task2["GENERATE_CONTENT"] = "generateContent";
  Task2["STREAM_GENERATE_CONTENT"] = "streamGenerateContent";
  Task2["COUNT_TOKENS"] = "countTokens";
  Task2["EMBED_CONTENT"] = "embedContent";
  Task2["BATCH_EMBED_CONTENTS"] = "batchEmbedContents";
})(Task || (Task = {}));
[
  FinishReason.RECITATION,
  FinishReason.SAFETY,
  FinishReason.LANGUAGE
];
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
console.log("[MarketingService] API_KEY exists:", false);
console.log("[MarketingService] API_KEY value (first 10 chars):", "undefined");
const isSimulationMode = true;
console.log("[MarketingService] isSimulationMode:", isSimulationMode);
const getSimulatedResponse = async (vibeInput, platforms) => {
  function generateCaption(platform) {
    const emojis = ["🔥", "🎭", "📍", "🥂", "🇹🇹", "💃🏽"];
    const openers = [
      "Ready for de road?",
      "Yuh not ready yet?",
      "The countdown is ON!",
      "Who drinking with we?",
      "Mas is life!"
    ];
    const cta = brandConfig.cta_library[Math.floor(Math.random() * brandConfig.cta_library.length)];
    const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];
    let caption = `${openers[Math.floor(Math.random() * openers.length)]} ${randomEmoji()}

`;
    caption += `${vibeInput} We making sure your carnival experience is seamless. No stress, just vibes. ${randomEmoji()}

`;
    if (platform === "TikTok" || platform === "IG") {
      caption += `tap the link in bio! ${cta}`;
    } else {
      caption += `${cta}`;
    }
    return caption;
  }
  function generateVisualStrategy() {
    const elements = brandConfig.visual_style.imagery_keywords;
    const suggestion = elements[Math.floor(Math.random() * elements.length)];
    return `Focus on: ${suggestion}. 

Idea: Show a high-energy clip related to "${vibeInput}" with a ${brandConfig.visual_style.colors.royal_purple} and ${brandConfig.visual_style.colors.metallic_gold} overlay. Keep it under 15s for high retention.`;
  }
  function generateHashtags() {
    const baseTags = ["#Carnival2026", "#CarnivalPlanner", "#Soca", "#Mas", "#FeteList"];
    const dynamicTags = ["#TrinidadCarnival", "#CropOver", "#MiamiCarnival", "#Spicemas", "#VincyMas"];
    const shuffled = dynamicTags.sort(() => 0.5 - Math.random());
    return [...baseTags, ...shuffled.slice(0, 3)];
  }
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return platforms.map((platform) => ({
    platform,
    caption: generateCaption(platform),
    visualStrategy: generateVisualStrategy(),
    hashtags: generateHashtags()
  }));
};
async function generateMarketingImage(vibeInput, style = "vibrant") {
  {
    console.warn("No Google API Key found. Cannot generate AI images.");
    return { success: false, error: "API key not configured" };
  }
}
async function generateMarketingContent(vibeInput, platforms) {
  {
    console.warn("No Google API Key found (VITE_GOOGLE_API_KEY). Using simulation mode.");
    return getSimulatedResponse(vibeInput, platforms);
  }
}
function _interopDefault$1(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}
var React = reactExports;
var React__default = _interopDefault$1(React);
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
function withSideEffect(reducePropsToState3, handleStateChangeOnClient, mapStateOnServer3) {
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
    }(React.PureComponent);
    _defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");
    _defineProperty(SideEffect, "canUseDOM", canUseDOM);
    return SideEffect;
  };
}
var lib = withSideEffect;
const withSideEffect$1 = /* @__PURE__ */ getDefaultExportFromCjs(lib);
var hasElementType = typeof Element !== "undefined";
var hasMap = typeof Map === "function";
var hasSet = typeof Set === "function";
var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
function equal(a, b) {
  if (a === b) return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor) return false;
    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; )
        if (!equal(a[i], b[i])) return false;
      return true;
    }
    var it;
    if (hasMap && a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!equal(i.value[1], b.get(i.value[0]))) return false;
      return true;
    }
    if (hasSet && a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      return true;
    }
    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; )
        if (a[i] !== b[i]) return false;
      return true;
    }
    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === "function" && typeof b.valueOf === "function") return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString && typeof a.toString === "function" && typeof b.toString === "function") return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;
    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    if (hasElementType && a instanceof Element) return false;
    for (i = length; i-- !== 0; ) {
      if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) {
        continue;
      }
      if (!equal(a[keys[i]], b[keys[i]])) return false;
    }
    return true;
  }
  return a !== a && b !== b;
}
var reactFastCompare = function isEqual(a, b) {
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
const isEqual2 = /* @__PURE__ */ getDefaultExportFromCjs(reactFastCompare);
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
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
var objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
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
const objectAssign$1 = /* @__PURE__ */ getDefaultExportFromCjs(objectAssign);
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
Object.keys(TAG_NAMES).map(function(name) {
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
var createClass = /* @__PURE__ */ function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
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
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};
var objectWithoutProperties = function(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
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
      var tagUnion = objectAssign$1({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);
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
  return [React$1.createElement(TAG_NAMES.TITLE, props, title)];
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
        mappedTag.dangerouslySetInnerHTML = { __html: content };
      } else {
        mappedTag[mappedAttribute] = tag[attribute];
      }
    });
    return React$1.createElement(type, mappedTag);
  });
};
var getMethodsForTag = function getMethodsForTag2(type, tags, encode) {
  switch (type) {
    case TAG_NAMES.TITLE:
      return {
        toComponent: function toComponent() {
          return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes);
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
    title: getMethodsForTag(TAG_NAMES.TITLE, { title, titleAttributes }, encode)
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
      return !isEqual2(this.props, nextProps);
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
      return true;
    };
    HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
      var _this2 = this;
      var arrayTypeChildren = {};
      React$1.Children.forEach(children, function(child) {
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
      return React$1.createElement(Component, newProps);
    };
    createClass(HelmetWrapper, null, [{
      key: "canUseDOM",
      // Component.peek comes from react-side-effect:
      // For testing, you may use a static peek() method available on the returned component.
      // It lets you get the current state without resetting the mounted instance stack.
      // Don’t use it for anything other than testing.
      /**
       * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
       * @param {Object} bodyAttributes: {"className": "root"}
       * @param {String} defaultTitle: "Default Title"
       * @param {Boolean} defer: true
       * @param {Boolean} encodeSpecialCharacters: true
       * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
       * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
       * @param {Array} meta: [{"name": "description", "content": "Test description"}]
       * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
       * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
       * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
       * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
       * @param {String} title: "Title"
       * @param {Object} titleAttributes: {"itemprop": "name"}
       * @param {String} titleTemplate: "MySite.com - %s"
       */
      set: function set$$1(canUseDOM2) {
        Component.canUseDOM = canUseDOM2;
      }
    }]);
    return HelmetWrapper;
  }(React$1.Component), _class.propTypes = {
    base: PropTypes.object,
    bodyAttributes: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    defaultTitle: PropTypes.string,
    defer: PropTypes.bool,
    encodeSpecialCharacters: PropTypes.bool,
    htmlAttributes: PropTypes.object,
    link: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.arrayOf(PropTypes.object),
    noscript: PropTypes.arrayOf(PropTypes.object),
    onChangeClientState: PropTypes.func,
    script: PropTypes.arrayOf(PropTypes.object),
    style: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    titleAttributes: PropTypes.object,
    titleTemplate: PropTypes.string
  }, _class.defaultProps = {
    defer: true,
    encodeSpecialCharacters: true
  }, _class.peek = Component.peek, _class.rewind = function() {
    var mappedState = Component.rewind();
    if (!mappedState) {
      mappedState = mapStateOnServer({
        baseTag: [],
        bodyAttributes: {},
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
var HelmetSideEffects = withSideEffect$1(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);
var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;
const Button = ({ children, onClick, disabled, className, variant = "primary" }) => {
  const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center";
  const styles = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600",
    ghost: "bg-transparent hover:bg-gray-800 text-purple-400"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick,
      disabled,
      className: `${baseStyle} ${styles[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`,
      children
    }
  );
};
const Textarea = ({ value, onChange, placeholder, className }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "textarea",
  {
    value,
    onChange,
    placeholder,
    className: `w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 ${className}`
  }
);
const Checkbox = ({ id, checked, onCheckedChange }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "input",
  {
    type: "checkbox",
    id,
    checked,
    onChange: (e) => onCheckedChange(e.target.checked),
    className: "w-5 h-5 text-purple-600 rounded bg-gray-700 border-gray-600 focus:ring-purple-500"
  }
);
function MarketingDashboard() {
  const [vibeInput, setVibeInput] = reactExports.useState("");
  const [selectedPlatforms, setSelectedPlatforms] = reactExports.useState(["IG"]);
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const [results, setResults] = reactExports.useState([]);
  const [flyerStyle, setFlyerStyle] = reactExports.useState("vibrant");
  const [aiImage, setAiImage] = reactExports.useState(null);
  const [isGeneratingImage, setIsGeneratingImage] = reactExports.useState(false);
  const flyerStyles = {
    vibrant: {
      name: "Vibrant",
      bg: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900",
      text: "text-white",
      accent: "bg-white/10",
      border: "border-white/10"
    },
    midnight: {
      name: "Midnight",
      bg: "bg-gray-950",
      text: "text-white",
      accent: "bg-purple-900/30",
      border: "border-gray-800"
    },
    gold: {
      name: "Carnival Gold",
      bg: "bg-gradient-to-br from-yellow-600 via-amber-500 to-yellow-700",
      text: "text-white",
      accent: "bg-black/20",
      border: "border-white/20"
    }
  };
  reactExports.useRef(null);
  const platforms = ["IG", "FB", "TikTok", "X"];
  const togglePlatform = (platform) => {
    setSelectedPlatforms(
      (prev) => prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };
  const handleGenerate = async () => {
    if (!vibeInput.trim()) {
      alert("Please tell us what you want to post about!");
      return;
    }
    if (selectedPlatforms.length === 0) {
      alert("Please select at least one platform.");
      return;
    }
    setIsGenerating(true);
    try {
      const generatedContent = await generateMarketingContent(vibeInput, selectedPlatforms);
      setResults(generatedContent);
    } catch (error) {
      console.error("Generation error:", error);
      alert("Something went wrong generating the content.");
    } finally {
      setIsGenerating(false);
    }
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };
  const downloadFlyer = async (result) => {
    const element = document.getElementById(`flyer-${result.platform}`);
    if (!element) return;
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#1f2937",
        // dark bg
        useCORS: true
      });
      canvas.toBlob((blob) => {
        if (!blob) {
          alert("Could not generate flyer image.");
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `carnival-flyer-${result.platform}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 100);
      }, "image/png");
    } catch (err) {
      console.error("Flyer generation failed:", err);
      alert("Could not generate flyer image.");
    }
  };
  const handleGenerateAiImage = async () => {
    if (!vibeInput.trim()) {
      alert("Please enter a topic/idea first!");
      return;
    }
    setIsGeneratingImage(true);
    setAiImage(null);
    try {
      const result = await generateMarketingImage(vibeInput, flyerStyle);
      if (result.success) {
        setAiImage({
          data: result.imageData,
          mimeType: result.mimeType
        });
      } else {
        alert(result.error || "Failed to generate image. Try a different prompt.");
      }
    } catch (error) {
      console.error("AI image generation error:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  };
  const downloadAiImage = () => {
    if (!aiImage) return;
    const link = document.createElement("a");
    link.download = `carnival-ai-image-${Date.now()}.png`;
    link.href = `data:${aiImage.mimeType};base64,${aiImage.data}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const openAiImageInNewTab = () => {
    if (!aiImage) return;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`<img src="data:${aiImage.mimeType};base64,${aiImage.data}" style="max-width: 100%; height: auto;">`);
      newWindow.document.title = "AI Generated Image";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-950 text-white p-4 md:p-8 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HelmetExport, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Carnival Marketing Agent | Caribbean Carnival Planner" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent", children: "Carnival Marketing Agent 🎭" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-lg", children: "Turn your fete updates into viral vibes. Powered by Google Gemini AI & Carnival Brand Engine." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-yellow-900/30 text-yellow-500 text-xs p-2 rounded border border-yellow-800 max-w-[200px]", children: "⚠️ Simulation Mode. Add VITE_GOOGLE_API_KEY to .env for Real AI." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1 h-fit border border-purple-900/50 bg-gray-900/60 p-6 rounded-xl backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-1", children: "Input Your Vibe" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: `What's happening? (e.g., "Costume pickup starts tomorrow")` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-gray-300", children: "Topic / Idea" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                placeholder: "Ex: New fete added to the lineup! It's a cooler fete...",
                className: "min-h-[150px] resize-none",
                value: vibeInput,
                onChange: (e) => setVibeInput(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-gray-300", children: "Target Platforms" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: platforms.map((platform) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 border border-gray-700 rounded-md p-3 hover:bg-gray-800 cursor-pointer", onClick: () => togglePlatform(platform), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: platform,
                  checked: selectedPlatforms.includes(platform),
                  onCheckedChange: () => togglePlatform(platform)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: platform,
                  className: "text-sm font-medium cursor-pointer",
                  children: platform
                }
              )
            ] }, platform)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full h-12 text-lg",
              onClick: handleGenerate,
              disabled: isGenerating,
              children: isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" }),
                "Generating..."
              ] }) : "Generate Content 🚀"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-gray-700 mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full h-10",
                variant: "secondary",
                onClick: handleGenerateAiImage,
                disabled: isGeneratingImage || isSimulationMode,
                children: isGeneratingImage ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" }),
                  "Creating Image..."
                ] }) : "✨ Generate AI Image"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-2 text-center", children: "AI Image requires API key" })
          ] }),
          aiImage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-300", children: "AI Generated Image" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", className: "px-2 py-1 text-xs", onClick: openAiImageInNewTab, title: "Open in new tab to save", children: "Open ↗" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", className: "px-3 py-1 text-xs", onClick: downloadAiImage, children: "Download 📥" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg overflow-hidden border border-purple-500/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: `data:${aiImage.mimeType};base64,${aiImage.data}`,
                alt: "AI Generated Carnival Image",
                className: "w-full h-auto"
              }
            ) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-6", children: results.length > 0 ? results.map((result, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-gray-800 rounded-xl overflow-hidden bg-gray-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-purple-900/20 p-3 border-b border-gray-800 flex justify-between items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-purple-400 flex items-center gap-2", children: [
          result.platform === "IG" && "Instagram",
          result.platform === "FB" && "Facebook",
          result.platform === "TikTok" && "TikTok",
          result.platform === "X" && "X (Twitter)"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-500 uppercase tracking-wider", children: "Caption" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-xs text-purple-400 hover:text-purple-300 font-medium", onClick: () => copyToClipboard(result.caption + "\n\n" + result.hashtags.join(" ")), children: "Copy Text" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                className: "w-full bg-gray-800/50 p-4 rounded-md text-sm leading-relaxed border border-gray-700/50 h-[250px] focus:ring-2 focus:ring-purple-600 focus:outline-none resize-none",
                value: result.caption,
                onChange: (e) => {
                  const newResults = [...results];
                  newResults[index].caption = e.target.value;
                  setResults(newResults);
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500", children: [
              "Hashtags: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-400/80", children: result.hashtags.join(" ") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-500 uppercase tracking-wider", children: "Flyer Preview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", className: "px-2 py-1 text-xs", onClick: () => {
                  const element = document.getElementById(`flyer-${result.platform}`);
                  if (element) {
                    html2canvas(element, { scale: 2, backgroundColor: "#1f2937", useCORS: true }).then((canvas) => {
                      const win = window.open();
                      if (win) {
                        win.document.write(`<img src="${canvas.toDataURL()}" style="max-width: 100%; height: auto;">`);
                        win.document.title = "Carnival Flyer";
                      }
                    });
                  }
                }, title: "Open in new tab", children: "Open ↗" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", className: "px-3 py-1 text-xs", onClick: () => downloadFlyer(result), children: "Download 📥" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: Object.entries(flyerStyles).map(([key, style]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setFlyerStyle(key),
                className: `px-3 py-1 rounded-full text-xs font-medium transition-all ${flyerStyle === key ? "bg-white text-purple-900 ring-2 ring-purple-500" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`,
                children: style.name
              },
              key
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                id: `flyer-${result.platform}`,
                className: `relative aspect-[4/5] ${flyerStyles[flyerStyle].bg} rounded-lg p-6 flex flex-col justify-between overflow-hidden shadow-2xl border ${flyerStyles[flyerStyle].border}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-8 h-8 rounded-full ${flyerStyles[flyerStyle].accent} flex items-center justify-center text-lg`, children: "🎭" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold tracking-widest uppercase ${flyerStyles[flyerStyle].text} opacity-70`, children: "Caribbean Carnival Planner" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: `text-2xl font-black ${flyerStyles[flyerStyle].text} leading-tight drop-shadow-lg`, children: vibeInput.length > 30 ? vibeInput.substring(0, 30) + "..." : vibeInput })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative z-10 my-4 ${flyerStyles[flyerStyle].accent} backdrop-blur-sm p-3 rounded border ${flyerStyles[flyerStyle].border}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm font-medium ${flyerStyles[flyerStyle].text} opacity-90 leading-relaxed line-clamp-4`, children: result.caption ? result.caption.split("\n")[0] : "Enjoy the vibes!" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block px-4 py-2 bg-yellow-500 text-black font-bold text-xs uppercase tracking-wider rounded-full shadow-lg", children: "Download App 📲" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] text-white/50", children: "www.carnival-planner.com" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-400 italic", children: [
              "💡 AI Suggestion: ",
              result.visualStrategy
            ] })
          ] })
        ] }) })
      ] }, index)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full min-h-[400px] flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-xl bg-gray-900/20 p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-purple-900/20 p-4 rounded-full mb-4 text-purple-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "✨" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-2 text-gray-300", children: "Ready to Promote?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md", children: "Enter your event details or update on the left, select your platforms, and let the AI handle the rest." })
      ] }) })
    ] })
  ] });
}
export {
  MarketingDashboard as default
};
