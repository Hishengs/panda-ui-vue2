export function getComputedStyle (el, style) {
  return style ? global.document.defaultView.getComputedStyle(el)[style] : global.document.defaultView.getComputedStyle(el);
}

export default {
  getComputedStyle,
};