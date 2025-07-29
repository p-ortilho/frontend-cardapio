import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const getData = async () => {
  try {
    const response = await axios.get(API_URL + '/food');
    //console.log('Dados recebidos:', response.data);
    
    return response.data;
  } 
  catch (error) {
    console.error('Error get food data:', error);

    throw error;
  }
};

export const useFoodDate = () => {
  const query = useQuery({
    queryKey: ['foodData'],
    queryFn: getData,
    retry: 2,
    staleTime: 1000 * 60 * 2,
  });

  return {
    ...query,
    data: query.data || [],
  };
};
