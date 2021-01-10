import React, { useEffect } from 'react'

// dependencies
import * as Yup from "yup"
// components
import { WhiteCard, Ul, Li, TextInput, CloseTask } from '../tag/tag.component'
import { useForm } from '../hook/use-form'
import UpdateItemTab from './update-item-tab.comp'
import ProductList from '../product/product-list.comp'
import ProductAdd from '../product/product-add.comp'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { integerMask, integerStrToNum } from '../utils/helpers'
import { strToAcct } from '../utils/strToAcct'
import { acctToStr } from '../utils/acctToStr'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectItemTemp, selectOrderData, selectPurcItemTabActive } from '../../state/order/order.selectors'
import { setItemTempToEdit, setPurcItemTabActive, updateItemInOrder } from '../../state/order/order.actions'

// initial form state
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

const PurchasingItemForm = ({
  setIsItemForm,
  itemTemp,
  itemIndex,
  data,
  setItemTempToEdit,
  updateItemInOrder,
  active,
  setActive
}) => {

  const { byId } = data

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema)

  const setCloseTask = () => {
    setIsItemForm(null)
  }

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
    setIsItemForm(null)
  }

  const formReset = () => {
    setValues(prevState => ({
      ...prevState, ...formState
    }))
  }

  const handleRemoveButton = () => {
    var arr = null
    if (itemIndex >= 0) {
      arr = byId.items.filter((el, index) => index !== itemIndex)
    }
    updateItemInOrder({ ...byId, items: arr })
    setIsItemForm(null)
  }

  const handleCancelRemoveItemButton = () => {
    setActive('item')
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
      setItemTempToEdit({})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <div className="row">
      <div className="col">
        
        <CloseTask setCloseTask={setCloseTask} />

        <UpdateItemTab
          isEdit={formData.index ? true : false}
          isReselectProduct={formData.product ? true : false}
          itemIndex={itemIndex || undefined}
        />

        { active === 'select-product' && <ProductList /> }
        { active === 'add-product' && <ProductAdd isOrderCalled={true} /> }
        {
          active === 'item' && itemTemp.product && 
          <WhiteCard width="col" title={`${formData.index ? 'Edit Item' : 'Add Item'}`}>
            <Ul>
              <Li>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Name:</span></div>
                  <div className="col-8">{itemTemp.product.name}</div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Brand:</span></div>
                  <div className="col-8">{itemTemp.product.brand.name}</div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Style No:</span></div>
                  <div className="col-8">{itemTemp.product.styleCode}</div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Color:</span></div>
                  <div className="col-8">{itemTemp.color.color}</div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Description:</span></div>
                  <div className="col-8">{itemTemp.product.desc}</div>
                </div>
              </Li>
              <Li>
                <TextInput
                  label="Size" 
                  name="size"
                  size="col-xl-4"
                  errors={errors}
                  smallText="Size of the product."
                  value={formData.size}
                  onChange={onInputChange}
                />
              </Li>
              <Li>
                <div className="row">
                  <div className="col-xl-4">
                    <TextInput
                      label="Qty (*)" 
                      name="qty"
                      id="integerMask-order-item-form-qty"
                      errors={errors}
                      smallText="Qty of the item."
                      value={formData.qty}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-xl-4">
                    <TextInput
                      label="Unit Cost (*)" 
                      name="unitCost"
                      id="currencyMask-order-item-form-unitCost"
                      errors={errors}
                      smallText="Cost per unit."
                      value={formData.unitCost}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-xl-4">
                    <TextInput
                      label="Tax Rate (%) (*)" 
                      name="purTaxPct"
                      id="currencyMask-order-item-form-purTaxPct"
                      errors={errors}
                      smallText="Sales tax rate applied to the item in %."
                      value={formData.purTaxPct}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
              </Li>
              <Li>
                <TextInput
                  label="Note" 
                  name="note"
                  errors={errors}
                  smallText="Additional note to the item."
                  value={formData.note}
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
          </WhiteCard>
        }

        { 
          active === 'remove' && itemIndex >= 0 && 
          <WhiteCard>
            <Ul>
              <Li>
                <span>Remove this item from the order?</span>
              </Li>
              <SubmitOrReset
                buttonName={'Remove'}
                buttonDisabled={false}
                formSubmit={handleRemoveButton}
                formReset={handleCancelRemoveItemButton}
                secondButtonName={'Cancel'}
              />
            </Ul>
          </WhiteCard>
        }

      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  itemTemp: selectItemTemp,
  data: selectOrderData,
  active: selectPurcItemTabActive
})

const mapDispatchToProps = dispatch => ({
  setItemTempToEdit: itemTemp => dispatch(setItemTempToEdit(itemTemp)),
  updateItemInOrder: order => dispatch(updateItemInOrder(order)),
  setActive: payload => dispatch(setPurcItemTabActive(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchasingItemForm)