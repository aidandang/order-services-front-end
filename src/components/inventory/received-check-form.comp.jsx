import React, { useEffect } from 'react'

// dependencies
import * as Yup from 'yup'
import { useParams } from 'react-router-dom'
// components
import { Li, TextInput } from '../tag/tag.component'
import { useForm } from '../hook/use-form'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { integerStrToNum } from '../utils/helpers'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryData } from '../../state/inventory/inventory.selectors'
import { updateRecvItems } from '../../state/inventory/inventory.actions'
// initials
const formSchema = Yup.object().shape({
  qty: Yup.string().required(),
  desc: Yup.string().required()
})
const formState = {
  qty: "",
  desc: ""
}

const ReceivedCheckForm = ({
  data,
  itemEdit,
  setItemEdit,
  updateRecvItems
}) => {

  const params = useParams()
  const { trackingId } = params
  const tracking = data.trackings.find(el => el._id === trackingId)

  const [
    formData,
    errors,
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema)

  const formSubmit = () => {
    const obj = { ...formData }
    delete obj.index
    obj.qty = integerStrToNum(formData.qty)

    var items = [ ...tracking.recvItems ]

    if (formData.index !== undefined && formData.index !== 'add') {
      items[formData.index] = {
        ...items[formData.index], ...obj
      }      
    } else {
      items.push(obj)
    } 

    updateRecvItems(items, trackingId)
    setItemEdit({
      index: null
    })
  }

  const formReset = () => {
    setValues(formState)
  }

  useEffect(() => {
    if (itemEdit) {
      setValues(prevState => ({
        ...prevState, ...itemEdit
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  console.log(formData)

  return <>
    <Li>
      <TextInput
        label="Qty (*)" 
        name="qty"
        id="integerMask-received-trackings-qty"
        size="col-xl-6"
        errors={errors}
        smallText="Quantity of the item."
        value={formData.qty}
        onChange={onInputChange}
      />
    </Li>
    <Li>
      <TextInput
        label="Description (*)" 
        name="desc"
        errors={errors}
        smallText="Goods description."
        value={formData.desc}
        onChange={onInputChange}
      />
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
  data: selectInventoryData
})
const mapDispatchToProps = dispatch => ({
  updateRecvItems: (items, trackingId) => dispatch(updateRecvItems(items, trackingId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedCheckForm)