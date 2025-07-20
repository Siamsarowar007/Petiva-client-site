import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const Test = () => {
    const AxiosS =useAxios()
     const { data: searchResults = [], refetch, isLoading } = useQuery({
    queryKey: ["searchPosts"],
    
    queryFn: async () => {
      const res = await AxiosS.get(`/all-posts`);
      return res.data;
    },
    
  });
console.log(searchResults);

    return (
        <div>
            <h1>test Route</h1>
        </div>
    );
};

export default Test;