import React, { useState } from 'react'

// dependencies
import { useLocation } from 'react-router-dom'
// components
import Search from '../search/search.component'
import ProductCards from './product-cards.comp'
import ProductInfo from './product-info.comp'
import { CloseTask } from '../tag/tag.comp'
import { queryState, searchList, defaultFilter, searchTitle } from '../../state/product/product.data'

// main component
const ProductList = () => {

  const location = useLocation()

  const [active, setActive] = useState(null)

  const setCloseTask = () => {
    setActive(null)
  }

  // this container has 2 main components
  // search for product and product details by Id
  // search bar is shown in both components
  
  return <>
    <Search
      queryState={queryState}
      searchList={searchList}
      defaultFilter={defaultFilter}
      searchTitle={searchTitle}
    />
    { active === null && 
      <ProductCards 
        queryStr={location.search}
        setActive={setActive} 
      /> 
    }
    { 
      active && active.comp === 'product-info' && <>
        <CloseTask setCloseTask={setCloseTask} />
        <ProductInfo id={active.id} />
      </>
    }
  </>
}

export default ProductList