import { User } from "../interfaces";
import apiClient from "./api-client";

class UserService {
  getAllUsers() {
    const controller = new AbortController();
    const request = apiClient.get<User[]>("Users", {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }
}

export default new UserService();
