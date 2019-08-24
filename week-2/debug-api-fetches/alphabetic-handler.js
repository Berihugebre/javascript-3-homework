// take not of each error you find
//  where was it?
    // line 13 , 32  and 34
//  how did you find it?
    // console.log of all_movies and next_li was not used 
//  what was wrong?
   // movies data was not an array
//  how did you fix it?
/* 
    write error notes here
*/
function alphabetic_handler() {

  fetch("https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json")
    .then(Response => Response.json())
    .then(function (movies_data) {
      // perform logic
      const all_movies = [];
      for (let key in movies_data) {
        all_movies.push({
          title: movies_data[key].title
        });
      }    
      const sorted_by_title = all_movies.concat().sort((a, b) => a.title > b.title);
    
      // display result to user
      const movies_div = document.getElementById("movies-div");
      while(movies_div.firstChild){
          movies_div.removeChild(movies_div.firstChild);
      }

      const titles_ul = document.createElement("ul");
      for (let movie of sorted_by_title) {
        const next_li = document.createElement("li");
        next_li.innerHTML = movie.title;
        titles_ul.appendChild(next_li);
      }

      movies_div.appendChild(titles_ul);


    })
    .catch(function(err) {
      console.error(err);
    })

}
var alphabetic_button = document.getElementById("alphabetic");
alphabetic_button.addEventListener("click", alphabetic_handler);
