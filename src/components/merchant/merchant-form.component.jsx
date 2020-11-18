import React from 'react';

// components
import { Li, TextInput } from '../tag/tag.component';

const MerchantForm = ({
  formData,
  errors,
  onInputChange
}) => {
  return <>
    <Li>
      <TextInput
        label="Name (*)" 
        name="name"
        errors={errors}
        size="col"
        smallText="Name of the merchant."
        value={formData.name}
        onChange={onInputChange}
      />
    </Li>
    <Li>
      <TextInput
        label="Official Website" 
        name="url"
        errors={errors}
        size="col"
        smallText="The link to merchant's website."
        value={formData.url}
        onChange={onInputChange}
      />
    </Li>
  </>
}

export default MerchantForm;