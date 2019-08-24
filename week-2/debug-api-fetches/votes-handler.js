// take not of each error you find
//  where was it?
//  how did you find it?
//  what was wrong?
//  how did you fix it?
/* 
    write error notes here
*/
function votes_handler() {

  fetch("https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json", {method:"get"})
    .then(function(response) {
      return response.json();
    })
    .then(function(movies_data) {
      // perform logic
      const all_movies = [];
      for (let key in movies_data) {
        all_movies.push({
          title: movies_data[key].title,
          votes: movies_data[key].votes,
        });
      }
      const sorted_by_votes = all_movies.concat().sort((a, b) => a.votes < b.votes);
      // display result to user
      const movies_div = document.getElementById("movies-div");
      while(movies_div.firstChild){
          movies_div.removeChild(movies_div.firstChild);
      }

      const votes_ul = document.createElement("ul");
      for (let movie of sorted_by_votes) {
        const next_li = document.createElement("li");
        next_li.innerHTML = movie.votes +": "+movie.title;
        votes_ul.appendChild(next_li);
      }

      movies_div.appendChild(votes_ul);


    })
    .catch(function(err) {
      console.error(err);
    })

}
var votes_button = document.getElementById("votes");
votes_button.addEventListener("click", votes_handler);
