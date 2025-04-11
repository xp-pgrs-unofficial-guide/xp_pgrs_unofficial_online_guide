/**
 * 适老化工具库
 * 用于根据用户字体大小设置调整UI元素大小
 */

// 获取全局的app实例
const app = getApp();

/**
 * 根据缩放系数调整字体大小
 * @param {number} fontSize - 原始字体大小，单位rpx
 * @returns {number} 缩放后的字体大小，单位rpx
 */
const scaleFontSize = (fontSize) => {
  return fontSize * app.globalData.fontScaleFactor;
};

/**
 * 根据缩放系数调整元素尺寸
 * @param {number} size - 原始尺寸，单位rpx
 * @returns {number} 缩放后的尺寸，单位rpx
 */
const scaleSize = (size) => {
  return size * app.globalData.fontScaleFactor;
};

/**
 * 获取缩放后的样式对象
 * @param {Object} styles - 原始样式对象，包含需要缩放的属性
 * @returns {Object} 缩放后的样式对象
 */
const getScaledStyles = (styles) => {
  if (!app.globalData.fontScaleFactor || app.globalData.fontScaleFactor === 1) {
    return styles;
  }

  const scaledStyles = {};
  const propertiesToScale = [
    'fontSize', 'lineHeight', 'width', 'height', 
    'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft'
  ];

  for (const key in styles) {
    // 对需要缩放的属性进行缩放
    if (propertiesToScale.includes(key) && typeof styles[key] === 'number') {
      scaledStyles[key] = styles[key] * app.globalData.fontScaleFactor;
    } else {
      scaledStyles[key] = styles[key];
    }
  }

  return scaledStyles;
};

/**
 * 检查是否处于关怀模式（高缩放模式）
 * @returns {boolean} 是否处于关怀模式
 */
const isElderlyMode = () => {
  return app.globalData.isElderlyMode || false;
};

/**
 * 确保交互元素的最小点击区域符合适老化要求
 * 按照要求，最小热区应为40×40pt
 * @param {number} size - 当前元素尺寸
 * @returns {number} 调整后的尺寸，确保最小为40rpx
 */
const ensureMinTouchSize = (size) => {
  const minTouchSize = 80; // 40pt对应80rpx
  return Math.max(size, minTouchSize);
};

/**
 * 获取适老化相关的全局信息
 * @returns {Object} 包含字体大小、缩放系数等信息
 */
const getAccessibilityInfo = () => {
  return {
    fontSizeSetting: app.globalData.fontSizeSetting || 16,
    fontScaleFactor: app.globalData.fontScaleFactor || 1,
    isElderlyMode: app.globalData.isElderlyMode || false
  };
};

module.exports = {
  scaleFontSize,
  scaleSize,
  getScaledStyles,
  isElderlyMode,
  ensureMinTouchSize,
  getAccessibilityInfo
};