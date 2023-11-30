// api.js
import { Product, Cart, Order } from './types'

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

  export const getOrderListAll = async (): Promise<Order[] | null> => {
    try {      
      const response = await fetch(`${API_BASE_URL}/Order/ListAll`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjkiLCJleHAiOjE3MDEzNTQwMTAsImlzcyI6Imlzc3VlciIsImF1ZCI6ImF1ZGllbmNlIn0.RSeNNF-fs8y_ORZWTjTx6XOX1pvFb1sGuNK24ztWsJk`,
        },
      });
  
      if (response.ok) {
        const dataList: Order[] = await response.json();
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
  
  export const putOrderById = async (orderId: number, newStatus: number): Promise<Order | null> => {
    try {
      const response = await fetch(`http://db2.bedge.space:5000/api/Order/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjkiLCJleHAiOjE3MDEzNTQwMTAsImlzcyI6Imlzc3VlciIsImF1ZCI6ImF1ZGllbmNlIn0.RSeNNF-fs8y_ORZWTjTx6XOX1pvFb1sGuNK24ztWsJk`,
        },
        body: JSON.stringify({
          status: newStatus,
          // Add other required fields as needed
        }),
      });
  
      if (response.ok) {
        const updatedOrder: Order = await response.json();
        return updatedOrder;
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
        return null;
      }
    } catch (error) {
      console.error('Error:', 'Failed to update order status', error);
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
  
  export const getCartList = async (): Promise<Cart[] | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Cart/List`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjkiLCJleHAiOjE3MDEzNTQwMTAsImlzcyI6Imlzc3VlciIsImF1ZCI6ImF1ZGllbmNlIn0.RSeNNF-fs8y_ORZWTjTx6XOX1pvFb1sGuNK24ztWsJk`, // Thêm mã thông báo truy cập vào header
        },
      });
  
      if (response.ok) {
        const dataList: Cart[] = await response.json();
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

  export const postNewCart = async (accessToken) => {
    console.log("inside post new cart");
    try {
      const requestBody = {
        id: 0,
        status: 0,
        userId: 0,
        productId: 0,
        count: 0,
        added: "2023-11-30T08:14:30.839Z",
      };
  
      const response = await fetch(`${API_BASE_URL}/Cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json-patch+json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const newCart = await response.json();
        return newCart;
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
        return errorData;
      }
    } catch (error) {
      console.error('Error:', 'Error creating new cart');
      return null;
    }
  };