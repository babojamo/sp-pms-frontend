export enum UserType {
  OPERATOR = 'operator',
  ADMIN = 'admin',
  MANAGER = 'manager',
}
export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  type: UserType;
  created_by?: string;
  created_at: string;
  updated_at: string;
}
export interface UserForm {
  id: string;
  name: string;
  username: string;
  password: string;
  type: UserType;
  created_by?: string;
  created_at: string;
  updated_at: string;
}