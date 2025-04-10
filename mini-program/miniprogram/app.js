// app.js
App({
  // 全局数据，提前定义以便在 onLaunch 中使用
  globalData: {
    envId: "cloud1-6gkazfbf5b6e6956"
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
  },
  
  /**
   * 获取完整的云存储文件ID
   * @param {string} cloudPath - 相对路径，例如 "images/example.jpg"
   * @returns {string} 完整的云存储文件ID
   */
  getCloudFileID: function(cloudPath) {
    if (!cloudPath) return '';
    return `cloud://${this.globalData.envId}.636c-${this.globalData.envId}-1254140141/${cloudPath}`;
  }
});
