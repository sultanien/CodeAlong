import { v4 as uuidv4 } from 'uuid';

export let movies = [
    {
      id: "1",
      title: "Inception",
      director: "Christopher Nolan",
      release_date: "2010-07-16",
    },
    {
      id: "2",
      title: "The Irishman",
      director: "Martin Scorsese",
      release_date: "2019-09-27",
    },
  ];
export const getMovies = (req, res) => res.status(200).json(movies);

export const createMovie = (req, res) => {
  const { title, director, release_date } = req.body;

  if (!title || !director || !release_date) {
    //bad request code 400
    return res.status(400).send("Title, director or/and release date is/are required");
  }

  const newMovie = {
    id: uuidv4(),
    title: title,
    director: director,
    release_date: release_date,
  };

  movies.push(newMovie);
  res
    .status(201) // 201 created as the result of a POST request
    .json(
      {
        msg:`${newMovie.title} with the id "${newMovie.id}" is added to the movies, ${newMovie}`,
        movie: newMovie
      });
};

export const getMovieById = (req, res) => {
  const {id} = req.params;

  const foundMovie = movies.find(movie => movie.id === id);
  if(!foundMovie){
    //Not found error 404
    res.status(404).send(`Movie with the id ${id} is not found in the database.`);
  }
  res.json(foundMovie)
};

export const deleteMovieById = (req, res) => {
  const {id} = req.params;

  const foundMovie = movies.find(movie => movie.id === id);

  if(!foundMovie){
    res.status(404).send(`Movie with the id ${id} is not found in the database.`);
  }
  movies = movies.filter((movie) => movie.id !== id);
  res.send(`Movie with the id ${id} is deleted from database.`);
};


export const updateMovieById = (req, res) => {
  const {id} = req.params;
  const { title, director, release_date } = req.body; 

  const foundMovie= movies.find(movie => movie.id === id);
  
  if(!foundMovie){
    res.status(404).send(`Movie with the id ${id} is not found in the database.`);
  }

  if(title){
    foundMovie.title = title;
  }

  if(director){
    foundMovie.director = director;
  }

  if(release_date){
    foundMovie.release_date = release_date;
  }
  res.status(200).send(`The movie with id "${id}" has been updated.`);
}