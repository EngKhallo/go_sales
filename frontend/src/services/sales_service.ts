import { ProductSale} from "../interfaces";
import apiClient from "./api-client";

class SalesService {
  getAllSales() {
    const controller = new AbortController();
    const request = apiClient.get<ProductSale[]>("/sales", {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }
}

export default new SalesService();
