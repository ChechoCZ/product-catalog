'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useFilters } from '@/hooks/use-filters';
import { Category, OnOptionChangeProps, PriceFilterProps, SortBy } from '@/types';

import { Input } from '../ui/input';

import { CategoryFilter } from './category';
import { PriceFilter } from './price';
import { SortFilter } from './sort';

import styles from './styles.module.scss';

export const Filters = () => {
  const [search, setSearch] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [priceRange, setPriceRange] = useState<PriceFilterProps>({ min: undefined, max: undefined });
  const [sortBy, setSortBy] = useState<SortBy>('lowestPrice');

  const { updateFilters } = useFilters();

  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    updateFilters({
      search: debouncedSearch,
      category: categories,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      sortBy,
    });
  }, [debouncedSearch, updateFilters, categories, priceRange, sortBy]);

  const handleCategoryChange = ({ name, action }: OnOptionChangeProps) => {
    if (action === 'add') {
      setCategories([...categories, name]);
    } else {
      setCategories(categories.filter((category) => category !== name));
    }
  };

  const handlePriceChange = (newPriceRange: PriceFilterProps) => {
    setPriceRange(newPriceRange);
    updateFilters({ minPrice: newPriceRange.min, maxPrice: newPriceRange.max });
  };

  return (
    <div className={styles.container}>
      <Input placeholder="Search" type="text" onChange={(e) => setSearch(e.target.value)} />
      <CategoryFilter onOptionChange={handleCategoryChange} />
      <PriceFilter priceRange={priceRange} onOptionChange={handlePriceChange} />
      <SortFilter sortBy={sortBy} onSortByChange={setSortBy} />
    </div>
  );
};
