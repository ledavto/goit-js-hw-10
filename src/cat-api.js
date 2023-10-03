import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://api.thecatapi.com/v1/';

const instance = axios.create();
axios.defaults.baseURL = BASE_URL;

axios.defaults.headers.common['x-api-key'] =
  'live_q0f7O1zpFYCLwEtRAEPlPq41gEIqmJ7E4HqeSMe2H2eQkgmN85txELlTKQq8z24d';

// Відправлення запросу на отримання ПОРІД котів
function fetchBreeds() {
  return axios
    .get(`breeds`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return 'Oops! Something went wrong! Try reloading the page!';
    });
}

// Очікує ідентифікатор породи, робить HTTP-запит і повертає проміс із даними про кота
function fetchCatByBreed(id) {
  return axios
    .get(`images/search?breed_ids=${id}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return 'Oops! Something went wrong! Try reloading the page!';
    });
}

export default { fetchBreeds, fetchCatByBreed };
