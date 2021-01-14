import React, { useEffect } from 'react'

// dependencies
import * as Yup from "yup"
// components
import { Card, Ul, Li, TextInput } from '../tag/tag.comp'
import { useForm } from '../hook/use-form'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { integerStrToNum } from '../utils/helpers'
import { strToAcct } from '../utils/strToAcct'
import { acctToStr } from '../utils/acctToStr'
// redux
import { connect, batch } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData } from '../../state/order/order.selectors'
import { updateItemInOrder } from '../../state/order/order.actions'
// constants
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

const SellingItemForm = ({
  closeComp, // ownProps
  data,
  itemIndex,
  updateItemInOrder
}) => {

  const { byId } = data

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
    const cost = formData.unitCost * (1 + t) * exchangeRate / 100
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

    obj.unitShippingDong = integerStrToNum(formData.unitShippingDong) * 100
    obj.unitDong = integerStrToNum(formData.unitDong) * 100
    obj.weight = strToAcct(formData.weight)
    obj.exRate = exchangeRate
  
    const editItems = byId.items.map((item, index) => {
      if (index !== itemIndex) {
        return item
      }
      return { ...item, ...obj }
    })

    batch(() => {
      updateItemInOrder({ ...data.byId, items: editItems })
      closeComp()
    })
  }

  const formReset = () => {
    setValues(prevState => ({
      ...prevState, ...formState
    }))
  }

  useEffect(() => {
    var obj = null
    if (itemIndex >= 0) {
      obj = { ...byId.items[itemIndex] }
      obj.weight = byId.items[itemIndex].weight === 0 ? "" : acctToStr(byId.items[itemIndex].weight)
      obj.unitDong = byId.items[itemIndex].unitDong === 0 ? "" : acctToStr(byId.items[itemIndex].unitDong).split('.')[0]
      obj.unitShippingDong = byId.items[itemIndex].unitShippingDong === 0 ? "" : acctToStr(byId.items[itemIndex].unitShippingDong).split('.')[0]

      setValues(prevState => ({
        ...prevState, ...obj
      }))
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <Card title={'Edit'}>
      <Ul>
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
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})
const mapDispatchToProps = dispatch => ({
  updateItemInOrder: order => dispatch(updateItemInOrder(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellingItemForm)