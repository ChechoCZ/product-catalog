import { Search } from 'lucide-react';
import { InputHTMLAttributes } from 'react';

import styles from './styles.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  showIcon?: boolean;
};

export const Input = ({ placeholder, showIcon = true, disabled, readOnly, ...props }: InputProps) => {
  return (
    <div className={`${styles.container} ${disabled ? styles.disabled : ''} ${readOnly ? styles.readOnly : ''}`}>
      {showIcon && <Search color="#9f9f9f" size={22} />}
      <input placeholder={placeholder} disabled={disabled} readOnly={readOnly} {...props} />
    </div>
  );
};
