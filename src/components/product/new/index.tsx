'use client';

import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/file-upload';
import { Modal } from '@/components/ui/modal';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-actions';
import { closeModal } from '@/store/slices/create-product-modal-slice';
import { useAddProductMutation } from '@/store/api/product';
import { Category, Product } from '@/types';

import styles from './styles.module.scss';
import { generateSlug } from '@/utils';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

const initialValues = {
  title: '',
  description: '',
  image: '',
  category: '',
  price: 0,
  availability: true,
};

const FileUploadField = () => {
  const { setFieldValue, values } = useFormikContext<typeof initialValues>();

  return (
    <FileUpload
      value={values.image}
      onUploadComplete={(url) => {
        setFieldValue('image', url);
      }}
    />
  );
};

export const NewProduct = () => {
  const [slug, setSlug] = useState<string>('');

  const isOpen = useAppSelector((state) => state.createProductModal.isOpen);
  const [addProduct, { isLoading }] = useAddProductMutation();
  const dispatch = useAppDispatch();

  const validationSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    image: z.string().min(1, 'Image is required'),
    category: z.string().min(1, 'Category is required'),
    price: z.number().min(0, 'Price must be 0 or greater'),
    availability: z.boolean().default(true),
  });

  const validate = (values: typeof initialValues) => {
    // Transform values to match schema expectations (convert price string to number)
    let priceValue: number;

    if (typeof values.price === 'string') {
      priceValue = values.price === '' ? NaN : parseFloat(values.price);
    } else {
      priceValue = values.price ?? NaN;
    }

    const transformedValues = {
      ...values,
      price: isNaN(priceValue) ? NaN : priceValue,
    };

    const result = validationSchema.safeParse(transformedValues);

    if (!result.success) {
      const errors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const path = issue.path.join('.');
        errors[path] = issue.message;
      });

      return errors;
    }

    return {};
  };

  const handleTitleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setSlug(generateSlug(event.target.value));
  };

  const onClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal title="New Product" isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            const submitValues = {
              ...values,
              price: typeof values.price === 'string' ? parseFloat(values.price) || 0 : values.price,
              slug,
            };

            await addProduct(submitValues as Product);

            dispatch(closeModal());

            resetForm();
          }}
          validate={validate}
        >
          <Form className={styles.form}>
            <label>Title</label>
            <Field name="title" type="text" className={styles.field} onBlur={handleTitleBlur} />
            <ErrorMessage name="title" component="div" className={styles.error} />

            <label>Description</label>
            <Field name="description" type="text" className={styles.field} />
            <ErrorMessage name="description" component="div" className={styles.error} />

            <label>Slug</label>
            <Input
              name="slug"
              type="text"
              className={styles.field}
              value={slug}
              showIcon={false}
              disabled
              readOnly
            />

            <label>Image</label>
            <FileUploadField />
            <ErrorMessage name="image" component="div" className={styles.error} />

            <label>Category</label>
            <Field name="category" as="select" className={styles.field}>
              <option value="">Select a category</option>
              <option value={Category.ACCESSORIES}>Accessories</option>
              <option value={Category.CLOTHING}>Clothing</option>
              <option value={Category.ELECTRONICS}>Electronics</option>
              <option value={Category.SHOES}>Shoes</option>
            </Field>
            <ErrorMessage name="category" component="div" className={styles.error} />

            <label>Price</label>
            <Field
              name="price"
              type="number"
              className={styles.field}
            />
            <ErrorMessage name="price" component="div" className={styles.error} />

            <label>Availability</label>
            <Field name="availability" type="checkbox" className={styles.field} />
            <ErrorMessage name="availability" component="div" className={styles.error} />

            <Button type="submit" isLoading={isLoading}>
              <span>Add Product</span>
            </Button>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
};
