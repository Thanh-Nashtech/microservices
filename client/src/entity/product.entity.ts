import { Category } from "./category.entity";

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  category?: Category;
  createdAt: Date;
  updatedAt: Date;
}