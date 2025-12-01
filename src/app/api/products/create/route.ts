import { NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const productSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  category: z.string().min(1),
  price: z.number().min(0),
  slug: z.string().min(1),
  availability: z.boolean().default(true),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedBody = productSchema.parse(body);

    const { title, description, image, category, price, slug, availability } = validatedBody;

    const product = await prisma.products.create({
      data: { title, description, image, category, price, slug, availability },
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
