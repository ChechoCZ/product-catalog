'use server';

import { del } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

export const deleteImage = async (imageUrl: string) => {
  await del(new URL(imageUrl).pathname);

  revalidatePath('/');
}
