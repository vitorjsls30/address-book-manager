import axios from 'axios';

const baseURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/';
let instance = null;

const getInstance = () => {
  if (instance) {
    return instance;
  }
  instance = axios.create({
    baseURL,
    timeout: 1000
  });
  return instance;
}

export default getInstance();