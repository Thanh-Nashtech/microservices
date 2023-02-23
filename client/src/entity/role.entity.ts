import { Permission } from './permission.entity';
export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
}