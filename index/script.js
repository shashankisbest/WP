let number_of_movies = 0;
let index = 0;
let movies = [];

function display_movies() {
    let mylist = document.getElementById("movieList");

    mylist.innerHTML = '';

    movies.forEach((movie, i) => {
        let li = document.createElement("li");
        li.textContent = movie; 
        li.className = "hehe";
        li.addEventListener("click", function() {
            removeMovie(i);
        });
        mylist.appendChild(li);
    });
}

function appendMovie() {
    let name = document.getElementById("movie_input").value;
    if (name === "") {
        alert("Enter a movie name!");
    } else {
        movies.push(name);
        number_of_movies += 1;
        document.getElementById("movies_count").textContent = number_of_movies;
        document.getElementById("movie_input").value = "";
        display_movies();
    }
}

function clearlist() {
    movies = [];
    display_movies();
    number_of_movies = 0;
    document.getElementById("movies_count").textContent = number_of_movies;
}

function removelastmovie() {
    movies.pop();
    display_movies();
    if(number_of_movies != 0)
        {number_of_movies -= 1;}
    document.getElementById("movies_count").textContent = number_of_movies;
}

function removeMovie(index) {
    movies.splice(index, 1);
    number_of_movies -= 1;
    display_movies();
    document.getElementById("movies_count").textContent = number_of_movies;
}
