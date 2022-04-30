import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/auth/";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "login/", {email, password})
      .then((response) => {
        if (response.data.key) {
          localStorage.setItem("access_key", JSON.stringify(response.data.key));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("access_key");
  }

  register(email: string, password1: string, password2: string) {
    return axios.post(API_URL + "register/", {
      email,
      password1,
      password2,
    });
  }
}

export default new AuthService();
