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
  discount: Yup.string()
})
const formState = {
  discount: ""
}

const OrderPriceForm = ({
  order,
  updateItemInOrder,
  setAction
}) => {

  const { selling } = order

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema)

  const formSubmit = () => {

    const obj = { ...formData };
  
    obj.discount = formData.discount === "" ? 0 : strToAcct(formData.discount);

    updateItemInOrder({ ...order, selling: { ...order.selling,  ...obj } })
    setAction(false)
  }

  const formReset = () => {
    setValues(formState)
  }

  useEffect(() => {
    if (selling) {
      setValues(prevState => ({
        ...prevState,
        discount: selling.discount ? acctToStr(selling.discount) : ''
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <Card width="col" title="Update Sales Tax and Other">
      <Ul>
        <Li>
          <TextInput
            label="Discount (đ)" 
            name="discount"
            id="currencyMask-order-cost-form-discount"
            size="col-xl-6"
            errors={errors}
            smallText="Applied discount to the total price (in VND)."
            value={formData.discount}
            onChange={onInputChange}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderPriceForm);