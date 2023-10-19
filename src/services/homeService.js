import createApiClient from './api.service';

class HomeService {
  constructor(baseUrl = '/') {
    this.api = createApiClient(baseUrl);
  }
}

export default HomeService;