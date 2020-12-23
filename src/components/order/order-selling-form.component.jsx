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
  totalPrice: Yup
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
  totalPrice: "",
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

    const shippingPrice = price * strToAcct(weight)
    return shippingPrice
  }

  const totalPriceCalc = (totalCost, int, weight) => {
    const p = strToAcct(int)/10000
    const price = totalCost * (1 + p) + shippingPriceCalc(weight)

    const priceInDollar = acctToStr(Number(price.toFixed(0)))
    const priceInDong = acctToStr(Number(price.toFixed(0)) * 24000).split('.')[0]

    return { priceInDollar, priceInDong }
  }
  
  const formSubmit = () => {
    const obj = { ...formData }
    delete obj.int
    delete obj.index

    const totalPrice = strToAcct(obj.totalPrice)
    obj.totalPrice = totalPrice
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
                  label="Weight" 
                  name="weight"
                  id="currencyMask-order-sale-item-form-weight"
                  errors={errors}
                  smallText={`Shipping per unit: đ${acctToStr(shippingPriceCalc(formData.weight) * 24000).split('.')[0]}`}
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
                  smallText={
                    `Total shipping estimated: $${acctToStr(shippingPriceCalc(formData.weight) * formData.qty * 24000).split('.')[0]}`
                  }
                  value={formData.shippingPrice}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </Li>
          <Li>
            <div className="row">
              <div className="col-xl-4">
                <TextInput
                  label="% Interest" 
                  name="int"
                  id="currencyMask-order-sale-item-form-int"
                  errors={errors}
                  smallText={"Price not included shipping: " + 
                    `đ${totalPriceCalc(byId.costing.totalCost, formData.int, '').priceInDong}`
                  }
                  value={formData.int}
                  onChange={onInputChange}
                />
              </div>
              <div className="col-xl-4">
                <TextInput
                  label="Total Price" 
                  name="totalPrice"
                  id="currencyMask-order-sale-item-form-totalPrice"
                  errors={errors}
                  smallText={"Estimated Total Price: " + 
                    `đ${totalPriceCalc(byId.costing.totalCost, formData.int, formData.weight).priceInDong}`
                  }
                  value={formData.totalPrice}
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