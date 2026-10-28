export const locales = ['en', 'id', 'ja', 'zh'] as const

export type Locale = (typeof locales)[number]

export type ExperienceBranch = 'engineering' | 'academic' | 'leadership'

export type ExperienceEntry = {
  id: string
  branch: ExperienceBranch
  title: string
  organization: string
  period: string
  arrangement: string
  summary: string
}

export type Messages = {
  metadataDescription: string
  navigation: {
    label: string
    home: string
    education: string
    experience: string
    contact: string
  }
  languageLabel: string
  switchToLight: string
  switchToDark: string
  footer: {
    copyright: string
  }
  home: {
    eyebrow: string
    roles: [string, string, string]
    introduction: string
    portraitAlt: string
    projects: string
    contact: string
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
  }
  experience: {
    eyebrow: string
    title: string
    introduction: string
    tabsLabel: string
    parallelNote: string
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
