import axios from "axios";

export class AuthService {
  static async login(username: string, password: string, email: string) {
    try {
      return await axios.post("https://chat-back-production-06c2.up.railway.app/api/v1/login", {
        username,
        password,
        email,
      });
    } catch (error) {
      console.error("Error during login request:", error);
    }
  }
  static async getUser() {
    return await axios.get("https://chat-back-production-06c2.up.railway.app/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
  }
  static async register(username: string, password: string, email: string) {
    try {
      return await axios.post("https://chat-back-production-06c2.up.railway.app/api/v1/register", {
        username,
        password,
        email,
      });
    } catch (error) {
      console.error("Error during register request:", error);
    }
  }
}
