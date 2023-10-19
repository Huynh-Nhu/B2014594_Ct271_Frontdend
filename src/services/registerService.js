import createApiClient from './api.servce';

class registerService {
  constructor(baseUrl = '/reg') {
    this.api = createApiClient(baseUrl);
  }

  async create (data){
    return (await this.api.post('/create', data)).data;
  }
}

export default registerService;