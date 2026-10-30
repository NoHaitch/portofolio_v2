export const locales = ['en', 'id', 'ja', 'zh'] as const

export type Locale = (typeof locales)[number]

export type ExperienceBranch = 'engineering' | 'academic' | 'leadership' | 'aiData'

export type ExperienceEntry = {
  id: string
  branch: ExperienceBranch
  title: string
  organization: string
  period: string
  startDate: string
  arrangement: string
  summary: string
  proofUrl?: string
}

export type PortfolioProject = {
  title: string
  category: string
  period: string
  summary: string
  tags: string[]
}

export type ActivityHighlight = {
  title: string
  description: string
  relatedRoute: 'experience' | 'education'
}

export type Messages = {
  metadataDescription: string
  navigation: {
    label: string
    home: string
    projects: string
    education: string
    experience: string
    about: string
    contact: string
  }
  languageLabel: string
  switchToLight: string
  switchToDark: string
  footer: {
    copyright: string
    tagline: string
    quickLinks: string
    connect: string
    backToTop: string
    aboutSite: string
  }
  about: {
    eyebrow: string
    title: string
    introduction: string
    story: string[]
    shibuyaPhotoAlt: string
    nameHeading: string
    names: { name: string; note: string }[]
    hobbiesHeading: string
    hobbies: { title: string; description: string }[]
    singaporePhotoAlt: string
    interestsHeading: string
    interests: string[]
    contactHeading: string
    contactDescription: string
    contactLink: string
  }
  aboutSite: {
    eyebrow: string
    title: string
    introduction: string
    purposeHeading: string
    purposeItems: string[]
    workflowHeading: string
    workflowIntroduction: string
    workflowSteps: { title: string; description: string }[]
    stackHeading: string
    stack: { label: string; items: string[] }[]
    sourceHeading: string
    sourceDescription: string
    sourceLink: string
  }
  home: {
    eyebrow: string
    roles: [string, string, string, string]
    introduction: string
    portraitAlt: string
    projects: string
    contact: string
    scrollHint: string
    philosophyQuote: string
    expertiseLabel: string
    expertiseAreas: {
      title: string
      description: string
    }[]
  }
  projects: {
    eyebrow: string
    title: string
    introduction: string
    projectsHeading: string
    activitiesHeading: string
    activitiesIntroduction: string
    projects: PortfolioProject[]
    activityHighlights: ActivityHighlight[]
    viewExperience: string
    viewEducation: string
  }
  education: {
    eyebrow: string
    title: string
    introduction: string
    universityDegree: string
    universityPeriod: string
    universityGrade: string
    universityDetailsLabel: string
    universityDetails: string[]
    universityActivitiesLabel: string
    universityActivities: string[]
    skillsLabel: string
    universitySkills: string[]
    highSchoolDegree: string
    highSchoolPeriod: string
    highSchoolActivitiesLabel: string
    highSchoolActivities: string[]
    highSchoolHonorsLabel: string
    highSchoolHonors: string[]
    certificate: string
    certificateLabel: string
    photoAlt: string
  }
  experience: {
    eyebrow: string
    title: string
    introduction: string
    tabsLabel: string
    parallelNote: string
    sortOldestFirst: string
    sortNewestFirst: string
    certificateLinkLabel: string
    branches: Record<ExperienceBranch, string>
    entries: ExperienceEntry[]
  }
  contact: {
    eyebrow: string
    title: string
    introduction: string
    professional: string
    community: string
  }
}
