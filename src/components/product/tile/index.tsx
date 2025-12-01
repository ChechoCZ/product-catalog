'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Product } from '@/types/product';

import styles from './styles.module.scss';

export const ProductTile = (product: Product) => {
  const router = useRouter();

  return (
    <div
      className={styles.container}
      onClick={() => router.push(`/product/${product.slug}`)}
    >
      <Image
        className={styles.image}
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
      />

      <label className={styles.name}>{product.title}</label>
      <span className={styles.price}>${product.price.toFixed(2)}</span>
    </div>
  );
};
