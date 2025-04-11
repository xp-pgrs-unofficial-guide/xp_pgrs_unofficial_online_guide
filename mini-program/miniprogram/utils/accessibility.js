const Store = require('./store/index');

/**
 * 适老化和辅助功能工具
 * 处理字体缩放和关怀模式相关功能
 */
const accessibility = {
  /**
   * 获取应用的辅助功能信息
   * @returns {Object} 包含缩放系数和关怀模式状态的对象
   */
  getAccessibilityInfo() {
    const app = getApp();
    // 防止 app 为 undefined 的情况
    const fontScaleFactor = Store.get('fontScaleFactor') || (app && app.globalData ? app.globalData.fontScaleFactor : 1);
    const isElderlyMode = Store.get('isElderlyMode') || (app && app.globalData ? app.globalData.isElderlyMode : false);
    
    return {
      fontScaleFactor,
      isElderlyMode
    };
  },
  
  /**
   * 根据当前缩放系数计算字体大小
   * @param {number} fontSize - 原始字体大小 (rpx)
   * @returns {number} 缩放后的字体大小 (rpx)
   */
  scaleFontSize(fontSize) {
    const { fontScaleFactor } = this.getAccessibilityInfo();
    return Math.round(fontSize * fontScaleFactor);
  },
  
  /**
   * 根据当前缩放系数计算尺寸（用于宽度、高度、内边距等）
   * @param {number} size - 原始尺寸 (rpx)
   * @returns {number} 缩放后的尺寸 (rpx)
   */
  scaleSize(size) {
    const { fontScaleFactor } = this.getAccessibilityInfo();
    return Math.round(size * fontScaleFactor);
  },
  
  /**
   * 更新应用的适老化设置
   * @param {number} fontSizeSetting - 系统字体大小设置
   */
  updateAccessibilitySettings(fontSizeSetting) {
    let fontScaleFactor = 1;
    let isElderlyMode = false;
    
    // 根据系统字体大小计算缩放系数和关怀模式状态
    if (fontSizeSetting >= 23) {
      fontScaleFactor = 1.4;
      isElderlyMode = true;
    } else if (fontSizeSetting >= 20) {
      fontScaleFactor = 1.25;
    } else if (fontSizeSetting >= 18) {
      fontScaleFactor = 1.12;
    }
    
    // 更新全局状态
    Store.set('fontScaleFactor', fontScaleFactor);
    Store.set('isElderlyMode', isElderlyMode);
    
    // 同时更新 app 全局数据以保持一致性
    const app = getApp();
    // 防止 app 为 undefined 的情况
    if (app && app.globalData) {
      app.globalData.fontScaleFactor = fontScaleFactor;
      app.globalData.isElderlyMode = isElderlyMode;
    }
    
    return {
      fontScaleFactor,
      isElderlyMode
    };
  }
};

module.exports = accessibility;