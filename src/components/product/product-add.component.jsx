import React from 'react';

// components
import { Card, Ul } from '../tag/tag.component'
import ProductForm from './product-form.component';
import Brand from '../brand/brand.component';

// main component
const ProductAdd = () => {
  return <>
    <div className="row">
      <div className="col-xl-8">
        <Card width="col" title="Add Product">
          <Ul>
            <ProductForm />
          </Ul>
        </Card>
      </div>
      <div className="col-xl-4">
        <Card width="col" title='Update Brands'>
          <Ul>
            <Brand />
          </Ul>
        </Card>
      </div>
    </div> 
  </>
}

export default ProductAdd;