//javascript code 
$(document.getElementById('search').onclick).ready(() => {
  $('#searchform').on('submit', (event) => {
    let description = $('#description').val();
    console.log(description);
    getMovies(description); //call the function for getting info from api 

    event.preventDefault();   //to stop the default behavior of browser to redirect to diff page to post the form
  });
});

function getMovies(description){
  if(description == "")
    alert("please type some description in search box");

  //Axios makes it easy to send asynchronous HTTP requests to REST endpoints and perform CRUD operations
  axios.get('http://www.omdbapi.com/?apikey=62744a7&s='+description)
  .then((response) => {
    console.log(response);
    let movies = response.data.Search;

    let output = "";
    //jquery each loop
    $.each(movies, (index, movie) => {
      output += `
      <div class="output">
        <img src="${movie.Poster}" loading="lazy" id="img" alt=""> 
        <div class="movie-info">
          <h3 id="title">${movie.Title}</h3>
          <button class="button" id="button" data-toggle="modal" onClick="movieInfo('${movie.imdbID}')">Details</button>
        </div>
      </div>
      `;
      $('#main').html(output);
    });
    
  })
  .catch(() => {
    console.log('Error in fetching data');
    alert("Error in fetching data");
  });
}


function movieInfo(id){
  if(id == 0) return  //don't perform anything 
 console.log(id);

  axios.get('http://www.omdbapi.com/?apikey=62744a7&i='+id)
  .then((info) => {
    console.log(info);
    let movie = info.data;
    let output_detail ="";

    //for ratings of movie from 3 sources
    let ratings = movie.Ratings;
    if(ratings[0] != null){
      a = ratings[0].Value;
    }else{a = "Not available"};

    if(ratings[1] != null){
      b = ratings[1].Value;
    }else{b = "Not available"};

    if(ratings[2] != null){
      c = ratings[2].Value;
    }else{c = "Not available"};
    
    console.log(ratings);

    output_detail +=`
      <div class="details active" id="details">
        <div class="header">
          <button class="close-button" id="close" onClick="closePopup()">&times;</button>
        </div>

        <div class="left">
          <div class="image">
            <img src="${movie.Poster}" id="img" alt="">
          </div>
        </div>
        <div class="right">
          <div class="detail-info">
            <p><b>Title:</b> ${movie.Title}</p>
            <p><b>Year:</b> ${movie.Year}</p>
            <p><b>Actors:</b> ${movie.Actors}</p>
            <p><b>Production:</b> ${movie.Production}</p>
            <p><b>Genre:</b> ${movie.Genre}</p>
            <p><b>Plot:</b> ${movie.Plot}</p>
            <h3>Ratings</h3>
            <table style="color:white">
              <tr>
                <td>Internet Movie Database:</td>
                <td>${a}</td>
              </tr>
              <tr>
                <td>Rotten Tomatoes:</td>
                <td>${b}</td>
              </tr>
              <tr>
                <td>Metacritic:</td>
                <td>${c}</td>
              </tr>  
            </table>
          </div>
        </div>
      </div>
      
      <div class="active" id="overlay"></div>
    `;
    a = `<p>Hello</p>`;
    $('#popup').show();
    $('#popup').html(output_detail);
  
  })
  .catch(() => {
    console.log('Error in showing movie details');
    alert("Error in showing movie details");
  });
}

/*to close popup in 1 second */
function closePopup(){
  $('#popup').hide();

  /*setTimeout(function(){
    $('#popup').hide();
  }, 1000);*/
}

function feedback(){
  console.log("feedback");
  document.getElementById('myForm').style.display = 'block';
}

function closeForm(){
  $('#myForm').hide();
}
