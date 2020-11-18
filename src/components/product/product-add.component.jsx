import React from 'react';

// components
import ProductForm from './product-form.component';
import Brand from '../brand/brand.component';

// main component
const ProductAdd = () => {
  return <>
    <div className="row">
      <div className="col-xl-8">
        <ProductForm />
      </div>
      <div className="col-xl-4">
        <Brand
          pathname={`/brands`}
          component={'brand'}
        />
      </div>
    </div> 
  </>
}

export default ProductAdd;