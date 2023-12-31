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
    growingSeason: number;
    plantingDuration: number;
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
  product?: Product;
}

export interface Stock {
  id: number;
  status: number;
  productId: number;
  lastModified: string;
  count: number;
  description: string;
  product?: Product;
}

export interface Order {
  id: number;
  status: number;
  userId: number;
  timestamp: string;
  userPaymentMethodId: number;
  totalPrice: number;
  detail: OrderDetail[];
  cart_id: number[];

  "country": string,
  "province": string,
  "city": string,
  "ward": string,
  "street": string,
  "phoneNumber": string,
  "email": string,
  "extra": string
}

  export interface OrderDetail {
    id: number;
    status: number;
    orderId: number;
    productId: number;
    count: number;
    totalPrice: number;
  }

export interface PaymentMethod {
  id: number;
  user_id: number;
  cardNumber: number;
  cardOwner: string;
  cardExpiry: string;
  cardVerification: string;
}

export interface UserToRole {
  id: number;
  status: number;
  userId: number;
  roleId: number;
  role?: Role;
}

export interface Role {
  id: number;
  status: number;
  name: string;
  isAdmin: boolean;
  isStockManager: boolean;
}
