export const projectCategories = ['academic', 'personal', 'organization', 'freelance'] as const
export const activityCategories = ['committee', 'sports', 'event', 'milestone'] as const

export type ProjectCategory = (typeof projectCategories)[number]
export type ActivityCategory = (typeof activityCategories)[number]
export type WorkCategory = ProjectCategory | ActivityCategory

export type WorkKind = 'projects' | 'activities'

export const categoriesByKind: Record<WorkKind, readonly WorkCategory[]> = {
  projects: projectCategories,
  activities: activityCategories,
}

export type WorkLink = { label: string; url: string }

// Every key a content file may use in its front matter. Anything else fails the build.
export const frontMatterKeys = [
  'title',
  'category',
  'date',
  'summary',
  'tags',
  'cover',
  'team',
  'links',
] as const
