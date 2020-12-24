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
  totalDong: Yup
    .string()
    .required(),
  int: Yup
    .string(),
  weight: Yup
    .string()
    .required()
})
const formState = {
  totalDong: "",
  int: "",
  weight: "",
  qty: ''
}

const SHIPPING_PRICE_PER_KG = 10
var exchangeRate = 24000

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

  var totalCost = 0
  if (byId) totalCost = byId.costing.totalCost

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
    const shippingPrice = SHIPPING_PRICE_PER_KG * strToAcct(weight)
    return shippingPrice * exchangeRate
  }

  const costIncludedTaxCalc = () => {
    const t = formData.purTaxPct/10000
    const cost = totalCost * (1 + t) * exchangeRate
    return acctToStr(Number(cost.toFixed(0))).split('.')[0]
  }

  const totalPriceCalc = (weight = 0) => {
    // cost included tax
    const t = formData.purTaxPct/10000
    const cost = totalCost * (1 + t) * exchangeRate

    // price based on % profit
    const p = strToAcct(formData.int)/10000
    const price = cost * (1 + p) + shippingPriceCalc(weight)

    return acctToStr(Number(price.toFixed(0))).split('.')[0]
  }
  
  const formSubmit = () => {
    const obj = { ...formData }
    delete obj.int
    delete obj.index

    const totalDong = strToAcct(formData.totalDong)

    obj.totalDong = totalDong
    obj.shippingDong = shippingPriceCalc(formData.weight)
    obj.weight = strToAcct(formData.weight)

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
    setValues(prevState => ({
      ...prevState,
      weight: "",
      int: "",
      totalDong: ""
    }))
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
                  label="Weight (kg) (*)" 
                  name="weight"
                  id="currencyMask-order-selling-form-weight"
                  errors={errors}
                  smallText={`Shipping per unit: đ${acctToStr(shippingPriceCalc(formData.weight)).split('.')[0]}`}
                  value={formData.weight}
                  onChange={onInputChange}
                />
              </div>
              <div className="col-xl-4">
                <div className="form-group">
                  <label htmlFor="qty">Quantity</label>
                  <input
                    name="qty"
                    type="text"
                    className="form-control"
                    value={formData.qty.toString()}
                    readOnly
                  />
                  <small>Number of units per item</small>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="form-group">
                  <label htmlFor="shippingDong">Shipping Price (đ)</label>
                  <input
                    name="shippingDong"
                    type="text"
                    className="form-control"
                    value={acctToStr(shippingPriceCalc(formData.weight) * formData.qty).split('.')[0]}
                    readOnly
                  />
                  <small>Total shipping price of the item</small>
                </div>
              </div>
            </div>
          </Li>
          <Li>
            <div className="row">
              <div className="col-xl-4">
                <div className="form-group">
                  <label htmlFor="costIncludedSalesTax">Cost (đ)</label>
                  <input
                    name="costIncludedSalesTax"
                    type="text"
                    className="form-control"
                    value={costIncludedTaxCalc(byId.costing.totalCost)}
                    readOnly
                  />
                  <small>{`Cost (incl. ${acctToStr(formData.purTaxPct)}% Tax).`}</small>
                </div>
              </div>
              <div className="col-xl-4">
                <TextInput
                  label="% Interest" 
                  name="int"
                  id="currencyMask-order-selling-form-int"
                  errors={errors}
                  smallText={"Price not included shipping: " + 
                    `đ${totalPriceCalc()}`
                  }
                  value={formData.int}
                  onChange={onInputChange}
                />
              </div>
              <div className="col-xl-4">
                <TextInput
                  label="Total Price" 
                  name="totalDong"
                  id="currencyMask-order-selling-form-totalDong"
                  errors={errors}
                  smallText={"Estimated Total Price: " + 
                    `đ${totalPriceCalc(formData.weight)}`
                  }
                  value={formData.totalDong}
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