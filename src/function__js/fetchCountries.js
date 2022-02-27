import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const listEl = document.querySelector(".country-list");
export const infoEl = document.querySelector(".country-info");


// todo FUNCTION
export const fetchCountries = (name) => {
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(responce => {
            if (responce.status === 404) {
                return error;
            }
            return responce.json();
        })
        .then(country => {
        if (country.length > 10) {
            Notify.info("Too many matches found. Please enter a more specific name!");
        }
        else if (country.length >= 2 && country.length < 10) {
            countryList(country);
        }
        else if (country.length === 1) {
            countryInfo(country);
        }
        //console.log(country)
        }) // country[0] - доступ к объекту
        .catch(error => Notify.failure("Oops, there is no country with that name!"));
};

const countryList = (countryName) => {
    let listCountryName = countryName.map((elem) => `<li><img src="${elem.flags.svg}" 
    alt="country flag">${elem.name.common}</li>`).join("");

    listEl.insertAdjacentHTML("beforeend", listCountryName);
};

const countryInfo = (countryName) => { 
    let infoCountryName = `<div><img src="${countryName[0].flags.svg}" 
    alt="country flag"><h1>${countryName[0].name.official}</h1></div>
    <ul><li><p>Capital: ${countryName[0].capital}</p></li>
    <li><p>Population: ${countryName[0].population}</p></li>
    <li><p>Languages: ${Object.values(countryName[0].languages).join(", ")}</p></li></ul>`

    infoEl.insertAdjacentHTML("beforeend", infoCountryName);
};
// todo