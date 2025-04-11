// utils/wx-api.js
/**
 * 微信API封装
 * 将微信API包装为Promise形式，使调用更简洁
 */
const wxApi = {
  /**
   * 显示加载提示
   * @param {Object} options - 配置项
   * @returns {Promise} Promise对象
   */
  showLoading(options = { title: '加载中', mask: true }) {
    return new Promise((resolve) => {
      wx.showLoading(options);
      resolve();
    });
  },
  
  /**
   * 隐藏加载提示
   * @returns {Promise} Promise对象
   */
  hideLoading() {
    return new Promise((resolve) => {
      wx.hideLoading();
      resolve();
    });
  },
  
  /**
   * 显示消息提示框
   * @param {Object} options - 配置项
   * @returns {Promise} Promise对象
   */
  showToast(options = { title: '成功', icon: 'success', duration: 1500 }) {
    return new Promise((resolve) => {
      wx.showToast(options);
      setTimeout(resolve, options.duration || 1500);
    });
  },
  
  /**
   * 显示模态对话框
   * @param {Object} options - 配置项
   * @returns {Promise} Promise对象
   */
  showModal(options = { title: '提示', content: '', showCancel: true }) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        ...options,
        success(res) {
          if (res.confirm) {
            resolve(true);
          } else if (res.cancel) {
            resolve(false);
          } else {
            resolve(res);
          }
        },
        fail: reject
      });
    });
  },
  
  /**
   * 获取系统信息
   * @returns {Promise} Promise对象
   */
  getSystemInfo() {
    return new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success: resolve,
        fail: reject
      });
    });
  },
  
  /**
   * 设置剪贴板内容
   * @param {Object} options - 配置项
   * @returns {Promise} Promise对象
   */
  setClipboardData(options) {
    return new Promise((resolve, reject) => {
      wx.setClipboardData({
        ...options,
        success: resolve,
        fail: reject
      });
    });
  },
  
  /**
   * 页面滚动到指定位置
   * @param {Object} options - 配置项
   * @returns {Promise} Promise对象
   */
  pageScrollTo(options) {
    return new Promise((resolve, reject) => {
      wx.pageScrollTo({
        ...options,
        success: resolve,
        fail: reject
      });
    });
  },
  
  /**
   * 获取存储数据
   * @param {string} key - 键名
   * @returns {Promise} Promise对象，解析为存储的数据
   */
  getStorage(key) {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key,
        success: (res) => resolve(res.data),
        fail: reject
      });
    });
  },
  
  /**
   * 设置存储数据
   * @param {string} key - 键名
   * @param {any} data - 要存储的数据
   * @returns {Promise} Promise对象
   */
  setStorage(key, data) {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key,
        data,
        success: resolve,
        fail: reject
      });
    });
  },
  
  /**
   * 从云存储获取临时文件链接
   * @param {Array} fileList - 文件ID列表
   * @returns {Promise} Promise对象，解析为文件链接列表
   */
  getTempFileURL(fileList) {
    return new Promise((resolve, reject) => {
      wx.cloud.getTempFileURL({
        fileList,
        success: resolve,
        fail: reject
      });
    });
  },
  
  /**
   * 预览图片
   * @param {Object} options - 配置项
   * @returns {Promise} Promise对象
   */
  previewImage(options) {
    return new Promise((resolve, reject) => {
      wx.previewImage({
        ...options,
        success: resolve,
        fail: reject
      });
    });
  }
};

module.exports = wxApi;