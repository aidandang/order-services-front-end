import React, { useState } from 'react'
 
// components
import { Card, Ul, Li } from '../tag/tag.component'
import Purchasing from './purchasing.comp'
import PurchasingItem from './purchasing-item.comp'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import PurchasingForm from './purchasing-form.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData } from '../../state/order/order.selectors'

const PurchasingUpdateSubmit = ({
  data
}) => {

  // set constants
  const { purchasing } = data.byId

  const [isInfoForm, setIsInfoForm] = useState(false)

  const handleSubmitButton = () => {

  }

  const handleResetButton = () => {
    
  }

  return <>
    
    <Card width="col-12" title="Purchasing Information">
      {
        isInfoForm 
        ? <PurchasingForm setIsInfoForm={setIsInfoForm} />
        : 
        <Ul>
          <Li>
            <a 
              href={'/'}
              className="a-link-cs"
              onClick={e => {
                e.preventDefault()
                setIsInfoForm(true)
              }}
            >
              { purchasing ? 'Update Purchasing Information' : 'Add Purchasing Information' }
            </a>
          </Li>
          {
            purchasing && <Purchasing purchasing={purchasing} />
          }
        </Ul>
      }
    </Card>
    <div className="row mb-2">
      <div className="col">
        <PurchasingItem />
      </div>
    </div>
  
    <Card width="col-12" title="Update">
      <Ul>
        <SubmitOrReset
          buttonName={'Submit'}
          buttonDisabled={true}
          formSubmit={handleSubmitButton}
          formReset={handleResetButton}
        />
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

export default connect(mapStateToProps)(PurchasingUpdateSubmit)