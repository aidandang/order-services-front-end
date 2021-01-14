import React from 'react'

// components
import { Li, TextInput } from '../tag/tag.comp'

const PurchasingItemForm = ({
  errors,
  formData,
  onInputChange
}) => {

  return <>
    <Li>
      <TextInput
        label="Size" 
        name="size"
        size="col-xl-4"
        errors={errors}
        smallText="Size of the product."
        value={formData.size}
        onChange={onInputChange}
      />
    </Li>
    <Li>
      <div className="row">
        <div className="col-xl-4">
          <TextInput
            label="Qty (*)" 
            name="qty"
            id="integerMask-order-item-form-qty"
            errors={errors}
            smallText="Qty of the item."
            value={formData.qty}
            onChange={onInputChange}
          />
        </div>
        <div className="col-xl-4">
          <TextInput
            label="Unit Cost (*)" 
            name="unitCost"
            id="currencyMask-order-item-form-unitCost"
            errors={errors}
            smallText="Cost per unit."
            value={formData.unitCost}
            onChange={onInputChange}
          />
        </div>
        <div className="col-xl-4">
          <TextInput
            label="Tax Rate (%) (*)" 
            name="purTaxPct"
            id="currencyMask-order-item-form-purTaxPct"
            errors={errors}
            smallText="Sales tax rate applied to the item in %."
            value={formData.purTaxPct}
            onChange={onInputChange}
          />
        </div>
      </div>
    </Li>
    <Li>
      <TextInput
        label="Note" 
        name="note"
        errors={errors}
        smallText="Additional note to the item."
        value={formData.note}
        onChange={onInputChange}
      />
    </Li>
  </>
}

export default PurchasingItemForm