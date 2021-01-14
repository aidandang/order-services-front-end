import React, { useState } from 'react';

// components
import withMerchantData from './withMerchantData';
import { Card, Ul, Li, SelectInput } from '../tag/tag.comp';
import MerchantForm from './merchant-form.comp';

const Merchant = ({
  data
}) => {
  // convert merchant array to obj
  const mrchObj = {};
  if (data.allIds) {
    let i = 0;
    for (i = 0; i < data.allIds.length; i++) {
      mrchObj[data.allIds[i]._id] = data.allIds[i] 
    }
  }

  // set merchant id state to hold value of a selected input
  // set action state either add, edit or remove
  const [mrchId, setMrchId] = useState('');
  const [action, setAction] = useState('');

  // set id to the state for merchant changes in the select input
  const onInputChange = e => {
    e.preventDefault();
    const id = e.target.value

    if (mrchObj[id]) {
      setMrchId(mrchObj[id]._id)
    } else {
      setMrchId('')
    }
  }

  // 1 select input and 3 actions in a card
  return <>
    <Card title={'Merchants'}>
      <Ul>
        {
          action === '' && <>
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
        {
          action === 'add' &&
          <MerchantForm
            action={action}  
            setAction={setAction} 
          />    
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
      </Ul>
    </Card>
    
  </>
}

export default withMerchantData(Merchant);