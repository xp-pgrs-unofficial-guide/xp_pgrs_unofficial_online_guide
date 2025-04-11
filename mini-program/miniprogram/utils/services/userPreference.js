// utils/services/userPreference.js
/**
 * 用户偏好设置服务
 * 管理用户的语言、阅读位置等偏好设置
 */
const userPreferenceService = {
  /**
   * 保存语言设置
   * @param {string} lang - 语言代码 ('zh' 或 'en')
   * @returns {boolean} 是否保存成功
   */
  saveLanguage(lang) {
    try {
      wx.setStorageSync('user_language', lang);
      return true;
    } catch (e) {
      console.error('保存语言设置失败', e);
      return false;
    }
  },
  
  /**
   * 获取语言设置
   * @returns {string} 语言代码 ('zh' 或 'en')，默认为 'zh'
   */
  getLanguage() {
    try {
      return wx.getStorageSync('user_language') || 'zh';
    } catch (e) {
      console.error('读取语言设置失败', e);
      return 'zh';
    }
  },
  
  /**
   * 保存阅读位置
   * @param {string} chapterId - 章节ID
   * @param {string} sectionId - 小节ID
   * @returns {boolean} 是否保存成功
   */
  saveReadingPosition(chapterId, sectionId) {
    try {
      wx.setStorageSync('last_reading_position', { 
        chapterId, 
        sectionId,
        timestamp: Date.now()
      });
      return true;
    } catch (e) {
      console.error('保存阅读位置失败', e);
      return false;
    }
  },
  
  /**
   * 获取阅读位置
   * @returns {Object|null} 阅读位置对象，如果不存在则返回null
   */
  getReadingPosition() {
    try {
      return wx.getStorageSync('last_reading_position') || null;
    } catch (e) {
      console.error('读取阅读位置失败', e);
      return null;
    }
  },
  
  /**
   * 保存UI设置（如导航栏折叠状态）
   * @param {Object} settings - UI设置对象
   * @returns {boolean} 是否保存成功
   */
  saveUISettings(settings) {
    try {
      const currentSettings = this.getUISettings();
      const newSettings = { ...currentSettings, ...settings };
      wx.setStorageSync('ui_settings', newSettings);
      return true;
    } catch (e) {
      console.error('保存UI设置失败', e);
      return false;
    }
  },
  
  /**
   * 获取UI设置
   * @returns {Object} UI设置对象
   */
  getUISettings() {
    try {
      return wx.getStorageSync('ui_settings') || {};
    } catch (e) {
      console.error('读取UI设置失败', e);
      return {};
    }
  }
};

module.exports = userPreferenceService;