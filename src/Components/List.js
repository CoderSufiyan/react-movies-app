import React, { Component } from 'react'
import { movies } from './getMovies'

export default class List extends Component {
  render() {
    let movie = movies.results;
    return (
      <>
        {
            movie.length === 0 ? (
                <div className='spinner-grow text-succes' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </div>
                ) : (
                    <div>
                        <h3 className='text-center'>
                            <strong>Trending</strong>
                        </h3>
                        <div className='movie-list'>
                            {movie.map((movieObj)=>(
                                <div className="card movie-card">
                                <img
                                src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                className="card-img-top banner-img"
                                alt="..." style={{height: '40vh', width: '20vw'}}
                                />
                                <h5 className="card-title movie-title">
                                {movieObj.original_title}
                                </h5>
                                {/* <p className="card-text banner-text">{movieObj.overview}</p> */}
                                <div className='button-wrapper'>
                                    <a href='#' className='btn btn-primary'>
                                        Add to favourites
                                    </a>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                    )
        }
      </>
    )
  }
}
