import React, { useState } from 'react'

// components
import withWarehouseData from '../api/withWarehouseData'
import { Card, Ul, Li, SelectInput } from '../tag/tag.component'
import WarehouseForm from './warehouse-form.component'

const Warehouse = ({
  data
}) => {

  const whseObj = {};
  if (data.allIds) {
    let i = 0;
    for (i = 0; i < data.allIds.length; i++) {
      whseObj[data.allIds[i]._id] = data.allIds[i] 
    }
  }

  const [whseId, setWhseId] = useState('')
  const [action, setAction] = useState('')

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
    <Card width="col-12" title="Update Warehouses">
      <Ul>
        {
          action === 'add'
          ? 
          <WarehouseForm
            action={action} 
            setAction={setAction} 
          />           
          :
          <>
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
      </Ul>
    </Card>
  </>
}

export default withWarehouseData(Warehouse)