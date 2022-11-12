
import axios from 'axios';
import { BASE_URL } from 'utils/resquests';
import cookies from 'js-cookie';

async function api(){
  console.log(`Criando APi de contexto:\ntoken ${cookies.get('token')}`);
  const apiContext = await axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        'Authorization': `token ${cookies.get('token')}`
      }
  });
  return apiContext
}

export default api;