import React, { useState } from 'react'

// components
import withConsigneeData from './withConsigneeData'
import { Card, Ul, Li, SelectInput } from '../tag/tag.component'
import ConsigneeForm from './consignee-form.component'

const Consignee = ({
  data
}) => {

  const cneeObj = {};
  if (data.allIds) {
    let i = 0;
    for (i = 0; i < data.allIds.length; i++) {
      cneeObj[data.allIds[i]._id] = data.allIds[i] 
    }
  }

  const [cneeId, setCneeId] = useState('')
  const [action, setAction] = useState('')

  const onInputChange = e => {
    e.preventDefault();
    const id = e.target.value

    if (cneeObj[id]) {
      setCneeId(cneeObj[id]._id)
    } else {
      setCneeId('')
    }
  }

  return <>
    <Card width="col-12" title="Update Consignees">
      <Ul>
        {
          action === 'add'
          ? 
          <ConsigneeForm 
            action={action} 
            setAction={setAction} 
          />           
          :
          <>
            <Li>
              <SelectInput
                label='Consignee List'
                name='cneeId'
                smallText='Select a consignee to edit.'
                defaultValue=''
                defaultText='...'
                value={cneeId}
                onChange={onInputChange}
                data={data.allIds ? data.allIds : []}
                valueKey='_id'
                textKey='name'
              />
            </Li>
            {
              cneeId !== "" && cneeObj[cneeId] &&
              <Li>
                <div className="row">
                  <div className="col">
                    {cneeObj[cneeId].name},
                    <span>{' '}</span> 
                    {cneeObj[cneeId].cneeNumber}
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
              <ConsigneeForm
                consignee={cneeObj[cneeId]} 
                action={action} 
                setAction={setAction} 
              />
            }
            {
              action === 'remove' &&
              <ConsigneeForm 
                consignee={cneeObj[cneeId]} 
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
                  }}>( + ) Add a New Consignee</a>
                </div>
              </div>
            </Li>
          </>
        }
      </Ul>
    </Card>
  </>
}

export default withConsigneeData(Consignee)