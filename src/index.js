import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

//import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

new SlimSelect({
  select: '#breed-select',
  // events: {
  //   afterChange: newVal => {
  //     console.log(newVal);
  //   },
  //},
});

// npm install axios
// npm install slim-select
// npm i notiflix

const catList = document.querySelector('.breed-select');
const elLoader = document.querySelector('.loader');
const elError = document.querySelector('.error');
const elInfo = document.querySelector('.cat-info');

fetchBreeds()
  .then(cats => {
    catList.style.display = 'inline';
    renderCatList(cats);
  })
  .catch(error => {
    elLoader.style.display = 'none';
    elInfo.style.display = 'none';
    Notiflix.Notify.failure(error);
  });

function renderCatList(cats) {
  const markup = cats
    .map(cat => {
      return `
          <option value="${cat.id}">${cat.name}</option>
        `;
    })
    .join('');
  catList.innerHTML = markup;
  elLoader.style.display = 'none';
  catList.style.display.remove;
}

catList.addEventListener('change', () => {
  elLoader.style.display = 'block';
  elInfo.style.display = 'none';
  fetchCatByBreed(catList.options[catList.selectedIndex].value)
    .then(catInfo => visibleCatInfo(catInfo))
    .catch(error => {
      elLoader.style.display = 'none';
      elInfo.style.display = 'none';
      Notiflix.Notify.failure(error);
    });
});

function visibleCatInfo(catInfo) {
  elInfo.style.display = 'flex';
  elLoader.style.display = 'none';
  if (document.querySelector('img')) document.querySelector('img').remove();
  const catInfoHtml = `<div><img src="${catInfo[0].url}" width="320" /></div>
                      <div><h1>${catInfo[0].breeds[0].name}</h1> <p>${catInfo[0].breeds[0].description}</p>
                      <p><b>Temperament: </b>${catInfo[0].breeds[0].temperament}</p></div>`;
  elInfo.innerHTML = catInfoHtml;
}

////////////////////////////////////////////////////////////////

// // Відправлення запросу на отримання ПОРІД котів
// function fetchBreeds() {
//   return axios
//     .get(`breeds`)
//     .then(function (response) {
//       catList.style.display = 'inline';
//       return response.data;
//     })
//     .catch(function (error) {
//       elLoader.style.display = 'none';
//       Notiflix.Notify.failure(
//         'Oops! Something went wrong! Try reloading the page!'
//       );
//     });
// }

// // function fetchBreeds() {
// //   return fetch(`${BASE_URL}breeds`).then(response => {
// //     if (!response.ok) {
// //       throw new Error(response.status);
// //     }
// //     return response.json();
// //   });
// // }

// // Очікує ідентифікатор породи, робить HTTP-запит і повертає проміс із даними про кота
// function fetchCatByBreed(id) {
//   return axios
//     .get(`images/search?breed_ids=${id}`)
//     .then(function (response) {
//       //console.log(response.data);
//       elInfo.style.display = 'block';
//       elLoader.style.display = 'none';
//       return response.data;
//     })
//     .catch(function (error) {
//       //elError.textContent = error.response.data;
//       elLoader.style.display = 'none';
//       Notiflix.Notify.failure(
//         'Oops! Something went wrong! Try reloading the page!'
//       );
//     });
// }
