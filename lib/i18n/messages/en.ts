import type { Messages } from '@/lib/i18n/types'

const en = {
  metadataDescription:
    'Portfolio of Francisco Trianto, a software engineer focused on security, systems, AI, and practical product delivery.',
  navigation: {
    label: 'Main navigation',
    home: 'Home',
    education: 'Education',
    experience: 'Work',
    contact: 'Contact',
  },
  languageLabel: 'Choose language',
  switchToLight: 'Switch to light mode',
  switchToDark: 'Switch to dark mode',
  footer: {
    copyright: '© 2026 Francisco Trianto',
  },
  home: {
    eyebrow: 'Software engineer · Indonesia',
    roles: ['Systems engineering', 'AI & data science', 'Cyber security'],
    introduction:
      'An Informatics Engineering graduate from ITB who builds practical software with care for security, dependable systems, and useful data.',
    portraitAlt: 'Francisco Trianto at his graduation',
    projects: 'View projects',
    contact: 'Get in touch',
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
    certificateLabel: 'View official degree certificate (opens in a new tab)',
  },
  experience: {
    eyebrow: 'Career log',
    title: 'Work experience',
    introduction:
      'A chronological view of my work across software engineering, teaching, and campus leadership.',
    tabsLabel: 'Experience areas',
    parallelNote: 'Roles run from earliest to latest. Select a track to focus on one area.',
    branches: {
      engineering: 'Software engineering',
      academic: 'Teaching & academia',
      leadership: 'Campus & community',
    },
    entries: [
      {
        id: 'sinerdigi',
        branch: 'engineering',
        title: 'Full-Stack Developer (Freelance)',
        organization: 'PT Sinerdigi Teknologi Indonesia',
        period: 'Apr 2025 - Mar 2026',
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
