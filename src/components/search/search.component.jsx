import React from 'react';

// dependencies
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
// components
import SearchForm from './search-form.component';

// main component
const Search = ({
  queryState,
  searchList,
  defaultFilter,
  addLink,
  searchTitle
}) => {

  const history = useHistory();
  const location = useLocation();

  const formSubmit = (key, value) => {
    let queryStr = undefined;

    if (value.length > 0 ) {
      if (key.length > 0) {
        queryStr = '?' + queryString.stringify({ [key]: value });
      }
    } else if (value === '') {
      queryStr = '';
    }

    if (queryStr !== undefined) {
      history.push(`${location.pathname}${queryStr}`)
    }
  }

  return <>
    <SearchForm
      formSubmit={formSubmit}
      queryState={queryState}
      searchList={searchList}
      defaultFilter={defaultFilter}
      addLink={addLink}
      searchTitle={searchTitle}
    />
  </>
}

export default Search;