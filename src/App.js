import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';
import MovieList from './MovieList';

 /* eslint-disable */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      movies: [],

    };
  }


  compontentDidMount() {
    axios.get('http://www.localhost:5100/movies')
    .then(resp => {
      this.setState({
        movies: resp.data.results[0]
      });
    })
    .catch(err => {
      console.log('Error ${err}');
    })
  }


handleChange(event) {
  this.setState({
    searchText:event.target.value
  })
}

handleSubmit(event) {
  event.preventDefault();

  const movie = this.state.searchText;
  const API = (`https://api.themoviedb.org/3/search/movie?api_key=8dfe85344cfec28e3f50deee8ce2bce4&language=en-US&query=${movie}&page=1&include_adult=false`)


  axios.get(API)
    .then(resp => {
      this.setState({
        searchText: '',
        addMovie: [...this.state.addMovie, resp.data.results[0]],
        movieTitle: resp.data.results[0].original_title,
        posterPath: resp.data.results[0].poster_path,
        overview: resp.data.results[0].overview,
        releaseDate: resp.data.results[0].release_Date
      });
    });
}

  handleAddMovie(movie) {
    axios.post('http://localhost:5100/movies', movie)
      .then(resp => {
        this.setState({
          movies: [
            ...this.state.movies,
            resp.data.results[0]
          ]
        });
        console.log(this.state.movies);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <h1>Movie List</h1>
      </div>
    );
  }
}

export default App;
