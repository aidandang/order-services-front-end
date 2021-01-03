import React, { useEffect } from 'react'

// dependencies
import * as Yup from "yup"
// components
import { Li, TextInput } from '../tag/tag.component'
import { useForm } from '../hook/use-form'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { strToAcct } from '../utils/strToAcct'
import { acctToStr } from '../utils/acctToStr'
import { integerStrToNum } from '../utils/helpers'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderOrder } from '../../state/order/order.selectors'
import { updateItemInOrder } from '../../state/order/order.actions'

// inital values
const formSchema = Yup.object().shape({
  int: Yup.string(),
  weight: Yup.string(),
  unitShippingDong: Yup.string(),
  unitDong: Yup.string()
})
const formState = {
  int: "",
  weight: "",
  unitShippingDong: "",
  unitDong: ""
}

const SHIPPING_PRICE_PER_KG = 10
var exchangeRate = 24000

// main component
const OrderSellingForm = ({
  order,
  updateItemInOrder,
  itemEdit,
  setItemEdit
}) => {

  const { items } = order

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema)

  const shippingPriceCalc = () => {
    const weight = strToAcct(formData.weight)
    const shippingPrice = SHIPPING_PRICE_PER_KG * weight
    return shippingPrice * exchangeRate
  }

  const costIncludedTaxCalc = () => {
    const t = formData.purTaxPct/10000
    const cost = formData.itemCost * (1 + t) * exchangeRate / 100
    return Number(cost.toFixed(0)) * 100
  }

  const priceCalc = () => {
    // cost included tax
    const cost = costIncludedTaxCalc()

    // price based on % profit
    const p = strToAcct(formData.int)/10000
    const price = cost * (1 + p) / 100

    return Number(price.toFixed(0)) * 100
  }
  
  const formSubmit = () => {
    const obj = { ...formData }
    delete obj.int
    delete obj.index

    obj.unitShippingDong = integerStrToNum(formData.unitShippingDong) * 100
    obj.unitDong = integerStrToNum(formData.unitDong) * 100
    obj.weight = strToAcct(formData.weight)
    obj.exRate = exchangeRate  

    updateItemInOrder({ 
      ...order, 
      items: items.map((item, index) => {
        if (index !== formData.index) {
          return item
        }
        return { ...item, ...obj }
      }) 
    })
    
    setItemEdit({
      index: null
    })
  }

  const formReset = () => {
    setValues(prevState => ({
      ...prevState,
      weight: "",
      int: "",
      unitShippingDong: "",
      unitDong: ""
    }))
  }

  useEffect(() => {
    if (itemEdit) setValues(prevState => ({
      ...prevState, ...itemEdit
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <Li>
      <div className="row">
        <div className="col-xl-6">
          <TextInput
            label="% Est. Interest" 
            name="int"
            id="currencyMask-order-selling-form-int"
            errors={errors}
            smallText={`Cost (inc. ${acctToStr(formData.purTaxPct)}% sales tax): đ${acctToStr(costIncludedTaxCalc()).split('.')[0]}`}
            value={formData.int}
            onChange={onInputChange}
          />
        </div>
        <div className="col-xl-6">
          <TextInput
            label="Unit Price" 
            name="unitDong"
            id="integerMask-order-selling-form-unitDong"
            errors={errors}
            smallText={`Estimated Price: đ${acctToStr(priceCalc()).split('.')[0]}`}
            value={formData.unitDong}
            onChange={onInputChange}
          />
        </div>
      </div>
    </Li>
    <Li>
      <div className="row">
        <div className="col-xl-6">
          <TextInput
            label="Weight (kg) (*)" 
            name="weight"
            id="currencyMask-order-selling-form-weight"
            errors={errors}
            smallText="Weight of each unit in the item (kg)."
            value={formData.weight}
            onChange={onInputChange}
          />
        </div>
        <div className="col-xl-6">
          <TextInput
            label="Unit Shipping Price" 
            name="unitShippingDong"
            id="integerMask-order-selling-form-unitShippingDong"
            errors={errors}
            smallText={`Estimated price: đ${acctToStr(shippingPriceCalc()).split('.')[0]}`}
            value={formData.unitShippingDong}
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
  </>
}

const mapStateToProps = createStructuredSelector({
  order: selectOrderOrder
})

const mapDispatchToProps = dispatch => ({
  updateItemInOrder: item => dispatch(updateItemInOrder(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSellingForm)