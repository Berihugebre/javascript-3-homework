// docs: https://theysaidso.com/api/

function get_random() {
  /*
    send a get request to this url:
      http://quotes.rest/qod/random.json
    print the quote to the console
  */
  const xhr = new XMLHttpRequest();
  const url = 'http://quotes.rest/qod/random.json';
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      const response = JSON.parse(xhr.response);
      console.log(response);
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
      console.log(response);
      const categories = response.contents.categories;
      console.table(categories);
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
  const url = 'http://quotes.rest/qod.json?category=' + userData;
}
document.getElementById('get-from-category').addEventListener('click', get_from_category);

function get_by_length() {
  // read the min & max lengths from user input
  // build your url
  /*
    get a random quote in the given range
    print the quote to the console
  */
}
document.getElementById('get-by-length').addEventListener('click', get_by_length);

function length_and_category() {
  // read user input
  // build your url
  /*
    get a random quote matching the user input
    print the quote to the console
  */
}
document.getElementById('length-and-category').addEventListener('click', length_and_category);
