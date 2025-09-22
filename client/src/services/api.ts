import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const compressImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post('/compress', formData, {
      responseType: 'blob',
    });

    return response.data;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};