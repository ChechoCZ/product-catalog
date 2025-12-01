import styles from './styles.module.scss';

type BadgeProps = {
  text: string;
  variant: 'primary' | 'secondary';
};

export const Badge = ({ text, variant }: BadgeProps) => {
  return (
    <div className={`${styles.container} ${styles[variant]}`}>
      <span>{text}</span>
    </div>
  );
};
