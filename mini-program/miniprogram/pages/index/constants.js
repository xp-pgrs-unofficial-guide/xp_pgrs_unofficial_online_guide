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

// 导航数据结构
const NavigationData = {
  "chapters": [
    {
      "id": "1",
      "title": "入学准备",
      "title_en": "Preparation",
      "icon": "preparation-icon",
      "sections": [
        {
          "id": "1_1",
          "title": "申请流程",
          "title_en": "Application Process",
          "content": [
            "这里是申请流程的内容描述。包括申请西浦博士项目需要的材料、时间线和注意事项等。",
            "更多申请流程的详细介绍..."
          ]
        },
        {
          "id": "1_2",
          "title": "签证办理",
          "title_en": "Visa Application",
          "content": [
            "这里是签证办理的内容描述。包括中国签证类型、申请材料和流程等信息。",
            "更多签证办理的详细介绍..."
          ]
        },
        {
          "id": "1_3",
          "title": "住宿准备",
          "title_en": "Accommodation",
          "content": [
            "这里是住宿准备的内容描述。包括校内外住宿选择、申请流程和注意事项等。",
            "更多住宿准备的详细介绍..."
          ]
        }
      ]
    },
    {
      "id": "2",
      "title": "学术资源",
      "title_en": "Academic Resources",
      "icon": "academic-icon",
      "sections": [
        {
          "id": "2_1",
          "title": "图书馆使用",
          "title_en": "Library Usage",
          "content": [
            "这里是图书馆使用的内容描述。包括图书馆开放时间、借阅规则和电子资源访问等信息。",
            "更多图书馆使用的详细介绍..."
          ]
        },
        {
          "id": "2_2",
          "title": "研究工具",
          "title_en": "Research Tools",
          "content": [
            "这里是研究工具的内容描述。包括常用的学术数据库、文献管理软件和数据分析工具等。",
            "更多研究工具的详细介绍..."
          ]
        }
      ]
    },
    {
      "id": "3",
      "title": "校园生活",
      "title_en": "Campus Life",
      "icon": "campus-icon",
      "sections": [
        {
          "id": "3_1",
          "title": "食堂餐厅",
          "title_en": "Dining Options",
          "content": [
            "这里是食堂餐厅的内容描述。包括校内食堂位置、营业时间和特色菜品等信息。",
            "更多食堂餐厅的详细介绍..."
          ]
        },
        {
          "id": "3_2",
          "title": "体育设施",
          "title_en": "Sports Facilities",
          "content": [
            "这里是体育设施的内容描述。包括健身房、游泳池和各类运动场地的使用信息。",
            "更多体育设施的详细介绍..."
          ]
        },
        {
          "id": "3_3",
          "title": "学生社团",
          "title_en": "Student Clubs",
          "content": [
            "这里是学生社团的内容描述。包括博士生相关社团、活动信息和加入方式等。",
            "更多学生社团的详细介绍..."
          ]
        }
      ]
    },
    {
      "id": "4",
      "title": "学位要求",
      "title_en": "Degree Requirements",
      "icon": "degree-icon",
      "sections": [
        {
          "id": "4_1",
          "title": "学术进度",
          "title_en": "Academic Progress",
          "content": [
            "这里是学术进度的内容描述。包括博士项目各阶段的时间节点和要求等。",
            "更多学术进度的详细介绍..."
          ]
        },
        {
          "id": "4_2",
          "title": "论文要求",
          "title_en": "Thesis Requirements",
          "content": [
            "这里是论文要求的内容描述。包括论文格式、提交流程和答辩准备等信息。",
            "更多论文要求的详细介绍..."
          ]
        }
      ]
    },
    {
      "id": "5",
      "title": "生活福利",
      "title_en": "Benefits & Welfare",
      "icon": "welfare-icon",
      "sections": [
        {
          "id": "5_1",
          "title": "医疗保险",
          "title_en": "Health Insurance",
          "content": [
            "这里是医疗保险的内容描述。包括保险覆盖范围、使用方式和报销流程等信息。",
            "更多医疗保险的详细介绍..."
          ]
        },
        {
          "id": "5_2",
          "title": "奖学金",
          "title_en": "Scholarships",
          "content": [
            "这里是奖学金的内容描述。包括各类奖学金的申请条件、金额和申请流程等。",
            "更多奖学金的详细介绍..."
          ]
        },
        {
          "id": "5_3",
          "title": "交通出行",
          "title_en": "Transportation",
          "content": [
            "这里是交通出行的内容描述。包括校车信息、公共交通和骑行共享单车等选择。",
            "更多交通出行的详细介绍..."
          ]
        }
      ]
    }
  ]
};

// 导出常量
module.exports = {
  Chapters,
  NavigationData
};