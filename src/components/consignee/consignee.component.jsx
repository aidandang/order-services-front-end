import React, { useState } from 'react';

// components
import withConsigneeData from '../api/withConsigneeData';
import { Card, Ul, Li, SelectInput } from '../tag/tag.component';
import ConsigneeForm from './consignee-form.component';

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

  const initialState = {
    _id: '',
    name: '',
    country: '',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    createdAt: ''
  }

  const [consignee, setConsignee] = useState(initialState);
  const [action, setAction] = useState('');

  const onInputChange = e => {
    e.preventDefault();
    const id = e.target.value;

    if (cneeObj[id]) {
      setConsignee(prevState => ({ ...prevState, ...cneeObj[id] }))
    } else {
      setConsignee(prevState => ({ ...prevState, ...initialState }))
    }
  }

  return <>
    <Card width="col-12" title="Update Warehouses">
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
                name='consignee'
                smallText='Select a consignee to edit.'
                defaultValue=''
                defaultText='...'
                value={consignee._id}
                onChange={onInputChange}
                data={data.allIds ? data.allIds : []}
                valueKey='_id'
                textKey='name'
              />
            </Li>
            {
              consignee._id !== "" && cneeObj[consignee._id] &&
              <Li>
                <div className="row">
                  <div className="col">
                    {cneeObj[consignee._id].name},
                    <span>{' '}</span> 
                    {cneeObj[consignee._id].cneeNumber}
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
                consignee={cneeObj[consignee._id]} 
                action={action} 
                setAction={setAction} 
              />
            }
            {
              action === 'remove' &&
              <ConsigneeForm 
                consignee={cneeObj[consignee._id]} 
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

export default withConsigneeData(Consignee);