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

// Reference from:
// https://github.com/view-design/ViewUI/blob/1e41ced79749349dfd8d94514218e612cfa829d2/src/utils/assist.js#L19
let cachedWidth;
export function getScrollBarWidth (fresh) {
  if (fresh || cachedWidth === undefined) {
    /* global document */
    const inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = document.createElement('div');
    const outerStyle = outer.style;

    outerStyle.position = 'absolute';
    outerStyle.top = 0;
    outerStyle.left = 0;
    outerStyle.pointerEvents = 'none';
    outerStyle.visibility = 'hidden';
    outerStyle.width = '200px';
    outerStyle.height = '150px';
    outerStyle.overflow = 'hidden';

    outer.appendChild(inner);

    document.body.appendChild(outer);

    const widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);

    cachedWidth = widthContained - widthScroll;
  }
  return cachedWidth;
}

export function on (el, event, callback) {
  return el.addEventListener(event, callback);
}

export function off (el, event, callback) {
  return el.removeEventListener(event, callback);
}

export default {
  getComputedStyle,
  hasClass,
  addClass,
  removeClass,
  getScrollBarWidth,
  on,
  off,
};