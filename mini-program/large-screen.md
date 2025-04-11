# 西浦博士生非官方手册小程序大屏适配

根据[微信小程序大屏适配指南](https://developers.weixin.qq.com/miniprogram/design/adapt.html#开发者适配设计指引)，我们对小程序进行了大屏适配优化。以下是主要的适配工作：

## 1. 全局配置

在 `app.json` 中添加了大屏适配相关配置：

```json
{
  "resizable": true,
  "window": {
    "initialRenderWidth": 375,
    "initialRenderHeight": 667
  }
}
```

这使得小程序可以在 PC 端进行窗口大小调整，同时设置了初始渲染的参考尺寸。

## 2. 响应式布局

### CSS 响应式设计

在 CSS 中添加了媒体查询，针对大屏和 PC 端设备做了特定的布局优化：

```css
/* PC 端和大屏适配 */
@media (min-width: 800px) {
  .container {
    padding-bottom: 60rpx;
  }
  
  /* 侧边栏布局 - 将导航固定在左侧 */
  .container.landscape-mode {
    flex-direction: row;
    align-items: flex-start;
  }
  
  .landscape-mode .folding-nav {
    position: fixed;
    left: 20rpx;
    top: 20rpx;
    width: 240rpx;
    height: calc(100vh - 40rpx);
    border-radius: 16rpx;
    overflow-y: auto;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.12);
  }
  
  /* 更多侧边导航样式 */
  .landscape-mode .primary-nav, 
  .landscape-mode .primary-nav-landscape {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    max-height: none;
  }
  
  /* 内容区域使用网格布局 */
  .landscape-mode .step_container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400rpx, 1fr));
    gap: 30rpx;
  }
  
  .landscape-mode .step_title {
    grid-column: 1 / -1;
  }
}
```

主要采用了以下响应式布局策略：

1. **侧边栏布局**：在大屏模式下，导航从顶部移至左侧固定位置
2. **网格布局**：内容区域采用网格布局，提高大屏下的内容组织
3. **图片优化**：调整了图片在大屏下的展示方式，保持其比例并美观呈现

### JavaScript 设备检测与适配

增强了设备检测逻辑，增加了对 PC 平台的识别：

```javascript
detectDeviceInfo: function() {
  try {
    const systemInfo = wx.getSystemInfoSync();
    const { windowWidth, windowHeight, pixelRatio, platform } = systemInfo;
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
}
```

并根据检测结果自动调整布局：

```javascript
adjustLayoutForScreenSize: function() {
  const { isLandscape, screenWidth, screenSizeClass, isPC } = this.data;
  
  // 为 PC 端或大屏幕优化布局
  if (isPC || screenWidth >= 768) {
    this.setData({
      isSecondaryNavVisible: true,
      isNavCollapsed: false,
      // 在大屏上始终应用"景观模式"布局
      isLandscape: true
    });
  }
  // 其他设备的适配处理...
}
```

## 3. 交互优化

根据微信小程序大屏适配指南，我们对交互方式进行了转译：

1. **导航交互**：优化了大屏下的导航交互，适应鼠标操作
2. **内容浏览**：利用大屏优势，改善内容组织和层级结构
3. **图片预览**：调整了图片预览的触发方式和展示效果

## 4. 适配效果与遵循原则

这些改进遵循了微信小程序设计指南中的核心原则：

1. **视图信息展示完整可读** - 确保内容在不同设备上都清晰可见
2. **布局灵活动态调整** - 使用栅格系统和侧边栏布局，让内容随屏幕尺寸智能排列
3. **交互方式转译** - 优化了PC端的导航交互体验
4. **页面适配大屏优势** - 充分利用大屏幕的空间优势，更合理地组织内容展示

通过这些适配工作，我们的小程序现在能够在 PC 端、大屏和移动设备上提供一致且优化的用户体验。用户可以在 PC 端使用时调整窗口大小，界面会自动适应并优化布局呈现。