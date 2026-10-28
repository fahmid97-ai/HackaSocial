import { createSeedData } from './data'
import { AREAS, type DemoData } from './types'

const KEY = 'cca-hackathon-hub-v1'
type RecordValue = Record<string, unknown>
const record = (value: unknown): value is RecordValue => typeof value === 'object' && value !== null && !Array.isArray(value)
const strings = (value: RecordValue, fields: string[]) => fields.every(field => typeof value[field] === 'string')
const area = (value: unknown) => AREAS.some(option => option === value)
const date = (value: unknown) => typeof value === 'string' && Number.isFinite(Date.parse(value))
const url = (value: unknown) => {
  if (value === '') return true
  if (typeof value !== 'string') return false
  try { return ['http:', 'https:'].includes(new URL(value).protocol) } catch { return false }
}

export function validData(value: unknown): value is DemoData {
  if (!record(value) || value.version !== 1 || !Array.isArray(value.users) || !Array.isArray(value.projects) || !Array.isArray(value.comments) || !Array.isArray(value.likes)) return false
  if (!value.users.length || !value.users.every(user => record(user) && strings(user, ['id', 'name', 'email', 'role']) && area(user.area))) return false
  const users = new Set(value.users.map(user => user.id))
  if (users.size !== value.users.length || (value.currentUserId !== null && !users.has(value.currentUserId))) return false
  if (!value.projects.every(project => record(project) && strings(project, ['id', 'creatorId', 'title', 'summary', 'problem', 'solution', 'hackathon', 'team', 'contactName', 'contactEmail', 'repositoryUrl', 'demoUrl', 'notes']) && area(project.area) && users.has(project.creatorId) && Array.isArray(project.technologies) && project.technologies.every(tag => typeof tag === 'string') && date(project.createdAt) && date(project.updatedAt) && url(project.repositoryUrl) && url(project.demoUrl))) return false
  const projects = new Set(value.projects.map(project => project.id))
  if (projects.size !== value.projects.length) return false
  if (!value.comments.every(comment => record(comment) && strings(comment, ['id', 'projectId', 'userId', 'text']) && users.has(comment.userId) && projects.has(comment.projectId) && date(comment.createdAt))) return false
  const likes = new Set<string>()
  return value.likes.every(like => {
    if (!record(like) || !strings(like, ['projectId', 'userId']) || !users.has(like.userId) || !projects.has(like.projectId)) return false
    const key = `${like.userId}:${like.projectId}`
    if (likes.has(key)) return false
    likes.add(key)
    return true
  })
}

export function loadData(): DemoData {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(KEY) ?? 'null')
    if (validData(saved)) return saved
  } catch {}
  return createSeedData()
}

export function saveData(data: DemoData): boolean {
  try { localStorage.setItem(KEY, JSON.stringify(data)); return true } catch { return false }
}