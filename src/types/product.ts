import { Category } from '@/types/category';

export type Product = {
  id: number;
  category: Category;
  description: string;
  image: string;
  title: string;
  price: number;
  slug: string;
  availability: boolean;
};
