{
  'use strict'
  const get_countries_button = document.getElementById('get_countries');
  const display_zone = document.getElementById('display_zone');
  const loader = document.getElementById('loading');
  const selector = document.getElementById('listOfCountries');
  selector.style.display = 'none';
  let countriesList = null;
  function getCountries () {
    try {
      loader.style.display = 'block';
      return  fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then(function (response) {
          countriesList = response;
          const countries = new Countries(countriesList);
          loader.style.display = 'none';
          selector.style.display = 'block';
          get_countries_button.setAttribute('disabled', '');
          console.log(countries);
          for (let i = 0; i < countries.name.length; i++){
            createAndAppend('option', selector, {text: `${countries.name[i]}`, value:`${i}`})
          }     
        })
    } catch (error) {
      loader.style.display = 'none';
      get_countries_button.setAttribute('disabled', '');
      createAndAppend('p', display_zone, {text: `${error.message}`, style:'color: red;'})
      }
  }
  selector.addEventListener('change', selectorHandler);
  function selectorHandler () {
    loader.style.display = 'inherit';
    while (display_zone.firstChild) {
      display_zone.removeChild(display_zone.firstChild);
    }
    loader.style.display = 'none';
    const index = selector.value;
    const selectedCountry = countriesList[index]; 
    createAndAppend('img', display_zone, { src: `${selectedCountry.flag}` })
    createAndAppend('h5', display_zone, { text: `Information About ~ ${selectedCountry.name} ~ ` });
    createAndAppend('p', display_zone, { text: `Its Capital City is: ${selectedCountry.capital}` });
    createAndAppend('p', display_zone, { text: `It has a population of : ${selectedCountry.population} people` });
    const borderingCountries = selectedCountry.borders.map(borderCode => countriesList
      .find(code => code.alpha3Code === borderCode).name)
      if (borderingCountries) {
        createAndAppend('p', display_zone, { text: `Its Bordering Countries are: ${borderingCountries}` })   
      } else {
        createAndAppend('p', display_zone, {text: `It has no Bordering Countries`})
      }
  }
  get_countries_button.addEventListener('click', getCountries);
}