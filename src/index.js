//import fetchBreeds from "/src/cat-api.js";
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_q0f7O1zpFYCLwEtRAEPlPq41gEIqmJ7E4HqeSMe2H2eQkgmN85txELlTKQq8z24d';

const catList = document.querySelector('.breed-select');
const elLoader = document.querySelector('.loader');
const elError = document.querySelector('.error');
const elInfo = document.querySelector('.cat-info');

elError.style.display = 'none';

const BASE_URL = 'https://api.thecatapi.com/v1/';

fetchBreeds()
  .then(cats => renderCatList(cats))
  //.then(cats => console.log(cats))
  .catch(error => console.log(error));

// npm install axios

function fetchBreeds() {
  return fetch(`${BASE_URL}breeds`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

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
}

function fetchCatByBreed(id) {
  return fetch(`${BASE_URL}images/search?breed_ids=${id}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

catList.addEventListener('change', () => {
  fetchCatByBreed('aege')
    .then(catId => visibleCatInfo(catId))
    .catch(error => console.log(error));
});

function visibleCatInfo(catId) {
  console.log(catId);
  //const catInfoHtml = `<img src="${catId[0].url}" widgth="${catId[0].width}" height="${catId[0].height}" />`;
  if (document.querySelector('img')) document.querySelector('img').remove();
  const catInfoHtml = `<img src="${catId[0].url}" width="320" />
                      <div><h1>${
                        catList.options[catList.selectedIndex].textContent
                      }</h1></div>`;

  elInfo.innerHTML = catInfoHtml;
}
