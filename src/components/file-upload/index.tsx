import { useState, useEffect } from 'react';

import { uploadImage, deleteImage } from '@/utils';

import { Button } from '../ui/button';

import styles from './styles.module.scss';
import Image from 'next/image';

type FileUploadProps = {
  onUploadComplete?: (url: string) => void;
  value?: string;
};

export const FileUpload = ({ onUploadComplete, value }: FileUploadProps) => {
  const [url, setUrl] = useState<string | null>(value || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUrl(value ?? null);
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setError('No file selected');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const { url } = await uploadImage(file);

      setUrl(url);
      onUploadComplete?.(url);
    } catch (error) {
      setError('Upload failed. Please try again.');

      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!url) {
      setError('No file to delete');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      await deleteImage(url);

      setUrl(null);
      onUploadComplete?.('');
    } catch (err) {
      setError('Delete failed. Please try again.');

      console.error('Delete error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      {!url && <input type="file" onChange={handleFileChange} disabled={isUploading} />}

      <div className={styles.controls}>
        {url && (
          <>
            <Image src={url} alt="Uploaded image" width={100} height={100} />
            <Button type="button" onClick={handleDelete} disabled={isUploading}>
              Delete
            </Button>
          </>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
