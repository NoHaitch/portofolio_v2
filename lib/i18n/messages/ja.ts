import type { Messages } from '@/lib/i18n/types'

const ja = {
  metadataDescription:
    'Francisco Triantoのポートフォリオです。セキュリティ、システム、AIを軸に、実用性を重視したプロダクト開発に取り組んでいます。',
  navigation: {
    label: 'メインナビゲーション',
    work: '実績・活動',
    home: 'ホーム',
    education: '学歴',
    experience: '職務経験',
    about: '私について',
    openMenu: 'メニューを開く',
    closeMenu: 'メニューを閉じる',
    contact: 'お問い合わせ',
  },
  languageLabel: '言語を選択',
  switchToLight: 'ライトモードに切り替え',
  switchToDark: 'ダークモードに切り替え',
  footer: {
    copyright: '© 2026 Francisco Trianto',
    tagline: 'セキュリティ、システム、AIを軸に活動するソフトウェアエンジニア。インドネシア在住。',
    quickLinks: 'ページ一覧',
    connect: 'SNS・連絡先',
    backToTop: 'ページの先頭へ',
    aboutSite: 'このサイトについて',
  },
  about: {
    eyebrow: '私について',
    title: '好奇心を原動力に、丁寧なものづくりを。',
    introduction:
      'インドネシア・バンドンで情報工学を学んだFranciscoです。安全でわかりやすく、長く使えるものをつくることを大切にしています。',
    story: [
      '2026年にバンドン工科大学の情報工学課程をcum laudeで卒業しました。学ぶ中で、セキュリティやシステム、AI、そしてそれらが交わる領域に関心を深めてきました。',
      '筋道を立てて考え、問題をシンプルな要素に分けて捉えることを大切にしています。一方で、音楽のような創造的な分野では、直感も大切にしています。',
    ],
    shibuyaPhotoAlt: '東京・渋谷のハチ公像にもたれるFrancisco Trianto',
    nameHeading: '名前について',
    names: [
      { name: 'Francisco', note: 'ファーストネームで、仕事でもこの名前を使っています。' },
      { name: 'Ciko', note: '普段使っている短い呼び名です。' },
      {
        name: 'NoHaitch',
        note: 'オンラインで使っているハンドルネームです。「Chiko」とHを付けて書かれることが多いため、NoHaitchにしました。',
      },
    ],
    hobbiesHeading: '仕事以外の楽しみ',
    hobbies: [
      {
        title: '音楽',
        description:
          'ジャズが好きで、ピアノを弾いたり、ジャズフェスティバルに足を運んだりしています。',
      },
      {
        title: '旅行',
        description:
          '新しい場所を訪れるのが好きです。これまでにシンガポール、日本、香港、マレーシア、バリを訪れました。',
      },
      {
        title: 'スポーツ',
        description: 'バレーボールを楽しんでいます。以前はサッカーもしていました。',
      },
      { title: 'ゲーム', description: '気分転換にちょうど良い趣味です。' },
    ],
    singaporePhotoAlt: 'シンガポールのスカイラインを背に水辺に立つFrancisco Trianto',
    interestsHeading: '関心分野',
    interests: [
      'サイバーセキュリティ',
      'AI・データサイエンス',
      'システムソフトウェア開発',
      'ウェブ開発',
      '分散システム',
      'DevOps',
      '安全でスケーラブルなシステム設計',
    ],
    contactHeading: 'お気軽にご連絡ください',
    contactDescription: '気になることや一緒に取り組みたいことがあれば、ぜひご連絡ください。',
    contactLink: 'お問い合わせ',
  },
  aboutSite: {
    eyebrow: 'このサイトについて',
    title: '仕事や経験を、丁寧に伝えるポートフォリオ。',
    introduction:
      'このサイトは、ウェブ上で仕事や経験を紹介する拠点です。プロジェクト、職務経験、学歴を一か所にまとめ、表示速度やアクセシビリティにも配慮しながら、4言語で公開しています。',
    purposeHeading: 'このサイトで伝えたいこと',
    purposeItems: [
      'ソフトウェア開発、AI、サイバーセキュリティなど、自分の専門分野や取り組みを紹介すること。',
      'プロジェクト、職務経験、学歴を整理して記録すること。',
      '採用担当者や協業相手、チームメンバーが気軽に連絡できるようにすること。',
    ],
    workflowHeading: '制作の進め方',
    workflowIntroduction:
      'AIエージェントを活用して制作しました。重要な判断は自分で行い、エージェントが見落としやすい細部は手作業で仕上げています。',
    workflowSteps: [
      {
        title: '開発環境のセットアップ',
        description:
          'Next.js、Bun、Tailwind CSS、shadcn/ui、Prettier、ESLintなどの開発環境は自分で整え、その後の変更も意図した設計に沿って進められるようにしました。',
      },
      {
        title: 'AIエージェントの活用準備',
        description:
          'エージェント用のスキルや自分についてのコンテキストファイルを用意し、技術スタック、コンテンツ構造、テスト、文体に関するルールを整えました。',
      },
      {
        title: 'サイト全体の設計',
        description:
          '制作を始める前に、ページ構成やトーン、対応言語、サイト全体の雰囲気など、見た目と内容の方向性を定めました。',
      },
      {
        title: '小さな単位でのAI開発',
        description:
          '設定したコンテキストとルールに沿って、作業範囲を明確にしながら、ページやコンポーネント、翻訳の多くをAIエージェントと段階的に作成しています。',
      },
      {
        title: '動作確認とレビュー',
        description:
          '変更のたびにビルドと型チェックを行い、ブラウザーでも動作を確認しています。結果を自分でレビューしてから次に進みます。',
      },
      {
        title: '仕上げとドキュメント化',
        description:
          'アクセシビリティや余白、文言、細かな操作感など、エージェントが見落とした点を整えています。今後も一貫性を保てるよう、開発ルールも記録しています。',
      },
    ],
    stackHeading: '技術スタック・ツール',
    stack: [
      { label: 'フレームワーク', items: ['Next.js', 'React', 'TypeScript'] },
      { label: 'UI・スタイリング', items: ['Tailwind CSS', 'shadcn/ui', 'Base UI', 'Lucide'] },
      { label: '開発ツール', items: ['Bun', 'Prettier', 'ESLint'] },
    ],
    sourceHeading: 'ソースコード',
    sourceDescription: 'このサイトのソースコードはすべて公開しています。ぜひご覧ください。',
    sourceLink: 'GitHubで見る',
  },
  home: {
    eyebrow: '情報工学 · インドネシア',
    roles: ['Systems engineering', 'AI & Data Science', 'Cyber security', 'Software Engineer'],
    introduction:
      'Franciscoです。情報工学を学び、セキュリティや信頼性の高いシステム、データ活用を大切にしながら、実用的なソフトウェアを開発しています。',
    portraitAlt: '紺のブレザーを着たFrancisco Triantoのポートレート',
    work: '実績を見る',
    contact: 'お問い合わせ',
    scrollHint: 'スクロールして詳しく見る',
    focusLabel: '主な関心分野',
    focusTitle: 'ソフトウェアエンジニアリングとAI・データサイエンス',
    focusDescription:
      'ソフトウェアエンジニアリングを基盤に、特に関心を持っている分野です。システムやセキュリティをはじめ、幅広い分野の課題にも取り組んでいます。',
    philosophyQuote:
      'Jack of all trades, master of none, but oftentimes better than master of one.',
    expertiseLabel: '得意分野',
    recentProjectsHeading: '最近のプロジェクト',
    recentActivitiesHeading: '最近の活動',
    viewAllProjects: 'すべてのプロジェクトを見る',
    viewAllActivities: '活動をもっと見る',
    expertiseAreas: [
      {
        title: 'ソフトウェア開発',
        description:
          'ソフトウェアを一貫して開発するほか、既存システムの拡張にも取り組んでいます。AgileとWaterfallの両方に慣れており、AI支援コーディングも活用して素早く改善を重ねています。',
      },
      {
        title: 'サイバーセキュリティ',
        description:
          '従来の脆弱性に加え、プロンプトインジェクションなど新たな脅威についても学んでいます。AIが防御だけでなく攻撃にも利用される動向にも注目しています。',
      },
      {
        title: 'システムエンジニアリング',
        description:
          '設計ごとのトレードオフを見極め、シンプルなモノリスから多層構成のマイクロサービスまで、課題に合った構成を検討します。',
      },
      {
        title: '組み込みシステム',
        description:
          '組み込みシステムの進化、特にハードウェア上で動くEdge AIや、より高機能で知的なロボティクスの未来に関心があります。',
      },
      {
        title: 'Operations & DevOps',
        description:
          'パイプラインから自動化まで、運用は優れたサービスを支える基盤です。データ、システム、AIの各領域で、モデルパイプラインも含めたモニタリングとオブザーバビリティを重視しています。',
      },
      {
        title: 'AIエージェントを活用した開発',
        description:
          'AIエージェントは日々の作業を効率化するツールです。ターミナルやIDEで活用しながら、最新のモデルやスキル、コンテキストの動向を追っています。',
      },
      {
        title: 'AI・データサイエンス',
        description:
          'AIによって、勘に頼りがちだった事業判断もデータに基づいて行えるようになりました。予測や分析を通じて、計画の成果を左右する要因を探ります。',
      },
      {
        title: '機械学習',
        description:
          '従来型のMachine Learningから、NLPやComputer VisionのDeep Learningまで、AIモデルの開発に取り組んできました。RAGやMCPの動向を追い、モデルを比較する評価設計も経験しています。',
      },
      {
        title: 'コンピュータサイエンス・研究',
        description:
          'AIやMachine Learningをはじめ、コンピューティング分野の新たな進展に関心があります。将来につながるかもしれないアイデアを考えるのも好きです。',
      },
    ],
  },
  work: {
    eyebrow: 'プロジェクト・活動',
    title: 'プロジェクト・活動',
    introduction:
      'これまでに手がけたプロジェクトと、コンペティションやウェビナー、イベントなどの活動を紹介します。',
    featuredHeading: '主なプロジェクト',
    featuredIntroduction: '特に力を入れて取り組んだプロジェクトを紹介します。',
    viewAllProjects: 'すべてのプロジェクトを見る',
    recentHeading: '最近の活動',
    recentIntroduction:
      '最近参加したコンペティションやウェビナー、ワークショップ、イベントを紹介します。',
    viewAllActivities: '活動一覧を見る',
    projectsPage: {
      eyebrow: 'プロジェクト',
      title: 'すべてのプロジェクト',
      introduction:
        '授業の課題からフリーランスの仕事、個人の実験まで、公開可能なプロジェクトを紹介します。NDA（秘密保持契約）により掲載できない案件もあります。',
      searchLabel: 'プロジェクトを検索',
      searchPlaceholder: '名前、タグ、キーワードで検索',
      backLabel: 'プロジェクト一覧に戻る',
    },
    activitiesPage: {
      eyebrow: '主な活動',
      title: '最近の活動',
      introduction:
        'ソフトウェア開発以外で参加した委員会活動、スポーツ、イベント、節目となる出来事の一部を紹介します。すべての活動を網羅した一覧ではありません。名前、テーマ、カテゴリで検索できます。',
      searchLabel: '活動を検索',
      searchPlaceholder: '名前、タグ、キーワードで検索',
      backLabel: '活動一覧に戻る',
    },
    allCategories: 'すべて',
    categoryFilterLabel: 'カテゴリで絞り込む',
    applicationTypesLabel: 'アプリケーション種別',
    fieldsLabel: '分野',
    applyFiltersButton: '絞り込む',
    searchButton: '検索',
    resultCount: '{total}件中{start}～{end}件を表示',
    noResults: '条件に一致する項目はありません。',
    noProjectsFound:
      '選択した条件に一致するプロジェクトはありません。条件を変更するか解除してください。',
    clearFilters: '絞り込みを解除',
    paginationLabel: 'ページ移動',
    previousPage: '前へ',
    nextPage: '次へ',
    pageNumberLabel: '{page}ページ',
    viewDetails: '詳細を見る',
    linksHeading: 'リンク',
    teamLabel: 'チーム',
    categories: {
      academic: '学業',
      personal: '個人',
      organization: '団体',
      freelance: 'フリーランス',
      committee: '委員会',
      sports: 'スポーツ',
      event: 'イベント',
      milestone: 'マイルストーン',
    },
  },
  education: {
    eyebrow: '学びの歩み',
    title: '学歴',
    introduction: 'ソフトウェア、システム、セキュリティへの関心を育んできた学びを紹介します。',
    universityDegree: '情報工学／コンピュータサイエンス学士号',
    universityPeriod: '2022年7月 - 2026年8月',
    universityGrade: 'GPA：3.57 / 4.00 · cum laude',
    universityDetailsLabel: '主な実績',
    universityDetails: [
      '卒業要件の144単位に対して151単位を取得し、cum laudeで卒業。',
      'サイバーセキュリティとシステムソフトウェア工学の専門選択科目群を修了。',
      '主な履修科目：人工知能、Deep Learning、サイバーセキュリティ、システムソフトウェア工学、分散システム、データ構造とアルゴリズム。',
    ],
    universityActivitiesLabel: '課外活動・所属団体',
    universityActivities: [
      'バンドン工科大学 情報学科学生会（HMIF）',
      'Computational Science & Engineering Lab アシスタント',
      '授業アシスタント',
      'Character Development Training（CDT）トレーナー',
      'バンドン工科大学バレーボール部（UBV）',
    ],
    skillsLabel: '主なスキル',
    universitySkills: [
      '機械学習',
      'コンピュータサイエンス',
      'サイバーセキュリティ',
      'システム工学',
      '分散システム',
      'ディープラーニング',
    ],
    highSchoolDegree: '高校卒業 · 自然科学（STEM）コース',
    highSchoolPeriod: '2019年7月 - 2022年7月',
    highSchoolActivitiesLabel: '課外活動・所属団体',
    highSchoolActivities: ['Five Cyber Community（FCC）', 'バンドン市大会の数学OSKに2回出場'],
    highSchoolHonorsLabel: '学業表彰',
    highSchoolHonors: ['成績優秀者。クラス1位、学校全体で上位3位以内。'],
    certificate: '学位証明書を見る',
    certificateLabel: '大学の学位証明書を見る',
    photoAlt: '卒業式のFrancisco Trianto',
  },
  experience: {
    eyebrow: '職務経験・活動',
    title: '職務経験・活動',
    introduction:
      'ソフトウェア開発、AI・データサイエンス、教育、リーダーシップなど、仕事や大学・コミュニティでの経験を紹介します。',
    tabsLabel: '経験分野',
    parallelNote: '分野を選ぶと、該当する経験に絞り込めます。',
    sortOldestFirst: '古い順に表示',
    sortNewestFirst: '新しい順に表示',
    certificateLinkLabel: '修了証を見る',
    branches: {
      engineering: 'ソフトウェア開発',
      academic: '教育・アカデミア',
      leadership: '学生組織・コミュニティ',
      aiData: 'AI・データサイエンス',
    },
    entries: [
      {
        id: 'gci-world-training',
        branch: 'aiData',
        title: 'AI & Data Science Trainee',
        organization: 'GCI World、東京大学 松尾研究室',
        period: '2026年4月 - 8月',
        startDate: '2026-04',
        arrangement: '専門研修',
        summary:
          'Pythonの基礎とデータサイエンスの主要な機械学習手法を学ぶ週次講義（全14回）を修了しました。コンペティションにも参加し、提示されたシナリオとデータをもとに事業提案を作成する最終課題に取り組みました。',
        proofUrl:
          '/certificates/GCI%20World%20April%20MatsuoLab%20TokyoU%20-%20Raden%20Francisco%20Trianto%20Bratadiningrat.pdf',
      },
      {
        id: 'data-annotation',
        branch: 'aiData',
        title: 'AI Annotation',
        organization: 'データアノテーションプラットフォーム',
        period: '2026年9月',
        startDate: '2026-09',
        arrangement: 'フリーランス',
        summary:
          'AIモデルのプロンプトと出力をアノテーションし、2つのモデルを比較・評価しました。評価用プロンプトとルーブリックも作成しました。また、中規模のコードベースでHarborとOpenCodeを使い、エージェント型モデルを実行してタスクを指示しました。',
      },
      {
        id: 'sinerdigi',
        branch: 'engineering',
        title: 'Full-Stack Developer (Freelance)',
        organization: 'PT Sinerdigi Teknologi Indonesia',
        period: '2025年4月 - 2026年3月',
        startDate: '2025-04',
        arrangement: 'リモート',
        summary:
          '5つのコンポーネントからなる分散型の順番待ち管理システムを構築し、窓口端末と表示端末の間でリアルタイムに情報を同期しました。',
      },
      {
        id: 'akhdani',
        branch: 'engineering',
        title: 'Software Engineer Intern',
        organization: 'PT Akhdani Reka Solusi',
        period: '2025年6月 - 2025年9月',
        startDate: '2025-06',
        arrangement: '出社',
        summary:
          '.NETデスクトップシェルとLaravel・Vue.jsアプリを連携させ、決済やルームキー機器をシミュレートする多言語対応のホテルチェックイン端末を試作しました。',
      },
      {
        id: 'hmif-election',
        branch: 'engineering',
        title: 'Frontend Developer',
        organization: 'Pemilu HMIF 2025',
        period: '2024年10月 - 2025年2月',
        startDate: '2024-10',
        arrangement: '出社',
        summary:
          '700人以上の学生が利用するレスポンシブな選挙プラットフォームを開発しました。後輩開発者3人と連携し、UIパターンやコードレビューの進め方を整えました。',
      },
      {
        id: 'hima-ilkom-election',
        branch: 'engineering',
        title: 'Full-Stack Developer (Freelance)',
        organization: 'Pemilu HIMA ILKOM 2021',
        period: '2021年10月 - 2021年12月',
        startDate: '2021-10',
        arrangement: 'リモート',
        summary:
          '1,000票を超える有効票を処理するオンライン投票システムを共同開発し、3日間の選挙期間を通じて稼働率100%を維持しました。',
      },
      {
        id: 'cse-lab',
        branch: 'academic',
        title: 'Computational Science and Engineering Laboratory Assistant',
        organization: 'STEI ITB',
        period: '2024年8月 - 2026年8月',
        startDate: '2024-08',
        arrangement: '出社',
        summary:
          '研究室の運営と授業を支援し、次期アシスタントの選考・評価にも携わりました。50人以上の応募者から選ばれた12人の一人です。',
      },
      {
        id: 'if2224',
        branch: 'academic',
        title: 'Course Assistant, IF2224 Formal Language and Automata Theory',
        organization: 'STEI ITB',
        period: '2025年8月 - 2026年7月',
        startDate: '2025-08',
        arrangement: '出社',
        summary:
          'コンパイラとインタプリタを題材にした最終課題を設計し、4つのマイルストーンに分けて進行しました。技術ガイドの作成、コードレビュー、デバッグ支援も担当しました。',
      },
      {
        id: 'if2211',
        branch: 'academic',
        title: 'Course Assistant, IF2211 Algorithm Strategies',
        organization: 'STEI ITB',
        period: '2025年1月 - 2025年7月',
        startDate: '2025-01',
        arrangement: '出社',
        summary:
          'アルゴリズムの主要な戦略を扱う課題を6つ作成し、実装の効率性、計算量、境界ケースを評価しました。',
      },
      {
        id: 'if1220',
        branch: 'academic',
        title: 'Coordinator / Head Assistant, IF1220 Discrete Mathematics',
        organization: 'STEI ITB',
        period: '2024年8月 - 2025年1月',
        startDate: '2024-08',
        arrangement: '出社',
        summary:
          '5人のTeaching Assistantをまとめ、3クラス計172人の学生に向けて試験問題と解答集を整備しました。',
      },
      {
        id: 'character-trainer',
        branch: 'academic',
        title: 'Character Development Trainer',
        organization: 'Institut Teknologi Bandung',
        period: '2023年7月 - 2024年3月',
        startDate: '2023-07',
        arrangement: '出社',
        summary:
          '4日間にわたり、新入生50人を対象に人間力を育むワークショップと振り返りを進行しました。',
      },
      {
        id: 'hmif-academic',
        branch: 'leadership',
        title: 'Academic Division Staff',
        organization: 'HMIF ITB',
        period: '2024年7月 - 2025年6月',
        startDate: '2024-07',
        arrangement: '出社',
        summary:
          '700人以上が所属する学生コミュニティ向けに講義資料を整理し、試験対策ガイドや学習シートを作成しました。',
      },
      {
        id: 'arka-vidia',
        branch: 'leadership',
        title: 'Content Strategist',
        organization: 'ARKA VIDIA 9.0',
        period: '2024年11月 - 2025年5月',
        startDate: '2024-11',
        arrangement: '出社',
        summary:
          '全国規模のテクノロジーイベントに向けたプロモーション企画と当日の情報発信を担当し、デザイン・マーケティングチームと連携しました。',
      },
      {
        id: 'sparta-hmif',
        branch: 'leadership',
        title: 'SPARTA 企画・運営スタッフ',
        organization: 'HMIF ITB',
        period: '2024年6月 - 2024年9月',
        startDate: '2024-06',
        arrangement: '出社',
        summary:
          '300人以上の入会希望者を対象としたオリエンテーションやワークショップを企画し、候補者の評価も担当しました。',
      },
      {
        id: 'wisokto',
        branch: 'leadership',
        title: 'Wisokto 人事スタッフ',
        organization: 'HMIF ITB',
        period: '2023年9月 - 2023年11月',
        startDate: '2023-09',
        arrangement: 'ハイブリッド',
        summary:
          '卒業式イベントを担当する8人のチームを調整し、委員会メンバー183人の人事情報を管理しました。',
      },
      {
        id: 'pab-ubv',
        branch: 'leadership',
        title: 'PAB 企画・運営スタッフ',
        organization: 'UBV ITB',
        period: '2023年8月 - 2024年5月',
        startDate: '2023-08',
        arrangement: '出社',
        summary:
          'バレーボールクラブに加入する100人以上の新入生を対象に、人間形成とオリエンテーションの企画を担当しました。',
      },
      {
        id: 'regeneration-ubv',
        branch: 'leadership',
        title: '世代交代部門スタッフ',
        organization: 'UBV ITB',
        period: '2023年5月 - 2024年5月',
        startDate: '2023-05',
        arrangement: '出社',
        summary:
          '候補者の選考・面接を通じてリーダーの引き継ぎを支援し、各年度のメンバー受け入れを運営しました。',
      },
      {
        id: 'tpb-cup',
        branch: 'leadership',
        title: 'TPB CUP セキュリティ部門スタッフ',
        organization: 'TPB CUP V Oli UBV ITB 2023',
        period: '2023年1月 - 2023年3月',
        startDate: '2023-01',
        arrangement: '出社',
        summary:
          '学部対抗バレーボール大会で安全管理、観客の誘導、関係者エリアの入場管理を担当しました。',
      },
      {
        id: 'gathering-stei',
        branch: 'leadership',
        title: 'Gathering STEI 2.0 記録スタッフ',
        organization: 'STEI ITB',
        period: '2022年8月 - 2022年9月',
        startDate: '2022-08',
        arrangement: '出社',
        summary:
          'オリエンテーションや式典を撮影し、撮影素材を整理してイベントのダイジェスト動画を制作しました。',
      },
      {
        id: 'fcc-programming',
        branch: 'leadership',
        title: 'プログラミング部門代表',
        organization: 'FCC SMAN 5 Bandung',
        period: '2019年8月 - 2022年6月',
        startDate: '2019-08',
        arrangement: '出社',
        summary:
          '2年間のプログラミングカリキュラムを率い、20人以上の生徒を指導し、入部選考に向けた実践課題を作成しました。',
      },
    ],
  },
  contact: {
    eyebrow: 'お問い合わせ',
    title: 'お気軽にご連絡ください',
    introduction:
      'ソフトウェア開発、セキュリティ、データ、関心のあるプロジェクトについて、ぜひお気軽にご連絡ください。',
    professional: '仕事関連',
    community: '執筆・コミュニティ',
  },
} satisfies Messages

export default ja
