{
  const get = function (url, success, error) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          success(xhr.responseText);
        } else {
          error(xhr);
        }
      }
    }
    xhr.open('GET', url, true);
    xhr.send();
  }
  const getUsers =  get('https://jsonplaceholder.typicode.com/users',
      function (response) {
        console.log(JSON.parse(response))
      },
      function (xhr) {
        console.log(xhr);
      }  
  )
  const UsingFetch = fetch('https://jsonplaceholder.typicode.com/users')
    .then(function (data) {
      console.log('test', data)
    })
}