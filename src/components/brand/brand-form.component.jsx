import React from 'react';

// components
import { Li, TextInput } from '../tag/tag.component';

export default function ProductBrandForm({ 
  formData, 
  errors, 
  onInputChange, 
}) {

  return <>
    <Li>
      <TextInput
        label="Name (*)"
        name="name"
        size="col"
        errors={errors}
        smallText="Name should be unique."
        value={formData.name}
        onChange={onInputChange}
      /> 
    </Li>

    <Li>
      <TextInput
        label="Preferred Name"
        name="preferredName"
        size="col"
        errors={errors}
        smallText="Preferred name for the brand."
        value={formData.preferredName}
        onChange={onInputChange}
      /> 
    </Li>
  </>
}