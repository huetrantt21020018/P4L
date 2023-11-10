import axios from "axios";

const API_URL_LOGIN_REGISTER = "http://db2.bedge.space:5000/api/auth/";

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL_LOGIN_REGISTER + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL_LOGIN_REGISTER + "register", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();