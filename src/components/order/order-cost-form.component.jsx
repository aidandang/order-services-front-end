import React, { useEffect } from 'react'

// dependencies
import * as Yup from "yup"
// components
import { Card, Ul, Li, TextInput } from '../tag/tag.component'
import { useForm } from '../hook/use-form'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { strToAcct } from '../utils/strToAcct'
import { acctToStr } from '../utils/acctToStr'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderOrder } from '../../state/order/order.selectors'
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
  order,
  updateItemInOrder,
  setAction
}) => {

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

    updateItemInOrder({ ...order, costing: { ...order.costing,  ...obj } })
    setAction('')
  }

  const formReset = () => {
    setValues(formState)
  }

  useEffect(() => {
    if (order.costing && Object.keys(order.costing).length > 0) {
      setValues(prevState => ({
        ...prevState,
        salesTax: acctToStr(order.costing.salesTax), 
        otherCost: acctToStr(order.costing.otherCost)
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <Card width="col" title="Update Sales Tax and Other">
      <Ul>
        <Li>
          <div className="row">
            <div className="col-xl-6">
              <TextInput
                label="Sales Tax" 
                name="salesTax"
                id="currencyMask-order-cost-form-salesTax"
                errors={errors}
                smallText="Sale tax applied to this order. Leave empty if there is no tax"
                value={formData.salesTax}
                onChange={onInputChange}
              />
            </div>
            <div className="col-xl-6">
              <TextInput
                label="Other Cost" 
                name="otherCost"
                id="currencyMask-order-cost-form-otherCost"
                errors={errors}
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
  </>
}

const mapStateToProps = createStructuredSelector({
  order: selectOrderOrder
})
const mapDispatchToProps = dispatch => ({
  updateItemInOrder: order => dispatch(updateItemInOrder(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCostForm);