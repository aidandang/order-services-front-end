import React, { useState } from 'react';

// components
import withBrandData from '../api/withBrandData';
import { Card, Ul, Li, SelectInput } from '../tag/tag.component';
import BrandEdit from './brand-edit.component';
import BrandRemove from './brand-remove.component';
import BrandAdd from './brand-add.component';

// main component
const Brand = ({
  data
}) => {

  const { allIds } = data;

  const initialState = {
    _id: '',
    name: '',
    preferredName: '',
    createdAt: ''
  }

  const [brand, setBrand] = useState(initialState);
  const [action, setAction] = useState('');

  const onInputChange = e => {
    e.preventDefault();

    const id = e.target.value;

    const selectedBrand = allIds.find(item => item._id === id)

    if (selectedBrand) {
      setBrand(prevState => ({ ...prevState, ...selectedBrand }))
    } else {
      setBrand(prevState => ({ ...prevState, ...initialState }))
    }
  }

  return <>
    <Card width="col" title={'Update Brand'}>
      <Ul>
        {
          action === 'add'
          ? 
          <BrandAdd setAction={setAction} />           
          :
          <>
            <Li>
              <SelectInput
                label="Brand List"
                name="brand"
                size="col-12"
                smallText="Select a brand to edit."
                defaultValue=""
                defaultText="..."
                value={brand._id}
                onChange={onInputChange}
                data={allIds ? allIds : []}
                valueKey={'_id'}
                textKey={'name'}
              />
            </Li>
            {
              brand._id !== "" && allIds.find(item => item._id === brand._id) &&
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
              <BrandEdit brand={brand} setAction={setAction} />
            }
            {
              action === 'remove' &&
              <BrandRemove brand={brand} setAction={setAction} />
            }
            <Li>
              <div className="row">
                <div className="col">
                  <a href="/" className="a-link-cs" onClick={e => {
                    e.preventDefault();
                    setAction('add')
                  }}>( + ) Add a New Brand</a>
                </div>
              </div>
            </Li>
          </>
        }
      </Ul>
    </Card>
  </>
}

export default withBrandData(Brand);