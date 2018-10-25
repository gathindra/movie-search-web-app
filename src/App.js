import React, { Component } from 'react';
import Header from './components/Header';
import MovieSearcher from './containers/MovieSearcher';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <br/>
        <br/>
        <br/>
        <MovieSearcher />
        </div>
    );
  }
}

export default App;
