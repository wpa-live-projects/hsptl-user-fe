// src/api/auth.js or wherever you store your frontend API calls

const API_URL = 'https://hsptl-user-be.onrender.com/api';

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return await response.json();
};

export const logoutUser = () => {
  localStorage.removeItem("user"); // simple logout
};
