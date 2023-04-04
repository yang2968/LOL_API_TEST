import axios from 'axios';
import { DATA_URL } from '@env';

// create instance
const create = (config) => {
    const instance = axios.create(config);
    return instance;
}

const defaultConfig = {
  baseURL: DATA_URL,
  withCredentials: true,
};

export const dataClient = create(defaultConfig);