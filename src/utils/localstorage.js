/**
 * @summary 
 * @param {*} key 
 * @param {*} value 
 * @param {*} type  类型：string, array, object.默认string
 */
export const setLocalStorage = (key, value, type) => {
  const oldStorage = localStorage.getItem(key);
  let data;
  switch (type) {
    case 'array':
      const arr = oldStorage ? oldStorage.split(',') : [];
      if (arr.length >= 10) {
        arr.shift(0);
        arr.push(value)
      } else {
        arr.push(value);
      }
      data = Array.from(new Set(arr));
      break;
    case 'object':
      data = JSON.parse(oldStorage);
      data[key] = value;
      break;
    default:
      data = value;
      break;
  }
  localStorage.setItem(key, data);
}
/**
 * @summary 获取本地缓存
 * @param {*} key 
 * @param {*} type   类型：string, array, object.默认string
 */
export const getLocalStorage = (key, type) => {
  const data = localStorage.getItem(key);
  let result;
  switch (type) {
    case 'array':
      const arr = data ? data.split(',') : [];
      result = arr;
      break;
    case 'object':
      result = JSON.parse(data);
      break;
    default:
      result = data;
      break;
  }
  return result;
}

/**
 * @summary 清空缓存
 * @param {*} key 
 */
export const clearLocalStorage = (key) => {
  localStorage.removeItem(key);
}