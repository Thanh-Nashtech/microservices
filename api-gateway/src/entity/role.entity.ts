import { Permission } from './permission.entity';
export class Role {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
}