import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './files_js/fetchCountries';

const DEBOUNCE_DELAY = 300;

// * Variables
const inputEl = document.querySelector("#search-box");
const listEl = document.querySelector(".country-list");
const infoEl = document.querySelector(".country-info");




// todo FUNCTION


const changeInput = (event) => {
    listEl.innerHTML = "";
    infoEl.innerHTML = "";
    let inputValue = event.target.value.trim();

    if (inputValue === "") {
        return    
    };

    funcForPromise(inputValue); 
};


const funcForPromise = (name) => {
    fetchCountries(name)
        .then(country => {
        if (country.status === 404) {
                return error;
            }
            
        if (country.length > 10) {
            Notify.info("Too many matches found. Please enter a more specific name!");
            }
        else if (country.length >= 2 && country.length < 10) {
            countryList(country);
            }
        else if (country.length === 1) {
            countryInfo(country);
            }
        })  // country[0] - доступ к объекту
        .catch(error => Notify.failure("Oops, there is no country with that name!"));
};

const countryList = (countryName) => {
    let listCountryName = countryName.map((elem) => `<li><img src="${elem.flags.svg}" 
    alt="country flag">${elem.name}</li>`).join(""); // name.common

    listEl.insertAdjacentHTML("beforeend", listCountryName);
};

const countryInfo = (countryName) => { 
    console.log(countryName)
    let infoCountryName = countryName.map((elem) => `<div><img src="${elem.flags.svg}" 
    alt="country flag"><h1>${elem.name}</h1></div>
    <ul><li><p>Capital: ${elem.capital}</p></li>
    <li><p>Population: ${elem.population}</p></li>
    <li><p>Languages: ${elem.languages.map((minEl) => minEl.name).join(", ")}</p></li></ul>`);

    infoEl.insertAdjacentHTML("beforeend", infoCountryName);
};


inputEl.addEventListener("input", debounce(changeInput, DEBOUNCE_DELAY));
