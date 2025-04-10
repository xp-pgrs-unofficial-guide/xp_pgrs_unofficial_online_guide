function highlightText(content) {
  return `<span> \`${content}\` </span>`;
}

// 导航数据结构
const NavigationData = {
    "chapters": [
        {
            "id": "1",
            "title": "前言",
            "sections": [
                {
                    "contents": [
                        {
                            "type": "text",
                            "content": "我之前跟一些博士生同学交流的时候，他们有的都快毕业了，有的都不知道可以去领办公用品，还有的甚至学校体育馆在哪里都不清楚，更别说免费的健身房、球场资源。以及在博士生微信群里，每年都有人到了第一次 APR 的时间才知道还有 meeting record需要填。再以及，利物浦账号下的大量数字资源，了解的人就更少了。有些重要的事，自己不知道，导师不知道，办公室同学也不知道，那最后真的就可能等到毕业了才知道。"
                        },
                        {
                            "type": "text",
                            "content": "这就是发起本攻略项目的目的。虽然说每个同学入学的时候都收到了一本学校发的 PhD Student Handbook，但很遗憾的是，远远不够。一来其中缺少很多内容，例如利物浦 meeting record、利物浦账户福利几乎没介绍；二来由于是全英文，翻了几页干货又不多，估计很多同学像我一样直接就失去了阅读兴趣；三来入学时发了一大堆材料，虽然官方手册有其重要性，但很容易就淹没在那一堆材料里了。"
                        },
                        {
                            "type": "text",
                            "content": "对我个人而言，入学的时候也是在各位办公室学长的帮助下才获得了很多必要知识。因此我就想到可以克服原手册的弊端，把这些经验记录下来，以泽后人。与我而言，也是为西浦集体做出的微小贡献。也希望受益于本手册同学，能在学习中把自己宝贵的经验记录下来，将帮助传递下去。"
                        },
                        {
                            "type": "text",
                            "content": "本手册并不想替代 PhD Student Handbook，而只是作为补充以及重点摘录。因此希望看到这本书的同学，有空的时候还是把官方手册从垃圾桶里捡起来，很可能有重要的发现。"
                        },
                        {
                            "type": "text",
                            "content": "如果想表达你对作者们的感谢，可以到本项目GitHub上点亮一个star（链接：https://github.com/xp-pgrs-unofficial-guide/xp_pgrs_unofficial_guide）。同时，如果你受到了此文档的帮助，也鼓励你花几分钟把你的亲身经验记录下来，把帮助传递下去。如何投稿，请见本文档第 作指南 章。"
                        },
                        {
                            "type": "text",
                            "content": "最后，本手册完全用爱发电，从未受到任何资助，也没有官方背景。其中可能有谬误和缺漏，敬请原谅，欢迎指正。"
                        },
                        {
                            "type": "text",
                            "content": "项目发起人：KW，2022年8月18日于MB"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2",
            "title": "Start here: 入口级网站和应用",
            "sections": [
              {
                "id": "2-1",
                "title": "网站",
                "contents": [
                  {
                    "type": "text",
                    "content": "西浦校内网站导航：https://guide.xjtlu.edu.cn\n个人信息门户ebridge：https://ebridge.xjtlu.edu.cn\n利物浦信息门户Liverpool Life：https://liverpool-life.liverpool.ac.uk"
                  }
                ]
              },
              {
                "id": "2-2",
                "title": "公众号",
                "contents": [
                  {
                    "type": "image",
                    "content": "author-folder/Kai.Wu/qrcode_XJTLU-China_1.jpg"
                  },
                  {
                    "type": "text",
                    "content": "学校公众号"
                  },
                  {
                    "type": "image",
                    "content": "author-folder/Kai.Wu/qrcode_XJTLU_library_1.jpg"
                  },
                  {
                    "type": "text",
                    "content": "图书馆"
                  },
                  {
                    "type": "image",
                    "content": "author-folder/Kai.Wu/qrcode_student_service.jpg"
                  },
                  {
                    "type": "text",
                    "content": "学生服务（一站式）"
                  },
                  {
                    "type": "image",
                    "content": "author-folder/Kai.Wu/qrcode_IT.jpg"
                  },
                  {
                    "type": "text",
                    "content": "IT"
                  },
                  {
                    "type": "text",
                    "content": "另外，各学院可能有公众号，可在微信搜 \"西浦 {学院名}\" \"西交利物浦 {学院名}\""
                  }
                ]
              },
              {
                "id": "2-3",
                "title": "手机APP",
                "contents": [
                  {
                    "type": "text",
                    "content": "https://guide.xjtlu.edu.cn/How-to-install-the-XJTLU-APP.html"
                  }
                ]
              },
              {
                "id": "2-4",
                "title": "常用资源位置",
                "contents": [
                  {
                    "type": "text",
                    "content": "西浦PGR Handbook电子版、学校政策、校规：登录ebridge，在中间的PGR Policies, Procedures and Forms里\n利物浦PGR Handbook电子版 https://www.liverpool.ac.uk/student-administration/research-students/pgr-handbook/\n校园地图：见附录 Chapter.。或者微信搜\"西浦地图\"小程序\n校历：ebridge登录后左边 Academic Calendar\n常用电话：见附录 Chapter."
                  }
                ]
              }
            ]
          }
    ]
};

const NavigationData1 = {
  "chapters": [
    {
      "id": "1",
      "title": "入学准备",
      "title_en": "Preparation",
      // "icon": "home",
      "sections": [
        {
          "id": "1_1",
          "title": "申请流程",
          "title_en": "Application Process",
          "contents": [
            {
              "type": "text",
              "content": "这里是申请流程的内容描述。包括申请西浦博士项目需要的材料、时间线和注意事项等。",
              "content_en": "This is a description of the application process, including required materials for XJTLU PhD programs, timeline, and important notes."
            },
            {
              "type": "code",
              "content": "# 申请流程示例时间线\n1. 提交申请表 - 每年9月至次年3月\n2. 材料审核 - 2-4周\n3. 面试安排 - 材料通过后1-2周\n4. 录取结果 - 面试后2-4周\n5. 接受offer - 1-2周内",
              "content_en": "# Application Process Timeline Example\n1. Submit application - September to March\n2. Document review - 2-4 weeks\n3. Interview arrangement - 1-2 weeks after document approval\n4. Admission result - 2-4 weeks after interview\n5. Accept offer - Within 1-2 weeks"
            },
            {
              "type": "image",
              "content": "single_template.png"
            },
            {
              "type": "text-link",
              "content": ["更多信息请查看", "西浦官网", "获取最新申请指南。"],
              "content_en": ["For more information, please check", "XJTLU official website", "for the latest application guide."]
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
              "content": "这里是签证办理的内容描述。包括中国签证类型、申请材料和流程等信息。",
              "content_en": "This describes the visa application process, including Chinese visa types, required documents, and procedures."
            },
            {
              "type": "image",
              "content": "single_template.png"
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
              "content": "这里是住宿准备的内容描述。包括校内外住宿选择、申请流程和注意事项等。",
              "content_en": "This describes accommodation preparation, including on-campus and off-campus housing options, application process, and important notes."
            }
          ]
        }
      ]
    },
    {
      "id": "2",
      "title": "学术资源",
      "title_en": "Academic Resources",
      // "icon": "home",
      "sections": [
        {
          "id": "2_1",
          "title": "图书馆使用",
          "title_en": "Library Usage",
          "contents": [
            {
              "type": "text",
              "content": "这里是图书馆使用的内容描述。包括图书馆开放时间、借阅规则和电子资源访问等信息。",
              "content_en": "This describes how to use the library, including opening hours, borrowing rules, and access to electronic resources."
            },
            {
              "type": "code",
              "content": "# 图书馆开放时间\n周一至周五: 8:00-22:00\n周六至周日: 10:00-18:00\n考试期间: 8:00-24:00",
              "content_en": "# Library Opening Hours\nMonday to Friday: 8:00-22:00\nSaturday to Sunday: 10:00-18:00\nExam Period: 8:00-24:00"
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
              "content": "这里是研究工具的内容描述。包括常用的学术数据库、文献管理软件和数据分析工具等。",
              "content_en": "This describes research tools, including commonly used academic databases, reference management software, and data analysis tools."
            }
          ]
        }
      ]
    },
    {
      "id": "3",
      "title": "校园生活",
      "title_en": "Campus Life",
      // "icon": "campus-icon",
      "sections": [
        {
          "id": "3_1",
          "title": "食堂餐厅",
          "title_en": "Dining Options",
          "content": [
            "这里是食堂餐厅的内容描述。包括校内食堂位置、营业时间和特色菜品等信息。",
            "更多食堂餐厅的详细介绍..."
          ],
          "content_en": [
            "This describes dining options on campus, including cafeteria locations, operating hours, and featured dishes.",
            "More detailed introduction to campus dining options..."
          ]
        },
        {
          "id": "3_2",
          "title": "体育设施",
          "title_en": "Sports Facilities",
          "content": [
            "这里是体育设施的内容描述。包括健身房、游泳池和各类运动场地的使用信息。",
            "更多体育设施的详细介绍..."
          ],
          "content_en": [
            "This describes sports facilities, including gym, swimming pool, and various sports venues usage information.",
            "More detailed introduction to sports facilities..."
          ]
        },
        {
          "id": "3_3",
          "title": "学生社团",
          "title_en": "Student Clubs",
          "content": [
            "这里是学生社团的内容描述。包括博士生相关社团、活动信息和加入方式等。",
            "更多学生社团的详细介绍..."
          ],
          "content_en": [
            "This describes student clubs, including PhD student-related societies, activity information, and how to join.",
            "More detailed introduction to student clubs..."
          ]
        }
      ]
    },
    {
      "id": "4",
      "title": "学位要求",
      "title_en": "Degree Requirements",
      // "icon": "degree-icon",
      "sections": [
        {
          "id": "4_1",
          "title": "学术进度",
          "title_en": "Academic Progress",
          "content": [
            "这里是学术进度的内容描述。包括博士项目各阶段的时间节点和要求等。",
            "更多学术进度的详细介绍..."
          ],
          "content_en": [
            "This describes academic progress, including timeline and requirements for each stage of the PhD program.",
            "More detailed introduction to academic progress requirements..."
          ]
        },
        {
          "id": "4_2",
          "title": "论文要求",
          "title_en": "Thesis Requirements",
          "content": [
            "这里是论文要求的内容描述。包括论文格式、提交流程和答辩准备等信息。",
            "更多论文要求的详细介绍..."
          ],
          "content_en": [
            "This describes thesis requirements, including thesis format, submission process, and viva preparation.",
            "More detailed introduction to thesis requirements..."
          ]
        }
      ]
    },
    {
      "id": "5",
      "title": "生活福利",
      "title_en": "Benefits & Welfare",
      // "icon": "welfare-icon",
      "sections": [
        {
          "id": "5_1",
          "title": "医疗保险",
          "title_en": "Health Insurance",
          "content": [
            "这里是医疗保险的内容描述。包括保险覆盖范围、使用方式和报销流程等信息。",
            "更多医疗保险的详细介绍..."
          ],
          "content_en": [
            "This describes health insurance, including coverage, usage, and reimbursement process.",
            "More detailed introduction to health insurance..."
          ]
        },
        {
          "id": "5_2",
          "title": "奖学金",
          "title_en": "Scholarships",
          "content": [
            "这里是奖学金的内容描述。包括各类奖学金的申请条件、金额和申请流程等。",
            "更多奖学金的详细介绍..."
          ],
          "content_en": [
            "This describes scholarships, including eligibility criteria, amounts, and application process for various scholarships.",
            "More detailed introduction to scholarship opportunities..."
          ]
        },
        {
          "id": "5_3",
          "title": "交通出行",
          "title_en": "Transportation",
          "content": [
            "这里是交通出行的内容描述。包括校车信息、公共交通和骑行共享单车等选择。",
            "更多交通出行的详细介绍..."
          ],
          "content_en": [
            "This describes transportation options, including shuttle bus information, public transportation, and bike-sharing options.",
            "More detailed introduction to transportation options..."
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