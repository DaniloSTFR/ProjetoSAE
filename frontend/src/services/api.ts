
import InstanceApi from './InstanceApi';

async function api(){
  let instanceApi = await InstanceApi.getInstance();
  let apiContext = instanceApi.getApiContext();
  return apiContext
}

export default api;