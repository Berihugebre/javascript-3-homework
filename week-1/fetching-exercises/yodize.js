// docs: https://funtranslations.com/api/yoda

function yodize() {
  const phrase = document.getElementById('to-yodize').value;

  const encoded = encodeURIComponent(phrase);
  const url = 'https://api.funtranslations.com/translate/yoda.json?text=' + encoded;
  /*
    use fetch to send a get request to the url above
    then log only the translated phrase
  */
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      const response = JSON.parse(xhr.response);
      const yodized = response.contents.translated;
      console.log(yodized);
      const p = document.createElement('p');
      p.innerHTML = `your Yodizided result is:  ${yodized}`;
      const firstDiv = document.getElementsByTagName('div')[0];
      firstDiv.appendChild(p);
    }
  };
  xhr.open('get', url);
  xhr.send();
}
document.getElementById('yodize').addEventListener('click', yodize);
