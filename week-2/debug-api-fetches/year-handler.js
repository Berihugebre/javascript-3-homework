// take not of each error you find
//  where was it?
//  how did you find it?
//  what was wrong?
//  how did you fix it?
/* 
    write error notes here
*/
function year_handler() {

  fetch("https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(movies_data) {
      // perform logic
      const all_movies = [];
      for (let key in movies_data) {
        all_movies.push({
          title: movies_data[key].title,
          year: movies_data[key].year,
        });
      }
      
      const sorted_by_year = all_movies.concat().sort((a, b) => a.year < b.year);
      
      // display result to user
      const movies_div = document.getElementById("movies-div");
      while(movies_div.firstChild){
          movies_div.removeChild(movies_div.firstChild);
      }

      const years_ul = document.createElement("ul");
      for (let movie of sorted_by_year) {
        const next_li = document.createElement("li");
        next_li.innerHTML = movie.year+": "+movie.title;
        years_ul.appendChild(next_li);
      }

      movies_div.appendChild(years_ul);


    })
    .catch(function(err) {
      console.error(err);
    })

}
var year_button = document.getElementById("year");
year_button.addEventListener("click", year_handler);
