export function getComputedStyle (el, style) {
  return style ? global.document.defaultView.getComputedStyle(el)[style] : global.document.defaultView.getComputedStyle(el);
}

export function hasClass (el, clsName) {
  if (!el) return false;
  const classNames = el.className.split(' ').filter(name => name !== '');
  return classNames.includes(clsName);
}

export function addClass (el, clsName) {
  if (!el) return;
  const classNames = el.className.split(' ').filter(name => name !== '');
  if (!classNames.includes(clsName)) {
    classNames.push(clsName);
    /* eslint-disable no-param-reassign */
    el.className = classNames.join(' ');
  }
}

export function removeClass (el, clsName) {
  if (!el) return;
  const classNames = el.className.split(' ').filter(name => name !== '');
  const index = classNames.indexOf(clsName);
  if (index >= 0) {
    classNames.splice(index, 1);
    /* eslint-disable no-param-reassign */
    el.className = classNames.join(' ');
  }
}

export default {
  getComputedStyle,
  hasClass,
  addClass,
  removeClass,
};