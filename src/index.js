import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const getItemtemplate = ({ name, capital, population, flags, languages }) =>
  `<li>
  <p>
    <span class="icon-flag">
      <img
        src="${flags.svg}"
        alt="${name.official}"
        width="30px"
        height="20px"
      /> </span
    ><b>${name.official}
  </p>
  <p><b>Capital: ${capital}</p>
  <p><b>Population: ${population}</p>
  <p><b>Languages: ${languages}</p>
</li>
`;

const DEBOUNCE_DELAY = 300;
const URL = 'https://restcountries.com/v3.1';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault();
  let inputCountryName = refs.input.value;

  console.log(refs.input.value);

  fetchCountry(inputCountryName).then(renderCountry).catch(onFechError);
  // .finally(() => (refs.countryList.innerHTML = ''));

  function fetchCountry(inputCountryName) {
    return fetch(`${URL}/name/${inputCountryName}`).then(respons => {
      return respons.json();
    });
  }
}

function renderCountry(items) {
  let list = items.map(getItemtemplate);
  refs.countryList.innerHTML = '';
  refs.countryList.insertAdjacentHTML('beforeend', list.join(''));
}

function onFechError(error) {
  Notify.failure(`OOps, there is no country with that name`, {
    timeout: 2000,
  });
}
