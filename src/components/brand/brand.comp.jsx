import React, { useState } from 'react'

// components
import withBrandData from './withBrandData'
import { Card, Ul, Li, SelectInput } from '../tag/tag.comp'
import BrandForm from './brand-form.comp'

const Brand = ({ data }) => {
  // convert brand array to obj
  const brndObj = {}
  if (data.allIds) {
    let i = 0
    for (i = 0; i < data.allIds.length; i++) {
      brndObj[data.allIds[i]._id] = data.allIds[i] 
    }
  }

  // set brand id state to hold value of a selected input
  // set action state either add, edit or remove
  const [brndId, setBrndId] = useState('')
  const [action, setAction] = useState('')

  // set id to the state for brand changes in the select input
  const onInputChange = e => {
    e.preventDefault()
    const id = e.target.value

    if (brndObj[id]) {
      setBrndId(brndObj[id]._id)
    } else {
      setBrndId('')
    }
  }

  // 1 select input and 3 actions in a card
  return <>
    <Card title={'Brands'}>
      <Ul>
        {
          action === '' && <>
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
                textKey="preferredName"
              />
            </Li>
            {
              brndId !== "" && brndObj[brndId] &&
              <Li>
                <div className="row">
                  <div className="col">
                    <a href="/" className="a-link-cs" onClick={e => {
                      e.preventDefault()
                      setAction('edit')
                    }}>Edit</a>
                    <span>{' | '}</span>
                    <a href="/" className="a-link-cs" onClick={e => {
                      e.preventDefault()
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
                    e.preventDefault()
                    setAction('add')
                  }}>( + ) Add a New Brand</a>
                </div>
              </div>
            </Li>
          </>
        }  
        {
          action === 'add' &&
          <BrandForm
            action={action}  
            setAction={setAction} 
          />
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
      </Ul>
    </Card>
  </>
}

export default withBrandData(Brand)