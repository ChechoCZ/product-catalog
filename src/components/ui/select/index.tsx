import styles from './styles.module.scss';

type OptionProps = {
  value: string;
  label: string;
};

type SelectProps = {
  options: OptionProps[];
  value: string;
  onChange: (value: string) => void;
};

const Option = ({ value, label }: OptionProps) => {
  return (
    <option value={value} className={styles.option}>{label}</option>
  );
};

export const Select = ({ options, value, onChange }: SelectProps) => {
  return (
    <select className={styles.select} value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <Option key={option.value} value={option.value} label={option.label} />
      ))}
    </select>
  );
};
