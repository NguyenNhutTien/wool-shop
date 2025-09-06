import { useQuery } from '@tanstack/react-query';
import { productApi } from '@/lib/api';
import { ProductQuery } from '@/types';

export const useProducts = (query?: ProductQuery) => {
  return useQuery({
    queryKey: ['products', query],
    queryFn: () => productApi.getProducts(query),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productApi.getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => productApi.getTags(),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

export const useRelatedProducts = (productId: string, limit?: number) => {
  return useQuery({
    queryKey: ['relatedProducts', productId, limit],
    queryFn: () => productApi.getRelatedProducts(productId, limit),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
};
