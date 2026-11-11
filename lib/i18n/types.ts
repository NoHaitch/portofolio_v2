import type { WorkCategory } from '@/lib/work-schema'

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

export type WorkListMessages = {
  eyebrow: string
  title: string
  introduction: string
  searchLabel: string
  searchPlaceholder: string
  backLabel: string
}

export type Messages = {
  metadataDescription: string
  navigation: {
    label: string
    home: string
    work: string
    education: string
    experience: string
    about: string
    openMenu: string
    closeMenu: string
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
    work: string
    contact: string
    scrollHint: string
    focusLabel: string
    focusTitle: string
    focusDescription: string
    philosophyQuote: string
    expertiseLabel: string
    expertiseAreas: {
      title: string
      description: string
    }[]
    recentProjectsHeading: string
    recentActivitiesHeading: string
    viewAllProjects: string
    viewAllActivities: string
  }
  work: {
    eyebrow: string
    title: string
    introduction: string
    recentProjectsHeading: string
    recentProjectsIntroduction: string
    viewAllProjects: string
    recentHeading: string
    recentIntroduction: string
    viewAllActivities: string
    projectsPage: WorkListMessages
    activitiesPage: WorkListMessages
    allCategories: string
    categoryFilterLabel: string
    applicationTypesLabel: string
    fieldsLabel: string
    applyFiltersButton: string
    searchButton: string
    resultCount: string
    noResults: string
    noProjectsFound: string
    clearFilters: string
    paginationLabel: string
    previousPage: string
    nextPage: string
    pageNumberLabel: string
    viewDetails: string
    linksHeading: string
    teamLabel: string
    categories: Record<WorkCategory, string>
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
