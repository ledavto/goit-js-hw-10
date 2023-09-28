function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds').then(response => {
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
          <options value =${cat.id}> ${cat.name}</options>
        `;
    })
    .join('');
  catList.innerHTML = markup;
}
