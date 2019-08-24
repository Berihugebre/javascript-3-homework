class Countries {
  name = null;
  flag = null;
  population = null;
  borders = null;
  capital = null;
  
  constructor(data) {
    this.name = data.map(element =>element.name);
    this.capital = data.map(element => element.capital);
    this.flag = data.map(element => element.flag);
    this.population = data.map(element => element.population);
    this.borders = data.map(element => element.borders);
  } 
}