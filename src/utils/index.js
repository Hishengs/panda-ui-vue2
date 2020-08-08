import Vue from 'vue';
export * from './comp.js';

export function debounce (fn, t) {
  const timeout = t || 200;
  let timeoutIns;
  /* eslint-disable func-names */
  return function (...args) {
    if (timeoutIns) {
      clearTimeout(timeoutIns);
      timeoutIns = null;
    }
    timeoutIns = setTimeout(() => {
      fn.call(this, ...args);
    }, timeout);
  };
}

export function getMaxOf (nums) {
  return nums.sort()[nums.length - 1];
}

export function on (el, event, callback) {
  el.addEventListener(event, callback);
}

export function off (el, event, callback) {
  el.removeEventListener(event, callback);
}

export const isServer = Vue.prototype.$isServer;

export default {
  debounce,
  getMaxOf,
  on,
  off,
};

export function parseWidth (width) {
  if (!['number', 'string'].includes(typeof width)) return width;
  width = String(width).trim();
  if (/^\d+$/.test(width)) {
    width += 'px';
  }
  return width;
}