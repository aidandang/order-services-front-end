import React from 'react';

// dependencies
import * as Yup from "yup"
import { useLocation, useHistory, useParams, Redirect } from 'react-router-dom'
// components
import { Card, Ul, Li, TextInput } from '../tag/tag.component'
import { useForm } from '../hook/use-form'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { strToAcct } from '../utils/strToAcct'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData } from '../../state/order/order.selectors'
import { updateItemInOrder } from '../../state/order/order.actions'

// initial form state
const formSchema = Yup.object().shape({
  salesTax: Yup.string(),
  otherCost: Yup.string()
})
const formState = {
  salesTax: "",
  otherCost: ""
}

const OrderCostForm = ({
  data,
  updateItemInOrder
}) => {
  const params = useParams()
  const location = useLocation()
  const history = useHistory()

  const { byId } = data
  const { orderId } = params

  // back to parent's route when update was success 
  // or history's action was POP leaded to no byId
  const parentRoute = location.pathname.split('/cost')[0]

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema)

  const formSubmit = () => {

    const obj = { ...formData };
  
    obj.salesTax = formData.salesTax === "" ? 0 : strToAcct(formData.salesTax);
    obj.otherCost = formData.otherCost === "" ? 0 : strToAcct(formData.otherCost);

    updateItemInOrder({ ...byId, purchasing: { ...byId.purchasing,  ...obj } })
    history.push(parentRoute)
  }

  const formReset = () => {
    setValues(formState)
  }

  return <>
    { 
      orderId && !byId 
      ? 
      <Redirect to={parentRoute} /> 
      :
      <Card width="col" title={`${formData.index ? 'Edit Item' : 'Add Item'}`}>
        <Ul>
          <Li>
            <div className="row">
              <div className="col-xl-4">
                <TextInput
                  label="Sales Tax" 
                  name="salesTax"
                  id="currencyMask-order-cost-form-salesTax"
                  errors={errors}
                  size="col-xl-6"
                  smallText="Sale tax applied to this order. Leave empty if there is no tax"
                  value={formData.salesTax}
                  onChange={onInputChange}
                />
              </div>
              <div className="col-xl-4">
                <TextInput
                  label="Other Cost" 
                  name="otherCost"
                  id="currencyMask-order-cost-form-otherCost"
                  errors={errors}
                  size="col-xl-6"
                  smallText="All other costs. Leave empty if there is no cost"
                  value={formData.otherCost}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </Li>
          <SubmitOrReset
            buttonName={'Save'}
            buttonDisabled={buttonDisabled}
            formSubmit={formSubmit}
            formReset={formReset}
          />
        </Ul>
      </Card>
    }  
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})
const mapDispatchToProps = dispatch => ({
  updateItemInOrder: order => dispatch(updateItemInOrder(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCostForm);