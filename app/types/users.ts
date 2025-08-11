export enum UserRole {
  OPERATOR = 'operator',
  ADMIN = 'admin',
  MANAGER = 'manager'
}
export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  role: UserRole;
  created_by?: string;
  created_at: string;
  updated_at: string;
  refreshToken?: string;
}

export interface UserForm {
  id: string;
  name: string;
  username: string;
  password: string;
  type: UserRole;
  created_by?: string;
  created_at: string;
  updated_at: string;
}
