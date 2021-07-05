// https://funtranslations.com/api/morse

// do what you did in "yodize.js", but for morse code
function morse() {
  const phrase = document.getElementById('to-morse').value;
  const encoded = encodeURIComponent(phrase);
  const url = 'https://api.funtranslations.com/translate/morse.json?text=' + encoded;
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      const response = JSON.parse(xhr.response);
      const morse = response.contents.translated;
      console.log(morse);
      const p = document.createElement('p');
      p.innerHTML = `your morse result is:  ${morse}`;
      const secondDiv = document.getElementsByTagName('div')[1];
      secondDiv.appendChild(p);
    }
  };

  xhr.open('get', url);
  xhr.send();
}
const button = document.getElementById('morse-it');
button.addEventListener('click', morse);
