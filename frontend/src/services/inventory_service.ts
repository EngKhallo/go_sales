import { Inventory} from "../interfaces";
import apiClient from "./api-client";

class InventoryService {
  getAllInventories() {
    const controller = new AbortController();
    const request = apiClient.get<Inventory[]>("inventory", {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }
}

export default new InventoryService();
