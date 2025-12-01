import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const category = searchParams.get('category');

    if (!category || !id) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    const products = await prisma.products.findMany({
      where: { category, id: { not: id } },
      take: 3,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
