import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
console.log('API_URL:', API_URL); // Debug log

export const api = axios.create({
  baseURL: API_URL || 'https://pixelpress.onrender.com', // Fallback URL
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

interface CompressionResponse {
  originalSize: number;
  compressedSize: number;
  compressionRatio: string;
  compressedImage: string;
}

export const compressImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    console.log('Making request to:', `${API_URL}/compress`); // Debug log
    const response = await api.post<CompressionResponse>('/compress', formData);
    
    // Convert base64 to blob
    const imageBlob = await fetch(`data:image/jpeg;base64,${response.data.compressedImage}`).then(res => res.blob());

    return {
      originalSize: response.data.originalSize,
      compressedSize: response.data.compressedSize,
      compressionRatio: response.data.compressionRatio,
      imageBlob
    };
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};
