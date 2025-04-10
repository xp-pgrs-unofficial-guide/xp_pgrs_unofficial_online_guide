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
                    "cloudPath": "images/author-folder/Kai.Wu/qrcode_XJTLU-China_1.jpg"
                  },
                  {
                    "type": "text",
                    "content": "学校公众号"
                  },
                  {
                    "type": "image",
                    "cloudPath": "images/author-folder/Kai.Wu/qrcode_XJTLU_library_1.jpg"
                  },
                  {
                    "type": "text",
                    "content": "图书馆"
                  },
                  {
                    "type": "image",
                    "cloudPath": "images/author-folder/Kai.Wu/qrcode_student_service.jpg"
                  },
                  {
                    "type": "text",
                    "content": "学生服务（一站式）"
                  },
                  {
                    "type": "image",
                    "cloudPath": "images/author-folder/Kai.Wu/qrcode_IT.jpg"
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
          },
          {
            "id": "3",
            "title": "这些必须得做，不然毕不了业",
            "sections": [
                {
                    "id": "3-1",
                    "title": "必修课程",
                    "contents": [
                        {
                            "type": "text",
                            "content": "学校为博士生提供了一系列的课程，会在learning mall的页面公布（链接在此），也会以Updates on Workshops for Postgraduate Research Students为题的邮件通知大家。绝大部分的课程大家依照自己的水平选择参加，但是，其中有两门是必须要参加的，否则没法毕业。分别是\n\n- Supervisor-Supervisee Relationships\n- Research Integrity (Ethics)\n\n这两个workshop，每个学期都有，但在毕业之前务必参加分别一次，以参加时扫码签到情况为准。"
                        }
                    ]
                },
                {
                    "id": "3-2",
                    "title": "Liverpool Life 会议记录",
                    "contents": [
                        {
                            "type": "text",
                            "content": "作为APR要求的一部分，每位同学作为利物浦的博士生，必须要在一个称作Liverpool-life的系统里，记录自己和导师的会议时间和内容。下面为大家演示一下如何操作。\n\n1. 首先进入liverpool-life网站https://liverpool-life.liverpool.ac.uk/，用你的利物浦学号（不是邮箱，更不是西浦学号）和密码登录\n2. 找到PGR Record of Supervisory Meetings，点击View all meetings\n3. 点击Arange new meeting，会弹出窗口，填入日期时间，选择导师（在你后面全部填写完过后，被选中的导师会在他的利物浦邮箱收到邮件）。取消勾选第一个create calendar appointment，否则会在利物浦邮箱的日历里创建一个多半用不上的日程（因为西浦的学生一般都用西浦邮箱对应的日历系统，利物浦的日历系统应该是从来不用的），然后勾选下面的has been pre-agreed。"
                        },
                        {
                            "type": "image",
                            "cloudPath": "images/author-folder/Kai.Wu/meeting_record_figures/arange_new_meeting.jpg"
                        },
                        {
                            "type": "text",
                            "content": "4. 然后回忆一下你最近一次跟导师meeting时谈论的内容，填写进度报告（你做了什么）、target（直到下次meeting前打算做什么）、讨论项目"
                        },
                        {
                            "type": "image",
                            "cloudPath": "images/author-folder/Kai.Wu/meeting_record_figures/add_items_to_meetings.jpg"
                        },
                        {
                            "type": "text",
                            "content": "5. 内容不用太多，但也不能太敷衍，毕竟利物浦是要检查的。填完过后，点击email this agenda，然后你和你导师的利物浦邮箱都会收到一封系统自动生成的邮件。"
                        },
                        {
                            "type": "image",
                            "cloudPath": "images/author-folder/Kai.Wu/meeting_record_figures/email_to.jpg"
                        },
                        {
                            "type": "text",
                            "content": "6. 到这里不要着急关闭，还要填一下你们会议中的意见。点击右边的view edit meeting"
                        },
                        {
                            "type": "image",
                            "cloudPath": "images/author-folder/Kai.Wu/meeting_record_figures/view_edit.jpg"
                        },
                        {
                            "type": "text",
                            "content": "7. 填入会议中的意见。最后点左上角email，你和导师的利物浦邮箱又会收到一封邮件"
                        },
                        {
                            "type": "image",
                            "cloudPath": "images/author-folder/Kai.Wu/meeting_record_figures/post_meeting.jpg"
                        },
                        {
                            "type": "text",
                            "content": "8. 到这里你要做的就结束了。你导师需要在他利物浦邮箱收到的邮件里，点击sign off，之后你的利物浦邮箱会收到一封题为 PGR Supervisor Meeting 5 (Fri 07th Oct 2022 @ 02:00 pm): sign off comments 的邮件，然后这次meeting record才算全部完成。每年APR之前，必须要每月至少1次的meeting全部sign off。如果你的导师一直没sign off，需要提醒他\n\n【几个注意事项】\n- 这个记录最好是每个月填一次。虽然可以补，就是几个月不填然后一口气补半年的，这样是被允许的，但是不规范。我个人的经验里，如果放到APR前夕来补，一来也忘了当年的进度到底是什么，二来APR前夕也很忙。所以，尽量还是按要求每月填一次吧\n- liverpool life和这个填报网站，经！常！登！不！上！去！因为各种网络和系统的问题，反正即使在西浦校内用wifi和网线都是概率登得上去。据各位同学亲测，一般自己使用科学上网，开全局代理，连通性会好很多，但这些不太合法的方法不能教给大家，也万万不能在微信、QQ里讨论，否则会封号、炸群。不会科学上网的同学，更是要尽量早填报，否则到deadline登不上去就更着急。"
                        }
                    ]
                },
                {
                    "id": "3-3",
                    "title": "APR",
                    "contents": [
                        {
                            "type": "text",
                            "content": "首先请看官方说明。没看过的同学，请务必逐字逐句阅读完毕，因为APR重要性相当于一次小答辩。不通过的，会被退学。\n\nhttps://www.liverpool.ac.uk/student-administration/research-students/progression/annual-progress/\n\n在我的理解里，APR的作用是\n- Interview: 读PhD本身很不容易，所以学校、学院需要了解学生遇到的问题，帮助解决\n- Seminar: 锻炼作报告的能力 + 认识其他博士生同学\n- Progress report: 检查学生进度，进一步发现并帮助解决学生遇到的问题。同时，筛查完全不认真学习的学生"
                        },
                        {
                            "type": "text",
                            "content": "有同学一开始面对APR的时候会很紧张。实际上，进度报告部分，只要不是一整年真的天天混日子，看书、读文献、写文章、做调查、做实验、写代码等等任何一样都没干，评审老师是不会刁难你不给过的。听说22年某学院APR有个学生不通过，据可靠消息此人是近乎人间蒸发，导师消息完全不回，工作不做，才fail的。"
                        },
                        {
                            "type": "text",
                            "content": "而且要注意到，APR的另一个主要功能是——帮助大家解决问题。所以，反而应该大胆的在APR里暴露自己的问题，寻求帮助。"
                        },
                        {
                            "type": "text",
                            "content": "APR 流程\n准备工作\nAPR的前置任务只有一个，那就是要填完每月至少一次的会议记录。关于如何填写会议记录，参见章节会议记录。"
                        },
                        {
                            "type": "text",
                            "content": "然后，每年关于APR有两封重要邮件\n1. 其一为西浦在5月发的邮件，大概长这样，发到西浦邮箱"
                        },
                        {
                            "type": "image",
                            "cloudPath": "images/author-folder/Kai.Wu/APR_email.jpg"
                        },
                        {
                            "type": "text",
                            "content": "2. 其二为你的利物浦学院在4月到5月发的邮件，数学学院的大概长这样，发到利物浦邮箱。其他学院的可能不太一样。各个学院发通知的时间也有很大不同，有4月就发的，有拖到5月底的。"
                        },
                        {
                            "type": "image",
                            "cloudPath": "images/author-folder/Kai.Wu/APR_liverpool_email.jpg"
                        },
                        {
                            "type": "text",
                            "content": "每个学院的APR要求略有区别，所以在5月左右，请务必查收你的利物浦邮箱。两封邮件，请务必仔细阅读。初次做APR的同学，建议对两封邮件和附件，逐字阅读。"
                        },
                        {
                            "type": "text",
                            "content": "APR的具体内容就是下面四个部分"
                        },
                        {
                            "type": "text",
                            "content": "TULIP 网页表格\n利物浦和西浦邮件里所谓的 \"Your annual progress report has been released\" 就是说这个绿油油的表你可以填了。里面主要是这几部分要填：\n1. SUMMARY OF PROGRESS 进度报告，300词以上，4000字符（约600词）以下\n2. Seminars and Conference attendance, Library and IT training and all subject specific training including research methods and experimental techniques. （回忆一下，越多越好，实在没有也没关系）参加的会议、研讨会、专业技能培训\n3. Attendance at careers events and workshops covering Employability and Entrepreneurship and including attendance at any other Professional development workshops. （越多越好）参加的就业相关活动\n4. Training and completion of activities relating to Health and Safety, ethics, grant writing and similar activities, including Project Management. （越多越好）参加的和学习不直接相关但又有关的活动\n5. Details of your Presentations, written publications, teaching and public engagement/Impact activities and related training in for these activities. （越多越好）参加的展示、发表的论文、做过的助教\n6. PERSONAL OR ACADEMIC PROBLEMS: Have there been any problems in the last year which you feel have affected your progress? （按实际情况填写）有没有遇到什么阻碍学习的问题。直白点说，可以真切的提出问题，也可适当甩锅，就是\"我进度不够都是因为xxxxxx（生病了/结婚了/学校网络不行/自己英语阅读太慢/自己某方面能力欠缺）\""
                        },
                        {
                            "type": "image",
                            "cloudPath": "images/author-folder/Kai.Wu/TULIP.jpg"
                        },
                        {
                            "type": "text",
                            "content": "TULIP表不分学院，所有同学都肯定要填。但以下 ↓ 三个部分各个学院要求可能非常不同，同时还部分取决于你隶属的利物浦学院，可能跟你的学长学姐double check。"
                        },
                        {
                            "type": "text",
                            "content": "Annual Report (AR) 年度报告\n简单来说，把你做了什么写成一篇文档。一般会有字数或者页数要求。如果你真的不知道写什么，我个人建议可以事无巨细的写，按时间顺序，比如，读了什么文献，有了什么收获；写了什么代码/做了什么实验。以及很重要的，参加了什么学术活动，比如参加conference, meeting，还有做学校的TA，都可以写进去。换而言之，就是把上面的TULIP表格的内容用文档再说一遍，基本就是复制粘贴，然后字数不够的话扩充一下内容。"
                        }
                    ]
                },
                {
                    "id": "3-4",
                    "title": "Research Symposium",
                    "contents": [
                        {
                            "type": "text",
                            "content": "XPGRS是什么\nXJTLU Postgraduate Research Symposium，简称XPGRS，或者Symposium，官方中文名是\"博士生论坛\"，是研究生院组织的活动。每年12月，会让全校的博士生一起用poster或者oral presentation展示自己的研究成果或者进展。每年的XPGRS，会在国庆节前后用邮件通知大家。"
                        },
                        {
                            "type": "text",
                            "content": "我需要参加哪一项？\n\n官方要求是这样的：\n\n- 二年级的博士生需要做海报演讲\n- 三年级的博士生需要做口头报告\n- 四年级或以上的博士生将被邀请担任会议主席\n- 也欢迎处于毕业论文阶段的硕士生参加"
                        },
                        {
                            "type": "text",
                            "content": "结合往年的实际情况，翻译过来就是：\n\n- 一年级的没事，但可以考虑做志愿者（会发邮件招募），或者直接去现场围观，了解前辈的工作\n- 二年级的，必须做poster\n- 三年级的，必须做oral presentation，可以考虑做chair\n- 四年或以上就随便了"
                        },
                        {
                            "type": "text",
                            "content": "判断自己是哪一年级的，以当年12月1日为准。这对3-9月入学的不难，但有很多同学就恰好是在12月1日入学的。据22年的消息，这部分同学是需要做的，也就是比如21年12月入学，22年需要做poster。"
                        },
                        {
                            "type": "text",
                            "content": "理论上，其实每年你都可以同时参加poster和oral，只要你愿意！甚至，也可以从来都不去！但需要导师同意。一般没有特殊原因，导师也是希望你去锻炼下的。如果实在有原因，需要导师和研究生院联系，同意了就可以不去。（我听说过有的导师觉得symposium没卵用直接让学生从来都不参加，也有的导师，第一次就让学生同时做poster+oral...）"
                        },
                        {
                            "type": "image",
                            "cloudPath": "images/author-folder/Kai.Wu/synposium_poster.jpg"
                        },
                        {
                            "type": "text",
                            "content": "有什么用\n\n1. 锻炼作报告的能力，锻炼英语口语，获得校内其他老师的指导\n2. 可以得奖。学校会请几位老师来听你讲海报、讲PPT，并给你打分。会选出最佳海报奖（10%）最佳演讲奖（10%）优秀海报奖（20%）优秀演讲奖（20%），会有一张奖状，外加1000和500元的……会议经费（会议经费使用参见章节fund），虽然不是现金奖励，但还算有用吧"
                        },
                        {
                            "type": "image",
                            "cloudPath": "images/author-folder/Kai.Wu/poster_award.jpg"
                        },
                        {
                            "type": "text",
                            "content": "\"我不想去\"——尽量不要！\n\n经常听到有同学这么想：奖励这么少，含金量又低，即使最后拿个最佳也没卵用。而且即使不去，最后也没能把我怎么样。是的，坦白了讲，一来，导师同意，就可以合法不去；二来，即使直接装消失，最后也不会怎么样，和毕业无关。\n\n但，作为参加过poster、oral，也chair过三场oral、听过很多口头报告的老人，除非你作报告真的可以信手拈来，我真的强烈建议你们去参加！我见过有同学全程低头念稿，有同学直接把稿子写PPT上读，有同学过于紧张手和声音都抖个不停，有同学PPT分不清楚主次、重点不突出，有同学面对老师的问题手足无措。这些任何一项，放到你毕业答辩，都是致命的！！须知，咱答辩不是和体制内大学一样走个过场，是真枪实弹的必须要做好报告、再回答好每一个尖锐的问题。你想要把这些问题直接暴露在答辩上，还是提前发现，多加锻炼，早些解决？\n\n所有，既然在Symposium里，你不会Fail，只会评奖，评委老师也都很友善，会帮你找出重要问题。所以，是非常安全的、绝佳的【锻炼机会】。可不能等到答辩了或者等到你参加顶会了再去锻炼啊！"
                        },
                        {
                            "type": "text",
                            "content": "注意事项、如何表现出色\n\n下面附上我在2022年symposium看到的口头报告打分表（可放大查看），poster的注意事项其实很类似（参加poster的，也需要准备一个3分钟左右的talk来给到场的评委老师介绍）。坦白的说，这些项目放在任何报告里都是值得注意的地方，可以用来仔细审视自己的海报。"
                        },
                        {
                            "type": "image",
                            "cloudPath": "images/author-folder/Kai.Wu/2022_XPGRS_oral_judging_criteria.pdf"
                        },
                        {
                            "type": "image",
                            "cloudPath": "images/author-folder/Kai.Wu/2022_XPGRS_oral_judging_form.pdf"
                        },
                        {
                            "type": "text",
                            "content": "如果你想表现出色、得奖，可以继续看下面的内容：\n\n作报告和做海报，大家在网上都能搜到大量教程。但，XPGRS和其他学术报告最大的区别就是，绝大多数同学、包括学校的评审老师，非常有可能完全不知道你的研究领域（正所谓，隔行如隔山）。如果你按照跟你导师汇报的方式来讲，或者是把你在某次内行齐聚的学术会议上的海报/PPT原封不动拿来用，有可能是得不了奖的，因为，评委老师和其他同学确实听不懂。\n\n我的导师告诉我，XPGRS因为是给外行讲，和学术报告其实不同，更偏向科普性质。如何在短时间内，让一个外行对你的研究感兴趣，并且搞懂个70%，也是Symposium的部分目的。如果你不知道该怎么做，可以想象有一天你在电梯里遇到了席酉民，怎么在短时间内让他知道你在做什么，又有什么用，最好还能让他感兴趣。或者是，过年回家跟你哪个亲戚或者老同学怎么讲清楚你在做什么。学术不是闭门造车，如何把自己的学术讲出去，让学术成果造福其他人也是很重要的技能。"
                        },
                        {
                            "type": "text",
                            "content": "(2022年10月19日 by \\Wu)\n\n(major update: 2022年12月16日 by \\Wu)"
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