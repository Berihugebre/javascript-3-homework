// --- data ---

var results = [];

// --- functions ---

function add(a, b) {
  return `the sum of ${a} and ${b} is : ${a + b}` ;
}
function subtract(a, b) {
  return `the difference of ${a} and ${b} is : ${a - b}` ;
}
function multiply(a, b) {
  return `the product of ${a} and ${b} is : ${a * b}` ;
}
function divide(a, b) {
  return `the quotient of ${a} and ${b} is : ${a / b}` ;
}

// --- handlers & listeners ---

// ---- add ----

function add_handler() {
  // read and process user input
  var first_str = document.getElementById('first-number').value;
  var second_str = document.getElementById('second-number').value;

  var first = Number(first_str);
  var second = Number(second_str);

  // pass user input through core logic
  var result = add(first, second);
  results.push({ first, second, op: 'add', result });

  // report result to user
  var output_field = document.getElementById('result');
  output_field.innerHTML = result;
}
var add_button = document.getElementById('add');
add_button.addEventListener('click', add_handler);

// ---- subtract ----
function subtract_handler() {
  // read and process user input
  var first_str = document.getElementById('first-number').value;
  var second_str = document.getElementById('second-number').value;

  var first = Number(first_str);
  var second = Number(second_str);

  // pass user input through core logic
  var result = subtract(first, second);
  results.push({ first, second, op: 'subtract', result });

  // report result to user
  var output_field = document.getElementById('result');
  output_field.innerHTML = result;
}

var subtract_button = document.getElementById('subtract');
subtract_button.addEventListener('click', subtract_handler);

// ---- multiply ---

function multiply_handler() {
  // read and process user input
  var first_str = document.getElementById('first-number').value;
  var second_str = document.getElementById('second-number').value;

  var first = Number(first_str);
  var second = Number(second_str);

  // pass user input through core logic
  var result = multiply(first, second);
  results.push({ first, second, op: 'multiply', result });

  // report result to user
  var output_field = document.getElementById('result');
  output_field.innerHTML = result;
}

var multiply_button = document.getElementById('multiply');
multiply_button.addEventListener('click', multiply_handler);

// --- divide ---

function divide_handler() {
  // read and process user input
  var first_str = document.getElementById('first-number').value;
  var second_str = document.getElementById('second-number').value;

  var first = Number(first_str);
  var second = Number(second_str);

  // pass user input through core logic
  var result = divide(first, second);
  results.push({ first, second, op: 'divide', result });

  // report result to user
  var output_field = document.getElementById('result');
  output_field.innerHTML = result;
}

var divide_button = document.getElementById('divide');
divide_button.addEventListener('click', divide_handler);

// --- last result ---

function results_handler() {
  // read and process user input
  // no user input to read
  // pass user input through core logic
  // no logic to do
  // report result to user
  console.log(results);
}

var results_button = document.getElementById('results');
results_button.addEventListener('click', results_handler);
