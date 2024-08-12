import { useState } from 'react';
import * as api from '../utils/api';

function useGithubData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async (username: string) => {
    setLoading(true);
    try {
      const userData = await api.fetchUserData(username);
      setData(userData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setLoading(false);
  };

  return {
    data,
    loading,
    fetchUserData,
  };
}

export default useGithubData;
