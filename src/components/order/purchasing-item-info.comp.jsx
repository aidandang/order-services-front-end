import React from 'react'

// components
import { Li } from '../tag/tag.comp'

const PurchasingItemInfo = ({ 
  itemTemp
}) => {
  return <>
    <Li>
      <div className="row">
        <div className="col-4 align-self-center"><span className="font-weight-bold">Name:</span></div>
        <div className="col-8">{itemTemp.product.name}</div>
      </div>
    </Li>
    <Li>
      <div className="row">
        <div className="col-4 align-self-center"><span className="font-weight-bold">Brand:</span></div>
        <div className="col-8">{itemTemp.product.brand.name}</div>
      </div>
    </Li>
    <Li>
      <div className="row">
        <div className="col-4 align-self-center"><span className="font-weight-bold">Style No:</span></div>
        <div className="col-8">{itemTemp.product.styleCode}</div>
      </div>
    </Li>
    <Li>
      <div className="row">
        <div className="col-4 align-self-center"><span className="font-weight-bold">Color:</span></div>
        <div className="col-8">{itemTemp.color.color}</div>
      </div>
    </Li>
    <Li>
      <div className="row">
        <div className="col-4 align-self-center"><span className="font-weight-bold">Description:</span></div>
        <div className="col-8">{itemTemp.product.desc}</div>
      </div>
    </Li>
  </>
}

export default PurchasingItemInfo