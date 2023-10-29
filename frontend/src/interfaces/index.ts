export interface User {
  id?: number;
  name: string;
  email: string;
  mobile_number: string;
  password: string;
}

export interface Inventory {
  _id?: string;
  product_name: string;
  expire_date: string; 
  cost_price: number;
  selling_price: number;
  currency: string;
  description: string;
}

export interface ProductSale {
  _id?: number;
  product_id: string;
  product_name: string;
  sale_date: string;
  quantity: number;
  total_amount: number;
  currency: string;
  customer: string;
  selling_price: number;
}

export interface ISales {
  product_id: string;
  sales_date: string;
  quantity: number;
  currency: string;
  customer: string;
}