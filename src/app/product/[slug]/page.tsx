'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductSkeleton } from '@/components/product/skeleton';
import { ProductRecommendations } from '@/components/product/recommendations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useIsAuthenticated } from '@/hooks/is-authenticated';
import { useGetProductBySlugQuery, useGetProductRecommendationsQuery } from '@/store/api/product';

import styles from './styles.module.scss';

export default function ProductPage() {
  const isAuthenticated = useIsAuthenticated();
  const { slug } = useParams();

  const { data: product, isLoading } = useGetProductBySlugQuery(slug as string);
  const { data: recommendations, isLoading: isRecommendationsLoading } = useGetProductRecommendationsQuery({
    category: product?.category as string,
    id: product?.id.toString() as string,
  });

  if (isLoading) return (
    <div className={styles.container}>
      <ProductSkeleton />
    </div>
  );

  if (!product) return <div>Product not found</div>;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Breadcrumbs category={product?.category} />
          {isAuthenticated && <Button type="button" onClick={() => {}}>Edit</Button>}
        </div>

        <div className={styles.content}>
          <Image
            src={product?.image}
            alt={product?.title}
            width={300}
            height={300}
          />

          <div className={styles.details}>
            <label>{product?.title}</label>

            <div className={styles.price}>
              <label>${product?.price.toFixed(2)}</label>
              <Badge
                text={product?.availability ? 'In Stock' : 'Out of Stock'}
                variant={product?.availability ? 'primary' : 'secondary'}
              />
            </div>

            <div className={styles.description}>
              <label>Description</label>
              <br />
              <span>{product?.description}</span>
            </div>
          </div>
        </div>
      </div>

      <ProductRecommendations
        isLoading={isRecommendationsLoading}
        recommendations={recommendations || []}
      />
    </>
  );
}
