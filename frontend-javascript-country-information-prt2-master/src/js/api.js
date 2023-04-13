import axios from 'axios';

const API_BASE_URL = `https://restcountries.com/v2`;

export async function getCountryByName(name){
    try {
        const response = await axios.get(`${API_BASE_URL}/name/${name}?fullText=true`);
        const countries = response.data;
        return countries[0];
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function getAllCountriesSortedByName() {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`);
        const countries = response.data;

        // sorteer de huidige data array op de populatie-property van elk land
        countries.sort((a, b) => {
            return a.population - b.population;
        });

        return countries;
    } catch (e) {
        console.error(e);
        return null;
    }
}