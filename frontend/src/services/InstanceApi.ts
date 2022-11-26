
import axios from 'axios';
import { BASE_URL } from 'utils/resquests';
import cookies from 'js-cookie';

export default class InstanceApi {

    static instance:any = null;
    _apiContext:any;

    /**
     * @returns {InstanceApi}
     */
    static async getInstance(){
        if (InstanceApi.instance === null) {
            InstanceApi.instance = new InstanceApi();
            await InstanceApi.instance.createInstance();
        }
        return this.instance;
    }

    async createInstance(){
        console.log("Creating Instance");
        const apiContext = await axios.create({
            baseURL: `${BASE_URL}`,
            headers: {
                'Authorization': `token ${cookies.get('token')}`
              }
          });
        this._apiContext = apiContext;
    }

    getApiContext() {
        return this._apiContext;
    }

    setApiContext(api:any) {
        this._apiContext = api;
    }

}