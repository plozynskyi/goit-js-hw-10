import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const getItemtemplateAll = ({ name, capital, population, flags, languages }) =>
  `<li>
  <p>
    <span class="icon-flag">
      <img
        src="${flags.svg}"
        alt="${name.official}"
        width="30px"
        height="20px"
      /> </span
    >${name.official}
  </p>
  <p>Capital: ${capital}</p>
  <p>Population: ${population}</p>
  <p>Languages: ${Object.values(languages)}</p>
</li>
`;

const getItemtemplate = ({ name, flags }) =>
  `<li>
  <p>
    <span class="icon-flag">
      <img
        src="${flags.svg}"
        alt="${name.official}"
        width="30px"
        height="20px"
      /> </span
    >${name.official}
</li>
`;

const DEBOUNCE_DELAY = 300;
const URL = 'https://restcountries.com/v3.1';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function fetchCountry(inputCountryName) {
  return fetch(`${URL}/name/${inputCountryName}`).then(respons => {
    return respons.json();
  });
}

function onInput(e) {
  let inputCountryName = refs.input.value.trim();

  inputCountryName
    ? fetchCountry(inputCountryName)
        .then(items => {
          items.length > Number(10)
            ? Notify.failure(
                `Too many matches found. Please enter a more specific name.`,
                {
                  timeout: 2000,
                }
              )
            : renderCountry(items);
        })
        .catch(onFechError)
    : onFechError;

  refs.countryList.innerHTML = '';

  console.log(refs.input.value);
}
let items = [];

function renderCountry(items) {
  let list =
    items.length > Number(1)
      ? items.map(getItemtemplate)
      : items.map(getItemtemplateAll);

  refs.countryList.innerHTML = '';
  refs.countryList.insertAdjacentHTML('beforeend', list.join(''));
}

function onFechError(error) {
  Notify.failure(`OOps, there is no country with that name`, {
    timeout: 2000,
  });
}
