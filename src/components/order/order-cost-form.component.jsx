import React from 'react';

// components
import { Li, TextInput } from '../tag/tag.component';

const OrderCostForm = ({
  formData,
  errors,
  onInputChange
}) => {
  return <>
    <Li>
      <TextInput
        label="Sale Tax" 
        name="saleTax"
        id="currencyMask-order-cost-form-saleTax"
        errors={errors}
        size="col-xl-6"
        smallText="Sale tax applied to this order. Leave empty if there is no tax"
        value={formData.saleTax}
        onChange={onInputChange}
      />
    </Li>
    <Li>
      <TextInput
        label="Shipping Cost" 
        name="shippingCost"
        id="currencyMask-order-cost-form-shippingCost"
        errors={errors}
        size="col-xl-6"
        smallText="Shipping cost in US. Leave empty if there is no cost"
        value={formData.shippingCost}
        onChange={onInputChange}
      />
    </Li>
  </>
}

export default OrderCostForm;