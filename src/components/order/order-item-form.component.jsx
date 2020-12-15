import React, { useEffect } from 'react'

// dependencies
import * as Yup from "yup";
import { Link, useLocation, useHistory, useParams, Redirect } from 'react-router-dom'
// components
import { Card, Ul, Li, TextInput } from '../tag/tag.component'
import { useForm } from '../hook/use-form'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { integerStrToNum } from '../utils/helpers'
import { strToAcct } from '../utils/strToAcct'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData } from '../../state/order/order.selectors'
import { updateItemInOrder } from '../../state/order/order.actions'

// initial form state
const formSchema = Yup.object().shape({
  product: Yup
    .object(),
  color: Yup
    .object(),
  size: Yup
    .string(),
  qty: Yup
    .string()
    .required(),
  unitCost: Yup
    .string()
    .required(),
  note: Yup
    .string()
})

const formState = {
  index: null,
  product: null,
  color: null,
  size: "",
  qty: "",
  unitCost: "",
  note: ""
}

// main component
const OrderItemForm = ({
  data,
  updateItemInOrder
}) => {

  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  const { byId } = data;
  const { orderId } = params;

  // back to parent's route when update was success 
  // or history's action was POP leaded to no byId
  const parentRoute = location.pathname.split('/item')[0];

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema);

  const { product, color } = formData;

  const formSubmit = () => {

    const obj = { ...formData };
    delete obj.index
    const qty = integerStrToNum(obj.qty);
    obj.qty = qty;
    const unitCost = strToAcct(obj.unitCost);
    obj.unitCost = unitCost;
    const itemCost = qty * unitCost
    obj.itemCost = itemCost
    
    let items = null

    if (formData.index === null) {
      items = [ ...byId.items, obj ]
    } else {
      items = byId.items.map((item, index) => {
        if (index !== formData.index) {
          return item
        }
        return { ...item, ...obj }
      })
    }

    updateItemInOrder({ ...byId, items: items })
    history.push(parentRoute)
  }

  const formReset = () => {
    setValues(formState);
  }

  useEffect(() => {
    if (location.state) setValues(prevState => ({
      ...prevState, ...location.state
    }))
    // eslint-disable-next-line
  }, [location.state])

  return <>
    { 
      orderId && !byId 
      ? 
      <Redirect to={parentRoute} /> 
      :
      <Card width="col" title={`${formData.index ? 'Edit Item' : 'Add Item'}`}>
        <Ul>
          <Li>
            <div className="row">
              <div className="col-12">
                <Link 
                  to={`${location.pathname}/select-product`} 
                  className="a-link-cs"
                >
                  {formData.product ? 'Reselect Product' : 'Select Product'}
                </Link>
              </div>
            </div>
          </Li>
          {
            formData.product && <>
              <Li>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Name:</span></div>
                  <div className="col-8">{product.name}</div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Brand:</span></div>
                  <div className="col-8">{product.brand.name}</div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Style No:</span></div>
                  <div className="col-8">{product.styleCode}</div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Color:</span></div>
                  <div className="col-8">{color.color}</div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Description:</span></div>
                  <div className="col-8">{product.desc}</div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col-xl-4">
                    <TextInput
                      label="Size" 
                      name="size"
                      errors={errors}
                      smallText="Size of the product."
                      value={formData.size}
                      onChange={onInputChange}
                    />
                  </div>
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
                      id="currencyMask-order-item-form-cost"
                      errors={errors}
                      smallText="Cost per unit."
                      value={formData.unitCost}
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
            </>
          }
        </Ul>
      </Card>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

const mapDispatchToProps = dispatch => ({
  updateItemInOrder: order => dispatch(updateItemInOrder(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderItemForm);