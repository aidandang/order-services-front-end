import React from 'react'

// components
import ProductForm from './product-form.comp'
import Brand from '../brand/brand.comp'

// isOrderCalled argument is passed if this component
// is called from Order Purchasing components
// if so then return to Order Purchasing when api
// request success

const ProductAdd = ({
  isOrderCalled
}) => {
  return <>
    <div className="row">
      <div className="col-xl-8">
        <ProductForm isOrderCalled={isOrderCalled ? true : false}/>
      </div>
      <div className="col-xl-4">
        <Brand />
      </div>
    </div> 
  </>
}

export default ProductAdd