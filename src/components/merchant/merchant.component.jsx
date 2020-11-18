import React, { useState } from 'react';

// components
import withMerchantData from '../api/withMerchantData';
import { Li, SelectInput } from '../tag/tag.component';
import MerchantEdit from './merchant-edit.component';
import MerchantRemove from './merchant-remove.component';
import MerchantAdd from './merchant-add.component';

const Merchant = ({
  data
}) => {

  const { allIds } = data;

  const initialState = {
    _id: '',
    name: '',
    url: '',
    createdAt: ''
  }

  const [merchant, setMerchant] = useState(initialState);
  const [action, setAction] = useState('');

  const onInputChange = e => {
    e.preventDefault();

    const id = e.target.value;

    const selectedMerchant = allIds.find(item => item._id === id)

    if (selectedMerchant) {
      setMerchant(prevState => ({ ...prevState, ...selectedMerchant }))
    } else {
      setMerchant(prevState => ({ ...prevState, ...initialState }))
    }
  }

  return <>
    {
      action === 'add'
      ? 
      <MerchantAdd setAction={setAction} />           
      :
      <>
        <Li>
          <SelectInput
            label="Merchant List"
            name="merchant"
            smallText="Select a merchant to edit."
            defaultValue=""
            defaultText="..."
            value={merchant._id}
            onChange={onInputChange}
            data={allIds ? allIds : []}
            valueKey={'_id'}
            textKey={'name'}
          />
        </Li>
        {
          merchant._id !== "" && allIds.find(item => item._id === merchant._id) &&
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
          <MerchantEdit merchant={merchant} setAction={setAction} />
        }
        {
          action === 'remove' &&
          <MerchantRemove merchant={merchant} setAction={setAction} />
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