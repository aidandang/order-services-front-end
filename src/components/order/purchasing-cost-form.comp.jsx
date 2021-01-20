import React, { useEffect } from 'react'

// dependencies
import * as Yup from "yup"
// components
import { Li, TextInput } from '../tag/tag.comp'
import { useForm } from '../hook/use-form'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { strToAcct } from '../utils/strToAcct'
import { acctToStr } from '../utils/acctToStr'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData } from '../../state/order/order.selectors'
import { updatePurchasingInOrder } from '../../state/order/order.actions'

// initial form state
const formSchema = Yup.object().shape({
  shippingCost: Yup.string(),
  purSalesTax: Yup.string(),
  otherCost: Yup.string(),
  purDiscount: Yup.string()
})
const formState = {
  shippingCost: "",
  purSalesTax: "",
  otherCost: "",
  purDiscount: ""
}

const PurchasingCostForm = ({
  closeComp,
  data,
  updatePurchasingInOrder
}) => {

  const { purchasing } = data.byId

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema)

  const formSubmit = () => {

    const obj = { ...formData };
  
    obj.shippingCost = formData.shippingCost === "" ? 0 : strToAcct(formData.shippingCost);
    obj.purSalesTax = formData.purSalesTax === "" ? 0 : strToAcct(formData.purSalesTax);
    obj.otherCost = formData.otherCost === "" ? 0 : strToAcct(formData.otherCost);
    obj.purDiscount = formData.purDiscount === "" ? 0 : strToAcct(formData.purDiscount);

    updatePurchasingInOrder({ 
      purchasing: {
        ...purchasing, ...obj
      }
    })
    closeComp()
  }

  const formReset = () => {
    setValues(formState)
  }

  useEffect(() => {
    if (purchasing) {
      setValues(prevState => ({
        ...prevState,
        shippingCost: purchasing.shippingCost > 0 ? acctToStr(purchasing.shippingCost) : '',
        purSalesTax: purchasing.purSalesTax > 0 ? acctToStr(purchasing.purSalesTax) : '',
        otherCost: purchasing.otherCost > 0 ? acctToStr(purchasing.otherCost) : '',
        purDiscount: purchasing.purDiscount > 0 ? acctToStr(purchasing.purDiscount) : ''
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <Li>
      <div className="row">
        <div className="col-xl-6">
          <TextInput
            label="Shipping Cost" 
            name="shippingCost"
            id="currencyMask-order-cost-form-shippingCost"
            size="col-xl-6"
            errors={errors}
            smallText="Local shipping cost."
            value={formData.shippingCost}
            onChange={onInputChange}
          />
        </div>
        <div className="col-xl-6">
          <TextInput
            label="Sales Tax" 
            name="purSalesTax"
            id="currencyMask-order-cost-form-purSalesTax"
            size="col-xl-6"
            errors={errors}
            smallText="Purchasing sales tax applied to the order."
            value={formData.purSalesTax}
            onChange={onInputChange}
          />
        </div>
      </div>
    </Li>
    <Li>
      <div className="row">
        <div className="col-xl-6">
          <TextInput
            label="Other Cost" 
            name="otherCost"
            id="currencyMask-order-cost-form-otherCost"
            size="col-xl-6"
            errors={errors}
            smallText="All other costs."
            value={formData.otherCost}
            onChange={onInputChange}
          />
        </div>
        <div className="col-xl-6">
          <TextInput
            label="Discount" 
            name="purDiscount"
            id="currencyMask-order-cost-form-purDiscount"
            size="col-xl-6"
            errors={errors}
            smallText="Discount applied to the order."
            value={formData.purDiscount}
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
  data: selectOrderData
})
const mapDispatchToProps = dispatch => ({
  updatePurchasingInOrder: payload => dispatch(updatePurchasingInOrder(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchasingCostForm);