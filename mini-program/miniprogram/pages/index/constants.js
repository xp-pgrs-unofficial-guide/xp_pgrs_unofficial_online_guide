function highlightText(content) {
  return `<span> \`${content}\` </span>`;
}

const Chapters = [
  {
    id: '1',
    title: '创建列表页面并初始化数据',
    subsections: [
      {
        type: 'text',
        content: `编辑教程内置的页面${highlightText('miniprogram/pages/goods-list/index.js')}，在${highlightText('Page')}的${highlightText('data')}配置项中添加初始化数据${highlightText('goodsList')}，代码如下所示。该页面将用于展示商品列表。`,
      }
    ],
  },
  {
    id: '2',
    title: '实现并部署一个后台接口',
    subsections: [
      {
        type: 'text',
        content: `编辑教程内置的后台接口文件${highlightText('cloudfunctions/quickstartFunctions/fetchGoodsList/index.js')}，使用下面代码覆盖文件内容，返回一些模拟的商品列表数据。`,
      }
    ],
  },
  {
    id: '3',
    title: '小程序端调用后台接口',
    subsections: [
      {
        type: 'text',
        content: `编辑列表页${highlightText('miniprogram/pages/goods-list/index.js')}，在 Page 下新增一个方法${highlightText('fetchGoodsList')}，用于调用后端接口，并在 Page 的${highlightText('onLoad')}生命周期调用该方法：`,
      }
    ],
  },
  {
    id: '4',
    title: '从数据库中读取真实数据',
    subsections: [
      {
        type: 'text',
        content: '前面步骤中，后台接口返回的是模拟数据，实际开发中，我们需要利用数据库实现持久存储，下面我们来通过云开发数据库能力实现这个效果。',
      }
    ],
  },
  {
    id: '5',
    title: '调用开放接口生成小程序码',
    subsections: [
      {
        type: 'text',
        content: '实际小程序开发中，我们通常会对小程序进行传播分享。下面我们利用免鉴权的云调用能力实现小程序码。',
      }
    ],
  },
];

module.exports = {
    Chapters
}