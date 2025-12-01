import { Category } from './category';

export type Filters = {
  category?: Category[];
  search?: string;
  sortBy?: 'lowestPrice' | 'highestPrice';
  minPrice?: number;
  maxPrice?: number;
};
