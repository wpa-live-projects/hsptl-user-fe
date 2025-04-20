const API_URL = 'https://hsptl-user-be.onrender.com/api';

export const getDashboardStats = async () => {
  const response = await fetch(`${API_URL}/stats`, {
    credentials: 'include'
  });
  if (!response.ok) throw new Error('Failed to fetch stats');
  return await response.json();
};