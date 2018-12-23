import React, { Component } from 'react'
import client from 'axios'
import ReactPaginate from 'react-paginate';

import SearchResults from '../components/SearchResults'

const API_LOCAL_URL = 'http://localhost:5000/api/v1/movies';

class MovieSearcher extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      query: '',
      movieResults: [],
      totalResults: 0,
      totalPages: 0,
      displayIndex: 1,
      pageSize: 20,
      forcePage: 0
    }
    this.onChangePage = this.onChangePage.bind(this);
  }
    

    searchMovies = () => {
      console.log(`Query: ${this.state.query} and Page: ${this.state.displayIndex}`);
      let endpointQuery = `${API_LOCAL_URL}?query=${this.state.query}&page=${this.state.displayIndex}`;
      console.log(endpointQuery);
      client
      .get(endpointQuery, { crossdomain : true })
      .then(({ data }) => {        
        this.showResult(data);
      })
      .catch((ex) => {
          this.setState( { error: true })
      });
    }

    showResult = (data) => {
      // Set the movie result to primary array
      if (data && data.results) {
        console.log(data);
        this.setState({ 
          movieResults: data.results,
          totalResults: data.total_results,
          totalPages: data.total_pages,
          displayIndex: data.page
        });
      }
      else {
        console.log(`No data for the query ${this.state.query}`);
        this.setState({ 
          movieResults: [],
          totalResults: 0,
          totalPages: 0,
          displayIndex: 1
        });
      }      
    }

    onChangePage(pageData) {
      let selected = pageData.selected;
        console.log(`Selected Page: ${selected} and current page: ${this.state.displayIndex}`);
        // let offset = Math.ceil(selected * this.state.pageSize);

        // update state with new page of items
        this.setState({ 
            displayIndex: selected+1
        }, () => {
            this.searchMovies();
        });
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
          }, () => {
            if (this.state.query && this.state.query.length > 1) {
              setTimeout(() => this.searchMovies(), 200);
            } else if (!this.state.query) {
              // This is done with settimeout to handle
              // pending asyc request.
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
              <div className="m-2 pb2"></div>
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
                    <div className="col-sm-12 offset-sm-8">
                        { (this.state.movieResults 
                            && this.state.movieResults.length > 0 
                            && this.state.totalPages > 1)
                            ? <ReactPaginate previousLabel={"previous"}
                                            nextLabel={"next"}
                                            breakLabel={<a className="page-link" href="#">...</a>}
                                            breakClassName={"page-item"}
                                            pageClassName="page-item"
                                            previousClassName="page-item"
                                            nextClassName="page-item"
                                            pageLinkClassName="page-link"
                                            previousLinkClassName="page-link"
                                            nextLinkClassName="page-link"
                                            pageCount={this.state.totalPages}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={this.onChangePage}
                                            containerClassName={"pagination"}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"} 
                                            initialPage={this.state.forcePage}
                                            forcePage={this.state.forcePage}/>
                            : null
                        }
                    </div>
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