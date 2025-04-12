// pages/index/modules/accessibilityManager.js
const accessibility = require("../../../utils/accessibility");

/**
 * 适老化和字体管理模块
 * 管理字体大小、缩放和适老化功能
 */
const accessibilityManager = {
  /**
   * 初始化适老化功能
   * @param {Object} page - 页面实例
   */
  initAccessibility(page) {
    page.applyAccessibilitySettings = this.applyAccessibilitySettings.bind(page);
    page.getSystemFontSize = this.getSystemFontSize.bind(page);
  },
  
  /**
   * 应用适老化设置
   */
  applyAccessibilitySettings() {
    // 获取应用全局的字体缩放系数
    const accessibilityInfo = accessibility.getAccessibilityInfo();
    
    // 计算缩放后的字体大小
    const scaledNavFontSize = accessibility.scaleFontSize(30); // 导航栏字体
    const scaledBodyFontSize = Math.round(16 * accessibilityInfo.fontScaleFactor); // 正文字体(px)
    const scaledCodeFontSize = Math.round(14 * accessibilityInfo.fontScaleFactor); // 代码字体(px)
    
    this.setData({
      scaledFontSize: scaledNavFontSize,
      scaledBodyFontSize: scaledBodyFontSize,
      scaledCodeFontSize: scaledCodeFontSize,
      isElderlyMode: accessibilityInfo.isElderlyMode
    });
    
    console.log('应用适老化设置', {
      fontScaleFactor: accessibilityInfo.fontScaleFactor,
      scaledNavFontSize,
      scaledBodyFontSize,
      scaledCodeFontSize,
      isElderlyMode: accessibilityInfo.isElderlyMode
    });
  },
  
  /**
   * 获取系统字体大小设置
   */
  getSystemFontSize() {
    try {
      // 使用新的API替代废弃的wx.getSystemInfoAsync
      const appBaseInfo = wx.getAppBaseInfo();
      
      // 微信提供fontSizeSetting，表示用户设置的字体大小
      const fontSizeSetting = appBaseInfo.fontSizeSetting || 16;
      let fontSize = 'normal';
      
      if (fontSizeSetting <= 15) {
        fontSize = 'small';
      } else if (fontSizeSetting >= 18) {
        fontSize = 'large';
      }
      
      this.setData({ fontSize });
    } catch (e) {
      console.error('获取系统字体大小失败', e);
    }
  }
};

module.exports = accessibilityManager;