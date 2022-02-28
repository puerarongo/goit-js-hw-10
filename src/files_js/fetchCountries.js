export const fetchCountries = (name) => {
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
        .then(responce => responce.json())
        .catch(error => error)
};