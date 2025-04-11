# 西交利物浦大学研究生非官方指南在线平台

本仓库包含西交利物浦大学研究生非官方指南的在线阅读和评论平台源代码。原始[中文指南](https://github.com/xp-pgrs-unofficial-guide/xp_pgrs_unofficial_guide)和[英文版本](https://github.com/xp-pgrs-unofficial-guide/xp_pgrs_unofficial_guide_EN)作为子模块添加到本项目中。

该平台以微信小程序形式构建，并使用云开发功能提供在线服务。

## 项目结构

项目采用模块化设计，主要包含以下部分：

```
mini-program/               # 微信小程序目录
  ├── miniprogram/          # 小程序主目录
  │   ├── app.js            # 应用入口文件
  │   ├── app.json          # 全局配置
  │   ├── app.wxss          # 全局样式
  │   ├── utils/            # 工具函数库
  │   │   ├── services/     # 服务模块
  │   │   ├── store/        # 状态管理
  │   │   ├── accessibility.js # 适老化工具
  │   │   ├── helpers.js    # 通用工具函数
  │   │   └── wx-api.js     # 微信API封装
  │   ├── pages/            # 页面文件
  │   │   └── index/        # 主页面
  │   │       ├── index.js  # 页面逻辑
  │   │       └── modules/  # 页面功能模块
  │   ├── components/       # 自定义组件
  │   └── images/           # 图片资源
  ├── cloudfunctions/       # 云函数
  └── project.config.json   # 项目配置文件
xp_pgrs_unofficial_guide/   # 中文指南子模块
xp_pgrs_unofficial_guide_EN/ # 英文指南子模块
```

## 功能特点

- **多语言支持**：支持中英文切换，满足不同用户需求
- **适老化设计**：提供字体缩放、色彩调整等功能，提升可访问性
- **响应式布局**：适配不同尺寸设备，包括手机和平板
- **章节导航**：便捷的章节跳转和位置记忆功能
- **云存储集成**：高效管理和加载指南内容及图片资源
- **用户偏好保存**：记住用户设置和阅读位置

## 开发指南

### 项目初始化

1. 克隆项目（包含子模块）：

```
git clone --recursive https://github.com/xp-pgrs-unofficial-guide/xp_pgrs_unofficial_online_guide.git
```

2. 使用微信开发者工具打开 `mini-program` 目录
3. 在开发者工具中配置云开发环境

### 模块开发

本项目采用模块化结构，开发新功能时建议遵循以下步骤：

1. 确定功能所属模块，可能是：
   - 导航模块 (navigation.js)
   - 图片处理模块 (imageHandler.js)
   - 语言管理模块 (languageManager.js)
   - 适老化管理模块 (accessibilityManager.js)
   - 设备适配模块 (deviceAdapter.js)
   - 内容处理模块 (content.js)

2. 如需添加全局服务，请在 `utils/services` 目录下创建新文件
3. 修改现有模块时，请保持单一职责原则

### 最佳实践

- 使用 `Store` 管理全局状态，避免过度使用 globalData
- 统一使用 `wx-api.js` 中的封装函数调用微信API
- 页面逻辑尽量简化，复杂逻辑封装在相应模块中
- 遵循代码注释规范，便于团队协作

## 云开发配置

本项目使用微信小程序云开发，主要功能包括：

- 云存储：存储指南内容和图片资源
- 云函数：处理复杂业务逻辑
- 数据库：保存用户数据和评论信息

首次部署需配置相应的云开发环境，详细步骤请参考微信官方文档。

## 参与贡献

欢迎提交 Issue 或 Pull Request 参与项目改进。贡献前请先了解项目结构和编码规范。

## 许可证

本项目采用 MIT 许可证，详情请参阅 LICENSE 文件。