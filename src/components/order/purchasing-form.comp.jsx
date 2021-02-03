import React from 'react'

// dependencies
import * as Yup from "yup"
import moment from 'moment'
// components
import { Card, Ul, Li, TextInput, SelectInput, DateInput } from '../tag/tag.comp'
import { useForm } from '../hook/use-form'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import Merchant from '../merchant/merchant.comp'
import Warehouse from '../warehouse/warehouse.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectMerchantData } from '../../state/merchant/merchant.selectors'
import { selectOrderData } from '../../state/order/order.selectors'
import { selectWarehouseData } from '../../state/warehouse/warehouse.selectors'
import { updatePurchasingInOrder } from '../../state/order/order.actions'

// inital values
const formSchema = Yup.object().shape({
  merchant: Yup.string().required(),
  orderNumber: Yup.string().required(),
  orderDate: Yup.string().required(),
  type: Yup.string().required(),
  warehouse: Yup.string().required()
})

const formState = {
  merchant: "",
  orderNumber: "",
  orderDate: "",
  type: "",
  warehouse: ""
}

const PurchasingForm = ({
  closeComp, // ownProps
  data,
  updatePurchasingInOrder,
  merchantData,
  warehouseData
}) => {

  const { byId } = data

  let orderEditing = null

  if (byId && byId.purchasing && byId.purchasing.orderNumber) {
    orderEditing = {
      merchant: byId.purchasing.merchant._id,
      orderNumber: byId.purchasing.orderNumber,
      orderDate: moment(byId.purchasing.orderDate).add(8, 'hours').format('yyyy-MM-DD'),
      type: byId.purchasing.type,
      warehouse: byId.purchasing.warehouse._id,
    }
  }

  let merchants = null
  let warehouses = null

  if (merchantData.allIds) merchants = merchantData.allIds
  if (warehouseData.allIds) warehouses = warehouseData.allIds

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(orderEditing ? orderEditing : formState, formState, formSchema)

  const formSubmit = () => {  
    const merchantObj = merchantData.allIds.find(item => item._id === formData.merchant)
    const warehouseObj = warehouseData.allIds.find(item => item._id === formData.warehouse)

    const obj = { 
      ...formData,
      merchant: merchantObj,
      warehouse: warehouseObj
    }

    updatePurchasingInOrder({
      warehouseNumber: warehouseObj.warehouseNumber,
      purchasing: { ...obj }
    })

    // close the component
    closeComp()
  }

  const formReset = () => {
    setValues(formState)
  }

  return <>
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="col-12 col-xl-8">
            <Card>
              <Ul>
                <Li>
                  <SelectInput
                    label="Merchant (*)" 
                    name="merchant"
                    errors={errors}
                    size="col-xl-6"
                    smallText="Select a merchant, add new if there is no merchant."
                    defaultValue=""
                    defaultText="..."
                    value={formData.merchant ? formData.merchant : ""}
                    onChange={onInputChange}
                    data={merchants}
                    valueKey="_id"
                    textKey="name"
                  />
                </Li>
                <Li>
                  <div className="row">
                    <div className="col-xl-6">
                      <TextInput
                        label="Order Number (*)" 
                        name="orderNumber"
                        errors={errors}
                        smallText="Order number is required."
                        value={formData.orderNumber}
                        onChange={onInputChange}
                      />
                    </div>
                    <div className="col-xl-6">
                      <DateInput
                        label="Order Date (*)" 
                        name="orderDate"
                        errors={errors}
                        smallText="Order date is required."
                        value={formData.orderDate}
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                </Li>
                <Li>
                  <SelectInput
                    label="Type (*)" 
                    name="type"
                    errors={errors}
                    size="col-xl-6"
                    smallText="Online or walk-in."
                    defaultValue=""
                    defaultText="Choose..."
                    value={formData.type ? formData.type : ""}
                    onChange={onInputChange}
                    data={[{ type: 'online'}, { type: 'walk-in'}, { type: 'shipping'}]}
                    valueKey="type"
                    textKey="type" 
                  />
                </Li>
                <Li>
                  <SelectInput
                    label="Warehouse (*)" 
                    name="warehouse"
                    errors={errors}
                    size="col-xl-6"
                    smallText="Select a warehouse, add new if there is no warehouse."
                    defaultValue=""
                    defaultText="..."
                    value={formData.warehouse ? formData.warehouse : ""}
                    onChange={onInputChange}
                    data={warehouses}
                    valueKey="_id"
                    textKey="name"
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
          </div>
          <div className="col-12 col-xl-4">
            <div className="mb-3 mb-xl-0"></div>
            <Merchant />
            <div className="mb-3"></div>
            <Warehouse /> 
          </div>
        </div>
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData,
  merchantData: selectMerchantData,
  warehouseData: selectWarehouseData
})

const mapDispatchToProps = dispatch => ({
  updatePurchasingInOrder: purchasing => dispatch(updatePurchasingInOrder(purchasing))
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchasingForm)