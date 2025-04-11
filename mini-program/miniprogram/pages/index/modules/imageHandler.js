// pages/index/modules/imageHandler.js
const cloudStorageService = require('../../../utils/services/cloudStorage');

/**
 * 图片处理模块
 * 负责处理章节内图片的加载、预览和错误处理
 */
const imageHandler = {
  /**
   * 初始化图片处理功能
   * @param {Object} page - 页面实例
   */
  initImageHandler(page) {
    page.loadCurrentChapterImages = this.loadCurrentChapterImages.bind(page);
    page.processChapterImages = this.processChapterImages.bind(page);
    page.onImageLoad = this.onImageLoad.bind(page);
    page.onImageError = this.onImageError.bind(page);
    page.previewImage = this.previewImage.bind(page);
  },
  
  /**
   * 加载当前章节的所有云存储图片
   */
  loadCurrentChapterImages() {
    if (!this.data.currentChapter) return;
    
    const currentChapterIndex = this.data.chapters.findIndex(c => c.id === this.data.currentChapter.id);
    if (currentChapterIndex === -1) return;
    
    // 记录当前章节索引，用于图片加载回调时定位
    this.setData({
      currentChapterIndex: currentChapterIndex
    });
    
    const chapter = this.data.chapters[currentChapterIndex];
    
    // 预处理：设置所有图片项的加载状态
    chapter.sections.forEach((section, sectionIndex) => {
      if (section.contents) {
        section.contents.forEach((item, index) => {
          if (item.type === 'image') {
            // 云存储图片设为加载中
            if (item.cloudPath) {
              item.isLoading = true;
            } else {
              // 本地图片默认设为已加载
              item.isLoading = false;
            }
            item.loadError = false;
          }
        });
      }
    });
    
    this.setData({
      [`chapters[${currentChapterIndex}]`]: chapter
    });
    
    // 处理图片并获取临时URL
    this.processChapterImages(chapter).then(processedChapter => {
      this.setData({
        [`chapters[${currentChapterIndex}]`]: processedChapter
      });
    });
  },
  
  /**
   * 处理章节数据，为云存储图片获取临时访问链接
   */
  processChapterImages(chapter) {
    // 如果已经处理过，直接返回
    if (chapter._processed) return Promise.resolve(chapter);
    
    const fileIDList = [];
    const imageMap = {};
    const uncachedFileIDs = []; // 存储未缓存的文件ID
    
    // 收集所有需要处理的云文件路径
    chapter.sections.forEach((section, sectionIndex) => {
      if (section.contents) {
        section.contents.forEach((item, index) => {
          if (item.type === 'image' && item.cloudPath) {
            // 获取完整文件 ID
            const fileID = cloudStorageService.getCloudFileID(item.cloudPath);
            fileIDList.push(fileID);
            imageMap[fileID] = { sectionIndex, index };
          }
        });
      }
    });
    
    // 如果没有云存储图片，直接返回
    if (fileIDList.length === 0) {
      chapter._processed = true;
      return Promise.resolve(chapter);
    }
    
    // 先尝试从缓存获取图片URL
    const cachedUrls = cloudStorageService.batchGetCachedImageUrls(fileIDList);
    
    // 处理缓存中已有的URL
    Object.keys(cachedUrls).forEach(fileID => {
      const position = imageMap[fileID];
      if (position) {
        const { sectionIndex, index } = position;
        chapter.sections[sectionIndex].contents[index].cloudImageUrl = cachedUrls[fileID];
        // 标记加载状态
        chapter.sections[sectionIndex].contents[index].isLoading = false;
      }
    });
    
    // 收集未缓存的文件ID
    fileIDList.forEach(fileID => {
      if (!cachedUrls[fileID]) {
        uncachedFileIDs.push(fileID);
      }
    });
    
    // 如果所有文件都已缓存，直接返回
    if (uncachedFileIDs.length === 0) {
      chapter._processed = true;
      return Promise.resolve(chapter);
    }
    
    // 批量获取未缓存的临时文件链接
    return wx.cloud.getTempFileURL({
      fileList: uncachedFileIDs
    }).then(res => {
      // 缓存新获取的URL
      cloudStorageService.batchCacheImageUrls(res.fileList);
      
      res.fileList.forEach(file => {
        if (file.tempFileURL) {
          const position = imageMap[file.fileID];
          if (position) {
            const { sectionIndex, index } = position;
            chapter.sections[sectionIndex].contents[index].cloudImageUrl = file.tempFileURL;
            // 标记加载状态
            chapter.sections[sectionIndex].contents[index].isLoading = false;
          }
        }
      });
      
      chapter._processed = true;
      return chapter;
    }).catch(err => {
      console.error('获取云存储图片临时链接失败', err);
      
      // 标记所有未处理的图片加载失败
      uncachedFileIDs.forEach(fileID => {
        const position = imageMap[fileID];
        if (position) {
          const { sectionIndex, index } = position;
          chapter.sections[sectionIndex].contents[index].isLoading = false;
          chapter.sections[sectionIndex].contents[index].loadError = true;
        }
      });
      
      return chapter;
    });
  },
  
  /**
   * 处理图片加载成功
   */
  onImageLoad(e) {
    const { index, sectionIndex } = e.currentTarget.dataset;
    
    // 直接从当前章节获取数据，不依赖 currentChapterIndex
    const chapter = this.data.currentChapter;
    if (!chapter || !chapter.sections || !chapter.sections[sectionIndex] || 
        !chapter.sections[sectionIndex].contents || !chapter.sections[sectionIndex].contents[index]) {
      console.error('Invalid data in onImageLoad:', { sectionIndex, index });
      return;
    }
    
    // 直接更新当前章节的图片加载状态
    const content = chapter.sections[sectionIndex].contents[index];
    content.isLoading = false;
    content.loadError = false;
    
    // 如果有 currentChapterIndex，则通过 setData 更新 UI
    if (typeof this.data.currentChapterIndex !== 'undefined') {
      const path = `chapters[${this.data.currentChapterIndex}].sections[${sectionIndex}].contents[${index}]`;
      this.setData({
        [`${path}.isLoading`]: false,
        [`${path}.loadError`]: false
      });
    }
  },
  
  /**
   * 处理图片加载失败
   */
  onImageError(e) {
    const { index, sectionIndex } = e.currentTarget.dataset;
    // 检查必要的数据是否可用
    if (typeof this.data.currentChapterIndex === 'undefined' || 
        typeof sectionIndex === 'undefined' || 
        typeof index === 'undefined') {
      console.error('Invalid data in onImageError:', {
        currentChapterIndex: this.data.currentChapterIndex,
        sectionIndex,
        index
      });
      return; // 如果数据无效则退出
    }
    
    const path = `chapters[${this.data.currentChapterIndex}].sections[${sectionIndex}].contents[${index}]`;
    const content = this.data.chapters[this.data.currentChapterIndex].sections[sectionIndex].contents[index];
    
    // 如果是云存储图片并且可能是因为URL过期导致的失败
    if (content && content.type === 'image' && content.cloudPath) {
      console.log('云存储图片加载失败，尝试重新获取URL:', content.cloudPath);
      
      // 设置为加载中状态
      this.setData({
        [`${path}.isLoading`]: true,
        [`${path}.loadError`]: false
      });
      
      // 获取完整的fileID
      const fileID = cloudStorageService.getCloudFileID(content.cloudPath);
      
      // 从云存储重新获取临时URL
      wx.cloud.getTempFileURL({
        fileList: [fileID]
      }).then(res => {
        if (res.fileList && res.fileList[0] && res.fileList[0].tempFileURL) {
          // 缓存新获取的URL
          cloudStorageService.cacheImageUrl(fileID, res.fileList[0].tempFileURL);
          
          // 更新图片URL
          console.log('成功刷新图片临时URL:', content.cloudPath);
          this.setData({
            [`${path}.cloudImageUrl`]: res.fileList[0].tempFileURL,
            [`${path}.isLoading`]: false,
            [`${path}.loadError`]: false
          });
        } else {
          console.error('获取云存储图片临时链接失败：无效的响应', res);
          this.setData({
            [`${path}.isLoading`]: false,
            [`${path}.loadError`]: true
          });
        }
      }).catch(err => {
        console.error('重新获取图片临时URL失败', err);
        this.setData({
          [`${path}.isLoading`]: false,
          [`${path}.loadError`]: true
        });
      });
    } else {
      // 非云存储图片，直接标记为加载失败
      this.setData({
        [`${path}.isLoading`]: false,
        [`${path}.loadError`]: true
      });
    }
  },
  
  /**
   * 处理图片预览功能
   */
  previewImage(e) {
    const { index, sectionIndex } = e.currentTarget.dataset;
    const section = this.data.currentChapter.sections[sectionIndex];
    const contentItem = section.contents[index];
    
    // 获取当前图片URL
    const current = contentItem.cloudPath ? contentItem.cloudImageUrl : '../../images/' + contentItem.content;
    
    // 收集当前章节所有图片的URL
    const urls = [];
    
    // 遍历当前章节的所有小节
    this.data.currentChapter.sections.forEach(section => {
      if (section.contents) {
        section.contents.forEach(item => {
          if (item.type === 'image') {
            const imageUrl = item.cloudPath ? item.cloudImageUrl : '../../images/' + item.content;
            urls.push(imageUrl);
          }
        });
      }
    });
    
    // 如果没有收集到图片，至少包含当前图片
    if (urls.length === 0) {
      urls.push(current);
    }
    
    // 调用微信预览图片API
    wx.previewImage({
      current: current, // 当前显示图片的链接
      urls: urls, // 需要预览的图片链接列表
      success: () => {
        console.log('图片预览成功');
      },
      fail: (err) => {
        console.error('图片预览失败', err);
        wx.showToast({
          title: '图片预览失败',
          icon: 'none'
        });
      }
    });
  }
};

module.exports = imageHandler;