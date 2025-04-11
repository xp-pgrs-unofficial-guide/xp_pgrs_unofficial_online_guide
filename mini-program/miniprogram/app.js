// app.js
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
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: this.globalData.envId,
        traceUser: true,
      });
    }
    
    // 获取系统信息和用户字体大小设置
    this.getSystemInfo();
    
    // 清理过期的图片URL缓存
    this.cleanExpiredImageCache();
  },
  
  /**
   * 获取系统信息和用户字体大小设置
   */
  getSystemInfo: function() {
    try {
      const systemInfo = wx.getSystemInfoSync();
      // 获取用户字体大小设置
      this.globalData.fontSizeSetting = systemInfo.fontSizeSetting || 16;
      
      // 计算缩放系数
      // 根据微信文档，当字号为23.8px时，为"关怀模式"，缩放倍率为1.4
      if (this.globalData.fontSizeSetting >= 23) {
        this.globalData.fontScaleFactor = 1.4;
        this.globalData.isElderlyMode = true;
      } else if (this.globalData.fontSizeSetting >= 20) {
        this.globalData.fontScaleFactor = 1.25;
      } else if (this.globalData.fontSizeSetting >= 18) {
        this.globalData.fontScaleFactor = 1.12;
      } else {
        this.globalData.fontScaleFactor = 1;
      }
      
      console.log('系统字体大小:', this.globalData.fontSizeSetting);
      console.log('缩放系数:', this.globalData.fontScaleFactor);
      console.log('是否关怀模式:', this.globalData.isElderlyMode);
    } catch (e) {
      console.error('获取系统信息失败', e);
    }
  },
  
  /**
   * 获取完整的云存储文件ID
   * @param {string} cloudPath - 相对路径，例如 "images/example.jpg"
   * @returns {string} 完整的云存储文件ID
   */
  getCloudFileID: function(cloudPath) {
    if (!cloudPath) return '';
    return `cloud://${this.globalData.envId}.636c-${this.globalData.envId}-1254140141/${cloudPath}`;
  },
  
  /**
   * 缓存云存储文件临时URL
   * @param {string} fileID - 云存储文件ID
   * @param {string} tempFileURL - 临时访问URL
   */
  cacheImageUrl: function(fileID, tempFileURL) {
    if (!fileID || !tempFileURL) return;
    
    try {
      // 获取当前缓存
      let imageCache = wx.getStorageSync('cloud_image_url_cache') || {};
      
      // 更新缓存
      imageCache[fileID] = {
        url: tempFileURL,
        expireTime: Date.now() + this.globalData.imageUrlCacheExpireTime
      };
      
      // 保存缓存
      wx.setStorageSync('cloud_image_url_cache', imageCache);
      
      // 检查缓存大小并可能清理一些旧记录
      this.checkAndCleanCache();
    } catch (e) {
      console.error('缓存图片URL失败', e);
    }
  },
  
  /**
   * 批量缓存云存储文件临时URL
   * @param {Array} fileList - 文件列表，包含fileID和tempFileURL
   */
  batchCacheImageUrls: function(fileList) {
    if (!Array.isArray(fileList) || fileList.length === 0) return;
    
    try {
      // 获取当前缓存
      let imageCache = wx.getStorageSync('cloud_image_url_cache') || {};
      const now = Date.now();
      const expireTime = now + this.globalData.imageUrlCacheExpireTime;
      
      // 更新缓存
      fileList.forEach(file => {
        if (file.fileID && file.tempFileURL) {
          imageCache[file.fileID] = {
            url: file.tempFileURL,
            expireTime: expireTime
          };
        }
      });
      
      // 保存缓存
      wx.setStorageSync('cloud_image_url_cache', imageCache);
      
      // 检查缓存大小并可能清理一些旧记录
      this.checkAndCleanCache();
    } catch (e) {
      console.error('批量缓存图片URL失败', e);
    }
  },
  
  /**
   * 从缓存获取云存储文件临时URL
   * @param {string} fileID - 云存储文件ID
   * @returns {string|null} 临时访问URL，如果缓存不存在或已过期则返回null
   */
  getCachedImageUrl: function(fileID) {
    if (!fileID) return null;
    
    try {
      const imageCache = wx.getStorageSync('cloud_image_url_cache') || {};
      const cachedItem = imageCache[fileID];
      
      // 检查缓存项是否存在且未过期
      if (cachedItem && cachedItem.url && cachedItem.expireTime > Date.now()) {
        return cachedItem.url;
      }
    } catch (e) {
      console.error('获取缓存图片URL失败', e);
    }
    
    return null;
  },
  
  /**
   * 批量获取缓存的云存储文件临时URL
   * @param {Array} fileIDList - 云存储文件ID列表
   * @returns {Object} 包含有效缓存URL的对象，键为fileID
   */
  batchGetCachedImageUrls: function(fileIDList) {
    if (!Array.isArray(fileIDList) || fileIDList.length === 0) return {};
    
    const result = {};
    
    try {
      const imageCache = wx.getStorageSync('cloud_image_url_cache') || {};
      const now = Date.now();
      
      fileIDList.forEach(fileID => {
        const cachedItem = imageCache[fileID];
        if (cachedItem && cachedItem.url && cachedItem.expireTime > now) {
          result[fileID] = cachedItem.url;
        }
      });
    } catch (e) {
      console.error('批量获取缓存图片URL失败', e);
    }
    
    return result;
  },
  
  /**
   * 检查缓存大小并清理旧记录
   */
  checkAndCleanCache: function() {
    try {
      const imageCache = wx.getStorageSync('cloud_image_url_cache') || {};
      const cacheEntries = Object.entries(imageCache);
      
      // 如果缓存项超过100个，则保留最近的80个
      if (cacheEntries.length > 100) {
        console.log('缓存项过多，进行清理');
        
        // 按过期时间排序，保留较新的缓存
        const sortedEntries = cacheEntries.sort((a, b) => b[1].expireTime - a[1].expireTime);
        const newCache = {};
        
        // 保留前80个（较新的）缓存项
        sortedEntries.slice(0, 80).forEach(([key, value]) => {
          newCache[key] = value;
        });
        
        wx.setStorageSync('cloud_image_url_cache', newCache);
      }
    } catch (e) {
      console.error('检查并清理缓存失败', e);
    }
  },
  
  /**
   * 清理过期的图片URL缓存
   */
  cleanExpiredImageCache: function() {
    try {
      const imageCache = wx.getStorageSync('cloud_image_url_cache') || {};
      const now = Date.now();
      let isChanged = false;
      
      // 遍历缓存，删除过期项
      Object.keys(imageCache).forEach(fileID => {
        if (imageCache[fileID].expireTime <= now) {
          delete imageCache[fileID];
          isChanged = true;
        }
      });
      
      // 如果有变更，保存回缓存
      if (isChanged) {
        wx.setStorageSync('cloud_image_url_cache', imageCache);
      }
    } catch (e) {
      console.error('清理过期缓存失败', e);
    }
  }
});
