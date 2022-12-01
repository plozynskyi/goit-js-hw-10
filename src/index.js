import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { getItemTemplateAll } from './items';
import { getItemTemplate } from './items';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countrysList: document.querySelector('.country-list'),
  countrySinglInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

const clearCountryList = () => (refs.countrysList.innerHTML = '');
const clearSingleCountryList = () => (refs.countrySinglInfo.innerHTML = '');

function onInput(e) {
  let name = refs.input.value.trim();

  if (name) {
    fetchCountries(name)
      .then(items => {
        if (items.length > 10) {
          Notify.info(
            `Too many matches found. Please enter a more specific name.`,
            { timeout: 1000 }
          );
        } else
          items.length > 1 ? renderCountry(items) : renderSinglCountry(items);
      })
      .catch(onFechError);
  }

  clearCountryList();
  clearSingleCountryList();
}

function onFechError() {
  Notify.failure(`OOps, there is no country with that name`, { timeout: 1000 });
}

function renderCountry(items) {
  let listCountry = items.map(getItemTemplateAll);

  clearCountryList();
  refs.countrysList.insertAdjacentHTML('beforeend', listCountry.join(''));
}

function renderSinglCountry(items) {
  let listCountry = items.map(getItemTemplate);

  clearSingleCountryList();
  refs.countrySinglInfo.insertAdjacentHTML('beforeend', listCountry.join(''));
}
