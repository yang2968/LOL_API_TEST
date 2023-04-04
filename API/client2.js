import axios from 'axios';
import { BASE_URL2 } from '@env';

// create instance
const create = (config) => {
    const instance = axios.create(config);
    return instance;
}

const defaultConfig = {
  baseURL: BASE_URL2,
  withCredentials: true,
};

export const client2 = create(defaultConfig);