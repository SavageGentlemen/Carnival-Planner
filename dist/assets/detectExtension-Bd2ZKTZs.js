import { a as toFunctionSelector } from "./bundler-Dmn5v2kr.js";
function detectMethod(options) {
  const fnSelector = Array.isArray(options.method) ? options.method[0] : toFunctionSelector(options.method);
  return options.availableSelectors.includes(fnSelector);
}
export {
  detectMethod as d
};
