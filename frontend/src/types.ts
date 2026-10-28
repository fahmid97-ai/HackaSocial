export const AREAS = ['Azure', 'MACE', 'Google', 'AWS', 'Enterprise Architects', 'Complex Engagements', 'Business Analysis', 'Integrations'] as const
export type Area = typeof AREAS[number]
export type User = { id: string; name: string; email: string; role: string; area: Area }
export type Project = {
  id: string; creatorId: string; title: string; summary: string; problem: string;
  solution: string; hackathon: string; team: string; area: Area; technologies: string[];
  contactName: string; contactEmail: string; repositoryUrl: string; demoUrl: string;
  notes: string; createdAt: string; updatedAt: string;
}
export type Comment = { id: string; projectId: string; userId: string; text: string; createdAt: string }
export type Like = { projectId: string; userId: string }
export type DemoData = { version: 1; users: User[]; projects: Project[]; comments: Comment[]; likes: Like[]; currentUserId: string | null }