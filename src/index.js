import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './function__js/fetchCountries';
//import trim from 'lodash';

const DEBOUNCE_DELAY = 300;
let inputValue = null;

// **************************************************************

const inputEl = document.querySelector("#search-box");


const changeInput = (event) => {
    inputValue = event.target.value;

    fetchCountries(inputValue);
};





inputEl.addEventListener("input", debounce(changeInput, DEBOUNCE_DELAY));
