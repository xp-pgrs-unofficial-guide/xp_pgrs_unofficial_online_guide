// 引入适老化工具
const accessibility = require('../../utils/accessibility');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'default' // 按钮类型：default, primary, warn
    },
    fontSize: {
      type: Number,
      value: 32 // 默认字体大小 (rpx)
    },
    width: {
      type: Number,
      value: 160 // 默认宽度 (rpx)
    },
    height: {
      type: Number,
      value: 80 // 默认高度 (rpx)，确保至少40pt的热区
    },
    disabled: {
      type: Boolean,
      value: false
    },
    className: {
      type: String,
      value: ''
    },
    customStyle: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scaledFontSize: 32,
    scaledWidth: 160,
    scaledHeight: 80
  },

  /**
   * 组件生命周期函数
   */
  lifetimes: {
    attached: function() {
      this.updateSizes();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateSizes: function() {
      // 根据用户设置的字体大小进行缩放
      const scaledFontSize = accessibility.scaleFontSize(this.properties.fontSize);
      
      // 获取缩放后的宽度，确保足够大的触控区域
      const scaledWidth = accessibility.ensureMinTouchSize(
        accessibility.scaleSize(this.properties.width)
      );
      
      // 获取缩放后的高度，确保足够大的触控区域
      const scaledHeight = accessibility.ensureMinTouchSize(
        accessibility.scaleSize(this.properties.height)
      );
      
      this.setData({
        scaledFontSize,
        scaledWidth,
        scaledHeight
      });
    },
    
    onButtonTap: function() {
      if (!this.properties.disabled) {
        // 触发点击事件
        this.triggerEvent('tap');
      }
    }
  },

  /**
   * 属性监听器
   */
  observers: {
    'fontSize, width, height': function() {
      this.updateSizes();
    }
  }
});