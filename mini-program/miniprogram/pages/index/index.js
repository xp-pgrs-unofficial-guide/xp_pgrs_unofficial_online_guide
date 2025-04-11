// pages/index/index.js
const { NavigationData } = require("./constants");
const { initAllModules } = require("./modules/index");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    chapters: NavigationData.chapters,
    currentLang: 'zh', // 默认语言：中文
    currentChapter: null,
    currentSection: null,
    isSecondaryNavVisible: true,
    isNavCollapsed: false,
    isNavVisible: false,
    lastScrollTop: 0,
    observerMap: {},
    activeChapterTitle: '',
    primaryNavScrollId: '', // 一级导航滚动位置ID
    secondaryNavScrollId: '', // 二级导航滚动位置ID
    
    // 内容展示相关
    contentLanguageKey: 'content', // 当前显示内容的语言键值
    
    // 响应式适配相关数据
    screenWidth: 0,
    screenHeight: 0,
    isLandscape: false,
    devicePixelRatio: 1,
    fontSize: 'normal', // 字体大小：small, normal, large
    screenSizeClass: '', // screen-small, screen-normal, screen-large
    isPC: false, // 是否为PC端
    
    // 适老化相关
    scaledFontSize: 30, // 导航栏字体大小的缩放值，默认30rpx
    scaledBodyFontSize: 16, // 正文字体大小的缩放值，默认16px
    scaledCodeFontSize: 14, // 代码块字体大小的缩放值，默认14px
    isElderlyMode: false, // 是否为关怀模式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    // 初始化所有模块
    initAllModules(this);
    
    // 初始化页面数据和状态
    this.initializeDefaultChapter();
    this.loadUserPreferences();
    this.detectDeviceInfo();
    this.getSystemFontSize();
    this.applyAccessibilitySettings();
    
    // 延迟设置观察器，确保页面元素已渲染
    setTimeout(() => {
      this.setupIntersectionObservers();
    }, 500);
    
    // 加载初始章节的云存储图片
    this.loadCurrentChapterImages();
  },
  
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // 清理观察器
    Object.values(this.data.observerMap).forEach(observer => {
      if (observer) observer.disconnect();
    });
  }
  
  // 注意：其他方法都已移动到相应的模块中，通过 initAllModules 绑定到 page 实例
});
