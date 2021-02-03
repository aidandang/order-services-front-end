import React, { useState } from 'react'

// components
import withWarehouseData from './withWarehouseData'
import { Card, Ul, Li, SelectInput } from '../tag/tag.comp'
import WarehouseForm from './warehouse-form.comp'

const Warehouse = ({ data }) => {
  // convert warehouse array to obj
  const whseObj = {}
  if (data.allIds) {
    let i = 0;
    for (i = 0; i < data.allIds.length; i++) {
      whseObj[data.allIds[i]._id] = data.allIds[i] 
    }
  }

  // set warehouse id state to hold value of a selected input
  // set action state either add, edit or remove
  const [whseId, setWhseId] = useState('')
  const [action, setAction] = useState('')

  // set id to the state for warehouse changes in the select input
  const onInputChange = e => {
    e.preventDefault();
    const id = e.target.value

    if (whseObj[id]) {
      setWhseId(whseObj[id]._id)
    } else {
      setWhseId('')
    }
  }

  return <>
    <Card title={'Warehouses'}>
      <Ul>
        {
          action === '' && <>
            <Li>
              <SelectInput
                label="Warehouse List"
                name="whseId"
                smallText="Select a warehouse to edit."
                defaultValue=""
                defaultText="..."
                value={whseId}
                onChange={onInputChange}
                data={data.allIds ? data.allIds : []}
                valueKey={'_id'}
                textKey={'name'}
              />
            </Li>
            {
              whseId !== "" && whseObj[whseId] &&
              <Li>
                <div className="row">
                  <div className="col">
                    {whseObj[whseId].name},
                    <span>{' '}</span> 
                    {whseObj[whseId].type}
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
        {
          action === 'add' &&
          <WarehouseForm
          action={action} 
          setAction={setAction} 
          />   
        }
        {
          action === 'edit' &&
          <WarehouseForm 
            warehouse={whseObj[whseId]}
            action={action} 
            setAction={setAction} 
          />
        }
        {
          action === 'remove' &&
          <WarehouseForm 
            warehouse={whseObj[whseId]} 
            action={action}
            setAction={setAction} 
          />
        }
      </Ul>
    </Card>
  </>
}

export default withWarehouseData(Warehouse)