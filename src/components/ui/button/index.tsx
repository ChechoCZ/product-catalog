import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';
import { Loader2 } from 'lucide-react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  isLoading?: boolean;
};

export const Button = ({ children, isLoading, ...props }: ButtonProps) => {
  return (
    <button className={styles.button} {...props}>
      {isLoading ? <Loader2 className={styles.loader} /> : children}
    </button>
  );
};
