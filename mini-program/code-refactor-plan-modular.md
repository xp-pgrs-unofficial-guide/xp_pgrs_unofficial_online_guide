# 微信小程序模块化重构方案

本文档详细说明微信小程序的模块化重构方案，包括目录结构调整、文件拆分和代码组织方式。

## 1. 问题分析

当前小程序存在以下问题：

- 核心文件（如 index.js）代码量过大，超过500行，难以维护
- 逻辑分散，缺乏合理的功能模块划分
- app.js 中包含了大量云存储管理相关代码
- 页面与业务逻辑混合，没有实现关注点分离
- 缺少统一的状态管理机制
- 大量重复的 UI 元素没有组件化

## 2. 重构目标

- 建立清晰的项目结构，便于维护和扩展
- 实现关注点分离，将 UI、业务逻辑和数据管理解耦
- 提取公共服务和组件，减少代码重复
- 建立统一的状态管理模式
- 优化代码组织，提高可读性和可维护性

## 3. 目录结构调整

```
miniprogram/
├── app.js                       # 精简后的应用入口
├── app.json
├── app.wxss
├── components/                  # 全局组件
│   ├── code-block/              # 代码块组件
│   ├── chapter-nav/             # 章节导航组件
│   └── content-renderer/        # 内容渲染组件
├── pages/
│   └── index/
│       ├── index.js             # 精简后的页面入口
│       ├── index.wxml
│       ├── index.wxss
│       ├── index.json
│       ├── constants.js         # 常量定义
│       ├── components/          # 页面级组件
│       └── modules/             # 页面功能模块
│           ├── navigation.js    # 导航相关逻辑
│           ├── content.js       # 内容处理逻辑
│           ├── imageHandler.js  # 图片处理和预览
│           ├── accessibilityManager.js  # 适老化和字体管理
│           ├── languageManager.js  # 语言切换逻辑
│           └── deviceAdapter.js # 设备响应式适配
└── utils/
    ├── accessibility.js         # 原有的工具类
    ├── services/                # 服务层
    │   ├── index.js             # 服务统一导出
    │   ├── cloudStorage.js      # 云存储相关功能
    │   └── userPreference.js    # 用户偏好设置
    └── store/                   # 状态管理
        ├── index.js             # 状态管理主模块
        ├── user.js              # 用户相关状态
        ├── content.js           # 内容相关状态
        └── ui.js                # UI相关状态
```

## 4. 具体实施步骤

### 步骤 1：创建服务层

从 app.js 中提取云存储功能到独立服务模块：

```javascript
// utils/services/cloudStorage.js
const app = getApp();

// 云存储服务
const cloudStorageService = {
  // 缓存过期时间
  imageUrlCacheExpireTime: 1000 * 60 * 60 * 2, // 2小时
  
  /**
   * 获取完整的云存储文件ID
   */
  getCloudFileID(cloudPath) {
    if (!cloudPath) return '';
    const envId = app.globalData.envId;
    return `cloud://${envId}.636c-${envId}-1254140141/${cloudPath}`;
  },
  
  // 缓存云存储文件临时URL
  cacheImageUrl(fileID, tempFileURL) {
    if (!fileID || !tempFileURL) return;
    
    try {
      // 获取当前缓存
      let imageCache = wx.getStorageSync('cloud_image_url_cache') || {};
      
      // 更新缓存
      imageCache[fileID] = {
        url: tempFileURL,
        expireTime: Date.now() + this.imageUrlCacheExpireTime
      };
      
      // 保存缓存
      wx.setStorageSync('cloud_image_url_cache', imageCache);
      
      // 检查缓存大小并可能清理一些旧记录
      this.checkAndCleanCache();
    } catch (e) {
      console.error('缓存图片URL失败', e);
    }
  },
  
  // 其它方法: batchCacheImageUrls, getCachedImageUrl, batchGetCachedImageUrls...
};

