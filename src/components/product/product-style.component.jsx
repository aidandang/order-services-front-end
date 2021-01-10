import React from 'react';

// dependencies
import { useLocation, Link } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';

const ProductStyle = ({ 
  product
}) => {

  const location = useLocation();

  return <>
    <Card width="col" title="Product Style">
      <Ul>

        <Li>
          <div className="row mt-1">
            <div className="col-4"><span className="font-weight-bold">Product Name:</span></div>
            <div className="col-8">{product.name}</div>
          </div>
          <div className="row mt-1">
            <div className="col-4"><span className="font-weight-bold">Brand:</span></div>
            <div className="col-8">{product.brand.preferredName}</div>
          </div>
          <div className="row mt-1">
            <div className="col-4"><span className="font-weight-bold">Style Code:</span></div>
            <div className="col-8">{product.styleCode}</div>
          </div>
          <div className="row mt-1">
            <div className="col-4"><span className="font-weight-bold">Website:</span></div>
            <div className="col-8"><a href={product.url} className="a-link-cs">{product.url}</a></div>
          </div>
          <div className="row mt-1">
            <div className="col-4"><span className="font-weight-bold">Description:</span></div>
            <div className="col-8">{product.desc}</div>
          </div>
          
        </Li>

        <Li>
          <div className="row">
            <div className="col-4 mt-1">
              <span className="font-weight-bold">Sample Image:</span>
            </div>
            <div className="col-8">
              <img 
                className="product-img my-2" 
                src={product.styleImage} alt={product.name} 
              />
            </div>
          </div>
        </Li>

        <Li>
          <div className="row">
            <div className="col">
              <Link
                to={{
                  pathname: location.pathname,
                  search: `?id=${product._id}&action=product-edit`,
                  state: {
                    from: location.pathname + location.search
                  }
                }}
                className="a-link-cs"
              >
                Update Information
              </Link>
            </div>
          </div>
        </Li>

      </Ul>
    </Card>
  </>
}

export default ProductStyle;