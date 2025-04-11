// pages/index/modules/content.js
/**
 * 内容处理模块
 * 处理内容渲染和交互
 */
const content = {
  /**
   * 初始化内容处理功能
   * @param {Object} page - 页面实例
   */
  initContent(page) {
    page.processRichContent = this.processRichContent.bind(page);
    page.copyCode = this.copyCode.bind(page);
    page.handleLinkTap = this.handleLinkTap.bind(page);
  },
  
  /**
   * 处理富文本内容
   * @param {string|Object} content - 内容
   * @param {string} type - 内容类型
   * @returns {string} 处理后的富文本内容
   */
  processRichContent(content, type) {
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
   * 复制代码功能
   * @param {Object} e - 事件对象
   */
  copyCode(e) {
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
   * @param {Object} e - 事件对象
   */
  handleLinkTap(e) {
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
  }
};

module.exports = content;