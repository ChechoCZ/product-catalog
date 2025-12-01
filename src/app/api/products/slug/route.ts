import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const product = await prisma.products.findUnique({
      where: { slug },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}
