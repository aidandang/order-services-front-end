import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
// components
import ProductCards from '../product/product-cards.component';
import Search from '../search/search.component';
import { queryState, searchList, defaultFilter, searchTitle } from '../../state/product/product.data';

// main component
const ItemSelectProduct = () => {

  const location = useLocation();
  
  return <>
    <Search
      queryState={queryState}
      searchList={searchList}
      defaultFilter={defaultFilter}
      searchTitle={searchTitle}
    />
    <ProductCards
      queryStr={location.search}
    />
  </>
}

export default ItemSelectProduct;