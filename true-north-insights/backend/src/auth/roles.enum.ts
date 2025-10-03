export enum Role {
  USER = 'user',
  DEVELOPER = 'developer',
  TEST = 'test',
  FINANCE = 'finance',
  MANAGEMENT = 'management',
  EXECUTIVE = 'executive',
  ADMIN = 'admin',
  SECURITY = 'security',
  ANALYST = 'analyst'
}

export const ROLE_HIERARCHY: Record<Role, Role[]> = {
  [Role.USER]: [Role.USER],
  [Role.DEVELOPER]: [Role.USER, Role.DEVELOPER],
  [Role.TEST]: [Role.USER, Role.TEST],
  [Role.FINANCE]: [Role.USER, Role.FINANCE],
  [Role.MANAGEMENT]: [Role.USER, Role.MANAGEMENT],
  [Role.EXECUTIVE]: [Role.USER, Role.MANAGEMENT, Role.FINANCE, Role.EXECUTIVE],
  [Role.ADMIN]: [Role.USER, Role.ADMIN],
  [Role.SECURITY]: [Role.USER, Role.SECURITY],
  [Role.ANALYST]: [Role.USER, Role.ANALYST]
};
