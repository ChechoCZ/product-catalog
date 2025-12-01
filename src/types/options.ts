import { Category } from './category';

export type OnOptionChangeProps = {
  name: Category;
  action: 'add' | 'remove';
};
