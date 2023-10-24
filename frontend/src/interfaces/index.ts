export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}
export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

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

export interface Sales {
  product_id: string;
  sales_date: string;
  quantity: number;
  currency: string;
  customer: string;
}

export interface Room {
  id: number;
  type: string;
  price: number;
  hotelName: string;
  hotelId: number;
  roomNumber: string;
  floorNumber: number;
  maximumOccupancy: number;
  bedConfiguration: string;
}

export interface Booking {
  id: number;
  transactionId: number | null;
  userId?: number;
  name?: string;
  checkIn: string;
  checkOut: string;
  roomId: number;
  roomName?: string;
  hotelId: number;
  hotelName: string;
  paymentMethod: string;
  duration?: string;
  roomPrice?: number;
  totalCost?: number;
  commission?: number;
  hotelRevenue?: number;
  status?: string;
}

export interface AddBookingDto {
  hotelId: number;
  roomId: number;
  userId: number;
  checkIn: string;
  checkOut: string;
  paymentMethod: string;
}

// export interface HotelData {
//   data: Hotel[];
//   success: boolean;
//   message: string;
// }
export interface RoomData {
  data: Room[];
  success: boolean;
  message: string;
}
export interface BookingData {
  data: Booking[];
  success: boolean;
  message: string;
}
