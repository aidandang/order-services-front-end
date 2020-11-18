import React from 'react';

// components
import { Li, TextInput } from '../tag/tag.component';

export default function AddColorForm({ 
  formData, 
  errors, 
  onInputChange
}) {

  return <>
    <Li>
      <TextInput
        label="Color (*)"
        name="color"
        size="col"
        errors={errors}
        smallText="Copy and paste color from the product's website."
        value={formData.color}
        onChange={onInputChange}
      /> 
    </Li>

    <Li>
      <TextInput
        label="Image (*)"
        name="image"
        size="col"
        errors={errors}
        smallText="Copy and paste image address from the product's website."
        value={formData.image}
        onChange={onInputChange}
      /> 
    </Li>      
  </>
}