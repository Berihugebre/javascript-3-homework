   function view_all_handler() {
  // read user input
  // no user input

  // perform core logic
  const cities_entries = [];
  for (let key in cities) {
    cities.push(cities[key]);
  }
console.log(cities_entries)
  // show results to user
  const display_zone = document.getElementById("display-zone");
  while(display_zone.firstChild){
      display_zone.removeChild(display_zone.firstChild);
  }

  const cities_ul = document.createElement("ul");
  for (let city of cities_entries) {
    const next_li = document.createElement("li");
    cities_ul.innerHTML = city.id+": "+city.name;
    cities_ul.appendChild(next_li);
  }

  display_zone.appendChild(cities_ul);


  console.log("you viewed all citites");

}

const view_all_button = document.getElementById("view-all-cities");
view_all_button.addEventListener("click", view_all_handler);