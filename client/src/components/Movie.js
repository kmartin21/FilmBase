import React from 'react'

const Movie = ({title, description, imageUrl}) => (
    <div>
        <img src={`https://image.tmdb.org/t/p/w45/${imageUrl}`} alt='Movie image' />
        <h5>{title}</h5>
        <p>{description}</p>
        <p>Favorited by <a href="">kmartin5</a></p>
        <button>Favorite</button>
    </div>
)

export default Movie