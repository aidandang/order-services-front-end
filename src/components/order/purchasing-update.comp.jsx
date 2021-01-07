import React from 'react'

// components
import withOrderData from './withOrderData'
import PurchasingUpdateSubmit from './purchasing-update-submit.comp'

const PurchasingUpdate = () => {

  return <> 
    <PurchasingUpdateSubmit />
  </>
}

export default withOrderData(PurchasingUpdate)