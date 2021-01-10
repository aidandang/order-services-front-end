import React from 'react'

// components
import withOrderData from './withOrderData'
import SellingUpdateSubmit from './selling-update-submit.comp'

const SellingUpdate = () => {
  return <>
    <SellingUpdateSubmit />
  </>
}

export default withOrderData(SellingUpdate)