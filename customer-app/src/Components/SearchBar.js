import React from 'react';
import { Button } from 'react-bootstrap';
import './SearchBar.scss';


function SearchBar() {

  return (
    <form className="search-bar-form">
      <input type="text" placeholder="Search function" className="search-bar-text"/>
      <Button variant="primary" type="submit" className="search-bar-button">Search</Button>
    </form>
  );
}

export default SearchBar;