// pages/index/modules/languageManager.js
const userPreference = require('../../../utils/services/userPreference');

/**
 * 语言管理模块
 * 处理多语言切换和内容本地化
 */
const languageManager = {
  /**
   * 初始化语言功能
   * @param {Object} page - 页面实例
   */
  initLanguage(page) {
    page.toggleLanguage = this.toggleLanguage.bind(page);
    page.getLocalizedContent = this.getLocalizedContent.bind(page);
    page.renderContentBlock = this.renderContentBlock.bind(page);
    page.refreshPageContent = this.refreshPageContent.bind(page);
    page.loadUserPreferences = this.loadUserPreferences.bind(page);
    
    // 初始化语言设置
    this.loadLanguageSettings(page);
  },
  
  /**
   * 加载用户偏好设置（语言和阅读位置）
   */
  loadUserPreferences() {
    // 加载语言设置
    try {
      const savedLang = userPreference.getLanguage();
      if (savedLang) {
        this.setData({ 
          currentLang: savedLang,
          contentLanguageKey: savedLang === 'zh' ? 'content' : 'content_en',
          activeChapterTitle: this.data.currentChapter ? 
            (savedLang === 'zh' ? this.data.currentChapter.title : this.data.currentChapter.title_en) : ''
        });
      }
    } catch (e) {
      console.error('读取语言设置失败', e);
    }
    
    // 加载上次阅读位置
    try {
      const lastPosition = userPreference.getReadingPosition();
      if (lastPosition && lastPosition.chapterId) {
        this.restoreReadingPosition(lastPosition);
      }
    } catch (e) {
      console.error('读取上次阅读位置失败', e);
    }
  },
  
  /**
   * 初始化语言设置
   */
  loadLanguageSettings(page) {
    const savedLang = userPreference.getLanguage();
    page.setData({
      currentLang: savedLang,
      contentLanguageKey: savedLang === 'zh' ? 'content' : 'content_en'
    });
  },
  
  /**
   * 切换语言（中英文切换）
   */
  toggleLanguage() {
    const newLang = this.data.currentLang === 'zh' ? 'en' : 'zh';
    const newContentKey = newLang === 'zh' ? 'content' : 'content_en';
    
    // 更新当前语言和标题显示
    if (this.data.currentChapter) {
      const title = newLang === 'zh' ? 
                    this.data.currentChapter.title : 
                    this.data.currentChapter.title_en;
      
      this.setData({
        currentLang: newLang,
        contentLanguageKey: newContentKey,
        activeChapterTitle: title
      });
    } else {
      this.setData({ 
        currentLang: newLang,
        contentLanguageKey: newContentKey
      });
    }
    
    // 保存语言设置
    userPreference.saveLanguage(newLang);
    
    // 刷新页面内容，如果有自定义组件需要重新渲染
    this.refreshPageContent();
  },
  
  /**
   * 刷新页面内容
   */
  refreshPageContent() {
    // 触发页面更新以反映新的语言选择
    // 如果有使用到组件，可能需要通过setData传递新的数据给组件
    if (this.data.currentChapter) {
      // 重新设置当前章节，触发视图更新
      this.setData({
        currentChapter: { ...this.data.currentChapter }
      });
    }
  },
  
  /**
   * 获取当前语言下的内容
   * 用于在模板中动态获取对应语言的内容
   */
  getLocalizedContent(contentObj) {
    if (!contentObj) return '';
    
    // 如果是带有多语言支持的对象
    if (typeof contentObj === 'object' && !Array.isArray(contentObj)) {
      // 如果有对应语言的版本，则返回该版本
      if (this.data.currentLang === 'en' && 'content_en' in contentObj) {
        return contentObj.content_en;
      }
      // 如果没有对应语言的版本，但有默认版本(中文)，则返回默认版本
      if ('content' in contentObj) {
        return contentObj.content;
      }
    }
    
    // 如果是字符串或数组，直接返回
    return contentObj;
  },
  
  /**
   * 渲染内容块
   * 根据内容类型和当前语言选择适当的渲染方式
   */
  renderContentBlock(contentBlock) {
    // 确保内容块存在
    if (!contentBlock) return '';
    
    // 获取当前语言的内容键
    const contentKey = this.data.currentLang === 'zh' ? 'content' : 'content_en';
    
    // 如果是数组（如text-link类型）
    if (Array.isArray(contentBlock)) {
      // 检查是否有对应语言的数组版本
      if (this.data.currentLang === 'en' && contentBlock[contentKey]) {
        return contentBlock[contentKey].join(' ');
      }
      return contentBlock.join(' ');
    }
    
    // 如果是对象（如text、code类型）
    if (typeof contentBlock === 'object') {
      // 根据内容类型和当前语言选择内容
      if (this.data.currentLang === 'en' && contentBlock[contentKey]) {
        return contentBlock[contentKey];
      }
      return contentBlock.content || contentBlock;
    }
    
    // 如果是简单字符串，直接返回
    return contentBlock;
  }
};

module.exports = languageManager;