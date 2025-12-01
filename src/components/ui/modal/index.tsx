import { createPortal } from 'react-dom';

import styles from './styles.module.scss';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  onClose: () => void;
};

export const Modal = ({ title, children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalBody}>
          <h2>{title}</h2>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};
