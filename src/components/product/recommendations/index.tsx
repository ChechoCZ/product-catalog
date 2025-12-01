import { Product } from '@/types/product';
import { ProductSkeleton } from '../skeleton';

import styles from './styles.module.scss';
import { ProductTile } from '../tile';

interface ProductRecommendationsProps {
  isLoading: boolean;
  recommendations: Product[];
}

export const ProductRecommendations = ({ isLoading, recommendations }: ProductRecommendationsProps) => {
  return (
    <div className={styles.container}>
      <h2>Product Recommendations</h2>

      <div className={styles.products}>
        {isLoading && [1, 2, 3].map((product) => (
          <ProductSkeleton key={product} />
        ))}

        {!isLoading && recommendations.length === 0 && <span>No recommendations found</span>}

        {!isLoading && recommendations && recommendations.map((product) => (
          <ProductTile key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
