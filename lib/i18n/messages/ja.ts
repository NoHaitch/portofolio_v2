import type { Messages } from '@/lib/i18n/types'

const ja = {
  metadataDescription:
    'セキュリティ、システム、AI、実用的なプロダクト開発に取り組むソフトウェアエンジニア、Francisco Triantoのポートフォリオです。',
  navigation: {
    label: 'メインナビゲーション',
    projects: 'プロジェクト',
    home: 'ホーム',
    education: '学歴',
    experience: '専門経験',
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
    tagline: 'セキュリティ、システム、AIに取り組むソフトウェアエンジニア。インドネシア在住。',
    quickLinks: 'クイックリンク',
    connect: 'つながる',
    backToTop: 'ページの先頭へ',
    aboutSite: 'このサイトについて',
  },
  about: {
    eyebrow: '私について',
    title: '普段は静か、でも好奇心は旺盛。',
    introduction:
      'インドネシア・バンドン出身で、情報工学を修めた新卒エンジニアのFranciscoです。安全で、分かりやすく、長く使えるものづくりが好きです。',
    story: [
      '2026年にバンドン工科大学を情報工学で優等(cum laude)卒業しました。学ぶなかで、セキュリティ、システム、AI、そしてそれらが交わる領域に惹かれていきました。',
      '整理された論理的な思考を好み、問題を単純になるまで分解していく過程が好きです。一方で、音楽のような創造的な分野では直感に従うことも大切にしています。',
      '内向的寄りのアンビバートで、最初は物静かですが、親しい人の前では話し好きです。',
    ],
    shibuyaPhotoAlt: '東京・渋谷のハチ公像にもたれるFrancisco Trianto',
    nameHeading: '呼び名について',
    names: [
      { name: 'Francisco', note: '名前であり、仕事で使っている呼び名です。' },
      { name: 'Ciko', note: 'ショートネームです。' },
      {
        name: 'NoHaitch',
        note: 'オンラインでのハンドルネームです。Chikoと「H」付きで書かれることが多いため、Hを外しました。',
      },
    ],
    hobbiesHeading: '仕事以外では',
    hobbies: [
      {
        title: '音楽',
        description: 'ジャズが一番好きです。ピアノを弾き、ジャズフェスティバルにも足を運びます。',
      },
      {
        title: 'スポーツ',
        description: 'バレーボールが中心で、以前はサッカーもしていました。',
      },
      { title: 'ゲーム', description: '気分転換にちょうど良い趣味です。' },
    ],
    singaporePhotoAlt: 'シンガポールのスカイラインを背に水辺に立つFrancisco Trianto',
    interestsHeading: '関心のある分野',
    interests: [
      'サイバーセキュリティ',
      'AI・データサイエンス',
      'システムソフトウェア開発',
      'ウェブ開発',
      '分散システム',
      'DevOps',
      '安全でスケーラブルなシステム設計',
    ],
    contactHeading: 'お話ししましょう',
    contactDescription: '気になることがあれば、ぜひご連絡ください。',
    contactLink: 'お問い合わせ',
  },
  aboutSite: {
    eyebrow: 'このサイトについて',
    title: '眺めるだけでなく、読んでもらうためのポートフォリオ。',
    introduction:
      'このサイトはウェブ上の私の拠点です。作品、経験、学歴を、高速でアクセシブルな形で一か所にまとめ、4言語で提供しています。',
    purposeHeading: '目的',
    purposeItems: [
      'ソフトウェア開発からAI、サイバーセキュリティまで、私が何者で何ができるかを伝えること。',
      'プロジェクト、経験、学歴を構造化して記録すること。',
      '採用担当者や協力者、チームメイトが気軽に連絡できるようにすること。',
    ],
    workflowHeading: '作り方',
    workflowIntroduction:
      'このサイトはエージェント型コーディングで作りました。重要な部分は人が判断し、エージェントが見落としがちな点は手作業で仕上げています。',
    workflowSteps: [
      {
        title: '手動でのプロジェクト構築',
        description:
          'Next.js、Bun、Tailwind CSS、shadcn/ui、Prettier、ESLintなどの土台は自分で整え、以降の変更がすべて意図した選択の上に積み上がるようにしました。',
      },
      {
        title: 'エージェントの準備',
        description:
          'エージェント用のスキル、自分についてのコンテキストファイル、技術スタック、コンテンツ構造、テスト、文体を定めたプロジェクトルールを追加しました。',
      },
      {
        title: '全体像の設計',
        description:
          '何かを生成する前に、ページ構成、トーン、言語、全体の雰囲気など、サイトの見た目と内容の方向性を決めました。',
      },
      {
        title: '小さな単位でのエージェント型コーディング',
        description:
          '上記のコンテキストとルールをもとに、エージェントが範囲を絞った依頼ごとに、ページ、コンポーネント、翻訳の大部分を作ります。',
      },
      {
        title: '検証とレビュー',
        description:
          'すべての変更をビルド、型チェック、実際のブラウザでの動作確認で検証し、結果を自分で確認してから次へ進みます。',
      },
      {
        title: '微調整とドキュメント化',
        description:
          'アクセシビリティ、余白、文言、細かな操作感など、エージェントが見落とした点を修正し、次の変更でも一貫性が保てるよう規約を記録します。',
      },
    ],
    stackHeading: '技術スタックとツール',
    stack: [
      { label: 'フレームワーク', items: ['Next.js', 'React', 'TypeScript'] },
      { label: 'スタイルとUI', items: ['Tailwind CSS', 'shadcn/ui', 'Base UI', 'Lucide'] },
      { label: 'ツール', items: ['Bun', 'Prettier', 'ESLint'] },
    ],
    sourceHeading: 'ソースコード',
    sourceDescription: 'このサイトのコードはすべて公開しています。ぜひご覧ください。',
    sourceLink: 'GitHubで見る',
  },
  home: {
    eyebrow: 'Informatics · インドネシア',
    roles: ['Systems engineering', 'AI & Data Science', 'Cyber security', 'Software Engineer'],
    introduction:
      'バンドン工科大学で情報工学を学び、セキュリティ、信頼性の高いシステム、有用なデータを大切にした実践的なソフトウェアを開発しています。',
    portraitAlt: '紺のブレザーを着たFrancisco Triantoのポートレート',
    projects: 'プロジェクトを見る',
    contact: 'お問い合わせ',
    scrollHint: 'スクロールして詳しく見る',
    philosophyQuote:
      'Jack of all trades, master of none, but oftentimes better than master of one.',
    expertiseLabel: '専門分野',
    expertiseAreas: [
      {
        title: 'ソフトウェアエンジニアリング',
        description:
          'ソフトウェアを一から構築することも、既存のシステムを拡張することもできます。アジャイルやウォーターフォールにも慣れ、AI支援のコーディングで素早くフィードバックを得ています。',
      },
      {
        title: 'サイバーセキュリティ',
        description:
          '従来型の脆弱性からプロンプトインジェクションのような新しいものまで、脅威の全体像を理解しています。AIが防御だけでなく攻撃も加速させている点も把握しています。',
      },
      {
        title: 'システムエンジニアリング',
        description:
          'システムを幅広く理解しているため、シンプルなモノリスから多層のマイクロサービスまで、各設計の長所と短所を比べ、課題に合った設計を選べます。',
      },
      {
        title: '組み込みシステム',
        description:
          '組み込みシステムの進化、とりわけハードウェア上で動くエッジAIと、より高機能で知的なロボティクスの未来に強い関心があります。',
      },
      {
        title: 'Operations & DevOps',
        description:
          '運用はパイプラインから自動化まで、優れたサービスの核です。データ、システム、AIにわたり、新しいモデルのパイプラインも含めて、モニタリングとオブザーバビリティを強く保ちます。',
      },
      {
        title: 'Agentic coding',
        description:
          'エージェント型モデルは、日常的な作業を速く片付けてくれる、この時代を代表するツールです。ターミナル型もIDE統合型も使い、最新モデルとそのスキルやコンテキストを追っています。',
      },
      {
        title: 'AI・データサイエンス',
        description:
          'AIはビジネスの意思決定を、大まかな推測から根拠のある計画へと変えました。データに基づく予測と分析で、計画を成功させる要因を見つけ出します。',
      },
      {
        title: 'Machine Learning',
        description:
          '従来のMLから、NLPやビジョンのディープラーニングまで、AIのモデル開発側に取り組んできました。RAGやMCPを追い、モデルを比較するための評価も設計した経験があります。',
      },
      {
        title: 'コンピュータサイエンス・研究',
        description:
          'AIやMLをはじめ、コンピューティング全般の新しいブレークスルーに熱中し、いつか未来になるかもしれないアイデアを常に考えています。',
      },
    ],
  },
  projects: {
    eyebrow: '制作物と活動',
    title: 'プロジェクト・活動',
    introduction:
      'これまでに作ったものや、学びを得たコミュニティを、少しカジュアルな視点で紹介します。',
    projectsHeading: '主なプロジェクト',
    activitiesHeading: '活動・ハイライト',
    activitiesIntroduction:
      '仕事の詳細な経歴とは重複しないように、ソフトウェア開発以外の印象的な経験をまとめました。',
    projects: [
      {
        title: '分散型キュー管理システム',
        category: '業務プロジェクト',
        period: '2025年4月 - 2026年3月',
        summary:
          '5つのコンポーネントからなるキュー管理基盤を構築し、窓口端末と表示端末間のリアルタイム更新を実現しました。',
        tags: ['分散システム', 'リアルタイム更新', 'キュー管理'],
      },
      {
        title: '多言語ホテルチェックイン端末',
        category: 'インターンプロジェクト',
        period: '2025年6月 - 2025年9月',
        summary:
          '.NETデスクトップシェルとLaravel・Vue.jsアプリを連携し、決済とルームキー機器の操作を試作しました。',
        tags: ['.NET', 'Laravel', 'Vue.js', '機器連携'],
      },
      {
        title: 'HMIF学生選挙システム',
        category: '学内プロジェクト',
        period: '2024年10月 - 2025年2月',
        summary:
          '700人以上の学生が利用するレスポンシブな選挙プラットフォームを開発し、後輩開発者とUIやレビュー手法を整えました。',
        tags: ['フロントエンド', '選挙プラットフォーム', '700人以上'],
      },
      {
        title: 'HIMA ILKOMオンライン投票',
        category: 'フリーランスプロジェクト',
        period: '2021年10月 - 2021年12月',
        summary:
          '1,000件以上の有効票を処理し、3日間の選挙期間中に100%の稼働率を達成した投票システムを共同開発しました。',
        tags: ['フルスタック', 'デジタル投票', '信頼性'],
      },
    ],
    activityHighlights: [
      {
        title: '人間形成ワークショップ',
        description:
          '4日間のイベントを通じて、50人の新入生向けにワークショップと振り返りの場を進行しました。',
        relatedRoute: 'experience',
      },
      {
        title: '学内・バレーボールコミュニティ',
        description:
          'バンドン工科大学バレーボール部に参加し、100人以上の新入部員向け活動の企画に携わりました。',
        relatedRoute: 'experience',
      },
      {
        title: '高校数学競技',
        description: 'バンドン市レベルの数学OSKに2回参加し、優等生として卒業しました。',
        relatedRoute: 'education',
      },
    ],
    viewExperience: '職務経験を見る',
    viewEducation: '学歴を見る',
  },
  education: {
    eyebrow: 'プロフィール',
    title: '学歴',
    introduction: 'ソフトウェア、システム、セキュリティへの関心を育んだ学びの歩みです。',
    universityDegree: '情報学／コンピュータサイエンス理学士',
    universityPeriod: '2022年7月 - 2026年8月',
    universityGrade: 'GPA：3.57 / 4.00 · 優等卒業',
    universityDetailsLabel: '学業の実績',
    universityDetails: [
      '144単位の修了要件を上回る151単位を取得し、優等で卒業。',
      'サイバーセキュリティとシステムソフトウェア工学の選択専門科目群を修了。',
      '主な履修科目：人工知能、ディープラーニング、サイバーセキュリティ、システムソフトウェア工学、分散システム、データ構造とアルゴリズム。',
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
    highSchoolActivities: ['Five Cyber Community（FCC）', 'バンドン市レベルの数学OSKに2回参加'],
    highSchoolHonorsLabel: '学業表彰',
    highSchoolHonors: ['優等生。クラス1位、学校全体で上位3位以内。'],
    certificate: '学位証明書を見る',
    certificateLabel: '大学の学位証明書を見る',
    photoAlt: '卒業式のFrancisco Trianto',
  },
  experience: {
    eyebrow: '専門分野と活動',
    title: '職務・専門経験',
    introduction:
      'ソフトウェア開発、AI・データサイエンス、教育、リーダーシップに関する職務・学業・コミュニティ活動を紹介します。',
    tabsLabel: '経験分野',
    parallelNote: '分野を選ぶと、その分野に絞って表示できます。',
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
        title: 'AI・データサイエンス研修',
        organization: 'GCI World、東京大学 松尾研究室',
        period: '2026年4月 - 8月',
        startDate: '2026-04',
        arrangement: '専門研修',
        summary:
          'Pythonの基礎とData Scienceにおける主要なMachine Learningを学ぶ全14回の週次講義を修了しました。Data Scienceコンペティションに参加し、提示されたシナリオとデータをもとにデータ活用型の事業提案を作成する最終課題に取り組みました。',
        proofUrl:
          '/certificates/GCI%20World%20April%20MatsuoLab%20TokyoU%20-%20Raden%20Francisco%20Trianto%20Bratadiningrat.pdf',
      },
      {
        id: 'data-annotation',
        branch: 'aiData',
        title: 'AIアノテーション',
        organization: 'データアノテーションプラットフォーム',
        period: '2026年9月',
        startDate: '2026-09',
        arrangement: 'フリーランス',
        summary:
          'AIモデルのプロンプトと出力をアノテーションし、2つのモデルを比較・評価しました。また、プロンプトと評価ルーブリックを作成し、中規模のコードベースでHarborとOpenCodeを使ってエージェント型モデルを実行・指示しました。',
      },
      {
        id: 'sinerdigi',
        branch: 'engineering',
        title: 'フルスタック開発者（フリーランス）',
        organization: 'PT Sinerdigi Teknologi Indonesia',
        period: '2025年4月 - 2026年3月',
        startDate: '2025-04',
        arrangement: 'リモート',
        summary:
          '5つのコンポーネントからなる分散型待ち行列管理システムを構築し、窓口端末と表示端末間のリアルタイム更新を実現しました。',
      },
      {
        id: 'akhdani',
        branch: 'engineering',
        title: 'ソフトウェアエンジニアインターン',
        organization: 'PT Akhdani Reka Solusi',
        period: '2025年6月 - 2025年9月',
        startDate: '2025-06',
        arrangement: '出社',
        summary:
          '.NETデスクトップシェルとLaravel・Vue.jsアプリを連携し、決済やルームキー機器をシミュレートする多言語ホテルチェックイン端末を試作しました。',
      },
      {
        id: 'hmif-election',
        branch: 'engineering',
        title: 'フロントエンド開発者',
        organization: 'Pemilu HMIF 2025',
        period: '2024年10月 - 2025年2月',
        startDate: '2024-10',
        arrangement: '出社',
        summary:
          '700人以上の学生が利用するレスポンシブな選挙プラットフォームを開発し、3人の後輩開発者とUIパターンやレビュー手法を整えました。',
      },
      {
        id: 'hima-ilkom-election',
        branch: 'engineering',
        title: 'フルスタック開発者（フリーランス）',
        organization: 'Pemilu HIMA ILKOM 2021',
        period: '2021年10月 - 2021年12月',
        startDate: '2021-10',
        arrangement: 'リモート',
        summary:
          '1,000件以上の有効票を処理するオンライン投票システムを共同開発し、3日間の選挙期間中に100%の稼働率を達成しました。',
      },
      {
        id: 'cse-lab',
        branch: 'academic',
        title: '計算科学・工学研究室アシスタント',
        organization: 'STEI ITB',
        period: '2024年8月 - 2026年8月',
        startDate: '2024-08',
        arrangement: '出社',
        summary:
          '研究室運営と授業を支援し、新しいアシスタントの採用・評価にも携わりました。50人以上の応募者から選ばれた12人の一人です。',
      },
      {
        id: 'if2224',
        branch: 'academic',
        title: 'IF2224形式言語とオートマトン理論 ティーチングアシスタント',
        organization: 'STEI ITB',
        period: '2025年8月 - 2026年7月',
        startDate: '2025-08',
        arrangement: '出社',
        summary:
          '4段階のコンパイラ・インタプリタ最終課題を設計し、技術資料の作成、コードレビュー、デバッグ支援を行いました。',
      },
      {
        id: 'if2211',
        branch: 'academic',
        title: 'IF2211アルゴリズム戦略 ティーチングアシスタント',
        organization: 'STEI ITB',
        period: '2025年1月 - 2025年7月',
        startDate: '2025-01',
        arrangement: '出社',
        summary:
          'アルゴリズム戦略に関する6つの課題を作成し、効率性、計算量、境界ケースを評価しました。',
      },
      {
        id: 'if1220',
        branch: 'academic',
        title: 'IF1220離散数学 コーディネーター／主任アシスタント',
        organization: 'STEI ITB',
        period: '2024年8月 - 2025年1月',
        startDate: '2024-08',
        arrangement: '出社',
        summary:
          '5人のティーチングアシスタントを率い、3クラス172人の学生向けに試験問題と解答の資料を整備しました。',
      },
      {
        id: 'character-trainer',
        branch: 'academic',
        title: '人間形成プログラムトレーナー',
        organization: 'Institut Teknologi Bandung',
        period: '2023年7月 - 2024年3月',
        startDate: '2023-07',
        arrangement: '出社',
        summary:
          '4日間のイベントを通じて、50人の新入生向けに人間形成ワークショップと振り返りの場を進行しました。',
      },
      {
        id: 'hmif-academic',
        branch: 'leadership',
        title: '学術部門スタッフ',
        organization: 'HMIF ITB',
        period: '2024年7月 - 2025年6月',
        startDate: '2024-07',
        arrangement: '出社',
        summary:
          '700人以上の学生コミュニティ向けに講義資料を整理し、試験対策ガイドと学習シートを作成しました。',
      },
      {
        id: 'arka-vidia',
        branch: 'leadership',
        title: 'コンテンツストラテジスト',
        organization: 'ARKA VIDIA 9.0',
        period: '2024年11月 - 2025年5月',
        startDate: '2024-11',
        arrangement: '出社',
        summary:
          '全国規模のテクノロジーイベントに向けたプロモーション企画とライブ報道を、デザイン・マーケティングチームと連携して行いました。',
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
          '300人以上の入会希望者向けにオリエンテーションやワークショップを企画し、候補者の評価も行いました。',
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
          '卒業式イベントを担当する8人のチームを調整し、委員会メンバー183人の人員データを管理しました。',
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
          'バレーボールクラブに入る100人以上の新入生向けに、人間形成とオリエンテーション活動を企画しました。',
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
          '候補者の選考や面接を通じてリーダー継承を支援し、年次メンバー受け入れの運営を見守りました。',
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
          'オリエンテーションや式典を撮影し、共有メディア資料を整理してイベントのダイジェスト動画を制作しました。',
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
    title: 'お気軽にご連絡ください。',
    introduction:
      'ソフトウェア開発、セキュリティ、データ、または興味深いプロジェクトについてご連絡ください。',
    professional: '仕事関連',
    community: '執筆・コミュニティ',
  },
} satisfies Messages

export default ja
