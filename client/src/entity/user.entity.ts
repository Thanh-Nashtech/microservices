import { Address } from "./address.entity";
import { Role } from "./role.entity";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  addresses?: Address[] | null;
  createdAt: Date;
  updatedAt: Date;
  roles: Role[];
}