import { useMutation, useQueryClient } from '@tanstack/react-query';
import { contactApi } from '@/lib/api';
import { CreateContactInput } from '@/types';
import toast from 'react-hot-toast';
import { TEXT } from '@/constants';

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contactData: CreateContactInput) => contactApi.createContact(contactData),
    onSuccess: (data) => {
      toast.success(data.message || TEXT.CONTACT.SUCCESS);
      // Invalidate and refetch contacts if needed
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || TEXT.ERROR.UNKNOWN;
      toast.error(message);
    },
  });
};
