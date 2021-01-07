import React, { useState } from 'react';

// components
import withBrandData from './withBrandData';
import { Li, SelectInput } from '../tag/tag.component';
import BrandForm from './brand-form.component';

const Brand = ({
  data
}) => {

  const brndObj = {};
  if (data.allIds) {
    let i = 0;
    for (i = 0; i < data.allIds.length; i++) {
      brndObj[data.allIds[i]._id] = data.allIds[i] 
    }
  }

  const [brndId, setBrndId] = useState('');
  const [action, setAction] = useState('');

  const onInputChange = e => {
    e.preventDefault();
    const id = e.target.value;

    if (brndObj[id]) {
      setBrndId(brndObj[id]._id)
    } else {
      setBrndId('')
    }
  }

  return <>
    {
      action === 'add'
      ? 
      <BrandForm
        action={action}  
        setAction={setAction} 
      />           
      :
      <>
        <Li>
          <SelectInput
            label="Brand List"
            name="brndId"
            smallText="Select a brand to edit."
            defaultValue=""
            defaultText="..."
            value={brndId}
            onChange={onInputChange}
            data={data.allIds ? data.allIds : []}
            valueKey="_id"
            textKey="name"
          />
        </Li>
        {
          brndId !== "" && brndObj[brndId] &&
          <Li>
            <div className="row">
              <div className="col">
                <a href="/" className="a-link-cs" onClick={e => {
                  e.preventDefault();
                  setAction('edit')
                }}>Edit</a>
                <span>{' | '}</span>
                <a href="/" className="a-link-cs" onClick={e => {
                  e.preventDefault();
                  setAction('remove')
                }}>Remove</a>
              </div>
            </div>
          </Li>
        }
        {
          action === 'edit' &&
          <BrandForm 
            brand={brndObj[brndId]} 
            action={action}
            setAction={setAction} 
          />
        }
        {
          action === 'remove' &&
          <BrandForm 
            brand={brndObj[brndId]} 
            action={action}
            setAction={setAction} 
          />
        }
        <Li>
          <div className="row">
            <div className="col">
              <a href="/" className="a-link-cs" onClick={e => {
                e.preventDefault();
                setAction('add')
              }}>( + ) Add a New Brand</a>
            </div>
          </div>
        </Li>
      </>
    } 
  </>
}

export default withBrandData(Brand);