import React, { Component } from "react";
// import { movies } from "./getMovies";
import axios from 'axios';  
import { api } from "./secret";
export default class List extends Component {
  constructor() {
    super();
    this.state = {
        hover: "",
        parr:[1],
        currPage: 1,
        movies:[],
        favourites: [],
    }
  }
  async componentDidMount() {
    // side effects
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api.apiKey}&language=en-US&page=${this.state.currPage}`)
    let data = res.data;
    // console.log(data);
    this.setState({
      movies: [...data.results]
    })
  }
  handleEnter = (id) => {
    this.setState({
      hover: id
    });
  };
  handleLeave = () => {
    this.setState({
        hover: "",
    });
  };
  changeMovies= async () => {
    // console.log('change movies called');
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api.apiKey}&language=en-US&page=${this.state.currPage}`)
    let data = res.data;
    // console.log(data);
    this.setState({
      movies: [...data.results]
    })
  }
  handleRight = async () => {
    let tempArr = [];
    for(let i = 1; i <= this.state.parr.length+1; i++) {
      tempArr.push(i);
    }
    this.setState({
      parr: [...tempArr],
      currPage: this.state.currPage+1,
    },this.changeMovies)//imp step
  }
  
  handleLeft = async () => {
    if(this.state.currPage!=1){
      this.setState({
        currPage: this.state.currPage-1,
      },this.changeMovies)
    }
  }

  handleClick = (value)=> {
    if(value!=this.state.currPage){
      this.setState({
        currPage: value
      },this.changeMovies)
    }
  }
  handleFavourites = (movie)=>{
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");
    if(this.state.favourites.includes(movie.id)){
      oldData = oldData.filter((m)=>m.id!=movie.id);
    } else {
      oldData.push(movie);
    }
    localStorage.setItem("movies-app", JSON.stringify(oldData));
    console.log(oldData);
    this.handleFavouritesState();
  }
  handleFavouritesState = ()=> {
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");
    let temp = oldData.map((movie)=>movie.id);
    this.setState({
      favourites: [...temp]
    })

  }
  render() {
    // let movie = movies.results;
    return (
      <>
        {this.state.movies.length === 0 ? (
          <div className="spinner-grow text-succes" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">
              <strong>Trending</strong>
            </h3>
            <div className="movie-list">
              {this.state.movies.map((movieObj) => (
                <div
                  className="card movie-card"
                  onMouseEnter={() => this.handleEnter(movieObj.id)}
                  onMouseLeave={this.handleLeave}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    className="card-img-top banner-img"
                    alt="..."
                    style={{ height: "40vh", width: "20vw" }}
                  />
                  <h5 className="card-title movie-title">
                    {movieObj.original_title}
                  </h5>
                  {/* <p className="card-text banner-text">{movieObj.overview}</p> */}
                  <div className="button-wrapper">
                    {this.state.hover == movieObj.id && (
                      <a className="btn btn-primary" onClick={()=> this.handleFavourites(movieObj)}>
                        {
                          this.state.favourites.includes(movieObj.id) ? "Remove from favourites" : "Add to favourites"
                        }
                        
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* pagination here */}
                <div className="my-pagination">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" onClick={this.handleLeft} aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      {
                        this.state.parr.map((value)=>(
                          <li className="page-item"><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                        ))
                      }
                      <li className="page-item">
                        <a className="page-link" onClick={this.handleRight} aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
          </div>
        )}
      </>
    );
  }
}
