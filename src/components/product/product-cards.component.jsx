import React from 'react';

// dependencies
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';

// components
import { Card, Ul } from '../tag/tag.component';
import withProductData from '../api/withProductData';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import ProductCard from './product-card.component';

const ProductCards = ({ 
  data
}) => {

  const location = useLocation();
  const history = useHistory();

  const obj = queryString.parse(location.search)

  const { allIds } = data;

  // handle search form 
  const onPageChange = (e, page) => {
    e.preventDefault();

    let queryStr = null;

    if (obj.page) {
      obj.page = page;
      queryStr = '?' + queryString.stringify(obj);
    } else {
      queryStr = location.search ? `${location.search}&page=${page}` : `?page=${page}`
    }
    
    history.push(`${location.pathname}${queryStr}`)
  }

  return <>

    <PaginationBar  
      numberOfPages={data.info.pages}
      limit={5}
      onPageChange={onPageChange}
      page={obj.page}
    />

    {/* product cards */}
    <div className="row">
      {
        allIds.map(product => 
          <div key={product._id} className="col-12">
            <Card width="col" title={product.name}>
              <Ul>  
                <ProductCard product={product} />
              </Ul>
            </Card>
          </div>
        )
      }
    </div> 
    {/* <!-- end of product cards --> */}

    <PaginationBar  
      numberOfPages={data.info.pages}
      limit={5}
      onPageChange={onPageChange}
      page={obj.page}
    />
  </>
}

export default withProductData(ProductCards);