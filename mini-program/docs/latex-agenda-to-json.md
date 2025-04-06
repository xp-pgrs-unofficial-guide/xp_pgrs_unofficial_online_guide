# 基于LaTeX文档结构生成小程序章节导航系统

## 背景与需求

西浦博士生非官方指南已有完整的LaTeX文档结构，小程序开发需要一个与原始文档结构一致的章节导航系统。为了保持内容的一致性并简化更新流程，我们计划直接从LaTeX文档中提取章节结构，自动生成小程序使用的导航JSON。

## 实现思路

### 1. LaTeX文档结构分析

LaTeX文档使用特定命令标记文档结构层次：
- `\chapter{章节名}` - 定义一级章节
- `\section{节名}` - 定义二级节
- `\subsection{小节名}` - 定义三级小节

这些结构可以通过正则表达式匹配并提取，构建出与原文档完全一致的层级结构。

### 2. 解析实现方案

```javascript
/**
 * 解析LaTeX文档中的章节结构
 * @param {string} latexContent - LaTeX文档内容
 * @return {Object} 章节结构的JSON对象
 */
function parseLatexStructure(latexContent) {
  const structure = {
    chapters: []
  };
  
  // 匹配章节标题的正则表达式
  const chapterRegex = /\\chapter\{([^}]+)\}/g;
  const sectionRegex = /\\section\{([^}]+)\}/g;
  const subsectionRegex = /\\subsection\{([^}]+)\}/g;
  
  // 提取章节
  let chapterMatches = [...latexContent.matchAll(chapterRegex)];
  for (let i = 0; i < chapterMatches.length; i++) {
    const chapterTitle = chapterMatches[i][1];
    const chapterId = generateIdFromTitle(chapterTitle);
    
    // 构建章节对象
    const chapterObj = {
      id: chapterId,
      title: chapterTitle,
      sections: []
    };
    
    // 同理处理section和subsection...
    
    structure.chapters.push(chapterObj);
  }
  
  return structure;
}
```

### 3. 处理多文件项目

指南是由多个LaTeX文件组成的项目，需要支持处理多文件：

```javascript
/**
 * 处理多个LaTeX文件并生成完整导航结构
 * @param {string} mainFilePath - 主LaTeX文件路径
 * @param {string[]} chapterFilePaths - 章节文件路径列表
 * @param {string} outputPath - 输出JSON文件路径
 */
function processLatexProject(mainFilePath, chapterFilePaths, outputPath) {
  let structure = { chapters: [] };
  
  // 处理主文件和章节文件...
  
  // 写入JSON文件
  fs.writeFileSync(outputPath, JSON.stringify(structure, null, 2), 'utf8');
  console.log(`导航结构已保存到: ${outputPath}`);
  
  return structure;
}
```

### 4. 输出JSON结构示例

从LaTeX文档生成的导航JSON结构示例：

```json
{
  "chapters": [
    {
      "id": "necessary_resources",
      "title": "必备资源 Necessary Resources",
      "sections": [
        {
          "id": "necessary_resources_section_1",
          "title": "网站和公众号",
          "subsections": [
            {
              "id": "necessary_resources_section_1_subsection_1",
              "title": "官方网站"
            },
            {
              "id": "necessary_resources_section_1_subsection_2",
              "title": "学术资源"
            }
          ]
        }
      ]
    },
    {
      "id": "must_do",
      "title": "必做之事 Must Do",
      "sections": [
        // 小节内容
      ]
    }
  ]
}
```

## 集成到小程序

### 1. 生成流程

1. 创建解析脚本，读取LaTeX文档，生成JSON
2. 在构建小程序前运行脚本，更新导航数据
3. 将导航JSON文件放入小程序的静态资源中

### 2. 小程序中的使用

```javascript
// 在小程序页面中
Page({
  data: {
    navigation: null
  },
  onLoad() {
    // 从本地或云存储加载导航数据
    wx.getFileSystemManager().readFile({
      filePath: `${wx.env.USER_DATA_PATH}/navigation.json`,
      encoding: 'utf-8',
      success: (res) => {
        this.setData({
          navigation: JSON.parse(res.data)
        });
      }
    });
  },
  
  // 渲染导航结构
  renderNavigation() {
    // 根据navigation数据渲染界面...
  }
});
```

### 3. 导航UI实现

小程序导航UI可以采用以下组合：
- 基于tabs的底部导航。在指南、个人中心间切换。用户阅读时隐藏，点击屏幕显示
- 指南 tab 使用章节列表页+详情页模式

<!-- 其他备选形式：
- 左侧抽屉式导航栏，显示章节和小节
- 章节列表页+详情页模式
- 基于tabs的底部导航+滚动列表 -->

## 优势

1. **结构一致性**：确保小程序导航与LaTeX文档目录结构完全一致
2. **自动化更新**：当LaTeX文档更新时，只需重新运行解析脚本，不需要手动维护两套目录
3. **降低维护成本**：避免手动同步导航结构可能产生的错误
4. **支持多语言**：可以同时处理中英文版本的LaTeX文档，生成对应导航结构

## 实现步骤

1. 在小程序项目中创建utils/latexParser.js工具文件
2. 实现解析和生成功能
3. 创建构建脚本，在构建前运行解析器
4. 在小程序中加载并使用生成的导航结构
5. 实现导航UI组件

## 后续优化

1. **增量更新**：只更新变化的部分，提高处理效率
2. **双向同步**：小程序中修改导航结构后，也能同步到LaTeX文档中
3. **关联内容**：将导航结构与具体内容页面关联，支持直接跳转
4. **个性化设置**：允许用户自定义导航显示方式和收藏常用章节