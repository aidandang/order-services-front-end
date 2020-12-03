import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
// components
import ProductCards from './product-cards.component';
import Search from '../search/search.component';
import { queryState, searchList, defaultFilter, addLink } from '../../state/product/product.data';

// main component
const ProductList = () => {

  const location = useLocation();
  
  return <>
    <Search
      queryState={queryState}
      searchList={searchList}
      defaultFilter={defaultFilter}
      addLink={addLink}
    />
    <ProductCards
      queryStr={location.search}
    />
  </>
}

export default ProductList;