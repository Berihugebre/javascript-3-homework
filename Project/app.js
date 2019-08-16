const buttonOne = document.getElementById('btn-1');
buttonOne.addEventListener('click', getCountries);
const root = document.getElementById('root');
function getCountries() {
  const fetchAll = fetch('https://restcountries.eu/rest/v2/all');
  fetchAll.then(response => response.json())
  .then(function (country) {
    buttonOne.setAttribute('disabled' ,'');
    const select = createAndAppend('select', root, { id: 'countries', class : 'custom-select custom-select-sm' });
    for (let i = 0; i < country.length; i++){
      createAndAppend('option',select, {text:`${country[i].name}`, value: `${i}`})
      }
    const containerOne = createAndAppend('div', root , {class: "card"});
    const selector = document.getElementById('countries');
    selector.addEventListener('change', () => {
      while (containerOne.firstChild) {
        containerOne.removeChild(containerOne.firstChild);
      }
      const index = selector.value;
      const flags = createAndAppend('img', containerOne, { src: `${country[index].flag}` , class : 'card-img-top' }) 
      const aboutCountry = createAndAppend('p', containerOne,
        { class : 'card-text',
          text: `The selected Country is ${country[index].name}
                its Capitals city is ${country[index].capital}
                and it has population of ${country[index].population} peoples
                and its Bordering countries are ${country[index].borders}`
        })
  })

  }).catch(error => {
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