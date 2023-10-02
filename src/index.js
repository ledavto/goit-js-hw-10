//import fetchBreeds from "/src/cat-api.js";
import axios from 'axios';
import SlimSelect from 'slim-select'

new SlimSelect({
  select: '#selectElement'
})

const BASE_URL = 'https://api.thecatapi.com/v1/';

const instance = axios.create();
axios.defaults.baseURL = BASE_URL;

axios.defaults.headers.common['x-api-key'] =
  'live_q0f7O1zpFYCLwEtRAEPlPq41gEIqmJ7E4HqeSMe2H2eQkgmN85txELlTKQq8z24d';

const catList = document.querySelector('.breed-select');
const elLoader = document.querySelector('.loader');
const elError = document.querySelector('.error');
const elInfo = document.querySelector('.cat-info');

elError.style.display = 'none';
//catList.style.display = 'none;'


fetchBreeds()
  .then(cats => renderCatList(cats))
  //.then(cats => console.log(cats))
  .catch(error => console.log(error));

// npm install axios
// npm install slim-select

function fetchBreeds() {
  return axios.get(`breeds`).then(function (response){
    // if (!response.ok) {
    //   throw new Error(response.status);
    // }
    //console.log(response.data);
    return response.data;
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

function renderCatList(cats) {
  const markup = cats
    .map(cat => {
      return `
          <option value="${cat.id}">${cat.name}</option>
        `;
    })
    .join('');
  //console.log(markup);
  catList.innerHTML = markup;
  elLoader.style.display = 'none';
  catList.style.display.remove;
}

function fetchCatByBreed(id) {
  return axios.get(`images/search?breed_ids=${id}`).then(function (response){

    console.log(response.data);
    return response.data;
  });
}

catList.addEventListener('change', () => {
  fetchCatByBreed(catList.options[catList.selectedIndex].value)
    .then(catInfo =>visibleCatInfo(catInfo)
    )
    .catch(function (error) { 
      elError.textContent = error.response.data;
    });
});

function visibleCatInfo(catInfo) {
  console.log(catInfo[0].url);
  console.log(catInfo[0].breeds[0].description);
  console.log(catInfo[0].breeds[0].temperament);
  if (document.querySelector('img')) document.querySelector('img').remove();
  const catInfoHtml = `<img src="${catInfo[0].url}" width="320" />
                      <div><h1>${
                        catInfo[0].breeds[0].name
    }</h1></div> <p>${catInfo[0].breeds[0].description}</p> 
                      <p><b>Temperament: </b>${catInfo[0].breeds[0].temperament}</p>`;
  elInfo.innerHTML = catInfoHtml;
}
