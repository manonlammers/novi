/**
 * Renders list item elements for each country inside its root element (id="country-list")
 * using html structure down below.
 *
 * To avoid the root element from being initially rendered empty
 * we only mark it as visible to the users only once all elements have been rendered.
 *
 *  <li class="country-list-item">
 *      <img src=country.flag>
 *      <span class=country.region(class represitation)>country.country</span>
 *      <p class="population">Has a population of country.population people</p>
 *  </li>
 *
 * @param countries:[] list of countries to be rendered
 */
export function renderHTMLForCountries(countries = {  }) {
    const rootElement = document.getElementById('country-list');

    countries.forEach((country) => {
        const listItemElement = document.createElement('li');
        listItemElement.setAttribute('class', 'country-list-item')

        const flagElement = document.createElement('img');
        flagElement.setAttribute('src', country.flag);
        listItemElement.appendChild(flagElement);

        const nameElement = document.createElement('span');
        nameElement.textContent = country.name;
        nameElement.setAttribute('class', getRegionClassName(country.region))
        listItemElement.appendChild(nameElement);

        const populationElement = document.createElement('p');
        populationElement.textContent = `Has a population of ${country.population} people`;
        listItemElement.appendChild(populationElement);

        rootElement.appendChild(listItemElement);
    });

    setElementVisibility(rootElement);
}

/**
 * Renders html for a single country inside its root element (id="country")
 * using html structure down below.
 *
 * To avoid the root element from being initially rendered empty
 * we only mark it as visible to the users only once all elements have been rendered.
 *
 *  <div id="country-header">
 *      <img src="country.flag" />
 *      <h2>country.name</h2>
 *  </div>
 *  <p>country info line 1</p>
 *  <p>country info line 2</p>
 *  <p>country info line 3</p>
 *
 * @param country:{} the country used to render it's content
 */
export function renderHTMLForCountry(country) {
    const rootElement = document.getElementById('country');
    rootElement.innerHTML = null;

    const headerElement = document.createElement('div');
    headerElement.setAttribute('id', 'country-header');
    rootElement.appendChild(headerElement);

    const headerFlagElement = document.createElement('img');
    headerFlagElement.setAttribute('src', country.flag);
    headerElement.appendChild(headerFlagElement);

    const headerTitleElement = document.createElement('h2');
    headerTitleElement.textContent = country.name;
    headerElement.appendChild(headerTitleElement);

    const textElement1 = document.createElement('p');
    textElement1.textContent = `${country.name} is situated in ${country.subregion}. It has a population of ${country.population} people`;
    rootElement.appendChild(textElement1);

    const textElement2 = document.createElement('p');
    const currenciesString = country.currencies.map(c => `${c.name}'s`).join(', ');
    textElement2.textContent = `The capital is ${country.capital} and you can pay with ${currenciesString}`;
    rootElement.appendChild(textElement2);

    const textElement3 = document.createElement('p');
    const languagesString = country.languages.map(l => `${l.name}`).join(', ').replace(/, ([^,]*)$/, ' and $1');
    textElement3.textContent = `They speak ${languagesString}`;
    rootElement.appendChild(textElement3);

    setElementVisibility(rootElement, true);
}

function getRegionClassName(region) {
    switch (region) {
        case 'Africa':
            return 'blue';
        case 'Americas':
            return 'green';
        case 'Asia':
            return 'red';
        case 'Europe':
            return 'yellow';
        case 'Oceania':
            return 'purple';
        default:
            return 'default';
    }
}

export function clearElement(element) {
    element.value = null;
    element.innerHTML = null;
}

export function setElementVisibility(element, isVisible = true) {
    if (isVisible) {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}
