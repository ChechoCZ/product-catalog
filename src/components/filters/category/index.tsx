'use client';

import { Category, OnOptionChangeProps } from '@/types';
import styles from './styles.module.scss';

type CategoryProps = {
  onOptionChange: ({ name, action }: OnOptionChangeProps) => void;
};

type OptionProps = {
  id: string;
  name: Category;
  label: string;
  onChange: ({ name, action }: OnOptionChangeProps) => void;
};

const Option = ({ id, name, label, onChange }: OptionProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onChange({ name, action: 'add' });
    } else {
      onChange({ name, action: 'remove' });
    }
  };

  return (
    <div className={styles.option}>
      <input type="checkbox" id={id} name={name} onChange={handleChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export const CategoryFilter = ({ onOptionChange }: CategoryProps) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Category</label>
      <div className={styles.options}>
        <Option
          id={Category.CLOTHING}
          name={Category.CLOTHING}
          label="Clothing"
          onChange={onOptionChange}
        />
        <Option
          id={Category.SHOES}
          name={Category.SHOES}
          label="Shoes"
          onChange={onOptionChange}
        />
        <Option
          id={Category.ACCESSORIES}
          name={Category.ACCESSORIES}
          label="Accessories"
          onChange={onOptionChange}
        />
        <Option
          id={Category.ELECTRONICS}
          name={Category.ELECTRONICS}
          label="Electronics"
          onChange={onOptionChange}
        />
      </div>
    </div>
  );
};
