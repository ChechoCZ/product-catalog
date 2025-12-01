import styles from './styles.module.scss';

export const ProductSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image} />
      <div className={styles.name} />
      <div className={styles.price} />
    </div>
  );
};
