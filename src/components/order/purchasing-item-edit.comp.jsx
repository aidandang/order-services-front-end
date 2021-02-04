import React, { useEffect } from 'react'

// dependencies
import * as Yup from "yup"
// components
import { Card, Ul, Li } from '../tag/tag.comp'
import { useForm } from '../hook/use-form'
import PurchasingItemTab from './purchasing-item-tab.comp'
import PurchasingItemInfo from './purchasing-item-info.comp'
import PurchasingItemForm from './purchasing-item-form.comp'
import PurchasingItemReceiving from './purchasing-item-receiving.comp'
import ProductList from '../product/product-list.comp'
import ProductAdd from '../product/product-add.comp'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { integerMask, integerStrToNum } from '../utils/helpers'
import { strToAcct } from '../utils/strToAcct'
import { acctToStr } from '../utils/acctToStr'
// redux
import { connect, batch } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectItemTemp, selectOrderData, selectOrderComp } from '../../state/order/order.selectors'
import { setItemTempToEdit, updateItemInOrder, orderSetComp } from '../../state/order/order.actions'
// constants
const formSchema = Yup.object().shape({
  size: Yup.string(),
  qty: Yup.string().required(),
  unitCost: Yup.string().required(),
  purTaxPct: Yup.string().required(),
  note: Yup.string()
})
const formState = {
  size: "",
  qty: "",
  unitCost: "",
  purTaxPct: "",
  note: ""
}
const WAREHOUSE_NUMBER = 1

const PurchasingItemEdit = ({
  itemIndex, // ownProps
  closeItemEdit, // ownProps
  data,
  itemTemp,
  setItemTempToEdit,
  updateItemInOrder,
  comp,
  setComp
}) => {

  const { byId } = data

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
    obj.orderNumber = byId.orderNumber
    obj.qty = integerStrToNum(formData.qty)
    obj.unitCost = strToAcct(formData.unitCost)
    obj.purTaxPct = strToAcct(formData.purTaxPct)
    obj.itemCost = integerStrToNum(formData.qty) * strToAcct(formData.unitCost)
    obj.product = { ...itemTemp.product}
    obj.color = { ...itemTemp.color }
    obj.warehouseNumber = WAREHOUSE_NUMBER
    
    let editItems = null

    if (itemIndex === undefined) {
      editItems = [ ...byId.items, obj ]
    } else {
      editItems = byId.items.map((item, index) => {
        if (index !== itemIndex) {
          return item
        }
        return { ...item, ...obj }
      })
    }

    updateItemInOrder({ ...byId, items: editItems })

    closeItemEdit()
  }

  const formReset = () => {
    setValues(prevState => ({
      ...prevState, ...formState
    }))
  }

  const handleRemove = () => {
    var arr = null
    if (itemIndex >= 0) {
      arr = byId.items.filter((el, index) => index !== itemIndex)
    }
    updateItemInOrder({ ...byId, items: arr })

    closeItemEdit()
  }

  const handleCancelRemove = () => {
    setComp('')
  }

  useEffect(() => {
    var obj = null
    if (itemIndex >= 0) {
      obj = { ...byId.items[itemIndex] }
      obj.qty = integerMask(byId.items[itemIndex].qty.toString())
      obj.unitCost = acctToStr(byId.items[itemIndex].unitCost)
      obj.purTaxPct = acctToStr(byId.items[itemIndex].purTaxPct)
      setValues(prevState => ({
        ...prevState, ...obj
      }))
    } 
    // clean up itemTemp in the state
    return () => {
      batch(() => {
        setComp('')
        setItemTempToEdit({})
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <PurchasingItemTab
      isEdit={formData.index ? true : false}
      isReselectProduct={formData.product ? true : false}
      itemIndex={itemIndex >= 0 ? itemIndex : undefined}
    />

    <div className="mb-3"></div>

    {
      comp === '' && itemTemp.product && 
      <Card>
        <Ul>
          <PurchasingItemInfo itemTemp={itemTemp} />
          <PurchasingItemForm
            errors={errors}
            formData={formData}
            onInputChange={onInputChange}
          />
          <SubmitOrReset
            buttonName={'Save'}
            buttonDisabled={buttonDisabled}
            formSubmit={formSubmit}
            formReset={formReset}
          />
        </Ul>
      </Card>
    }

    { comp === 'select-product' && <ProductList /> }

    { comp === 'add-product' && <ProductAdd isOrderCalled={true} /> }

    { 
      comp === 'remove' && itemIndex >= 0 && 
      <Card>
        <Ul>
          <Li>
            <span>Remove this item?</span>
          </Li>
          <SubmitOrReset
            buttonName={'Remove'}
            buttonDisabled={false}
            formSubmit={handleRemove}
            formReset={handleCancelRemove}
            secondButtonName={'Cancel'}
          />
        </Ul>
      </Card>
    }

    { comp === 'receiving' && <PurchasingItemReceiving order={byId} itemIndex={itemIndex} closeItemEdit={closeItemEdit} /> }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData,
  comp: selectOrderComp,
  itemTemp: selectItemTemp
})

const mapDispatchToProps = dispatch => ({
  setItemTempToEdit: itemTemp => dispatch(setItemTempToEdit(itemTemp)),
  updateItemInOrder: order => dispatch(updateItemInOrder(order)),
  setComp: comp => dispatch(orderSetComp(comp))
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchasingItemEdit)