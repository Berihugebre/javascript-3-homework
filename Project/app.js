const buttonOne = document.getElementById('btn-1');
buttonOne.addEventListener('click', getCountries);
const loader = document.getElementById('loader');
const root = document.getElementById('root');
createAndAppend('select',root, {id:'countries'})
const selector = document.getElementById('countries');
const containerOne = createAndAppend('div', root);
let allCountries = [];
function fetchJSON (url) {
 return fetch(url).then(response => response.json())
    .then(data => data);
}
console.log(fetchJSON('https://pokeapi.co/api/v2/pokemon/'));

function getCountries() {
  loader.style = 'display : inherit';
  fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(function(countries) {
      allCountries = countries;
      loader.style = 'display : inherit';
      buttonOne.setAttribute('disabled', '');
      for (let i = 0; i < countries.length; i++) {
        createAndAppend('option', selector, { text: `${countries[i].name}`, value: `${i}` });
      }
      loader.style = 'display : none';
    })
    .catch(error => {
      loader.style = 'display : none';
      const errorMessage = new Error(`Network error : ${error.status} - ${error.statusText}`);
      createAndAppend('div', root, { text: `${errorMessage}`, style: 'color: red;' });
    });
}

selector.addEventListener('change', () => {
  loader.style = 'display : none';
  while (containerOne.firstChild) {
    containerOne.removeChild(containerOne.firstChild);
  }
  const index = selector.value;
  const selectedCountry = allCountries[index];    
  createAndAppend('img', containerOne, { src: `${selectedCountry.flag}` });
  createTable('Country', `${selectedCountry.name}`, containerOne);
  createTable('Capital City', `${selectedCountry.capital}`, containerOne);
  createTable('population', `${selectedCountry.population}`, containerOne);
  createTable(' Borders', `${selectedCountry.borders}`, containerOne);
});

function createAndAppend(name, parent, options = {}) {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  const keys = Object.keys(options);
  keys.forEach(key => {
    const value = options[key];
    if (key === 'text') {
      elem.textContent = value;
    } else {
      elem.setAttribute(key, value);
    }
  });
  return elem;
}

function createTable(tableHeader, tableData, parent) {
  const table = createAndAppend('table', parent, { class: 'table' });
  const tr = createAndAppend('tr', table);
  createAndAppend('th', tr, { text: `${tableHeader}`, scope: 'col' });
  createAndAppend('td', tr, { text: `${tableData}`, scope: 'row' });
  return tr;
}
