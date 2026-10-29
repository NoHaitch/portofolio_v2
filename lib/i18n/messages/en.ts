import type { Messages } from '@/lib/i18n/types'

const en = {
  metadataDescription:
    'Portfolio of Francisco Trianto, a software engineer focused on security, systems, AI, and practical product delivery.',
  navigation: {
    label: 'Main navigation',
    projects: 'Projects',
    home: 'Home',
    education: 'Education',
    experience: 'Experience',
    contact: 'Contact',
  },
  languageLabel: 'Choose language',
  switchToLight: 'Switch to light mode',
  switchToDark: 'Switch to dark mode',
  footer: {
    copyright: '© 2026 Francisco Trianto',
    tagline: 'Software engineer focused on security, systems, and AI. Based in Indonesia.',
    quickLinks: 'Quick links',
    connect: 'Connect',
    backToTop: 'Back to top',
    aboutSite: 'About this site',
  },
  aboutSite: {
    eyebrow: 'About this site',
    title: 'A portfolio built to be read, not just looked at.',
    introduction:
      'This site is my home on the web. It collects my work, experience, and education in one place that is fast, accessible, and available in four languages.',
    purposeHeading: 'What it is for',
    purposeItems: [
      'Showing who I am and what I can do, from software engineering to AI and cybersecurity.',
      'Keeping a structured record of my projects, experience, and education.',
      'Giving recruiters, collaborators, and teammates an easy way to get in touch.',
    ],
    workflowHeading: 'How it is built',
    workflowIntroduction:
      'The site was built with an agentic coding workflow, with human decisions at the parts that matter most and hands-on fine tuning for what the agent tends to miss.',
    workflowSteps: [
      {
        title: 'Manual project setup',
        description:
          'I set up the foundation myself: Next.js, Bun, Tailwind CSS, shadcn/ui, Prettier, and ESLint, so every later change builds on choices I made on purpose.',
      },
      {
        title: 'Preparing the agent',
        description:
          'I added agent skills, a written context file about me, and project rules covering the stack, content model, testing, and writing style.',
      },
      {
        title: 'A baseline idea',
        description:
          'Before generating anything, I decided what the site should look like and contain: the pages, the tone, the languages, and the overall feel.',
      },
      {
        title: 'Agentic coding in small steps',
        description:
          'The agent builds most of the pages, components, and translations one scoped request at a time, working from the context and rules above.',
      },
      {
        title: 'Verify and review',
        description:
          'Every change is checked with builds, type checks, and real browser testing, and I review the result before moving on.',
      },
      {
        title: 'Fine tuning and documenting',
        description:
          'I fix what the agent overlooked, such as accessibility, spacing, wording, and small interactions, then record the conventions so the next change stays consistent.',
      },
    ],
    stackHeading: 'Stack and tools',
    stack: [
      { label: 'Framework', items: ['Next.js', 'React', 'TypeScript'] },
      { label: 'Styling and UI', items: ['Tailwind CSS', 'shadcn/ui', 'Base UI', 'Lucide'] },
      { label: 'Tooling', items: ['Bun', 'Prettier', 'ESLint'] },
    ],
    sourceHeading: 'Source code',
    sourceDescription: 'The whole site is open source. Feel free to look around.',
    sourceLink: 'View on GitHub',
  },
  home: {
    eyebrow: 'Informatics · Indonesia',
    roles: ['Systems engineering', 'AI & Data Science', 'Cyber security', 'Software Engineer'],
    introduction:
      'An Informatics Engineering graduate from ITB who builds practical software with care for security, dependable systems, and useful data.',
    portraitAlt: 'Portrait of Francisco Trianto in a navy blazer',
    projects: 'View projects',
    contact: 'Get in touch',
    scrollHint: 'Scroll to explore',
    philosophyQuote:
      'Jack of all trades, master of none, but oftentimes better than master of one.',
    expertiseLabel: 'Areas of expertise',
    expertiseAreas: [
      {
        title: 'Software engineering',
        description:
          'I can build software end to end or extend existing systems. I am comfortable with Agile and Waterfall, and use AI-assisted coding for faster feedback.',
      },
      {
        title: 'Cybersecurity',
        description:
          'I know the threat landscape, from classic vulnerabilities to newer ones like prompt injection. I also see how AI is now driving attacks, not just defense.',
      },
      {
        title: 'Systems engineering',
        description:
          'I understand systems broadly enough to weigh the trade-offs of each design, from simple monoliths to layered microservices, and pick the right one for the problem.',
      },
      {
        title: 'Embedded systems',
        description:
          'I am fascinated by how embedded systems have evolved, especially Edge AI running on hardware and the future of more capable, intelligent robotics.',
      },
      {
        title: 'Operations & DevOps',
        description:
          'Operations is the core of a great service, from pipelines to automation. I keep monitoring and observability strong across data, systems, and AI, including new model pipelines.',
      },
      {
        title: 'Agentic coding',
        description:
          'Agentic models are the tool of this era, handling routine tasks faster. I use both terminal and IDE agents and keep up with the latest models, skills, and context.',
      },
      {
        title: 'AI & Data Science',
        description:
          'AI has turned business decisions from rough guesses into informed plans. I use data-driven prediction and analysis to find what makes a plan succeed.',
      },
      {
        title: 'Machine Learning',
        description:
          'I have worked on the model side of AI, from classic ML to Deep Learning in NLP and Vision. I follow RAG and MCP, and have designed evaluations to compare models.',
      },
      {
        title: 'Computer science & research',
        description:
          'I am enthusiastic about new breakthroughs across computing, from AI and ML to other fields, and I am always thinking about ideas that could shape the future.',
      },
    ],
  },
  projects: {
    eyebrow: 'Selected work & beyond',
    title: 'Projects and activities',
    introduction:
      'A more hands-on look at the things I have built and the communities I have learned with.',
    projectsHeading: 'Selected projects',
    activitiesHeading: 'Activities & highlights',
    activitiesIntroduction:
      'A few meaningful experiences beyond building software, collected here without repeating the full work timeline.',
    projects: [
      {
        title: 'Distributed Queue Management',
        category: 'Professional project',
        period: 'Apr 2025 - Mar 2026',
        summary:
          'Built a queue-management platform across five components, with real-time updates between teller and display clients.',
        tags: ['Distributed systems', 'Real-time updates', 'Queue management'],
      },
      {
        title: 'Multilingual Hotel Check-in Kiosk',
        category: 'Internship project',
        period: 'Jun 2025 - Sep 2025',
        summary:
          'Connected a .NET desktop shell to a Laravel and Vue.js application, prototyping payment and room-key device interactions.',
        tags: ['.NET', 'Laravel', 'Vue.js', 'Device integration'],
      },
      {
        title: 'HMIF Student Election',
        category: 'Campus project',
        period: 'Oct 2024 - Feb 2025',
        summary:
          'Built a responsive election platform for more than 700 student voters and helped junior developers follow shared UI and review practices.',
        tags: ['Frontend', 'Election platform', '700+ voters'],
      },
      {
        title: 'HIMA ILKOM Digital Voting',
        category: 'Freelance project',
        period: 'Oct 2021 - Dec 2021',
        summary:
          'Co-built a digital voting platform that processed over 1,000 validated votes and maintained 100% uptime during the three-day election.',
        tags: ['Full-stack', 'Digital voting', 'Reliability'],
      },
    ],
    activityHighlights: [
      {
        title: 'Character development workshops',
        description:
          'Facilitated workshops and reflection sessions for 50 first-year students across four event days.',
        relatedRoute: 'experience',
      },
      {
        title: 'Campus and volleyball community',
        description:
          'Contributed to ITB Volleyball Club and helped create onboarding activities for more than 100 incoming members.',
        relatedRoute: 'experience',
      },
      {
        title: 'High-school mathematics competitions',
        description:
          'Participated twice in the Bandung city-level Mathematics OSK and graduated as an honor student.',
        relatedRoute: 'education',
      },
    ],
    viewExperience: 'Explore experience',
    viewEducation: 'Explore education',
  },
  education: {
    eyebrow: 'Background',
    title: 'Education',
    introduction: 'The academic path behind my work in software, systems, and security.',
    universityDegree: 'Bachelor of Science in Informatics / Computer Science',
    universityPeriod: 'Jul 2022 – Aug 2026',
    universityGrade: 'GPA: 3.57 / 4.00 · Cum laude',
    universityDetailsLabel: 'Academic highlights',
    universityDetails: [
      'Graduated cum laude with 151 credits completed, exceeding the 144-credit requirement.',
      'Completed elective specializations in Cybersecurity and System Software Engineering.',
      'Selected coursework: Artificial Intelligence, Deep Learning, Cybersecurity, System Software Engineering, Distributed Systems, and Data Structures & Algorithms.',
    ],
    universityActivitiesLabel: 'Activities and societies',
    universityActivities: [
      'Informatics Student Association (HMIF) ITB',
      'Computational Science & Engineering Lab Assistant',
      'Course Assistant',
      'Character Development Training (CDT) Trainer',
      'ITB Volleyball Club (UBV)',
    ],
    skillsLabel: 'Selected skills',
    universitySkills: [
      'Machine Learning',
      'Computer Science',
      'Cybersecurity',
      'Systems Engineering',
      'Distributed Systems',
      'Deep Learning',
    ],
    highSchoolDegree: 'High School Diploma · Natural Sciences (STEM)',
    highSchoolPeriod: 'Jul 2019 – Jul 2022',
    highSchoolActivitiesLabel: 'Activities and societies',
    highSchoolActivities: [
      'Five Cyber Community (FCC)',
      'Two-time OSK Mathematics participant, Bandung city level',
    ],
    highSchoolHonorsLabel: 'Academic honors',
    highSchoolHonors: ['Honor student; ranked 1st in class and in the top 3 school-wide.'],
    certificate: 'View degree certificate',
    certificateLabel: 'View official degree certificate',
    photoAlt: 'Francisco Trianto at his graduation',
  },
  experience: {
    eyebrow: 'Professional background',
    title: 'Professional Experience',
    introduction:
      'A selection of professional, academic, and community experience across software engineering, AI and Data Science, teaching, and leadership.',
    tabsLabel: 'Experience areas',
    parallelNote: 'Select a track to focus on one area.',
    sortOldestFirst: 'Show oldest first',
    sortNewestFirst: 'Show newest first',
    certificateLinkLabel: 'View completion certificate',
    branches: {
      engineering: 'Software engineering',
      academic: 'Teaching & academia',
      leadership: 'Campus & community',
      aiData: 'AI & Data Science',
    },
    entries: [
      {
        id: 'gci-world-training',
        branch: 'aiData',
        title: 'AI & Data Science Trainee',
        organization: 'GCI World, Matsuo Lab, The University of Tokyo',
        period: 'Apr - Aug 2026',
        startDate: '2026-04',
        arrangement: 'Professional training',
        summary:
          'Completed 14 weekly lessons covering Python fundamentals and core Machine Learning for Data Science. Applied the material in a Data Science competition and a final project developing a data-driven business proposal from a given scenario and dataset.',
        proofUrl:
          '/certificates/GCI%20World%20April%20MatsuoLab%20TokyoU%20-%20Raden%20Francisco%20Trianto%20Bratadiningrat.pdf',
      },
      {
        id: 'data-annotation',
        branch: 'aiData',
        title: 'AI Annotation',
        organization: 'Data annotation platform',
        period: 'Sep 2026',
        startDate: '2026-09',
        arrangement: 'Freelance',
        summary:
          'Annotated model prompts and outputs, compared and evaluated two models, created prompts and evaluation rubrics, and used Harbor and OpenCode to run and task agentic models in a medium-sized codebase.',
      },
      {
        id: 'sinerdigi',
        branch: 'engineering',
        title: 'Full-Stack Developer (Freelance)',
        organization: 'PT Sinerdigi Teknologi Indonesia',
        period: 'Apr 2025 - Mar 2026',
        startDate: '2025-04',
        arrangement: 'Remote',
        summary:
          'Built a distributed queue-management system spanning five components, with real-time updates between teller and display clients.',
      },
      {
        id: 'akhdani',
        branch: 'engineering',
        title: 'Software Engineer Intern',
        organization: 'PT Akhdani Reka Solusi',
        period: 'Jun 2025 - Sep 2025',
        startDate: '2025-06',
        arrangement: 'Onsite',
        summary:
          'Prototyped a multilingual hotel check-in kiosk by connecting a .NET desktop shell to a Laravel and Vue.js application, including simulated payment and room-key devices.',
      },
      {
        id: 'hmif-election',
        branch: 'engineering',
        title: 'Frontend Developer',
        organization: 'Pemilu HMIF 2025',
        period: 'Oct 2024 - Feb 2025',
        startDate: '2024-10',
        arrangement: 'Onsite',
        summary:
          'Built a responsive election platform for more than 700 student voters and helped three junior developers follow shared UI and review practices.',
      },
      {
        id: 'hima-ilkom-election',
        branch: 'engineering',
        title: 'Full-Stack Developer (Freelance)',
        organization: 'Pemilu HIMA ILKOM 2021',
        period: 'Oct 2021 - Dec 2021',
        startDate: '2021-10',
        arrangement: 'Remote',
        summary:
          'Co-built a digital voting platform that processed over 1,000 validated votes and maintained 100% uptime throughout the three-day election.',
      },
      {
        id: 'cse-lab',
        branch: 'academic',
        title: 'Computational Science and Engineering Laboratory Assistant',
        organization: 'STEI ITB',
        period: 'Aug 2024 - Aug 2026',
        startDate: '2024-08',
        arrangement: 'Onsite',
        summary:
          'Supported lab operations and course delivery, and helped recruit and evaluate new assistant cohorts. Selected as one of 12 assistants from more than 50 applicants.',
      },
      {
        id: 'if2224',
        branch: 'academic',
        title: 'Course Assistant, IF2224 Formal Language and Automata Theory',
        organization: 'STEI ITB',
        period: 'Aug 2025 - Jul 2026',
        startDate: '2025-08',
        arrangement: 'Onsite',
        summary:
          'Designed a four-milestone compiler and interpreter capstone, wrote technical guides, and supported students with code reviews and debugging.',
      },
      {
        id: 'if2211',
        branch: 'academic',
        title: 'Course Assistant, IF2211 Algorithm Strategies',
        organization: 'STEI ITB',
        period: 'Jan 2025 - Jul 2025',
        startDate: '2025-01',
        arrangement: 'Onsite',
        summary:
          'Developed six course projects around core algorithmic strategies and evaluated implementations for efficiency, complexity, and edge cases.',
      },
      {
        id: 'if1220',
        branch: 'academic',
        title: 'Coordinator / Head Assistant, IF1220 Discrete Mathematics',
        organization: 'STEI ITB',
        period: 'Aug 2024 - Jan 2025',
        startDate: '2024-08',
        arrangement: 'Onsite',
        summary:
          'Led five teaching assistants and prepared exam question and solution banks for 172 students across three lecture classes.',
      },
      {
        id: 'character-trainer',
        branch: 'academic',
        title: 'Character Development Trainer',
        organization: 'Institut Teknologi Bandung',
        period: 'Jul 2023 - Mar 2024',
        startDate: '2023-07',
        arrangement: 'Onsite',
        summary:
          'Facilitated character-building workshops and reflection sessions for 50 first-year students across four event days.',
      },
      {
        id: 'hmif-academic',
        branch: 'leadership',
        title: 'Academic Division Staff',
        organization: 'HMIF ITB',
        period: 'Jul 2024 - Jun 2025',
        startDate: '2024-07',
        arrangement: 'Onsite',
        summary:
          'Organized course archives and created exam revision guides and modular study sheets for a student community of more than 700 members.',
      },
      {
        id: 'arka-vidia',
        branch: 'leadership',
        title: 'Content Strategist',
        organization: 'ARKA VIDIA 9.0',
        period: 'Nov 2024 - May 2025',
        startDate: '2024-11',
        arrangement: 'Onsite',
        summary:
          'Planned promotional campaigns and live coverage for a national technology event, coordinating content with design and marketing teams.',
      },
      {
        id: 'sparta-hmif',
        branch: 'leadership',
        title: 'Materials & Methods Staff, SPARTA',
        organization: 'HMIF ITB',
        period: 'Jun 2024 - Sep 2024',
        startDate: '2024-06',
        arrangement: 'Onsite',
        summary:
          'Designed orientation activities and workshops for more than 300 prospective members, with structured candidate assessment.',
      },
      {
        id: 'wisokto',
        branch: 'leadership',
        title: 'Human Resources Staff, Wisokto',
        organization: 'HMIF ITB',
        period: 'Sep 2023 - Nov 2023',
        startDate: '2023-09',
        arrangement: 'Hybrid',
        summary:
          'Coordinated an eight-person team for graduation events and maintained personnel records for 183 committee members.',
      },
      {
        id: 'pab-ubv',
        branch: 'leadership',
        title: 'Materials & Methods Staff, PAB',
        organization: 'UBV ITB',
        period: 'Aug 2023 - May 2024',
        startDate: '2023-08',
        arrangement: 'Onsite',
        summary:
          'Created character-building and onboarding activities for more than 100 incoming volleyball club members.',
      },
      {
        id: 'regeneration-ubv',
        branch: 'leadership',
        title: 'Regeneration Division Staff',
        organization: 'UBV ITB',
        period: 'May 2023 - May 2024',
        startDate: '2023-05',
        arrangement: 'Onsite',
        summary:
          'Supported leadership succession through candidate screening and interviews, and observed the annual member induction process.',
      },
      {
        id: 'tpb-cup',
        branch: 'leadership',
        title: 'Security Division Staff',
        organization: 'TPB CUP V Oli UBV ITB 2023',
        period: 'Jan 2023 - Mar 2023',
        startDate: '2023-01',
        arrangement: 'Onsite',
        summary:
          'Managed event safety, spectator flow, and controlled access during an inter-faculty volleyball tournament.',
      },
      {
        id: 'gathering-stei',
        branch: 'leadership',
        title: 'Documentation Staff, Gathering STEI 2.0',
        organization: 'STEI ITB',
        period: 'Aug 2022 - Sep 2022',
        startDate: '2022-08',
        arrangement: 'Onsite',
        summary:
          'Documented key orientation sessions and ceremonies, organized a shared media archive, and produced a recap video.',
      },
      {
        id: 'fcc-programming',
        branch: 'leadership',
        title: 'Head of Programming',
        organization: 'FCC SMAN 5 Bandung',
        period: 'Aug 2019 - Jun 2022',
        startDate: '2019-08',
        arrangement: 'Onsite',
        summary:
          'Led a two-year programming curriculum, trained more than 20 students, and built practical projects to prepare members for club admission.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's connect.",
    introduction:
      'Reach out about engineering, security, data, or a project you think I should see.',
    professional: 'Professional',
    community: 'Writing & community',
  },
} satisfies Messages

export default en
