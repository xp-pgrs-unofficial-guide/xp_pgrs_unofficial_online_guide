// pages/index/modules/deviceAdapter.js
/**
 * 设备适配模块
 * 处理不同设备尺寸和方向的响应式适配
 */
const deviceAdapter = {
  /**
   * 初始化设备适配功能
   * @param {Object} page - 页面实例
   */
  initDeviceAdapter(page) {
    page.detectDeviceInfo = this.detectDeviceInfo.bind(page);
    page.adjustLayoutForScreenSize = this.adjustLayoutForScreenSize.bind(page);
    page.onResize = this.onResize.bind(page);
  },
  
  /**
   * 检测设备信息
   */
  detectDeviceInfo() {
    try {
      // 使用新的API代替已弃用的wx.getSystemInfoSync
      const windowInfo = wx.getWindowInfo();
      const deviceInfo = wx.getDeviceInfo();
      const appBaseInfo = wx.getAppBaseInfo();
      
      const { windowWidth, windowHeight, pixelRatio } = windowInfo;
      const { platform } = appBaseInfo;
      const isLandscape = windowWidth > windowHeight;
      
      // 根据屏幕宽度确定尺寸类别
      let screenSizeClass = 'screen-normal';
      if (windowWidth >= 768) {
        screenSizeClass = 'screen-large';
      } else if (windowWidth <= 375) {
        screenSizeClass = 'screen-small';
      }
      
      // 检测是否在PC端运行
      const isPC = platform === 'windows' || platform === 'mac' || platform === 'devtools';
      
      this.setData({
        screenWidth: windowWidth,
        screenHeight: windowHeight,
        isLandscape: isLandscape,
        devicePixelRatio: pixelRatio,
        screenSizeClass: screenSizeClass,
        isPC: isPC
      });
      
      this.adjustLayoutForScreenSize();
    } catch (e) {
      console.error('获取设备信息失败', e);
    }
  },
  
  /**
   * 根据屏幕尺寸调整布局
   */
  adjustLayoutForScreenSize() {
    const { isLandscape, screenWidth, screenSizeClass, isPC } = this.data;
    
    // 为小屏幕调整导航栏
    if (screenSizeClass === 'screen-small') {
      this.setData({ 
        isSecondaryNavVisible: false,
        isNavCollapsed: true 
      });
    } 
    // 为 PC 端或大屏幕优化布局
    else if (isPC || screenWidth >= 768) {
      this.setData({
        isSecondaryNavVisible: true,
        isNavCollapsed: false,
        // 在大屏上始终应用"景观模式"布局
        isLandscape: true
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
  
  /**
   * 监听页面尺寸变化
   */
  onResize(e) {
    const { windowWidth, windowHeight } = e.size;
    const isNewLandscape = windowWidth > windowHeight;
    
    this.setData({
      screenWidth: windowWidth,
      screenHeight: windowHeight,
      isLandscape: isNewLandscape
    });
    
    // 调整布局
    this.adjustLayoutForScreenSize();
  }
};

module.exports = deviceAdapter;