// utils/services/cloudStorage.js

/**
 * 云存储服务模块
 * 负责处理云存储文件的获取、缓存和管理
 */
const cloudStorageService = {
  // 缓存过期时间
  get imageUrlCacheExpireTime() {
    const app = getApp();
    return app && app.globalData ? app.globalData.imageUrlCacheExpireTime || 1000 * 60 * 60 * 2 : 1000 * 60 * 60 * 2; // 默认2小时
  },
  
  /**
   * 获取完整的云存储文件ID
   * @param {string} cloudPath - 相对路径，例如 "images/example.jpg"
   * @returns {string} 完整的云存储文件ID
   */
  getCloudFileID(cloudPath) {
    if (!cloudPath) return '';
    const app = getApp();
    if (!app || !app.globalData || !app.globalData.envId) {
      console.warn('无法获取环境ID，请确保app.globalData.envId已配置');
      return cloudPath; // 返回原路径，让后续调用可以继续
    }
    const envId = app.globalData.envId;
    return `cloud://${envId}.636c-${envId}-1254140141/${cloudPath}`;
  },
  
  /**
   * 缓存云存储文件临时URL
   * @param {string} fileID - 云存储文件ID
   * @param {string} tempFileURL - 临时访问URL
   */
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
  
  /**
   * 批量缓存云存储文件临时URL
   * @param {Array} fileList - 文件列表，包含fileID和tempFileURL
   */
  batchCacheImageUrls(fileList) {
    if (!Array.isArray(fileList) || fileList.length === 0) return;
    
    try {
      // 获取当前缓存
      let imageCache = wx.getStorageSync('cloud_image_url_cache') || {};
      const now = Date.now();
      const expireTime = now + this.imageUrlCacheExpireTime;
      
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
  getCachedImageUrl(fileID) {
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
  batchGetCachedImageUrls(fileIDList) {
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
  checkAndCleanCache() {
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
  cleanExpiredImageCache() {
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
};

module.exports = cloudStorageService;