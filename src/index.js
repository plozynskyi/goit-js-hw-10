import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { getItemtemplateAll } from './items';
import { getItemtemplate } from './items';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countrySinglinfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

const clearCountryList = () => (refs.countryList.innerHTML = '');
const clearSingleCountryList = () => (refs.countrySinglinfo.innerHTML = '');

function onInput(e) {
  let name = refs.input.value.trim();

  if (name) {
    fetchCountries(name)
      .then(items => {
        if (items.length > Number(10)) {
          Notify.info(
            `Too many matches found. Please enter a more specific name.`,
            {
              timeout: 2000,
            }
          );
        } else
          items.length > Number(1)
            ? renderCountry(items)
            : renderSinglCountry(items);
      })
      .catch(onFechError);
  } else onFechError;

  clearCountryList();
  clearSingleCountryList();
}

function onFechError(error) {
  Notify.failure(`OOps, there is no country with that name`, {
    timeout: 2000,
  });
}

function renderCountry(items) {
  let list = items.map(getItemtemplateAll);

  clearCountryList();
  refs.countryList.insertAdjacentHTML('beforeend', list.join(''));
}

function renderSinglCountry(items) {
  let list = items.map(getItemtemplate);

  clearSingleCountryList();
  refs.countrySinglinfo.insertAdjacentHTML('beforeend', list.join(''));
}
