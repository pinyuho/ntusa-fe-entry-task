import axios from 'axios';
// import { authCon../store} from './user/constants';

const agent = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

// agent.interceptors.response.use(
//   res => res,
//   error => {
//     console.log(error.toString());
//     return Promise.reject(error);
//   }, // not 2xx
// );

export default agent;
