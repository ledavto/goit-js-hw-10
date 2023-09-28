import 'cat-api';

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_q0f7O1zpFYCLwEtRAEPlPq41gEIqmJ7E4HqeSMe2H2eQkgmN85txELlTKQq8z24d';

const catList = document.querySelector('.breed-select');

console.log(
  fetchBreeds()
    .then(cats => renderCatList(cats))
    .catch(error => console.log(error))
);

// npm install axios
