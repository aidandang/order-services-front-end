import React, { useEffect } from 'react'

// dependencies
import * as Yup from 'yup'
// components
import { Li, TextInput } from '../tag/tag.comp'
import { useForm } from '../hook/use-form'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { integerStrToNum } from '../utils/helpers'
// redux
import { connect } from 'react-redux'
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
  tracking,
  closeComp,
  itemEdit,
  updateRecvItems
}) => {

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

    updateRecvItems(items, tracking._id)
    
    closeComp()
  }

  const formReset = () => {
    setValues(prevState => ({
      ...prevState, ...formState
    }))
  }

  useEffect(() => {
    if (itemEdit) {
      setValues(prevState => ({
        ...prevState, ...itemEdit
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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

const mapDispatchToProps = dispatch => ({
  updateRecvItems: (items, id) => dispatch(updateRecvItems(items, id))
})

export default connect(null, mapDispatchToProps)(ReceivedCheckForm)