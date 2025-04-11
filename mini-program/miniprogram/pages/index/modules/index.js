// pages/index/modules/index.js
/**
 * 页面模块统一导出
 * 方便在页面中统一引入所有模块
 */
const navigation = require('./navigation');
const imageHandler = require('./imageHandler');
const content = require('./content');
const accessibilityManager = require('./accessibilityManager');
const languageManager = require('./languageManager');
const deviceAdapter = require('./deviceAdapter');

/**
 * 初始化所有模块到页面实例
 * @param {Object} page - 页面实例
 */
function initAllModules(page) {
  navigation.initNavigation(page);
  imageHandler.initImageHandler(page);
  content.initContent(page);
  accessibilityManager.initAccessibility(page);
  languageManager.initLanguage(page);
  deviceAdapter.initDeviceAdapter(page);
}

module.exports = {
  navigation,
  imageHandler,
  content,
  accessibilityManager,
  languageManager,
  deviceAdapter,
  initAllModules
};