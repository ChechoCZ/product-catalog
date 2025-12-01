'use server';

import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

export const uploadImage = async (image: File) => {
  const blob = await put(image.name, image, {
    access: 'public',
    addRandomSuffix: true,
  });

  revalidatePath('/');
  return blob;
}
