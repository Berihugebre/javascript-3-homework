// docs: https://theysaidso.com/api/
function get_random() {
  /*
    send a get request to this url:
      http://quotes.rest/qod/random.json
    print the quote to the console
  */
  const xhr = new XMLHttpRequest();
  const url = 'http://quotes.rest/qod.json';
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      const response = JSON.parse(xhr.response);
      const randomQuote = response.contents.quotes[0].quote;
      console.log(randomQuote);
      const containerOne = document.getElementById('containerOne');
      const p = document.createElement('p');
      p.innerHTML = randomQuote;
      containerOne.appendChild(p);
    }
  };
  xhr.open('get', url);
  xhr.send();
}
document.getElementById('get-random').addEventListener('click', get_random);
function get_categories() {
  /*
    send a get request to this url:
      http://quotes.rest/qod/categories.json
    print the categories to the console using console.table
      https://developer.mozilla.org/en-US/docs/Web/API/Console/table
  */
  const xhr = new XMLHttpRequest();
  const url = 'http://quotes.rest/qod/categories.json';
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      const response = JSON.parse(xhr.response);
      const categories = response.contents.categories;
      console.table(categories);
      const containerTwo = document.getElementById('containerTwo');
      containerTwo.innerHTML = Object.keys(categories);
    }
  };
  xhr.open('get', url);
  xhr.send();
}
document.getElementById('get-categories').addEventListener('click', get_categories);

function get_from_category() {
  // read the category from user input
  // build your url
  /*
    get a random quote from the chosen category
    print the quote to the console
  */
  const userData = document.getElementById('category').value;
  const encoded = encodeURIComponent(userData);
  const url = 'http://quotes.rest/qod.json?category=' + encoded;
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      const response = JSON.parse(xhr.response);
      const result = response.contents.quotes[0].quote;
      console.log(result);
      const containerThree = document.getElementById('containerThree');
      containerThree.innerHTML = result;
    }
  };
  xhr.open('get', url);
  xhr.send();
}
document.getElementById('get-from-category').addEventListener('click', get_from_category);

function get_by_length() {
  // read the min & max lengths from user input
  // build your url
  /*
    get a random quote in the given range
    print the quote to the console
  */
  const miniValue = document.getElementById('min').value;
  const maxValue = document.getElementById('max').value;
  const miniEncoded = encodeURIComponent(miniValue);
  const maxEncoded = encodeURIComponent(maxValue);
  const url = ` https://quotes.rest/quote/random?minlength=${miniEncoded}&maxlength=${maxEncoded}`;
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      const response = JSON.parse(xhr.response);
      const result = response.contents.quotes[0].quote;
      const containerFour = document.getElementById('containerFour');
      containerFour.innerHTML = result;      
      }
  };
  xhr.open('get', url);
  xhr.send();
}
document.getElementById('get-by-length').addEventListener('click', get_by_length);
function length_and_category() {
  // read user input
  // build your url
  /*
    get a random quote matching the user input
    print the quote to the console
  */
  const userData = document.getElementById('category').value;
  const miniValue = document.getElementById('min').value;
  const maxValue = document.getElementById('max').value;
  const userEncoded = encodeURIComponent(userData);
  const miniEncoded = encodeURIComponent(parseFloat(miniValue));
  const maxEncoded = encodeURIComponent(parseFloat(maxValue));
  const url = `http://quotes.rest/qod.json?category=${userEncoded}&minlength=${miniEncoded}&maxlength=${maxEncoded}`;
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      const response = JSON.parse(xhr.response);
      console.log(response);
      const result = response.contents.quotes[0].quote;
      const containerFive = document.getElementById('containerFive');
      containerFive.innerHTML = result;
    }
  };
  xhr.open('get', url);
  xhr.send();
}
document.getElementById('length-and-category').addEventListener('click', length_and_category);
