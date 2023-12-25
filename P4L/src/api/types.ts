export interface Tag {
  id: number;
  status: number;
  name: string;
}

export interface ProductThumbnail {
  id: number;
  status: number;
  productId: number;
  priority: number;
  url: string;
}

export interface ProductType {
  id: number;
  status: number;
  name: string;
  description: string;
}

export interface Product {
    id: number;
    status: string;
    productTypeId: number;
    name: string;
    description: string;
    climateDescription: string;
    yield: string;
    growingSeason: string;
    plantingDuration: string;
    price: number;
    productType: ProductType;
    productTags: Tag[];
    productThumbnails: ProductThumbnail[];
    stock: number;
  }

  export interface Cart {
    id: number;
    status: number;
    userId: number;
    productId: number;
    count: number;
    added: string;
  }

  export interface Order {
    id: number;
    status: number;
    userId: number;
    timestamp: string;
    userAddressId: number;
    userPaymentMethodId: number;
    totalPrice: number;
    detail: OrderDetail[];
    cart_id: number[];
  }

  export interface OrderDetail {
    id: number;
    status: number;
    orderId: number;
    productId: number;
    count: number;
    totalPrice: number;
  }
