'use client';

import { useGetProductsQuery } from '@/store/api/product';

import { ProductTile } from '../tile';
import { ProductSkeleton } from '../skeleton';

import styles from './styles.module.scss';
import { useFilters } from '@/hooks/use-filters';

export const ProductList = () => {
  const { filters } = useFilters();

  const { data: products, isLoading } = useGetProductsQuery(filters || undefined);

  if (isLoading) {
    return (
      <div className={styles.container}>
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!products) return <div>No products found</div>;

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <ProductTile key={product.id} {...product} />
      ))}
    </div>
  );
};
