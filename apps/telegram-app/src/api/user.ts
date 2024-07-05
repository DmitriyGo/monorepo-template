// import axios from 'axios';

class UserApiService {
  host = import.meta.env.VITE_API_URL;
}

export const UserApi = new UserApiService();
