import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import {useHistory} from 'react-router-dom'

function Movie({ addToSavedList, movieList, setMovieList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const Delete = (event) => {
    event.preventDefault()
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(res => {
      setMovieList(movieList)
      getMovieList()
      history.push('/')
      console.log(res)
    })
    .catch(error => {
      console.log(error)
    })
    
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className = 'edit-button' onClick = {() => history.push(`/update-movie/${params.id}`)}>
        Edit
      </div>
      <div className = "delete-button" onClick = {(event) => Delete(event)}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
