'use client';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks/use-redux-actions';
import { openModal } from '@/store/slices/create-product-modal-slice';

import { NewProduct } from '../product/new';

export const AddProduct = () => {
  const dispatch = useAppDispatch();

  const openCreateProductModal = () => {
    dispatch(openModal());
  };

  return (
    <>
      <NewProduct />
      <Button type="button" onClick={openCreateProductModal}>
        <PlusIcon size={16} style={{ marginRight: 8 }} />
        <span>Add Product</span>
      </Button>
    </>
  );
};
