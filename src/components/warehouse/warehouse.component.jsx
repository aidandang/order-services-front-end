import React, { useState } from 'react';

// components
import withWarehouseData from '../api/withWarehouseData';
import { Li, SelectInput } from '../tag/tag.component';
import WarehouseEdit from './warehouse-edit.component';
import WarehouseRemove from './warehouse-remove.component';
import WarehouseAdd from './warehouse-add.component';

const Warehouse = ({
  data
}) => {

  const { allIds } = data;

  const initialState = {
    _id: '',
    name: '',
    url: '',
    type: '',
    createdAt: ''
  }

  const [warehouse, setWarehouse] = useState(initialState);
  const [action, setAction] = useState('');

  const onInputChange = e => {
    e.preventDefault();

    const id = e.target.value;

    const selectedWarehouse = allIds.find(item => item._id === id)

    if (selectedWarehouse) {
      setWarehouse(prevState => ({ ...prevState, ...selectedWarehouse }))
    } else {
      setWarehouse(prevState => ({ ...prevState, ...initialState }))
    }
  }

  return <>
    {
      action === 'add'
      ? 
      <WarehouseAdd setAction={setAction} />           
      :
      <>
        <Li>
          <SelectInput
            label="Warehouse List"
            name="warehouse"
            smallText="Select a warehouse to edit."
            defaultValue=""
            defaultText="..."
            value={warehouse._id}
            onChange={onInputChange}
            data={allIds ? allIds : []}
            valueKey={'_id'}
            textKey={'name'}
          />
        </Li>
        {
          warehouse._id !== "" && allIds.find(item => item._id === warehouse._id) &&
          <Li>
            <div className="row">
              <div className="col">
                {allIds.find(item => item._id === warehouse._id).name},
                <span>{' '}</span> 
                {allIds.find(item => item._id === warehouse._id).type}
              </div>
            </div>
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
          <WarehouseEdit warehouse={warehouse} setAction={setAction} />
        }
        {
          action === 'remove' &&
          <WarehouseRemove warehouse={warehouse} setAction={setAction} />
        }
        <Li>
          <div className="row">
            <div className="col">
              <a href="/" className="a-link-cs" onClick={e => {
                e.preventDefault();
                setAction('add')
              }}>( + ) Add a New Warehouse</a>
            </div>
          </div>
        </Li>
      </>
    }
  </>
}

export default withWarehouseData(Warehouse);