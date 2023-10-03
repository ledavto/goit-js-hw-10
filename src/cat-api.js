import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://api.thecatapi.com/v1/';

const instance = axios.create();
axios.defaults.baseURL = BASE_URL;

axios.defaults.headers.common['x-api-key'] =
  'live_q0f7O1zpFYCLwEtRAEPlPq41gEIqmJ7E4HqeSMe2H2eQkgmN85txELlTKQq8z24d';

// Відправлення запросу на отримання ПОРІД котів
function fetchBreeds(catList, elLoader) {
  return axios
    .get(`breeds`)
    .then(function (response) {
      catList.style.display = 'inline';
      return response.data;
    })
    .catch(function (error) {
      elLoader.style.display = 'none';
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

// function fetchBreeds() {
//   return fetch(`${BASE_URL}breeds`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// Очікує ідентифікатор породи, робить HTTP-запит і повертає проміс із даними про кота
function fetchCatByBreed(id, catList, elLoader) {
  return axios
    .get(`images/search?breed_ids=${id}`)
    .then(function (response) {
      //console.log(response.data);
      elInfo.style.display = 'block';
      return response.data;
    })
    .catch(function (error) {
      //elError.textContent = error.response.data;
      elLoader.style.display = 'none';
      //elError.style.display = 'inline';
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

export { fetchBreeds, fetchCatByBreed };
