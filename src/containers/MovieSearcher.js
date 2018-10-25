import React, { Component } from 'react'
import client from 'axios'

import SearchResults from '../components/SearchResults'

const API_LOCAL_URL = 'http://localhost:5000/api/v1/movies';

class MovieSearcher extends Component {
    state = {
        error: false,
        query: '',
        movieResults: []
      }

    searchMovies = () => {
        client
        .get(`${API_LOCAL_URL}?query=${this.state.query}`, { crossdomain : true })
        .then(({ data }) => {
          this.showResult(data);
        })
        .catch((ex) => {
            this.setState( { error: true })
        });
    }

    showResult = (data) => {
      // Set the movie result to primary array
      this.setState({ movieResults: data });
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
          }, () => {
            if (this.state.query && this.state.query.length > 1) {
              setTimeout(() => this.searchMovies(), 200);
            } else if (!this.state.query) {
              // This is done with settimeout to handle
              // pending asyn request.
              setTimeout(() => {
                this.setState({
                  movieResults: []
                });
              }, 200);
              
            }
          });    
    }

    render() {
        return (
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <form>
                  <div className="col-sm-12">
                    <div className="input-group mb-3">
                      
                      <input className="form-control"
                        placeholder="Search Movies..."
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">@</div>                        
                      </div>
                    </div>
                  </div>
                  </form>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <SearchResults results={this.state.movieResults} />
                  </div>
                </div>
              </div>
          </div>
        );
    }
}

export default MovieSearcher;