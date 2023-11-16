export interface Tag {
  id: number;
  status: number;
  name: string;
};


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
    product_type: {
      id: number;
      status: number;
      name: string;
      description: string;
    }
    productTags: [
      Tag
    ]
  }
  