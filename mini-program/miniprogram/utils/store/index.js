// utils/store/index.js
/**
 * 简单状态管理器
 * 提供全局状态管理功能
 */
const Store = {
  data: {
    userInfo: {},
    language: 'zh',
    theme: 'light',
    fontScaleFactor: 1,
    isElderlyMode: false
  },
  
  // 监听器集合
  listeners: {},
  
  /**
   * 获取状态
   * @param {string} key - 状态键
   * @returns {any} 状态值
   */
  get(key) {
    return this.data[key];
  },
  
  /**
   * 设置状态
   * @param {string} key - 状态键
   * @param {any} value - 状态值
   * @returns {any} 设置的值
   */
  set(key, value) {
    this.data[key] = value;
    // 通知监听器
    this._notify(key, value);
    return value;
  },
  
  /**
   * 监听状态变化
   * @param {string} key - 状态键
   * @param {Function} callback - 回调函数
   * @returns {Function} 取消订阅方法
   */
  subscribe(key, callback) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);
    
    // 返回取消订阅方法
    return () => {
      this.listeners[key] = this.listeners[key].filter(cb => cb !== callback);
    };
  },
  
  /**
   * 通知监听器
   * @private
   * @param {string} key - 状态键
   * @param {any} value - 状态值
   */
  _notify(key, value) {
    const callbacks = this.listeners[key] || [];
    callbacks.forEach(callback => {
      try {
        callback(value);
      } catch (error) {
        console.error('Store notification error:', error);
      }
    });
  }
};

module.exports = Store;