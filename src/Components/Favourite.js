/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
// import { movies } from "./getMovies";

export default class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      currGenre: "All Genres",
      movies: [],
      currText: '',
      limit: 5,
      currPage: 1,
    };
  }
  componentDidMount() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let data = JSON.parse(localStorage.getItem("movies-app") || "[]");
    let temp = [];
    data.forEach((movieObj) => {
      // if not present
      if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
        temp.push(genreids[movieObj.genre_ids[0]]);
      }
    });
    temp.unshift("All Genres");
    this.setState({
      genres: [...temp],
      movies: [...data],
    });
  }
  handleCurrGenre = (genre) => {
    this.setState(
      {
        currGenre: genre,
      }
    )
  }
  handleSortPopularityDesc = () => {
    let temp = this.state.movies;
    temp.sort(function(objA, objB) {
      return objB.popularity - objA.popularity;
    })
    this.setState({
      movies: [...temp]
    })
  }
  handleSortPopularityAscd = () => {
    let temp = this.state.movies;
    temp.sort(function(objA, objB) {
      return objA.popularity - objB.popularity;
    })
    this.setState({
      movies: [...temp]
    })
  }
  handleSortRatingDesc = () => {
    let temp = this.state.movies;
    temp.sort(function(objA, objB) {
      return objB.vote_average - objA.vote_average;
    })
    this.setState({
      movies: [...temp]
    })
  }
  handleSortRatingAscd = () => {
    let temp = this.state.movies;
    temp.sort(function(objA, objB) {
      return objA.vote_average - objB.vote_average;
    })
    this.setState({
      movies: [...temp]
    })
  }
  handlePageChange= (page)=> {
       this.setState({
        currPage: page
       })
       
  }
  handleRemove = (id)=> {
    let newArr = [];
    newArr = this.state.movies.filter((movieObj)=> movieObj.id !== id);
    this.setState({
      movies: [...newArr]
    })
    localStorage.setItem('movies-app', JSON.stringify(newArr));
  }
  render() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let filterArr = this.state.movies;
    if(this.state.currText !== '') {
      filterArr = this.state.movies.filter((movieObj)=> {
        let title = movieObj.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase());
      })
    }
    if(this.state.currGenre !== 'All Genres'){
      filterArr = this.state.movies.filter((moviesObj)=> genreids[moviesObj.genre_ids[0]]===this.state.currGenre)
    }
    let pages = Math.ceil(filterArr.length/this.state.limit);
    let pagesarr = [];
    for (let i = 1; i <= pages; i++) {
      pagesarr.push(i);
    }
    let si = (this.state.currPage-1) * this.state.limit; // start index
    let ei = si + this.state.limit;// end index
    filterArr = filterArr.slice(si, ei);
    return (
      <div>
  
          <div className="main">
            <div className="row">
              <div className="col-lg-3 col-sm-12">
                <ul className="list-group favourites-genres">
                  {this.state.genres.map((genre) =>
                    this.state.currGenre === genre ? (
                      <li className="list-group-item"
                        style={{
                          background: "#3f51b5",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {genre}{" "}
                      </li>
                    ) : (
                      <li
                        className="list-group-item"
                        style={{ background: "white", color: "#3f51b5" }}
                        onClick={()=> this.handleCurrGenre(genre)}
                      >
                        {genre}{" "}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="col-lg-9 col-sm-12 favourites-table">
                <div className="row">
                  <div id="search-bar">
                    <i class="fa fa-magnifying-glass"></i>
                    <input
                      className="input-group-text col"
                      type="text"
                      placeholder="Search Movie"
                      value={this.state.currText}
                      onChange={(e)=>this.setState({currText: e.target.value})}
                    ></input>
                    <i class="fa fa-arrows-up-down"></i>
                    <input
                      className="input-group-text col"
                      type="number"
                      placeholder="Rows Count"
                      value={this.state.limit} 
                      onChange={(e)=> this.setState({limit: e.target.value})}
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col"><i className="fa fa-sort-up" onClick={this.handleSortPopularityDesc}/>Popularity<i className="fa fa-sort-down" onClick={this.handleSortPopularityAscd}/></th>
                        <th scope="col"><i className="fa fa-sort-up" onClick={this.handleSortRatingDesc}/>Rating<i className="fa fa-sort-down" onClick={this.handleSortRatingAscd}/></th>
                        <th scope="col">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterArr.map((movieObj) => (
                        <tr>
                          <th>
                            <img
                              src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                              alt={movieObj.title}
                              style={{ width: "8rem", margin: "1rem" }}
                            />
                            {movieObj.original_title}
                          </th>
                          <td>{genreids[movieObj.genre_ids[0]]}</td>
                          <td>{movieObj.popularity}</td>
                          <td>{movieObj.vote_average} </td>
                          <td>
                            <button type="button" className="btn btn-danger" onClick={()=> this.handleRemove(movieObj.id)}>
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {pagesarr.map((page) =>
                    this.state.currPage === page ? (
                      <li className="page-item">
                      <a className="page-link"                  
                        onClick={()=>this.handlePageChange(page) }
                        style={{
                          background: "#3f51b5",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >{page}</a>
                    </li>
                    ) : (
                      <li className="page-item">
                      <a className="page-link"                  
                        onClick={()=>this.handlePageChange(page) }
                        style={{ background: "white", color: "#3f51b5" }}
                      >{page}</a>
                    </li>
                    )
                  )}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
      </div>
    );
  }
}
