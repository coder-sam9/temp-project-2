import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  async function deleteMovieHandler(id) {
    const resposne=await fetch(`https://temp-project-2-38d8c-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method:'DELETE',
        headers:{
          'Content-type':'application/json'
        }
      }
    )
    console.log(resposne);
    props.onDelete();
  }
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={()=>deleteMovieHandler(props.id)}>Delete Movie</button>
    </li>
  );
};

export default Movie;
