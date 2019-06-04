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

export default {
  debounce,
};