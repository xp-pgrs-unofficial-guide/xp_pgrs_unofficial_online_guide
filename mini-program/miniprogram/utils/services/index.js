// utils/services/index.js
/**
 * 服务模块统一导出
 * 方便在其他文件中引入多个服务
 */
const cloudStorage = require('./cloudStorage');
const userPreference = require('./userPreference');

module.exports = {
  cloudStorage,
  userPreference
};