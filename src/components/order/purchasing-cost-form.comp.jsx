import React, { useEffect } from 'react'

// dependencies
import * as Yup from "yup"
// components
import { Card, Ul, Li, TextInput } from '../tag/tag.comp'
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
  otherCost: Yup.string()
})
const formState = {
  otherCost: ""
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
  
    obj.otherCost = formData.otherCost === "" ? 0 : strToAcct(formData.otherCost);

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
    if (purchasing && purchasing.otherCost) {
      setValues(prevState => ({
        ...prevState,
        otherCost: purchasing.otherCost === 0 ? '' : acctToStr(purchasing.otherCost)
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <Card width="col" title="Update Sales Tax, Other and Total">
      <Ul>
        <Li>
          <TextInput
            label="Other Cost" 
            name="otherCost"
            id="currencyMask-order-cost-form-otherCost"
            size="col-xl-6"
            errors={errors}
            smallText="All other costs. Leave empty if there aren't any."
            value={formData.otherCost}
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
  data: selectOrderData
})
const mapDispatchToProps = dispatch => ({
  updatePurchasingInOrder: payload => dispatch(updatePurchasingInOrder(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchasingCostForm);