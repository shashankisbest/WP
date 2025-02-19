
let number_of_movies = 0;
let index = 0;
let movies = [];

function display_movies()
{
    let mylist = document.getElementById("movieList");

    mylist.innerHTML = ''; //comment out and try and see what happens
    movies.forEach(i =>
    {
        let li = document.createElement("li"); //made a list element
        li.textContent = i; //added the movie name
        li.className = "hehe";
        mylist.appendChild(li);
    }
    );
}




function appendMovie()
{
    let name = document.getElementById("movie_input").value;
    if(name == "")
        {alert("Enter A movie name dumbo!")}
    
    else{
        movies.push(name)
        
        index+= 1;
        number_of_movies += 1;
        
        document.getElementById("movies_count").textContent = number_of_movies;
        movie_input.value = "";
        display_movies(); //function call
    }
}


function clearlist()
{
    movies = [];
    display_movies();
}

function removelastmovie()
{
    movies.pop();
    display_movies();
}


