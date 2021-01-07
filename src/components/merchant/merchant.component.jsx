import React, { useState } from 'react';

// components
import withMerchantData from './withMerchantData';
import { Li, SelectInput } from '../tag/tag.component';
import MerchantForm from './merchant-form.component';

const Merchant = ({
  data
}) => {

  const mrchObj = {};
  if (data.allIds) {
    let i = 0;
    for (i = 0; i < data.allIds.length; i++) {
      mrchObj[data.allIds[i]._id] = data.allIds[i] 
    }
  }

  const [mrchId, setMrchId] = useState('');
  const [action, setAction] = useState('');

  const onInputChange = e => {
    e.preventDefault();

    const id = e.target.value

    if (mrchObj[id]) {
      setMrchId(mrchObj[id]._id)
    } else {
      setMrchId('')
    }
  }

  return <>
    {
      action === 'add'
      ? 
      <MerchantForm
        action={action}  
        setAction={setAction} 
      />           
      :
      <>
        <Li>
          <SelectInput
            label="Merchant List"
            name="merchant"
            smallText="Select a merchant to edit."
            defaultValue=""
            defaultText="..."
            value={mrchId}
            onChange={onInputChange}
            data={data.allIds ? data.allIds : []}
            valueKey={'_id'}
            textKey={'name'}
          />
        </Li>
        {
          mrchId !== "" && mrchObj[mrchId] &&
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
          <MerchantForm 
            merchant={mrchObj[mrchId]}
            action={action} 
            setAction={setAction} 
          />
        }
        {
          action === 'remove' &&
          <MerchantForm
            merchant={mrchObj[mrchId]}
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
              }}>( + ) Add a New Merchant</a>
            </div>
          </div>
        </Li>
      </>
    }
  </>
}

export default withMerchantData(Merchant);