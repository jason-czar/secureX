import api from './api';

const INSTAGRAM_CLIENT_ID = import.meta.env.VITE_INSTAGRAM_CLIENT_ID;
const INSTAGRAM_REDIRECT_URI = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI;

export const initiateInstagramAuth = () => {
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  window.location.href = authUrl;
};

export const exchangeCodeForToken = async (code: string) => {
  try {
    const { data } = await api.post('/instagram/exchange-token', { code });
    return data;
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    throw error;
  }
};