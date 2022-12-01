const URL = 'https://restcountries.com/v3.1';

export function fetchCountries(name) {
  return fetch(
    `${URL}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(respons => {
    return respons.json();
  });
}
