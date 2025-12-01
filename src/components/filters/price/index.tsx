'use client';

import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components/ui/input';
import { PriceFilterProps } from '@/types';

import styles from './styles.module.scss';

type PriceFilterComponentProps = {
  priceRange: PriceFilterProps;
  onOptionChange: (priceRange: PriceFilterProps) => void;
};

export const PriceFilter = ({ priceRange, onOptionChange }: PriceFilterComponentProps) => {
  const handleMinPriceChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onOptionChange({ ...priceRange, min: parseFloat(event.target.value) });
  }, 500);

  const handleMaxPriceChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onOptionChange({ ...priceRange, max: parseFloat(event.target.value) });
  }, 500);

  return (
    <div className={styles.container}>
      <label className={styles.label}>Price Range</label>
      <div className={styles.options}>
        <div className={styles.option}>
          <label htmlFor="lowestPrice">Min. Price</label>
          <Input type="number" name="minPrice" showIcon={false} onChange={handleMinPriceChange} />
        </div>
        <div className={styles.option}>
          <label htmlFor="highestPrice">Max. Price</label>
          <Input type="number" name="maxPrice" showIcon={false} onChange={handleMaxPriceChange} />
        </div>
      </div>
    </div>
  );
};
