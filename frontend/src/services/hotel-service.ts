import { Hotel } from "../interfaces";
import apiClient from "./api-client";

class HotelService {
  getAllHotels(filterValue?: string) {
    const controller = new AbortController();
    const params = filterValue ? { name: filterValue } : {};
    const request = apiClient.get<Hotel[]>("/Hotel/", {
      params,
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }
}

export default new HotelService();
