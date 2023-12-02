import axios from 'axios';
import authHeader from './auth-header';

const API_URL_USER_PROFILE = "http://db2.bedge.space:5000/api/user/self";

class UserService {
  getPublicContent() {
    return axios.get(API_URL_USER_PROFILE + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL_USER_PROFILE + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL_USER_PROFILE + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL_USER_PROFILE + 'admin', { headers: authHeader() });
  }
}

export default new UserService();