import React, { useState } from 'react'

// components
import withCourierData from './withCourierData'
import { Card, Ul, Li, SelectInput } from '../tag/tag.component'
import CourierForm from './courier-form.component'

const Courier = ({
  data
}) => {

  const courObj = {};
  if (data.allIds) {
    let i = 0;
    for (i = 0; i < data.allIds.length; i++) {
      courObj[data.allIds[i]._id] = data.allIds[i] 
    }
  }

  const [courId, setcourId] = useState('')
  const [action, setAction] = useState('')

  const onInputChange = e => {
    e.preventDefault();
    const id = e.target.value

    if (courObj[id]) {
      setcourId(courObj[id]._id)
    } else {
      setcourId('')
    }
  }

  return <>
    <Card width="col-12" title="Update Couriers">
      <Ul>
        {
          action === 'add'
          ? 
          <CourierForm 
            action={action} 
            setAction={setAction} 
          />           
          :
          <>
            <Li>
              <SelectInput
                label='Courier List'
                name='courId'
                smallText='Select a courier to edit.'
                defaultValue=''
                defaultText='...'
                value={courId}
                onChange={onInputChange}
                data={data.allIds ? data.allIds : []}
                valueKey='_id'
                textKey='name'
              />
            </Li>
            {
              courId !== "" && courObj[courId] &&
              <Li>
                <div className="row">
                  <div className="col">
                    {courObj[courId].name},
                    <span>{' '}</span> 
                    {courObj[courId].courNumber}
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
              <CourierForm
                courier={courObj[courId]} 
                action={action} 
                setAction={setAction} 
              />
            }
            {
              action === 'remove' &&
              <CourierForm 
                courier={courObj[courId]} 
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
                  }}>( + ) Add a New Courier</a>
                </div>
              </div>
            </Li>
          </>
        }
      </Ul>
    </Card>
  </>
}

export default withCourierData(Courier)