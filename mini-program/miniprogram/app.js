// app.js
// 引入服务和工具
const { cloudStorage } = require('./utils/services/index');
const accessibility = require('./utils/accessibility');
const Store = require('./utils/store/index');

App({
  // 全局数据，提前定义以便在 onLaunch 中使用
  globalData: {
    envId: "cloud1-6gkazfbf5b6e6956",
    // 云文件 URL 缓存过期时间（毫秒）
    imageUrlCacheExpireTime: 1000 * 60 * 60 * 2, // 默认2小时
    fontSizeSetting: 16, // 默认字体大小
    fontScaleFactor: 1, // 默认缩放系数
    isElderlyMode: false, // 是否为关怀模式
  },

  onLaunch: function () {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: this.globalData.envId,
        traceUser: true,
      });
    }
    
    // 初始化全局状态
    this.initializeGlobalState();
    
    // 获取系统信息和用户字体大小设置
    this.getSystemInfo();
    
    // 清理过期的图片URL缓存
    cloudStorage.cleanExpiredImageCache();
  },
  
  /**
   * 初始化全局状态
   */
  initializeGlobalState: function() {
    // 将全局数据同步到状态管理器
    Store.set('envId', this.globalData.envId);
    Store.set('fontScaleFactor', this.globalData.fontScaleFactor);
    Store.set('isElderlyMode', this.globalData.isElderlyMode);
  },
  
  /**
   * 获取系统信息和用户字体大小设置
   */
  getSystemInfo: function() {
    try {
      // 替换已弃用的 wx.getSystemInfoSync() 为推荐的 API
      const appBaseInfo = wx.getAppBaseInfo();
      // 获取用户字体大小设置
      this.globalData.fontSizeSetting = appBaseInfo.fontSizeSetting || 16;
      
      // 使用辅助功能工具更新适老化设置
      const { fontScaleFactor, isElderlyMode } = accessibility.updateAccessibilitySettings(
        this.globalData.fontSizeSetting
      );
      
      console.log('系统字体大小:', this.globalData.fontSizeSetting);
      console.log('缩放系数:', fontScaleFactor);
      console.log('是否关怀模式:', isElderlyMode);
    } catch (e) {
      // 如果获取系统信息失败，使用默认值
      console.error('获取系统信息失败', e);
      // 确保即使在出错的情况下，也能使用默认值初始化辅助功能设置
      Store.set('fontScaleFactor', this.globalData.fontScaleFactor);
      Store.set('isElderlyMode', this.globalData.isElderlyMode);
    }
  },
  
  /**
   * 以下功能已经移至 utils/services/cloudStorage.js
   * 保留方法以兼容旧代码，新代码应直接使用服务模块
   */
  getCloudFileID: function(cloudPath) {
    return cloudStorage.getCloudFileID(cloudPath);
  },
  
  cacheImageUrl: function(fileID, tempFileURL) {
    return cloudStorage.cacheImageUrl(fileID, tempFileURL);
  },
  
  batchCacheImageUrls: function(fileList) {
    return cloudStorage.batchCacheImageUrls(fileList);
  },
  
  getCachedImageUrl: function(fileID) {
    return cloudStorage.getCachedImageUrl(fileID);
  },
  
  batchGetCachedImageUrls: function(fileIDList) {
    return cloudStorage.batchGetCachedImageUrls(fileIDList);
  },
  
  checkAndCleanCache: function() {
    return cloudStorage.checkAndCleanCache();
  },
  
  cleanExpiredImageCache: function() {
    return cloudStorage.cleanExpiredImageCache();
  }
});
