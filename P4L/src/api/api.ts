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

  export const getProductList = async (): Promise<Product[] | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Product/List`);
      
      if (response.ok) {
        const dataList: Product[] = await response.json();
        return dataList;
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
  

export const putProductByID = async (productId, updatedProductData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Product/${productId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json-patch+json',
        },
        body: JSON.stringify(updatedProductData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Product updated successfully:', data);
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };
  