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

export default {
  debounce,
  getMaxOf,
};