import type { Messages } from '@/lib/i18n/types'

const zh = {
  metadataDescription:
    'Francisco Trianto 的个人作品集，专注于软件工程、安全、系统、人工智能与实践型产品开发。',
  navigation: {
    label: '主导航',
    projects: '项目',
    home: '首页',
    education: '教育经历',
    experience: '专业经历',
    about: '关于我',
    contact: '联系',
  },
  languageLabel: '选择语言',
  switchToLight: '切换到浅色模式',
  switchToDark: '切换到深色模式',
  footer: {
    copyright: '© 2026 Francisco Trianto',
    tagline: '专注于安全、系统与人工智能的软件工程师，现居印度尼西亚。',
    quickLinks: '快速链接',
    connect: '联系方式',
    backToTop: '回到顶部',
    aboutSite: '关于本站',
  },
  about: {
    eyebrow: '关于我',
    title: '平时安静，但始终充满好奇。',
    introduction:
      '我是 Francisco，来自印度尼西亚万隆，刚毕业的信息工程专业工程师。我喜欢打造安全、清晰且经久耐用的东西。',
    story: [
      '我于 2026 年以优异成绩（cum laude）从万隆理工学院信息工程专业毕业。求学过程中，我逐渐被安全、系统和人工智能，以及它们的交汇处所吸引。',
      '我偏爱清晰、有条理、合乎逻辑的思考，也喜欢把问题拆解到足够简单。同时，在音乐等创意领域，我也乐于跟随直觉。',
      '我是偏内向的中间型性格。刚开始比较安静，和熟悉的人在一起则更健谈。',
    ],
    shibuyaPhotoAlt: 'Francisco Trianto 倚靠在东京涩谷的忠犬八公像旁',
    nameHeading: '怎么称呼我',
    names: [
      { name: 'Francisco', note: '我的名字，也是我在工作中使用的称呼。' },
      { name: 'Ciko', note: '我的短名。' },
      {
        name: 'NoHaitch',
        note: '我的网络昵称。人们常把 Chiko 写成带 H 的拼法，所以我干脆去掉了 H。',
      },
    ],
    hobbiesHeading: '工作之外',
    hobbies: [
      { title: '音乐', description: '爵士是我的最爱。我会弹钢琴，也喜欢去爵士音乐节。' },
      { title: '运动', description: '排球是我的主要运动，我以前也踢足球。' },
      { title: '游戏', description: '放松身心的好方式。' },
    ],
    singaporePhotoAlt: 'Francisco Trianto 站在水边，身后是新加坡的城市天际线',
    interestsHeading: '我关注的领域',
    interests: [
      '网络安全',
      '人工智能与数据科学',
      '系统软件工程',
      'Web 开发',
      '分布式系统',
      'DevOps',
      '安全且可扩展的系统设计',
    ],
    contactHeading: '聊一聊',
    contactDescription: '如果其中有你感兴趣的内容，欢迎联系我。',
    contactLink: '联系我',
  },
  aboutSite: {
    eyebrow: '关于本站',
    title: '一个值得细读，而不只是浏览的作品集。',
    introduction:
      '这个网站是我在网络上的家。它把我的作品、经历和教育背景集中在一处，速度快、易于访问，并提供四种语言。',
    purposeHeading: '网站用途',
    purposeItems: [
      '展示我是谁、我能做什么，涵盖软件工程、人工智能和网络安全。',
      '以结构化的方式记录我的项目、经历和教育背景。',
      '让招聘者、合作者和同行可以方便地联系我。',
    ],
    workflowHeading: '构建方式',
    workflowIntroduction:
      '本站采用智能体式编程（agentic coding）流程构建，关键环节由人来决策，并对智能体容易遗漏的部分进行手动打磨。',
    workflowSteps: [
      {
        title: '手动搭建项目',
        description:
          '我亲自搭建基础：Next.js、Bun、Tailwind CSS、shadcn/ui、Prettier 和 ESLint，让之后的每次改动都建立在我有意做出的选择之上。',
      },
      {
        title: '为智能体做准备',
        description:
          '我添加了智能体技能、关于我的文字背景文件，以及涵盖技术栈、内容模型、测试和写作风格的项目规则。',
      },
      {
        title: '确立基本构想',
        description: '在生成任何内容之前，我先确定网站的外观和内容：页面、语气、语言和整体风格。',
      },
      {
        title: '小步迭代的智能体编程',
        description:
          '智能体根据上述背景和规则，每次处理一个范围明确的请求，构建大部分页面、组件和翻译。',
      },
      {
        title: '验证与审查',
        description: '每次改动都通过构建、类型检查和真实浏览器测试来验证，我审查结果后再继续。',
      },
      {
        title: '精细调整与文档记录',
        description:
          '我修正智能体遗漏的部分，例如无障碍、间距、措辞和细小的交互，并记录规范，让后续改动保持一致。',
      },
    ],
    stackHeading: '技术栈与工具',
    stack: [
      { label: '框架', items: ['Next.js', 'React', 'TypeScript'] },
      { label: '样式与界面', items: ['Tailwind CSS', 'shadcn/ui', 'Base UI', 'Lucide'] },
      { label: '工具', items: ['Bun', 'Prettier', 'ESLint'] },
    ],
    sourceHeading: '源代码',
    sourceDescription: '整个网站都是开源的，欢迎随意查看。',
    sourceLink: '在 GitHub 上查看',
  },
  home: {
    eyebrow: 'Informatics · 印度尼西亚',
    roles: ['Systems engineering', 'AI & Data Science', 'Cyber security', 'Software Engineer'],
    introduction:
      '毕业于万隆理工学院信息工程专业，致力于构建注重安全、系统可靠性和数据实用价值的软件。',
    portraitAlt: 'Francisco Trianto 身穿深蓝色西装的肖像',
    projects: '查看项目',
    contact: '联系我',
    scrollHint: '向下滚动，了解更多',
    philosophyQuote:
      'Jack of all trades, master of none, but oftentimes better than master of one.',
    expertiseLabel: '专业领域',
    expertiseAreas: [
      {
        title: '软件工程',
        description:
          '我既能端到端构建软件，也能扩展现有系统。我熟悉 Agile 和 Waterfall，并借助 AI 辅助编程获得更快的反馈。',
      },
      {
        title: '网络安全',
        description:
          '我了解威胁态势，从传统漏洞到提示词注入等新型漏洞。我也看到 AI 如今不仅用于防御，也在推动攻击。',
      },
      {
        title: '系统工程',
        description:
          '我对系统有广泛的理解，能权衡每种设计的优缺点，从简单的单体架构到多层微服务，并为问题选出合适的方案。',
      },
      {
        title: '嵌入式系统',
        description:
          '我对嵌入式系统的发展很着迷，尤其是在硬件上运行的边缘 AI，以及能力更强、更智能的机器人技术的未来。',
      },
      {
        title: 'Operations & DevOps',
        description:
          '运维是优秀服务的核心，从流水线到自动化。我在数据、系统和 AI 领域保持强大的监控与可观测性，包括新的模型流水线。',
      },
      {
        title: 'Agentic coding',
        description:
          '智能体模型是这个时代的代表性工具，能更快完成日常任务。我同时使用终端和 IDE 中的智能体，并持续关注最新模型及其技能和上下文。',
      },
      {
        title: '人工智能与数据科学',
        description:
          'AI 让商业决策从粗略的猜测变为有依据的规划。我用数据驱动的预测和分析，找出让方案成功的关键因素。',
      },
      {
        title: 'Machine Learning',
        description:
          '我从事过 AI 的模型层面工作，从传统机器学习到 NLP 和视觉领域的深度学习。我关注 RAG 和 MCP，也设计过用于比较模型的评测。',
      },
      {
        title: '计算机科学与研究',
        description:
          '我热衷于计算机领域的新突破，无论是 AI、ML 还是其他方向，并时常思考有朝一日可能成为未来的新想法。',
      },
    ],
  },
  projects: {
    eyebrow: '精选作品与活动',
    title: '项目与活动',
    introduction: '通过轻松一些的方式，看看我参与构建的项目和带给我成长的社群。',
    projectsHeading: '精选项目',
    activitiesHeading: '活动与亮点',
    activitiesIntroduction: '精选几段软件开发之外的经历，不重复展示完整的工作时间线。',
    projects: [
      {
        title: '分布式排队管理系统',
        category: '专业项目',
        period: '2025年4月 - 2026年3月',
        summary: '构建由五个组件组成的排队管理平台，实现柜台客户端与显示客户端之间的实时更新。',
        tags: ['分布式系统', '实时更新', '排队管理'],
      },
      {
        title: '多语言酒店自助入住终端',
        category: '实习项目',
        period: '2025年6月 - 2025年9月',
        summary: '将 .NET 桌面外壳与 Laravel、Vue.js 应用连接，并制作支付和房卡设备交互原型。',
        tags: ['.NET', 'Laravel', 'Vue.js', '设备集成'],
      },
      {
        title: 'HMIF 学生选举平台',
        category: '校园项目',
        period: '2024年10月 - 2025年2月',
        summary:
          '为 700 多名学生选民构建响应式选举平台，并协助初级开发者采用统一的 UI 模式和代码审查实践。',
        tags: ['前端', '选举平台', '700 多名选民'],
      },
      {
        title: 'HIMA ILKOM 数字投票平台',
        category: '自由职业项目',
        period: '2021年10月 - 2021年12月',
        summary:
          '共同开发数字投票平台，处理 1,000 多张有效选票，并在三天选举期间保持 100% 可用性。',
        tags: ['全栈', '数字投票', '可靠性'],
      },
    ],
    activityHighlights: [
      {
        title: '品格发展工作坊',
        description: '在四天活动中，为 50 名新生组织品格发展工作坊和反思讨论。',
        relatedRoute: 'experience',
      },
      {
        title: '校园与排球社群',
        description: '参与万隆理工学院排球社，并协助为 100 多名新成员设计入门活动。',
        relatedRoute: 'experience',
      },
      {
        title: '高中数学竞赛',
        description: '两次参加万隆市级数学 OSK，并以优秀学生身份毕业。',
        relatedRoute: 'education',
      },
    ],
    viewExperience: '查看经历',
    viewEducation: '查看教育经历',
  },
  education: {
    eyebrow: '个人背景',
    title: '教育经历',
    introduction: '塑造我在软件、系统与安全领域兴趣的学习历程。',
    universityDegree: '信息学／计算机科学理学学士',
    universityPeriod: '2022年7月 - 2026年8月',
    universityGrade: 'GPA：3.57 / 4.00 · 优等毕业',
    universityDetailsLabel: '学业成果',
    universityDetails: [
      '以优等成绩毕业，完成151个学分，高于144个学分的毕业要求。',
      '完成网络安全与系统软件工程方向的选修专业课程。',
      '主要课程：人工智能、深度学习、网络安全、系统软件工程、分布式系统、数据结构与算法。',
    ],
    universityActivitiesLabel: '活动与社团',
    universityActivities: [
      '万隆理工学院信息学学生会（HMIF）',
      '计算科学与工程实验室助教',
      '课程助教',
      'Character Development Training（CDT）培训讲师',
      '万隆理工学院排球社（UBV）',
    ],
    skillsLabel: '重点技能',
    universitySkills: ['机器学习', '计算机科学', '网络安全', '系统工程', '分布式系统', '深度学习'],
    highSchoolDegree: '高中毕业 · 自然科学（STEM）方向',
    highSchoolPeriod: '2019年7月 - 2022年7月',
    highSchoolActivitiesLabel: '活动与社团',
    highSchoolActivities: ['Five Cyber Community（FCC）', '两次参加万隆市级数学 OSK'],
    highSchoolHonorsLabel: '学业荣誉',
    highSchoolHonors: ['优秀学生；班级排名第一，校级排名前三。'],
    certificate: '查看学位证书',
    certificateLabel: '查看大学正式学位证书',
    photoAlt: 'Francisco Trianto 毕业时的照片',
  },
  experience: {
    eyebrow: '专业背景',
    title: '专业经历',
    introduction: '展示我在软件工程、人工智能与数据科学、教学和领导力方面的专业、学术及社群经历。',
    tabsLabel: '经历类别',
    parallelNote: '选择一个类别即可专注查看该领域。',
    sortOldestFirst: '最早的经历优先',
    sortNewestFirst: '最新的经历优先',
    certificateLinkLabel: '查看结业证书',
    branches: {
      engineering: '软件工程',
      academic: '教学与学术',
      leadership: '校园与社群',
      aiData: '人工智能与数据科学',
    },
    entries: [
      {
        id: 'gci-world-training',
        branch: 'aiData',
        title: '人工智能与数据科学培训',
        organization: 'GCI World，东京大学松尾研究室',
        period: '2026年4月至8月',
        startDate: '2026-04',
        arrangement: '专业培训',
        summary:
          '完成14次每周课程，学习 Python 基础、Data Science 核心 Machine Learning 知识。通过 Data Science 竞赛和最终项目实践所学：根据给定场景与数据集制定数据驱动的商业提案。',
        proofUrl:
          '/certificates/GCI%20World%20April%20MatsuoLab%20TokyoU%20-%20Raden%20Francisco%20Trianto%20Bratadiningrat.pdf',
      },
      {
        id: 'data-annotation',
        branch: 'aiData',
        title: 'AI 标注',
        organization: '数据标注平台',
        period: '2026年9月',
        startDate: '2026-09',
        arrangement: '自由职业',
        summary:
          '标注 AI 模型的提示词和输出，对比并评估两个模型，编写提示词和评估标准，并使用 Harbor 和 OpenCode 在中型代码库中运行和指派 agentic 模型任务。',
      },
      {
        id: 'sinerdigi',
        branch: 'engineering',
        title: '全栈开发工程师（自由职业）',
        organization: 'PT Sinerdigi Teknologi Indonesia',
        period: '2025年4月 - 2026年3月',
        startDate: '2025-04',
        arrangement: '远程',
        summary: '构建由五个组件组成的分布式排队管理系统，并实现柜台与显示终端之间的实时更新。',
      },
      {
        id: 'akhdani',
        branch: 'engineering',
        title: '软件工程实习生',
        organization: 'PT Akhdani Reka Solusi',
        period: '2025年6月 - 2025年9月',
        startDate: '2025-06',
        arrangement: '现场办公',
        summary:
          '将 .NET 桌面外壳与 Laravel、Vue.js 应用连接，制作多语言酒店自助入住终端原型，并模拟支付和房卡设备。',
      },
      {
        id: 'hmif-election',
        branch: 'engineering',
        title: '前端开发工程师',
        organization: 'Pemilu HMIF 2025',
        period: '2024年10月 - 2025年2月',
        startDate: '2024-10',
        arrangement: '现场办公',
        summary:
          '为 700 多名学生选民构建响应式选举平台，并协助三名初级开发者建立统一的 UI 模式和代码审查实践。',
      },
      {
        id: 'hima-ilkom-election',
        branch: 'engineering',
        title: '全栈开发工程师（自由职业）',
        organization: 'Pemilu HIMA ILKOM 2021',
        period: '2021年10月 - 2021年12月',
        startDate: '2021-10',
        arrangement: '远程',
        summary:
          '共同开发数字投票平台，处理 1,000 多张有效选票，并在为期三天的选举期间保持 100% 可用性。',
      },
      {
        id: 'cse-lab',
        branch: 'academic',
        title: '计算科学与工程实验室助理',
        organization: 'STEI ITB',
        period: '2024年8月 - 2026年8月',
        startDate: '2024-08',
        arrangement: '现场办公',
        summary:
          '支持实验室运营和课程教学，并参与新助理的招聘与评估；从 50 多名申请者中入选 12 名助理之一。',
      },
      {
        id: 'if2224',
        branch: 'academic',
        title: 'IF2224 形式语言与自动机理论课程助教',
        organization: 'STEI ITB',
        period: '2025年8月 - 2026年7月',
        startDate: '2025-08',
        arrangement: '现场办公',
        summary:
          '设计包含四个里程碑的编译器与解释器课程项目，编写技术指南，并通过代码审查和调试帮助学生。',
      },
      {
        id: 'if2211',
        branch: 'academic',
        title: 'IF2211 算法策略课程助教',
        organization: 'STEI ITB',
        period: '2025年1月 - 2025年7月',
        startDate: '2025-01',
        arrangement: '现场办公',
        summary: '设计六个算法策略课程项目，并评估实现的效率、复杂度和边界情况。',
      },
      {
        id: 'if1220',
        branch: 'academic',
        title: 'IF1220 离散数学课程协调员／首席助教',
        organization: 'STEI ITB',
        period: '2024年8月 - 2025年1月',
        startDate: '2024-08',
        arrangement: '现场办公',
        summary: '带领五名助教，并为三个班级的 172 名学生编写考试题库和参考答案。',
      },
      {
        id: 'character-trainer',
        branch: 'academic',
        title: '品格发展培训导师',
        organization: 'Institut Teknologi Bandung',
        period: '2023年7月 - 2024年3月',
        startDate: '2023-07',
        arrangement: '现场办公',
        summary: '在四天活动中为 50 名新生组织品格发展工作坊和反思讨论。',
      },
      {
        id: 'hmif-academic',
        branch: 'leadership',
        title: '学术部门工作人员',
        organization: 'HMIF ITB',
        period: '2024年7月 - 2025年6月',
        startDate: '2024-07',
        arrangement: '现场办公',
        summary: '整理课程资料，并为 700 多名学生社群制作考试复习指南和模块化学习资料。',
      },
      {
        id: 'arka-vidia',
        branch: 'leadership',
        title: '内容策划',
        organization: 'ARKA VIDIA 9.0',
        period: '2024年11月 - 2025年5月',
        startDate: '2024-11',
        arrangement: '现场办公',
        summary: '为全国性科技活动策划宣传活动和现场报道，并与设计及营销团队协作。',
      },
      {
        id: 'sparta-hmif',
        branch: 'leadership',
        title: 'SPARTA 内容与方法工作人员',
        organization: 'HMIF ITB',
        period: '2024年6月 - 2024年9月',
        startDate: '2024-06',
        arrangement: '现场办公',
        summary: '为 300 多名候选成员设计迎新活动和工作坊，并参与结构化候选人评估。',
      },
      {
        id: 'wisokto',
        branch: 'leadership',
        title: 'Wisokto 人力资源工作人员',
        organization: 'HMIF ITB',
        period: '2023年9月 - 2023年11月',
        startDate: '2023-09',
        arrangement: '混合办公',
        summary: '协调负责毕业典礼活动的八人团队，并维护 183 名委员会成员的人事记录。',
      },
      {
        id: 'pab-ubv',
        branch: 'leadership',
        title: 'PAB 内容与方法工作人员',
        organization: 'UBV ITB',
        period: '2023年8月 - 2024年5月',
        startDate: '2023-08',
        arrangement: '现场办公',
        summary: '为 100 多名新加入排球社团的成员设计品格培养和入门活动。',
      },
      {
        id: 'regeneration-ubv',
        branch: 'leadership',
        title: '成员培养部门工作人员',
        organization: 'UBV ITB',
        period: '2023年5月 - 2024年5月',
        startDate: '2023-05',
        arrangement: '现场办公',
        summary: '通过候选人筛选和面试支持领导层交接，并参与年度成员入会流程。',
      },
      {
        id: 'tpb-cup',
        branch: 'leadership',
        title: 'TPB CUP 安保部门工作人员',
        organization: 'TPB CUP V Oli UBV ITB 2023',
        period: '2023年1月 - 2023年3月',
        startDate: '2023-01',
        arrangement: '现场办公',
        summary: '负责跨院系排球赛的现场安全、观众动线和受控区域出入管理。',
      },
      {
        id: 'gathering-stei',
        branch: 'leadership',
        title: 'Gathering STEI 2.0 记录工作人员',
        organization: 'STEI ITB',
        period: '2022年8月 - 2022年9月',
        startDate: '2022-08',
        arrangement: '现场办公',
        summary: '记录迎新活动和典礼，整理共享媒体档案，并制作活动回顾视频。',
      },
      {
        id: 'fcc-programming',
        branch: 'leadership',
        title: '编程部门负责人',
        organization: 'FCC SMAN 5 Bandung',
        period: '2019年8月 - 2022年6月',
        startDate: '2019-08',
        arrangement: '现场办公',
        summary: '负责两年编程课程，培训 20 多名学生，并设计帮助成员准备社团选拔的实践项目。',
      },
    ],
  },
  contact: {
    eyebrow: '联系',
    title: '欢迎联系我。',
    introduction: '欢迎交流软件工程、安全、数据，或分享值得关注的项目。',
    professional: '职业联系',
    community: '写作与社群',
  },
} satisfies Messages

export default zh
