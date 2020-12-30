import React, { useEffect } from 'react'

// dependencies
import * as Yup from 'yup'
// components
import { Card, Ul, Li, TextInput } from '../tag/tag.component'
import { useForm } from '../hook/use-form'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { integerStrToNum } from '../utils/helpers'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCheckingItems } from '../../state/inventory/inventory.selectors'
import { updateCheckedItems } from '../../state/inventory/inventory.actions'
// initials
const formSchema = Yup.object().shape({
  qty: Yup.string().required(),
  desc: Yup.string().required()
})
const formState = {
  qty: "",
  desc: ""
}

const ReceivedTrackingsItemForm = ({
  idx,
  setIdx,
  checkingItems,
  updateCheckedItems
}) => {

  const [
    formData,
    errors,
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema)

  const formSubmit = () => {
    const obj = { ...formData };
    delete obj.index
    obj.qty = integerStrToNum(formData.qty);
    
    let items = null

    if (idx === 'add') {
      items = [ ...checkingItems, obj ]
    } else {
      items = checkingItems.map((item, index) => {
        if (index !== idx) {
          return item
        }
        return { ...item, ...obj }
      })
    }

    updateCheckedItems(items)
    setIdx(null)
  }

  const formReset = () => {
    setValues(formState)
  }

  // close the form
  const handleClosingForm = () => {
    setIdx(null)
  }

  useEffect(() => {
    if (idx !== 'add') setValues(prevState => ({
      ...prevState, ...checkingItems[idx]
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <Card 
      width="col" 
      title={idx === 'add' ? 'Add Item' : 'Edit Item'}
      action={{
        name: 'Close',
        handleAction: handleClosingForm
      }}
    >
      <Ul>
        <Li>
          <TextInput
            label="Qty" 
            name="qty"
            id="integerMask-received-trackings-qty"
            size="col-xl-6"
            errors={errors}
            smallText="Quantity of the item (required)."
            value={formData.qty}
            onChange={onInputChange}
          />
        </Li>
        <Li>
          <TextInput
            label="Description" 
            name="desc"
            errors={errors}
            smallText="Goods description (required)."
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
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  checkingItems: selectCheckingItems
})
const mapDispatchToProps = dispatch => ({
  updateCheckedItems: items => dispatch(updateCheckedItems(items))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedTrackingsItemForm)