import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const postData = async (data) => {
  try {
    const response = await axios.post(API_URL + '/food', data);
    //console.log('Dados enviados:', response.data);
    return response.data;
  } 
  catch (error) {
    //console.error('Error posting food data:', error);
    throw error;
  }
};

export const useFoodDateMutate = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    retry: 2,
    onSuccess: () => {
      //console.log('Data posted successfully');
      queryClient.invalidateQueries({ queryKey: ['foodData'] });
    },
  });

  return mutate;
};
