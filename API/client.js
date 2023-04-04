import axios from 'axios';
import { BASE_URL } from '@env';

// create instance
const create = (config) => {
    const instance = axios.create(config);
    return instance;
}

const defaultConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
};

export const client = create(defaultConfig);