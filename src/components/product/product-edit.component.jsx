import React from 'react';

// components
import withProductData from '../api/withProductData';
import ProductForm from './product-form.component';
import Brand from '../brand/brand.component';

// main component
const ProductEdit = ({
  data
}) => {

  const { byId } = data;
  
  const productTemp = {
    ...byId,
    brandId: byId.brand._id 
  }

  return <>    
    <div className="row">
      <div className="col-12 col-xl-8">
        <ProductForm productTemp={productTemp} />
      </div>
      <div className="col-12 col-xl-4">
        <Brand
          pathname={`/brands`}
          component={'brand'}
        />
      </div>
    </div>
  </>
}

export default withProductData(ProductEdit);