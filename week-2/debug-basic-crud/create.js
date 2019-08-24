let next_id = 0;
const cities = [];
function add_city_handler() {
  // read user input
  const name_field = document.getElementById("city-name");
  const city_name = name_field.value;

  const country_field = document.getElementById("city-country");
  const city_country = country_field.value;

  const population_field = document.getElementById("city-population");
  const city_population_str = population_field.value;
  const city_population = Number(city_population_str);

  // perform core logic
  const new_city = {
    name: city_name,
    country: city_country,
    population: city_population
  }  
  cities[next_id] = new_city;
  next_id++;
  console.log(cities)

  // show results to user
  const display_zone = document.getElementById("display-zone");
  while(display_zone.firstChild){
      display_zone.removeChild(display_zone.firstChild);
  }

  const name_p = document.createElement("p");
  name_p.innerHTML = "NAME: <br>&nbsp;"+new_city.name;

  const country_p = document.createElement("p");
  country_p.innerHTML = "COUNTRY: <br>&nbsp;"+new_city.country;

  const pop_p = document.createElement("p");
  pop_p.innerHTML = "POPULATION: <br>&nbsp;"+new_city.population;

  const id_p = document.createElement("p");
  id_p.innerHTML = "DB ID: <br>&nbsp;"+new_city.id;

  display_zone.appendChild(name_p);
  display_zone.appendChild(country_p);
  display_zone.appendChild(pop_p);
  display_zone.appendChild(id_p);


  console.log("you created "+new_city.name);

}

const add_city_button = document.getElementById("create-city");
add_city_button.addEventListener("click", add_city_handler);