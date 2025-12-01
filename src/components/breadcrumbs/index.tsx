import Link from 'next/link';
import styles from './styles.module.scss';

type BreadcrumbsProps = {
  category: string;
};

export const Breadcrumbs = ({ category }: BreadcrumbsProps) => {
  return (
    <div className={styles.container}>
      <span>
        <Link href="/">
          Home
        </Link>
      </span>
      <span>/</span>
      <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
    </div>
  );
};
