import React from 'react';

// components
import { Li, TextInput, SelectInput } from '../tag/tag.component';

const WarehouseForm = ({
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
        smallText="Name of the warehouse."
        value={formData.name}
        onChange={onInputChange}
      />
    </Li>
    <Li>
      <SelectInput
        label="Warehouse Type" 
        name="type"
        errors={errors}
        size="col"
        smallText="Company or Customer warehouse."
        defaultValue=""
        defaultText="Choose..."
        value={formData.type ? formData.type : ""}
        onChange={onInputChange}
        data={[{ type: 'Company'}, { type: 'Customer'}]}
        valueKey="type"
        textKey="type" 
      />
    </Li>
  </>
}

export default WarehouseForm;