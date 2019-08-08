const button = document.getElementById('btn');
button.addEventListener('click', getDogUrl);
function getDogUrl() {
  const xhr = new XMLHttpRequest();
  const url = 'https://dog.ceo/api/breed/cairn/images/random';
  xhr.responseType = 'json';
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      const response = xhr.response.message;
      const imageUrl = document.getElementById('dogs');
      imageUrl.src = response;
    }
  };
  xhr.open('get', url);
  xhr.send();
}
