import { Inventory } from "../interfaces";
import apiClient from "./api-client";

class HotelService {
  getAllInventories(filterValue?: string) {
    const controller = new AbortController();
    const params = filterValue ? { name: filterValue } : {};
    const request = apiClient.get<Inventory[]>("/inventory", {
      params,
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }
}

export default new HotelService();
