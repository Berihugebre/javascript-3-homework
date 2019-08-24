// take not of each error you find
//  where was it? line 21, 36, 39
//  how did you find it?
//  what was wrong? title was undefined 
//  how did you fix it?
/* 
    write error notes here
*/
function rating_handler () {

  fetch("https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json")
    .then(function(response) {
      return response.json();
    })
    .then(function (movies_data) {
      // perform logic
      const all_movies = [];
      for (let key in movies_data) {
        all_movies.push({
          rating: movies_data[key].rating,
          title: movies_data[key].title,
        });
      }
      
      const sorted_by_rating = all_movies.concat().sort((a, b) => a.rating < b.rating);

      // display result to user
      const movies_div = document.getElementById("movies-div");
      while(movies_div.firstChild){
          movies_div.removeChild(movies_div.firstChild);
      }
      const rating_ul = document.createElement('ul');
      for (let movie of sorted_by_rating) {
        const next_li = document.createElement("li");
        next_li.innerHTML = movie.rating+": "+movie.title;
        rating_ul.appendChild(next_li);
      }

      movies_div.appendChild(rating_ul);


    })
    .catch(function(err) {
      console.error(err);
    })

}
var rating_button = document.getElementById("rating");
rating_button.addEventListener("click", rating_handler);