module.exports = cloudStorageService;
```

创建用户偏好设置服务：

```javascript
// utils/services/userPreference.js
const userPreferenceService = {
  // 保存语言设置
  saveLanguage(lang) {
    try {
      wx.setStorageSync('user_language', lang);
      return true;
    } catch (e) {
      console.error('保存语言设置失败', e);
      return false;
    }
  },
  
  // 获取语言设置
  getLanguage() {
    try {
      return wx.getStorageSync('user_language') || 'zh';
    } catch (e) {
      console.error('读取语言设置失败', e);
      return 'zh';
    }
  },
  
  // 保存阅读位置
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
  
  // 获取阅读位置
  getReadingPosition() {
    try {
      return wx.getStorageSync('last_reading_position') || null;
    } catch (e) {
      console.error('读取阅读位置失败', e);
      return null;
    }
  }
};

module.exports = userPreferenceService;
```

服务统一导出：

```javascript
// utils/services/index.js
const cloudStorage = require('./cloudStorage');
const userPreference = require('./userPreference');

module.exports = {
  cloudStorage,
  userPreference
};
```

### 步骤 2：从index.js拆分页面逻辑

导航相关逻辑：

```javascript
// pages/index/modules/navigation.js
const userPreference = require('../../../utils/services/userPreference');

const navigation = {
  // 初始化导航
  initNavigation(page) {
    page.initializeDefaultChapter = this.initializeDefaultChapter.bind(page);
    page.setupIntersectionObservers = this.setupIntersectionObservers.bind(page);
    page.setupChapterObserver = this.setupChapterObserver.bind(page);
    page.setupSectionObservers = this.setupSectionObservers.bind(page);
    page.selectChapter = this.selectChapter.bind(page);
    page.selectSection = this.selectSection.bind(page);
    page.onPageScroll = this.onPageScroll.bind(page);
  },
  
  // 初始化默认选中章节
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
  
  // 其他导航方法...
  // setupIntersectionObservers, setupChapterObserver, setupSectionObservers, 
  // selectChapter, selectSection, onPageScroll 等方法
};

module.exports = navigation;
```

图片处理逻辑：

```javascript
// pages/index/modules/imageHandler.js
const cloudStorageService = require('../../../utils/services/cloudStorage');

const imageHandler = {
  // 初始化图片处理
  initImageHandler(page) {
    page.loadCurrentChapterImages = this.loadCurrentChapterImages.bind(page);
    page.processChapterImages = this.processChapterImages.bind(page);
    page.onImageLoad = this.onImageLoad.bind(page);
    page.onImageError = this.onImageError.bind(page);
    page.previewImage = this.previewImage.bind(page);
  },
  
  // 加载当前章节的所有云存储图片
  loadCurrentChapterImages() {
    if (!this.data.currentChapter) return;
    
    const currentChapterIndex = this.data.chapters.findIndex(c => c.id === this.data.currentChapter.id);
    if (currentChapterIndex === -1) return;
    
    // 记录当前章节索引，用于图片加载回调时定位
    this.setData({
      currentChapterIndex: currentChapterIndex
    });
    
    // 预处理图片加载状态...
    
    // 处理图片并获取临时URL
    this.processChapterImages(this.data.chapters[currentChapterIndex])
      .then(processedChapter => {
        this.setData({
          [`chapters[${currentChapterIndex}]`]: processedChapter
        });
      });
  },
  
  // 其他图片处理方法...
  // processChapterImages, onImageLoad, onImageError, previewImage 等方法
};

module.exports = imageHandler;
```

适老化和字体管理：

```javascript
// pages/index/modules/accessibilityManager.js
const accessibility = require("../../../utils/accessibility");

