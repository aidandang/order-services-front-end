import React, { useEffect } from 'react'

// dependencies
import * as Yup from "yup"
import { useLocation, useHistory, useParams, Redirect } from 'react-router-dom'
// components
import { Card, Ul, Li, TextInput } from '../tag/tag.component'
import { useForm } from '../hook/use-form'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { strToAcct } from '../utils/strToAcct'
import { acctToStr } from '../utils/acctToStr'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData, selectOrderOrder } from '../../state/order/order.selectors'
import { updateItemInOrder } from '../../state/order/order.actions'

// inital values
const formSchema = Yup.object().shape({
  price: Yup
    .string()
    .required(),
  shippingPrice: Yup
    .string()
    .required(),
  int: Yup
    .string(),
  weight: Yup
    .string()
    .required()
})

const formState = {
  price: "",
  shippingPrice: "",
  int: "",
  weight: ""
}

// main component
const OrderSellingForm = ({
  data,
  order,
  updateItemInOrder
}) => {

  const params = useParams()
  const location = useLocation()
  const history = useHistory()

  const { byId } = data
  const { orderId } = params

  // back to parent's route when update was success 
  // or history's action was POP leaded to no byId
  const parentRoute = location.pathname.split('/price')[0]

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema)

  const shippingPriceCalc = (weight) => {
    const price = 10

    const shippingPrice = price * weight
    return acctToStr(shippingPrice)
  }

  const salePriceCalc = (price, int) => {
    const p = int/10000
    const salePrice = price * (1 + p)
    const s = salePrice.toFixed(0)
    
    return acctToStr(Number(s))
  }
  
  const formSubmit = () => {
    const obj = { ...formData }
    delete obj.int
    delete obj.index

    const price = strToAcct(obj.price)
    obj.price = price
    const shippingPrice = strToAcct(obj.shippingPrice)
    obj.shippingPrice = shippingPrice
    const weight = strToAcct(obj.weight)
    obj.weight = weight

    let items = null
    
    if (formData.index !== null) {
      items = byId.items.map((item, index) => {
        if (index !== formData.index) {
          return item
        }
        return { ...item, ...obj }
      })

      updateItemInOrder({ ...order, items: items })
      history.push(parentRoute)
    }
  }

  const formReset = () => {
    setValues(formState)
  }

  useEffect(() => {
    if (location.state) setValues(prevState => ({
      ...prevState, ...location.state
    }))
    // eslint-disable-next-line
  }, [location.state])

  return <>
    { 
      orderId && !byId 
      ? 
      <Redirect to={parentRoute} /> 
      :
      <Card width="col" title="Update Sale Price">
        <Ul>
          <Li>
            <div className="row">
              <div className="col-xl-4">
                <TextInput
                  label="% Interest" 
                  name="int"
                  id="currencyMask-order-sale-item-form-int"
                  errors={errors}
                  smallText={`Estimated Sale Price: $${salePriceCalc(formData.itemCost, strToAcct(formData.int))}`}
                  value={formData.int}
                  onChange={onInputChange}
                />
              </div>
              <div className="col-xl-4">
                <TextInput
                  label="Price" 
                  name="price"
                  id="currencyMask-order-sale-item-form-price"
                  errors={errors}
                  smallText="Price if other than estimated."
                  value={formData.price}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </Li>
          <Li>
            <div className="row">
              <div className="col-xl-4">
                <TextInput
                  label="Weight" 
                  name="weight"
                  id="currencyMask-order-sale-item-form-weight"
                  errors={errors}
                  smallText={`Estimated Shipping Price: $${shippingPriceCalc(strToAcct(formData.weight))}`}
                  value={formData.weight}
                  onChange={onInputChange}
                />
              </div>
              <div className="col-xl-4">
                <TextInput
                  label="Shipping Price" 
                  name="shippingPrice"
                  id="currencyMask-order-sale-item-form-shipping-price"
                  errors={errors}
                  smallText="Sale price if other than estimated."
                  value={formData.shippingPrice}
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
  data: selectOrderData,
  order: selectOrderOrder
})

const mapDispatchToProps = dispatch => ({
  updateItemInOrder: item => dispatch(updateItemInOrder(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSellingForm)