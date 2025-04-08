function highlightText(content) {
  return `<span> \`${content}\` </span>`;
}

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
          "contents": [
            {
              "type": "text",
              "content": "这里是申请流程的内容描述。包括申请西浦博士项目需要的材料、时间线和注意事项等。"
            },
            {
              "type": "code",
              "content": "# 申请流程示例时间线\n1. 提交申请表 - 每年9月至次年3月\n2. 材料审核 - 2-4周\n3. 面试安排 - 材料通过后1-2周\n4. 录取结果 - 面试后2-4周\n5. 接受offer - 1-2周内"
            },
            {
              "type": "image",
              "content": "function_deploy.png"
            },
            {
              "type": "text-link",
              "content": ["更多信息请查看", "西浦官网", "获取最新申请指南。"]
            }
          ]
        },
        {
          "id": "1_2",
          "title": "签证办理",
          "title_en": "Visa Application",
          "contents": [
            {
              "type": "text",
              "content": "这里是签证办理的内容描述。包括中国签证类型、申请材料和流程等信息。"
            },
            {
              "type": "image",
              "content": "function_deploy.png"
            }
          ]
        },
        {
          "id": "1_3",
          "title": "住宿准备",
          "title_en": "Accommodation",
          "contents": [
            {
              "type": "text",
              "content": "这里是住宿准备的内容描述。包括校内外住宿选择、申请流程和注意事项等。"
            }
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
          "contents": [
            {
              "type": "text",
              "content": "这里是图书馆使用的内容描述。包括图书馆开放时间、借阅规则和电子资源访问等信息。"
            },
            {
              "type": "code",
              "content": "# 图书馆开放时间\n周一至周五: 8:00-22:00\n周六至周日: 10:00-18:00\n考试期间: 8:00-24:00"
            }
          ]
        },
        {
          "id": "2_2",
          "title": "研究工具",
          "title_en": "Research Tools",
          "contents": [
            {
              "type": "text",
              "content": "这里是研究工具的内容描述。包括常用的学术数据库、文献管理软件和数据分析工具等。"
            }
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
  NavigationData
};