import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const where: Record<string, any> = {};
    const category = searchParams.get('category');

    if (category) {
      where.category = {
        in: category.split(','),
      };
    }

    const title = searchParams.get('search');

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    if (minPrice || maxPrice) {
      where.price = {};

      if (minPrice) {
        where.price.gte = parseFloat(minPrice);
      }

      if (maxPrice) {
        where.price.lte = parseFloat(maxPrice);
      }
    }

    let sort: 'asc' | 'desc' = 'asc';
    const sortBy = searchParams.get('sortBy');

    if (sortBy) {
      if (sortBy === 'lowestPrice') {
        sort = 'asc';
      }

      if (sortBy === 'highestPrice') {
        sort = 'desc';
      }
    }

    const products = await prisma.products.findMany({
      where,
      orderBy: { price: sort },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
