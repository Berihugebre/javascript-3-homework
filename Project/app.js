const buttonOne = document.getElementById('btn-1');
buttonOne.addEventListener('click', getCountries);
const loader = document.getElementById('loader');
const root = document.getElementById('root');

function getCountries () {
  loader.style ='display : inherit'
  fetch('https://restcountries.eu/rest/v2/all')
  .then(response => response.json())
  .then(function (countries) {
    loader.style = 'display : inherit';
    buttonOne.setAttribute('disabled' ,'');
    const select = createAndAppend('select', root, { id: 'countries'});
    for (let i = 0; i < countries.length; i++){
      createAndAppend('option',select, {text:`${countries[i].name}`, value: `${i}`})
    }
    loader.style = 'display : none';
    const containerOne = createAndAppend('div', root);
    const selector = document.getElementById('countries');
    selector.addEventListener('change', () => {
      loader.style = 'display : none';
      while (containerOne.firstChild) {
        containerOne.removeChild(containerOne.firstChild);
      }
      const index = selector.value;
      createAndAppend('img', containerOne, { src: `${countries[index].flag}` }) 
      createTable('Country', `${countries[index].name}`, containerOne);
      createTable('Capital City', `${countries[index].capital}`, containerOne);
      createTable('population', `${countries[index].population}`, containerOne);
      createTable(' Borders', `${countries[index].borders}` , containerOne);
  })
  }).catch(error => {
    loader.style = 'display : none';
    const errorMessage = new Error(`Network error : ${error.status} - ${error.statusText}`);
    createAndAppend('div', root, { text: `${errorMessage}` , style: 'color: red;'});
})
};

function createAndAppend (name, parent, options ={}) {
  const  elem = document.createElement(name);
  parent.appendChild(elem);
  const keys = Object.keys(options);
  keys.forEach(key => {
    const value = options[key];
    if (key === 'text') {
      elem.textContent = value;
    } else {
      elem.setAttribute(key, value)
    }
  })
  return elem
}

function createTable (tableHeader, tableData , parent) {
  const table = createAndAppend('table', parent, {class: 'table'});
  const tr = createAndAppend('tr', table);
  createAndAppend('th', tr, { text: `${tableHeader}`, scope: "col" });
  createAndAppend('td', tr, { text: `${tableData}` ,scope: "row"});
  return table; 
}
