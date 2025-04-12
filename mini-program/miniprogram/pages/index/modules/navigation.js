// pages/index/modules/navigation.js
const userPreference = require('../../../utils/services/userPreference');

/**
 * 导航管理模块
 * 管理章节导航、小节导航及滚动行为
 */
const navigation = {
  /**
   * 初始化导航功能
   * @param {Object} page - 页面实例
   */
  initNavigation(page) {
    page.initializeDefaultChapter = this.initializeDefaultChapter.bind(page);
    page.setupIntersectionObservers = this.setupIntersectionObservers.bind(page);
    page.setupChapterObserver = this.setupChapterObserver.bind(page);
    page.setupSectionObservers = this.setupSectionObservers.bind(page);
    page.selectChapter = this.selectChapter.bind(page);
    page.selectSection = this.selectSection.bind(page);
    page.onPageScroll = this.onPageScroll.bind(page);
    page.toggleNavigation = this.toggleNavigation.bind(page);
    page.saveReadingPosition = this.saveReadingPosition.bind(page);
    page.restoreReadingPosition = this.restoreReadingPosition.bind(page);
  },
  
  /**
   * 初始化默认选中章节
   */
  initializeDefaultChapter() {
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
   * 设置交叉观察器监测章节和小节的可见性
   */
  setupIntersectionObservers() {
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
  setupChapterObserver(chapter, observerMap) {
    const observer = wx.createIntersectionObserver({
      observeAll: false,
      nativeMode: true
    })
      .relativeToViewport({top: -100, bottom: -100})
      .observe(`#step_${chapter.id}`, (res) => {
        if (res.intersectionRatio > 0) {
          // 章节可见，更新当前章节和标题
          const previousChapterId = this.data.currentChapter ? this.data.currentChapter.id : null;
          this.setData({
            currentChapter: chapter,
            activeChapterTitle: this.data.currentLang === 'zh' ? chapter.title : chapter.title_en,
            primaryNavScrollId: `chapter_${chapter.id}`
          });
          
          // 保存阅读位置
          this.saveReadingPosition(chapter.id, this.data.currentSection ? this.data.currentSection.id : null);
          
          // 如果章节改变了，加载当前章节的云存储图片
          if (previousChapterId !== chapter.id) {
            this.loadCurrentChapterImages();
          }
        }
      });
    
    observerMap[`chapter_${chapter.id}`] = observer;
  },
  
  /**
   * 设置小节观察器
   */
  setupSectionObservers(chapter, observerMap) {
    chapter.sections.forEach(section => {
      const sectionObserver = wx.createIntersectionObserver({
        observeAll: false,
        nativeMode: true
      })
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
  onPageScroll(e) {
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
  selectChapter(e) {
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
      
      // 加载当前章节的云存储图片
      this.loadCurrentChapterImages();
    }
  },
  
  /**
   * 选择小节
   */
  selectSection(e) {
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
   * 切换导航栏显示/隐藏
   */
  toggleNavigation() {
    this.setData({ isNavVisible: !this.data.isNavVisible });
  },

  /**
   * 保存当前阅读位置
   */
  saveReadingPosition(chapterId, sectionId) {
    return userPreference.saveReadingPosition(chapterId, sectionId);
  },
  
  /**
   * 恢复之前的阅读位置
   */
  restoreReadingPosition(lastPosition) {
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
  }
};

module.exports = navigation;