const accessibilityManager = {
  // 初始化适老化功能
  initAccessibility(page) {
    page.applyAccessibilitySettings = this.applyAccessibilitySettings.bind(page);
    page.getSystemFontSize = this.getSystemFontSize.bind(page);
  },
  
  // 应用适老化设置
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
  },
  
  // 获取系统字体大小设置
  getSystemFontSize() {
    // 实现从系统获取字体大小的逻辑...
  }
};

module.exports = accessibilityManager;
```

### 步骤 3：重构主页面文件

重构后的 index.js：

```javascript
// pages/index/index.js
const { NavigationData } = require("./constants");
const navigation = require("./modules/navigation");
const imageHandler = require("./modules/imageHandler");
const content = require("./modules/content");
const accessibilityManager = require("./modules/accessibilityManager");
const languageManager = require("./modules/languageManager");
const deviceAdapter = require("./modules/deviceAdapter");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    chapters: NavigationData.chapters,
    currentLang: 'zh',
    // 其他数据...
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    // 初始化各模块
    navigation.initNavigation(this);
    imageHandler.initImageHandler(this);
    content.initContent(this);
    accessibilityManager.initAccessibility(this);
    languageManager.initLanguage(this);
    deviceAdapter.initDeviceAdapter(this);
    
    // 初始化页面
    this.initializeDefaultChapter();
    this.loadUserPreferences();
    this.detectDeviceInfo();
    this.getSystemFontSize();
    this.applyAccessibilitySettings();
    
    // 延迟设置观察器
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
    Object.values(this.data.observerMap).forEach(observer => {
      if (observer) observer.disconnect();
    });
  },
  
  /**
   * 监听页面尺寸变化
   */
  onResize: function(e) {
    this.handleResize(e);
  }
  
  // 注意：其他方法都已移动到相应的模块中
});
```

### 步骤 4：创建统一状态管理

状态管理主模块：

```javascript
// utils/store/index.js
/**
 * 简单状态管理器
 */
const Store = {
  data: {
    userInfo: {},
    language: 'zh',
    theme: 'light',
    fontScaleFactor: 1,
    isElderlyMode: false
  },
  
  // 监听器集合
  listeners: {},
  
  // 获取状态
  get(key) {
    return this.data[key];
  },
  
  // 设置状态
  set(key, value) {
    this.data[key] = value;
    // 通知监听器
    this._notify(key, value);
    return value;
  },
  
  // 监听状态变化
  subscribe(key, callback) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);
    
    // 返回取消订阅方法
    return () => {
      this.listeners[key] = this.listeners[key].filter(cb => cb !== callback);
    };
  },
  
  // 通知监听器
  _notify(key, value) {
    const callbacks = this.listeners[key] || [];
    callbacks.forEach(callback => {
      try {
        callback(value);
      } catch (error) {
        console.error('Store notification error:', error);
      }
    });
  }
};

module.exports = Store;
```

## 5. 组件化开发

提取关键UI组件：

1. **章节导航组件** (chapter-nav)
   - 管理一级和二级导航的显示
   - 处理导航项的选中状态
   - 支持语言切换

2. **内容渲染组件** (content-renderer)
   - 通用内容渲染逻辑
   - 支持不同类型内容（文本、代码、图片）
   - 多语言内容支持

3. **代码块组件** (code-block)
   - 代码格式化显示
   - 复制功能
   - 适老化支持

## 6. 重构收益

- **可维护性提升**：单一职责原则使代码更易维护
- **扩展性增强**：模块化的代码结构便于添加新功能
- **性能潜力**：为后续性能优化奠定基础
- **团队协作**：多开发者可同时在不同模块工作
- **测试便利**：模块化结构更易于进行单元测试
- **代码复用**：服务和组件可在多个页面复用

## 7. 注意事项

- 模块化过程中保持功能完整性
- 逐步实施，每个步骤后进行充分测试
- 保持命名一致性，遵循约定的规范
- 使用JSDoc注释清晰说明每个模块和方法的用途
- 避免循环依赖
- 重构过程中不应改变业务逻辑