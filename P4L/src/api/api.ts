// api.js
import { Product } from './types'

const API_BASE_URL = 'http://db2.bedge.space:5000/api';

export const getProductById = async (id: number): Promise<Product | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Product/${id}`);
      console.log(`${API_BASE_URL}/Product/${id}`)
  
      if (response.ok) {
        const data: Product = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
        return null;
      }
    } catch (error) {
      console.error('Error:', 'Lỗi khi lấy dữ liệu');
      return null;
    }
  };