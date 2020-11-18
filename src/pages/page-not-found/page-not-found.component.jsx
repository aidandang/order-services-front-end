import React from 'react';

// components
import Title from '../../components/title/title.component';

// ui settings
import './page-not-found.styles.css';

// initial values
const title = {
  name: 'Page Not Found',
  message: 'Sorry. We could not find that page.'
}

// MAIN FUNCTION
const PageNotFound = () => {
  return <>
    <Title title={title} />
  </>   
}

export default PageNotFound;