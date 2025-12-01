import { Filters } from '@/types';
import { Product } from '@/types/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], Filters | undefined>({
      query: (filters?: Filters) => {
        const params = new URLSearchParams();

        if (filters?.category && filters.category.length > 0) {
          params.set('category', filters.category.join(','));
        }

        if (filters?.search) params.set('search', filters.search);
        if (filters?.sortBy) params.set('sortBy', filters.sortBy);

        if (filters?.minPrice !== undefined && !isNaN(filters.minPrice)) params.set('minPrice', filters.minPrice.toString());
        if (filters?.maxPrice !== undefined && !isNaN(filters.maxPrice)) params.set('maxPrice', filters.maxPrice.toString());

        return `/api/products/list?${params.toString()}`;
      },
      providesTags: ['Products'],
    }),
    getProductBySlug: builder.query<Product, string>({ query: (slug) => `/api/products/slug?slug=${slug}` }),
    getProductRecommendations: builder.query<Product[], { category: string; id: string }>({ query: ({ category, id }) => `/api/products/recommendations?category=${category}&id=${id}` }),
    addProduct: builder.mutation<Product, Product>({
      query: (product) => ({ url: '/api/products/create', method: 'POST', body: product }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: (product) => ({ url: '/api/products/update', method: 'PATCH', body: product }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({ url: `/api/products/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useGetProductRecommendationsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
