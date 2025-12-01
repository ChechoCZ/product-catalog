'use client';

import { Division } from '@/components/ui/division';
import { Filters } from '@/components/filters';
import { AddProduct } from '@/components/add-product';
import { ProductList } from '@/components/product/list';
import { useIsAuthenticated } from '@/hooks/is-authenticated';

export default function Home() {
  const isAuthenticated = useIsAuthenticated();

  console.log({ isAuthenticated });

  return (
    <div>
      <main className="main">
        <Filters />
        <Division />
        <div className="content">
          {isAuthenticated && <AddProduct />}
          <ProductList />
        </div>
      </main>
    </div>
  );
}
