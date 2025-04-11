// 引入适老化工具
const accessibility = require('../../utils/accessibility');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fontSize: {
      type: Number,
      value: 28 // 默认字体大小 (rpx)
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
    scaledFontSize: 28 // 默认缩放后的字体大小
  },

  /**
   * 组件生命周期函数
   */
  lifetimes: {
    attached: function() {
      this.updateFontSize();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateFontSize: function() {
      // 根据用户设置的字体大小进行缩放
      const scaledSize = accessibility.scaleFontSize(this.properties.fontSize);
      this.setData({
        scaledFontSize: scaledSize
      });
    }
  },

  /**
   * 属性监听器
   */
  observers: {
    'fontSize': function(fontSize) {
      this.updateFontSize();
    }
  }
});