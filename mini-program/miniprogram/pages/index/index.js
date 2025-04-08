const { NavigationData } = require("./constants");

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
    secondaryNavScrollId: '' // 二级导航滚动位置ID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.initializeDefaultChapter();
    this.loadUserPreferences();
    
    // 延迟设置观察器，确保页面元素已渲染
    setTimeout(() => {
      this.setupIntersectionObservers();
    }, 500);
  },
  
  /**
   * 初始化默认选中章节
   */
  initializeDefaultChapter: function() {
    if (this.data.chapters && this.data.chapters.length > 0) {
      const firstChapter = this.data.chapters[0];
      const firstSection = firstChapter.sections && firstChapter.sections.length > 0 ? 
                          firstChapter.sections[0] : null;

      this.setData({
        currentChapter: firstChapter,
        currentSection: firstSection,
        activeChapterTitle: firstChapter.title
      });
    }
  },
  
  /**
   * 加载用户偏好设置（语言和阅读位置）
   */
  loadUserPreferences: function() {
    // 加载语言设置
    try {
      const savedLang = wx.getStorageSync('user_language');
      if (savedLang) {
        this.setData({ 
          currentLang: savedLang,
          activeChapterTitle: this.data.currentChapter ? 
            (savedLang === 'zh' ? this.data.currentChapter.title : this.data.currentChapter.title_en) : ''
        });
      }
    } catch (e) {
      console.error('读取语言设置失败', e);
    }
    
    // 加载上次阅读位置
    try {
      const lastPosition = wx.getStorageSync('last_reading_position');
      if (lastPosition && lastPosition.chapterId) {
        this.restoreReadingPosition(lastPosition);
      }
    } catch (e) {
      console.error('读取上次阅读位置失败', e);
    }
  },
  
  /**
   * 恢复之前的阅读位置
   */
  restoreReadingPosition: function(lastPosition) {
    const { chapterId, sectionId } = lastPosition;
    const chapter = this.data.chapters.find(c => c.id === chapterId);
    
    if (chapter) {
      let section = null;
      if (sectionId && chapter.sections) {
        section = chapter.sections.find(s => s.id === sectionId);
      }
      
      this.setData({
        currentChapter: chapter,
        currentSection: section,
        activeChapterTitle: this.data.currentLang === 'zh' ? chapter.title : chapter.title_en
      });
      
      // 滚动到上次阅读的位置
      setTimeout(() => {
        wx.pageScrollTo({
          selector: section ? `#section_${sectionId}` : `#step_${chapterId}`,
          duration: 300
        });
      }, 300);
    }
  },
  
  /**
   * 设置交叉观察器监测章节和小节的可见性
   */
  setupIntersectionObservers: function() {
    // 清除旧的观察器
    Object.values(this.data.observerMap).forEach(observer => {
      if (observer) observer.disconnect();
    });
    
    const observerMap = {};
    
    // 观察每个章节标题
    this.data.chapters.forEach(chapter => {
      // 设置章节观察器
      this.setupChapterObserver(chapter, observerMap);
      
      // 设置小节观察器
      if (chapter.sections && chapter.sections.length > 0) {
        this.setupSectionObservers(chapter, observerMap);
      }
    });
    
    this.setData({ observerMap });
  },
  
  /**
   * 设置章节观察器
   */
  setupChapterObserver: function(chapter, observerMap) {
    const observer = wx.createIntersectionObserver()
      .relativeToViewport({top: -100, bottom: -100})
      .observe(`#step_${chapter.id}`, (res) => {
        if (res.intersectionRatio > 0) {
          // 章节可见，更新当前章节和标题
          this.setData({
            currentChapter: chapter,
            activeChapterTitle: this.data.currentLang === 'zh' ? chapter.title : chapter.title_en,
            primaryNavScrollId: `chapter_${chapter.id}`
          });
          
          // 保存阅读位置
          this.saveReadingPosition(chapter.id, this.data.currentSection ? this.data.currentSection.id : null);
        }
      });
    
    observerMap[`chapter_${chapter.id}`] = observer;
  },
  
  /**
   * 设置小节观察器
   */
  setupSectionObservers: function(chapter, observerMap) {
    chapter.sections.forEach(section => {
      const sectionObserver = wx.createIntersectionObserver()
        .relativeToViewport({top: -120, bottom: -150})
        .observe(`#section_${section.id}`, (res) => {
          if (res.intersectionRatio > 0) {
            // 小节可见，更新当前小节信息
            const chapterChanged = chapter.id !== this.data.currentChapter.id;
            this.setData({
              currentSection: section,
              currentChapter: chapterChanged ? chapter : this.data.currentChapter,
              activeChapterTitle: chapterChanged ? 
                (this.data.currentLang === 'zh' ? chapter.title : chapter.title_en) : 
                this.data.activeChapterTitle,
              primaryNavScrollId: `chapter_${chapter.id}`,
              secondaryNavScrollId: `section_${section.id}`
            });
            
            // 保存阅读位置
            this.saveReadingPosition(chapter.id, section.id);
          }
        });
      
      observerMap[`section_${section.id}`] = sectionObserver;
    });
  },

  /**
   * 页面滚动处理
   */
  onPageScroll: function(e) {
    const scrollingDown = e.scrollTop > this.data.lastScrollTop + 10;
    const scrollingUp = e.scrollTop < this.data.lastScrollTop - 10;
    
    // 向下滚动隐藏二级导航，向上滚动显示
    if (scrollingDown && this.data.isSecondaryNavVisible) {
      this.setData({ isSecondaryNavVisible: false });
    } else if (scrollingUp && !this.data.isSecondaryNavVisible) {
      this.setData({ isSecondaryNavVisible: true });
    }
    
    // 更新上次滚动位置
    this.setData({ lastScrollTop: e.scrollTop });
  },
  
  /**
   * 选择章节
   */
  selectChapter: function(e) {
    const chapterId = e.currentTarget.dataset.chapterId;
    const selectedChapter = this.data.chapters.find(chapter => chapter.id === chapterId);
    
    if (selectedChapter) {
      const firstSection = selectedChapter.sections && selectedChapter.sections.length > 0 ? 
                          selectedChapter.sections[0] : null;
      
      this.setData({
        currentChapter: selectedChapter,
        currentSection: firstSection,
        isSecondaryNavVisible: true,
        primaryNavScrollId: `chapter_${chapterId}`,
        secondaryNavScrollId: firstSection ? `section_${firstSection.id}` : ''
      });
      
      // 滚动到选中的章节
      wx.pageScrollTo({
        selector: `#step_${chapterId}`,
        offsetTop: -80,
        duration: 300
      });
    }
  },
  
  /**
   * 选择小节
   */
  selectSection: function(e) {
    const sectionId = e.currentTarget.dataset.sectionId;
    const selectedSection = this.data.currentChapter.sections.find(section => section.id === sectionId);
    
    if (selectedSection) {
      this.setData({
        currentSection: selectedSection,
        secondaryNavScrollId: `section_${sectionId}`
      });
      
      // 滚动到选中的小节
      wx.pageScrollTo({
        selector: `#section_${sectionId}`,
        offsetTop: -100,
        duration: 300
      });
    }
  },
  
  /**
   * 切换语言（中英文切换）
   */
  toggleLanguage: function() {
    const newLang = this.data.currentLang === 'zh' ? 'en' : 'zh';
    
    // 更新当前语言和标题显示
    if (this.data.currentChapter) {
      const title = newLang === 'zh' ? 
                    this.data.currentChapter.title : 
                    this.data.currentChapter.title_en;
      
      this.setData({
        currentLang: newLang,
        activeChapterTitle: title
      });
    } else {
      this.setData({ currentLang: newLang });
    }
    
    // 保存语言设置
    try {
      wx.setStorageSync('user_language', newLang);
    } catch (e) {
      console.error('保存语言设置失败', e);
    }
  },

  /**
   * 切换导航栏显示/隐藏
   */
  toggleNavigation: function() {
    this.setData({ isNavVisible: !this.data.isNavVisible });
  },

  /**
   * 保存当前阅读位置
   */
  saveReadingPosition: function(chapterId, sectionId) {
    try {
      wx.setStorageSync('last_reading_position', { 
        chapterId, 
        sectionId,
        timestamp: Date.now()
      });
    } catch (e) {
      console.error('保存阅读位置失败', e);
    }
  },

  /**
   * 复制代码功能
   */
  copyCode: function(e) {
    const code = e.target?.dataset?.code || '';
    wx.setClipboardData({
      data: code,
      success: () => {
        wx.showToast({ title: '已复制' })
      },
      fail: (err) => {
        console.error('复制失败', err);
      }
    });
  },
  
  /**
   * 处理链接点击
   */
  handleLinkTap: function(e) {
    const linkType = e.currentTarget?.dataset?.linkType || 'default';
    
    switch(linkType) {
      case 'website':
        // 打开网页（小程序内置浏览器）
        wx.navigateTo({
          url: `/pages/web-view/index?url=${encodeURIComponent(e.currentTarget.dataset.url)}`
        });
        break;
      case 'page':
        // 跳转到小程序内部页面
        wx.navigateTo({
          url: e.currentTarget.dataset.url
        });
        break;
      case 'contact':
        // 复制联系方式
        this.copyCode({target: {dataset: {code: e.currentTarget.dataset.contact}}});
        break;
      default:
        console.log('链接点击：', e.currentTarget.dataset);
        break;
    }
  },

  /**
   * 页面卸载时清理观察器
   */
  onUnload: function() {
    Object.values(this.data.observerMap).forEach(observer => {
      if (observer) observer.disconnect();
    });
  }
});
