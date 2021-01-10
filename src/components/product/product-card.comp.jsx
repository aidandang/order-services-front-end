import React from 'react'

// components
import { Li } from '../tag/tag.comp'

const ProductCard = ({
  product,
  setActive
}) => {

  return <>
    <Li>
      <div className="row"> 
        <div className="col-10">
          <div className="row mt-2">
            <div className="col-3 d-none d-lg-block">
              <span className="font-weight-bold">Product Name:</span>
            </div>
            <div className="col-lg-9">
              {product.name}
            </div>
          </div>
          <div className="row">
            <div className="col-3 d-none d-lg-block">
              <span className="font-weight-bold">Brand:</span>
            </div>
            <div className="col-lg-9">
              {product.brand.preferredName}
            </div>
          </div>
          <div className="row">
            <div className="col-3 d-none d-lg-block">
              <span className="font-weight-bold">Style Code:</span>
            </div>
            <div className="col-lg-9">
              {product.styleCode}
            </div>
          </div>
          <div className="row">
            <div className="col-3 d-none d-lg-block">
              <span className="font-weight-bold">Colors:</span>
            </div>
            <div className="col-lg-9">
              {product.colors.map((color, index) => <span key={index}>{index > 0 ? ` | ${color.color}` : color.color}</span>)}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-3 d-none d-lg-block">
              <span className="font-weight-bold">Description:</span>
            </div>
            <div className="col-lg-9">
              {product.desc}
            </div>
          </div>
        </div>
        <div className="col-2 text-center">
          <img 
            className="product-img my-2" 
            src={product.styleImage} alt={product.brand.preferredName} 
          />
        </div>
      </div>
    </Li>
    <Li>
      <a 
        href={'/'} 
        className="a-link-cs"
        onClick={e => {
          e.preventDefault()
          setActive({
            comp: 'product-info',
            id: product._id
          })
        }}
      >
        Product Details
      </a>
    </Li>
  </>
}

export default ProductCard