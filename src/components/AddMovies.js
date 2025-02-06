import React, { useState } from 'react'
import './AddMovies.module.css'
function AddMovies() {
    const [title,setTitle]=useState('');
    const [openingText,setOpeningText]=useState('');
    const [releaseDate,setReleaseDate]=useState('');
  return (
    <div id='addForm' style={{flexDirection:'column',display:'flex'}}>
        <form  style={{flexDirection:'column',display:'flex'}}onSubmit={(event)=>{event.preventDefault();console.log(title,openingText,releaseDate);}
        }>

        <label htmlFor='title'>
            Title
        </label>
        <input type='text' id='title' onChange={(event)=>setTitle(event.target.value)}/>
        <label htmlFor='openingText'>
            Opening Text
        </label>
        <textarea type='text' id='openingText' onChange={(event)=>setOpeningText(event.target.value)}/>
        <label htmlFor='releaseDate'>
            Release Date
        </label>
        <input style={{marginBottom:'20px'}} type='text' id='releaseDate' onChange={(event)=>setReleaseDate(event.target.value)}/>
        <button type='submit' >Add Movies</button>
        </form>

    </div>
  )
}

export default AddMovies