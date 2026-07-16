export type Role = "owner" | "admin" | "member" | "viewer"
export type ProjectAction = "project:read" | "project:create" | "project:update" | "project:archive"

const grants: Record<Role, ReadonlySet<ProjectAction>> = {
  owner: new Set(["project:read", "project:create", "project:update", "project:archive"]),
  admin: new Set(["project:read", "project:create", "project:update", "project:archive"]),
  member: new Set(["project:read", "project:create", "project:update"]),
  viewer: new Set(["project:read"]),
}

export function can(role: Role, action: ProjectAction): boolean {
  return grants[role].has(action)
}
