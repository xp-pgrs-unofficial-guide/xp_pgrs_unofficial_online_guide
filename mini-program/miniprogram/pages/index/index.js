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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.initializeDefaultChapter();
    this.loadUserPreferences();
    
    // 设备检测和响应式适配
    this.detectDeviceInfo();
    this.getSystemFontSize();
    
    // 设置默认的内容语言键值
    this.setData({
      contentLanguageKey: this.data.currentLang === 'zh' ? 'content' : 'content_en'
    });
    
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
    try {
      wx.setStorageSync('user_language', newLang);
    } catch (e) {
      console.error('保存语言设置失败', e);
    }
    
    // 刷新页面内容，如果有自定义组件需要重新渲染
    this.refreshPageContent();
  },
  
  /**
   * 刷新页面内容
   */
  refreshPageContent: function() {
    // 触发页面更新以反映新的语言选择
    // 如果有使用到组件，可能需要通过setData传递新的数据给组件
    if (this.data.currentChapter) {
      // 重新设置当前章节，触发视图更新
      this.setData({
        currentChapter: { ...this.data.currentChapter }
      });
    }
    
    // 如果有特定需要更新的DOM元素，可以在这里进行操作
    // 例如，更新富文本内容或特殊格式的文本
  },
  
  /**
   * 获取当前语言下的内容
   * 用于在模板中动态获取对应语言的内容
   */
  getLocalizedContent: function(contentObj) {
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
  renderContentBlock: function(contentBlock) {
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
  },

  /**
   * 处理富文本内容
   */
  processRichContent: function(content, type) {
    // 根据内容类型处理
    switch(type) {
      case 'code':
        // 代码块处理
        return `<pre class="code-block">${content}</pre>`;
      case 'image':
        // 图片处理
        return `<image class="content-image" src="${content}" mode="widthFix" />`;
      case 'text-link':
        // 带链接的文本处理
        if (Array.isArray(content) && content.length >= 3) {
          return `${content[0]} <a class="link">${content[1]}</a> ${content[2]}`;
        }
        return content.join(' ');
      default:
        // 默认文本处理
        return content;
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
  },

  /**
   * 监听页面尺寸变化
   */
  onResize: function(e) {
    const { windowWidth, windowHeight } = e.size;
    const isNewLandscape = windowWidth > windowHeight;
    
    this.setData({
      screenWidth: windowWidth,
      screenHeight: windowHeight,
      isLandscape: isNewLandscape
    });
    
    // 调整布局
    this.adjustLayoutForScreenSize();
  },
  
  /**
   * 检测设备信息
   */
  detectDeviceInfo: function() {
    try {
      const systemInfo = wx.getSystemInfoSync();
      const { windowWidth, windowHeight, pixelRatio } = systemInfo;
      const isLandscape = windowWidth > windowHeight;
      
      // 根据屏幕宽度确定尺寸类别
      let screenSizeClass = 'screen-normal';
      if (windowWidth >= 768) {
        screenSizeClass = 'screen-large';
      } else if (windowWidth <= 375) {
        screenSizeClass = 'screen-small';
      }
      
      this.setData({
        screenWidth: windowWidth,
        screenHeight: windowHeight,
        isLandscape: isLandscape,
        devicePixelRatio: pixelRatio,
        screenSizeClass: screenSizeClass
      });
      
      this.adjustLayoutForScreenSize();
    } catch (e) {
      console.error('获取设备信息失败', e);
    }
  },
  
  /**
   * 获取系统字体大小设置
   */
  getSystemFontSize: function() {
    try {
      wx.getSystemInfoAsync({
        success: (res) => {
          // 微信提供fontSizeSetting，表示用户设置的字体大小
          const fontSizeSetting = res.fontSizeSetting || 16;
          let fontSize = 'normal';
          
          if (fontSizeSetting <= 15) {
            fontSize = 'small';
          } else if (fontSizeSetting >= 18) {
            fontSize = 'large';
          }
          
          this.setData({ fontSize });
        }
      });
    } catch (e) {
      console.error('获取系统字体大小失败', e);
    }
  },
  
  /**
   * 根据屏幕尺寸调整布局
   */
  adjustLayoutForScreenSize: function() {
    const { isLandscape, screenWidth, screenSizeClass } = this.data;
    
    // 为小屏幕调整导航栏
    if (screenSizeClass === 'screen-small') {
      this.setData({ 
        isSecondaryNavVisible: false,
        isNavCollapsed: true 
      });
    } 
    // 为横屏调整导航栏布局
    else if (isLandscape) {
      this.setData({
        isSecondaryNavVisible: true,
        isNavCollapsed: false
      });
    }
  },
});
