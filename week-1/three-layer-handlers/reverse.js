function reverse_string(str) {
  return str
    .split('')
    .reverse()
    .join('');
}
function reverse_handler() {
  // read and process user input
  var to_reverse = document.getElementById('to-reverse').value;
  // pass user input through core logic
  /* call your logic function to reverse a string */
  /* assign the result to a variable named 'reversed' */
  var reversed = reverse_string(to_reverse);
  // report result to user
  var output_field = document.getElementById('reversed');
  output_field.innerHTML = reversed;
}

var reverse_button = document.getElementById('reverse-it');
reverse_button.addEventListener('click', reverse_handler);
