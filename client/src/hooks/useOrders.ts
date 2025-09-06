import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '@/lib/api';
import { CreateOrderInput } from '@/types';
import toast from 'react-hot-toast';
import { TEXT } from '@/constants';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: CreateOrderInput) => orderApi.createOrder(orderData),
    onSuccess: (data) => {
      toast.success(data.message || TEXT.ORDER.SUCCESS);
      // Invalidate and refetch orders if needed
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || TEXT.ERROR.UNKNOWN;
      toast.error(message);
    },
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderApi.getOrderById(orderId),
    enabled: !!orderId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};
