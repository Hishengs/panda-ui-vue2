import { isServer } from './index.js';
import Touch from './touch.ts';

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const OVERFLOW_RE = /scroll|auto/i;

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

let cachedScrollerWidth;
export function getScrollBarSize (fresh) {
  if (isServer) return 0;
  if (fresh || cachedScrollerWidth === undefined) {
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

    cachedScrollerWidth = widthContained - widthScroll;
  }
  return cachedScrollerWidth;
}

const camelCase = function(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

export function getStyle (element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

let cachedHTML;
export function getHtmlElm () {
  if (isServer) return;
  return cachedHTML
    || (cachedHTML = document.documentElement || document.body.parentNode);
}

// 单纯判断 scrollHeight > clientHeight 或者 获取 overflow 都存在问题
// 解决方案：https://segmentfault.com/a/1190000021934483
export function isElScrollable (el) {
  if (!(el instanceof Element)) return false;
  const isOverflow = OVERFLOW_RE.test(getStyle(el, 'overflowY'));
  if (el.scrollTop > 0) return isOverflow;
  el.scrollTop++;
  if (el.scrollTop > 0) {
    // reset
    el.scrollTop = 0;
    return isOverflow;
  } else return false;
}

export function getScrollableEl (el, root) {
  root = root || getHtmlElm();
  let current = el, scrollable = false;

  while (
    current &&
    current.tagName !== 'HTML' &&
    current.nodeType === 1 &&
    root &&
    current !== root
  ) {
    if (isElScrollable(current)) {
      scrollable = true;
      break;
    }
    current = current.parentElement;
  }

  if (scrollable) return current;
}

let locking = false;
let unlock;

function disableRubberEffect (el) {
  const touch = new Touch(document.body, true);
  const onTouchStart = (e) => touch.touchstart(e);
  const onTouchMove = (e) => {
    touch.touchmove(e);
    const scrollable = !!touch.scrollableEl;
    const { atTop, atBottom } = touch.scrollableElInfo;
    const shouldPrevent = !el.contains(e.target) || !scrollable
      || scrollable && atTop && touch.swipeDistance > 0
      || scrollable && atBottom && touch.swipeDistance < 0;
    if (e.cancelable && shouldPrevent) {
      e.preventDefault();
    }
  }
  const onTouchEnd = (e) => touch.touchend(e);
  const onTouchCancel = (e) => touch.touchcancel(e);
  document.body.addEventListener('touchstart', onTouchStart);
  document.body.addEventListener('touchmove', onTouchMove, { passive: false });
  document.body.addEventListener('touchend', onTouchEnd);
  document.body.addEventListener('touchcancel', onTouchCancel);

  return function unDisableRubberEffect () {
    document.body.removeEventListener('touchstart', onTouchStart);
    document.body.removeEventListener('touchmove', onTouchMove, { passive: false });
    document.body.removeEventListener('touchend', onTouchEnd);
    document.body.removeEventListener('touchcancel', onTouchCancel);
  }
}

export function lockOuterScroll (el, noRubberEffect = false) {
  if (locking) return;
  if (!el || el.nodeType !== 1) return;
  locking = true;
  const scrollingElement = document.scrollingElement
    || document.documentElement || document.body;
  const scrollBarWidth = getScrollBarSize();
  const scrollTop = scrollingElement.scrollTop;
  const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
  const bodyOverflowY = getStyle(document.body, 'overflowY');
  const prevBodyPaddinigRight = document.body.style.paddingRight;
  const prevTop = document.body.style.top;
  const cPaddingRight = parseInt(getStyle(document.body, 'paddingRight'), 10);
  const html = getHtmlElm();
  // lock
  if (bodyHasOverflow || bodyOverflowY === 'scroll') {
    document.body.style.paddingRight = cPaddingRight + scrollBarWidth + 'px';
    html && addClass(html, 'klk-lock-body-scroll');
    document.body.style.top = -scrollTop + 'px';
  }
  let unDisableRubberEffect;
  if (noRubberEffect) {
    // disable rubber effect on ios
    unDisableRubberEffect = disableRubberEffect(el);
  }
  // unlock scroll
  unlock = function () {
    document.body.style.paddingRight = prevBodyPaddinigRight;
    html && removeClass(html, 'klk-lock-body-scroll');
    document.body.style.top = prevTop;
    document.body.scrollTop = scrollTop;
    if (document.documentElement) {
      document.documentElement.scrollTop = scrollTop;
    }
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = scrollTop;
    }
    if (noRubberEffect) {
      unDisableRubberEffect && unDisableRubberEffect();
    }
  }
}

export function unlockOuterScroll () {
  unlock && unlock();
  locking = false;
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