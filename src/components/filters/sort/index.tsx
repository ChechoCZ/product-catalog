'use client';

import { Select } from '@/components/ui/select';
import { SortBy } from '@/types';

import styles from './styles.module.scss';

type SortFilterComponentProps = {
  sortBy: SortBy;
  onSortByChange: (sortBy: SortBy) => void;
};

const options = [
  { value: 'lowestPrice', label: 'Lowest Price' },
  { value: 'highestPrice', label: 'Highest Price' },
];

export const SortFilter = ({ sortBy, onSortByChange }: SortFilterComponentProps) => {
  const handleSortByChange = (value: string) => {
    onSortByChange(value as SortBy);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="sort">Sort by</label>
      <Select
        options={options}
        value={sortBy}
        onChange={handleSortByChange}
      />
    </div>
  );
};
