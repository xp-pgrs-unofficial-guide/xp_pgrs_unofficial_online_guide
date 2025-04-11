// 引入适老化工具
const accessibility = require('../../utils/accessibility');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    padding: {
      type: Number,
      value: 20 // 默认内边距 (rpx)
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
    scaledPadding: 20 // 默认缩放后的内边距
  },

  /**
   * 组件生命周期函数
   */
  lifetimes: {
    attached: function() {
      this.updatePadding();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updatePadding: function() {
      // 根据用户设置的字体大小进行缩放
      const scaledPadding = accessibility.scaleSize(this.properties.padding);
      this.setData({
        scaledPadding: scaledPadding
      });
    }
  },

  /**
   * 属性监听器
   */
  observers: {
    'padding': function(padding) {
      this.updatePadding();
    }
  }
});