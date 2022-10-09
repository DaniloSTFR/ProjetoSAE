
import axios from 'axios';
import { BASE_URL } from 'utils/resquests';
import cookies from 'js-cookie';

console.log(cookies.get('token'));

const api = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
      'Authorization': `token ${cookies.get('token')}`
    }
});
export default api;