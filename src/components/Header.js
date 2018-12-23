import React, { Component } from 'react';

class Header extends Component {
    render() {
      return (
        <nav className="navbar navbar-dark  bg-dark">
            <a className="navbar-brand" href="/">
            <img src="https://www.themoviedb.org/assets/1/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"
            width="30" height="30" hspace="20" className="d-inline-block align-top" alt=""/>
            MovieDB Search
            </a>      
        </nav>
        
      );
    }
  }
  
  export default Header;