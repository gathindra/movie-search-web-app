import React from 'react';

const SearchResults = (props) => {
    const options = props.results.map(r => (
        
            <div className="col-sm-12 my-1" key={r.id}>
            <div className="media">
                <span className="border border-dark">
                    <img height="100" width="75" src={r.poster_path} alt="Movie Poster" />
                </span>
                <div className="media-body">
                    <h4>{r.title}</h4>
                    <p>{r.overview}</p>
                </div>
                <br />
            </div>
        </div>
        
        
      ));
      return <ul>{options}</ul>;
}

export default SearchResults;