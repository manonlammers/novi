import * as API from './js/api'
import * as utils from './js/utils'

const formElement = document.getElementById('form');
const formInputElement = document.getElementById('form-input');
const infoElement = document.getElementById("info");
const countryElement = document.getElementById("country");

async function formSubmitHandler(event){
    event.preventDefault();
    const countryName = formInputElement.value;

    utils.clearElement(formInputElement);
    utils.clearElement(infoElement);
    utils.clearElement(countryElement);
    utils.setElementVisibility(countryElement, false);

    const country = await API.getCountryByName(countryName);
    if (country) {
        utils.renderHTMLForCountry(country);
    } else {
        infoElement.innerHTML = `No results found for "${countryName}", please try again`;
    }
}

async function app() {
    formElement.addEventListener('submit', formSubmitHandler);

    const countries = await API.getAllCountriesSortedByName();
    if (countries) {
        utils.renderHTMLForCountries(countries);
    }
}

app();



