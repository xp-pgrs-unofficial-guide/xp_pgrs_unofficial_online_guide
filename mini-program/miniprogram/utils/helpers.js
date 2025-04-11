// utils/helpers.js
/**
 * 通用工具函数
 * 提供跨模块使用的常用功能
 */
const helpers = {
  /**
   * 防抖函数，限制函数的执行频率
   * @param {Function} func - 要执行的函数
   * @param {number} wait - 等待时间（毫秒）
   * @param {boolean} immediate - 是否立即执行
   * @returns {Function} 防抖处理后的函数
   */
  debounce(func, wait = 300, immediate = false) {
    let timeout;
    return function(...args) {
      const context = this;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },
  
  /**
   * 节流函数，限制函数在一定时间内只执行一次
   * @param {Function} func - 要执行的函数
   * @param {number} wait - 等待时间（毫秒）
   * @returns {Function} 节流处理后的函数
   */
  throttle(func, wait = 300) {
    let timeout = null;
    let previous = 0;
    
    return function(...args) {
      const context = this;
      const now = Date.now();
      
      if (now - previous > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(() => {
          previous = Date.now();
          timeout = null;
          func.apply(context, args);
        }, wait - (now - previous));
      }
    };
  },
  
  /**
   * 深拷贝对象
   * @param {any} obj - 要复制的对象
   * @returns {any} 拷贝后的对象
   */
  deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    
    // 处理日期对象
    if (obj instanceof Date) {
      return new Date(obj);
    }
    
    // 处理数组
    if (Array.isArray(obj)) {
      return obj.map(item => this.deepClone(item));
    }
    
    // 处理对象
    const clone = {};
    Object.keys(obj).forEach(key => {
      clone[key] = this.deepClone(obj[key]);
    });
    
    return clone;
  },
  
  /**
   * 格式化日期时间
   * @param {Date|number|string} date - 日期对象、时间戳或日期字符串
   * @param {string} format - 格式模板，如 'YYYY-MM-DD HH:mm:ss'
   * @returns {string} 格式化后的日期字符串
   */
  formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
    const d = date instanceof Date ? date : new Date(date);
    
    if (isNaN(d.getTime())) {
      return 'Invalid Date';
    }
    
    const padZero = num => num.toString().padStart(2, '0');
    
    const replacements = {
      'YYYY': d.getFullYear(),
      'MM': padZero(d.getMonth() + 1),
      'DD': padZero(d.getDate()),
      'HH': padZero(d.getHours()),
      'mm': padZero(d.getMinutes()),
      'ss': padZero(d.getSeconds())
    };
    
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => replacements[match]);
  }
};

module.exports = helpers;