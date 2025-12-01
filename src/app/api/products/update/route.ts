import { NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const productSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  image: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  slug: z.string().min(1).optional(),
  availability: z.boolean().optional(),
});

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const productId = searchParams.get('productId');
    const body = await request.json();
    const validatedBody = productSchema.parse(body);

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const product = await prisma.products.update({
      where: { id: productId },
      data: validatedBody,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
