const { NavigationData } = require("./constants");

Page({
  data: {
    chapters: NavigationData.chapters,
    currentLang: 'zh', // 默认语言：中文
    currentChapter: null,
    currentSection: null,
    isSecondaryNavVisible: true,
    isNavCollapsed: false,
    isNavVisible: false, // 导航栏可见状态
    lastScrollTop: 0,
    observerMap: {},
    activeChapterTitle: '',
    primaryNavScrollId: '', // 用于控制一级导航的滚动位置
    secondaryNavScrollId: '' // 用于控制二级导航的滚动位置
  },

  onLoad: function() {
    // 设置第一章和第一节为默认选中项
    if (this.data.chapters && this.data.chapters.length > 0) {
      const firstChapter = this.data.chapters[0];
      let firstSection = null;
      
      if (firstChapter.sections && firstChapter.sections.length > 0) {
        firstSection = firstChapter.sections[0];
      }

      this.setData({
        currentChapter: firstChapter,
        currentSection: firstSection,
        activeChapterTitle: this.data.currentLang === 'zh' ? firstChapter.title : firstChapter.title_en
      });
      
      // 尝试读取保存的语言设置
      try {
        const savedLang = wx.getStorageSync('user_language');
        if (savedLang) {
          this.setData({ 
            currentLang: savedLang,
            activeChapterTitle: savedLang === 'zh' ? firstChapter.title : firstChapter.title_en
          });
        }
      } catch (e) {
        console.error('读取语言设置失败', e);
      }
      
      // 获取之前保存的阅读位置
      try {
        const lastPosition = wx.getStorageSync('last_reading_position');
        if (lastPosition && lastPosition.chapterId) {
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
              if (section) {
                wx.pageScrollTo({
                  selector: `#section_${sectionId}`,
                  duration: 300
                });
              } else {
                wx.pageScrollTo({
                  selector: `#step_${chapterId}`,
                  duration: 300
                });
              }
            }, 300);
          }
        }
      } catch (e) {
        console.error('读取上次阅读位置失败', e);
      }
    }
    
    // 延迟设置观察器，确保页面元素已渲染
    setTimeout(() => {
      this.setupIntersectionObservers();
    }, 500);
  },
  
  // 设置交叉观察器来监测章节和小节的可见性
  setupIntersectionObservers: function() {
    // 清除旧的观察器
    for (const key in this.data.observerMap) {
      if (this.data.observerMap[key]) {
        this.data.observerMap[key].disconnect();
      }
    }
    
    const observerMap = {};
    
    // 观察每个章节标题
    this.data.chapters.forEach(chapter => {
      const observer = wx.createIntersectionObserver()
        .relativeToViewport({top: -100, bottom: -100})
        .observe(`#step_${chapter.id}`, (res) => {
          if (res.intersectionRatio > 0) {
            // 章节可见，更新当前章节和标题
            this.setData({
              currentChapter: chapter,
              activeChapterTitle: this.data.currentLang === 'zh' ? chapter.title : chapter.title_en,
              primaryNavScrollId: `chapter_${chapter.id}` // 设置一级导航滚动ID
            });
            
            // 保存阅读位置
            this.saveReadingPosition(chapter.id, this.data.currentSection ? this.data.currentSection.id : null);
          }
        });
      
      observerMap[`chapter_${chapter.id}`] = observer;
      
      // 观察章节下的每个小节
      if (chapter.sections) {
        chapter.sections.forEach(section => {
          const sectionObserver = wx.createIntersectionObserver()
            .relativeToViewport({top: -120, bottom: -150})
            .observe(`#section_${section.id}`, (res) => {
              if (res.intersectionRatio > 0) {
                // 小节可见，更新当前小节和所属章节
                this.setData({
                  currentSection: section,
                  // 如果章节变了，也要更新章节
                  currentChapter: chapter.id !== this.data.currentChapter.id ? chapter : this.data.currentChapter,
                  // 如果章节变了，也要更新顶部标题
                  activeChapterTitle: chapter.id !== this.data.currentChapter.id ? 
                    (this.data.currentLang === 'zh' ? chapter.title : chapter.title_en) :
                    this.data.activeChapterTitle,
                  // 设置导航滚动ID
                  primaryNavScrollId: `chapter_${chapter.id}`,
                  secondaryNavScrollId: `section_${section.id}`
                });
                
                // 保存阅读位置
                this.saveReadingPosition(chapter.id, section.id);
              }
            });
          
          observerMap[`section_${section.id}`] = sectionObserver;
        });
      }
    });
    
    this.setData({ observerMap });
  },

  // 页面滚动处理
  onPageScroll: function(e) {
    // 向下滚动时收起二级导航，向上滚动时展开
    if (e.scrollTop > this.data.lastScrollTop + 10) {
      // 向下滚动超过10px，收起二级导航
      if (this.data.isSecondaryNavVisible) {
        this.setData({ isSecondaryNavVisible: false });
      }
    } else if (e.scrollTop < this.data.lastScrollTop - 10) {
      // 向上滚动超过10px，展开二级导航
      if (!this.data.isSecondaryNavVisible) {
        this.setData({ isSecondaryNavVisible: true });
      }
    }
    
    // 更新上次滚动位置
    this.setData({ lastScrollTop: e.scrollTop });
  },
  
  // 选择章节
  selectChapter: function(e) {
    const chapterId = e.currentTarget.dataset.chapterId;
    const selectedChapter = this.data.chapters.find(chapter => chapter.id === chapterId);
    
    if (selectedChapter) {
      // 如果有节，默认选中第一节，否则清除当前选中的节
      let firstSection = null;
      if (selectedChapter.sections && selectedChapter.sections.length > 0) {
        firstSection = selectedChapter.sections[0];
      }
      
      this.setData({
        currentChapter: selectedChapter,
        currentSection: firstSection,
        isSecondaryNavVisible: true, // 切换章节时，确保二级导航可见
        primaryNavScrollId: `chapter_${chapterId}`, // 更新导航滚动位置
        secondaryNavScrollId: firstSection ? `section_${firstSection.id}` : ''
      });
      
      // 滚动到选中的章节
      wx.pageScrollTo({
        selector: `#step_${chapterId}`,
        offsetTop: -80, // 留出顶部导航的空间
        duration: 300
      });
    }
  },
  
  // 选择小节
  selectSection: function(e) {
    const sectionId = e.currentTarget.dataset.sectionId;
    const selectedSection = this.data.currentChapter.sections.find(section => section.id === sectionId);
    
    if (selectedSection) {
      this.setData({
        currentSection: selectedSection,
        secondaryNavScrollId: `section_${sectionId}` // 更新二级导航滚动位置
      });
      
      // 滚动到选中的小节
      wx.pageScrollTo({
        selector: `#section_${sectionId}`,
        offsetTop: -100, // 留出顶部导航的空间
        duration: 300
      });
    }
  },
  
  // 切换语言
  toggleLanguage: function() {
    const newLang = this.data.currentLang === 'zh' ? 'en' : 'zh';
    this.setData({
      currentLang: newLang
    });
    
    // 可以在这里添加语言切换后的其他处理，如保存用户偏好等
    try {
      wx.setStorageSync('user_language', newLang);
    } catch (e) {
      console.error('保存语言设置失败', e);
    }
  },

  // 切换导航栏显示/隐藏
  toggleNavigation: function() {
    // 当打开导航时，确保选中状态对应当前正在阅读的章节和小节
    if (!this.data.isNavVisible) {
      // 在显示导航前，更新导航中的当前位置以匹配实际阅读位置
      this.ensureNavigationMatchesReading();
    }
    
    this.setData({
      isNavVisible: !this.data.isNavVisible
    });
  },
  
  // 确保导航中的选中状态与当前阅读位置一致
  ensureNavigationMatchesReading: function() {
    // 不需要额外操作，因为currentChapter和currentSection已经在滚动时通过观察器更新了
    // 这个函数保留用于可能的将来扩展
  },

  // 保存当前阅读位置
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

  // 页面卸载时清理观察器
  onUnload: function() {
    for (const key in this.data.observerMap) {
      if (this.data.observerMap[key]) {
        this.data.observerMap[key].disconnect();
      }
    }
  }
});
