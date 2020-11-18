import React from 'react';

// dependencies
import { Link, useLocation, useHistory } from 'react-router-dom';

// components
import { acctToStr } from '../utils/acctToStr';
import { integerMask } from '../utils/helpers';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderData } from '../../state/order/order.selectors';
import { copyOrderItemToEdit } from '../../state/order/order.actions';

const OrderItem = ({
  data,
  copyOrderItemToEdit
}) => {

  const location = useLocation();
  const history = useHistory();

  const { byId } = data;

  let shippingCost = 0
  let saleTax = 0

  if (byId && byId.cost) {
    shippingCost = byId.cost.shippingCost
    saleTax = byId.cost.saleTax
  }

  let sum = 0;

  const subTotalCalc = () => (qty, price) => {
    const value = price * qty;
    sum = sum + value;
    return acctToStr(value);
  }
  
  const subTotal = subTotalCalc();

  const total = (sum, shippingCost, saleTax) => {
    return acctToStr(sum + shippingCost + saleTax)
  }

  const editOrderItem = (item) => {
    const obj = { ...item }

    const price = acctToStr(obj.price);
    obj.price = price;
    const qty = integerMask(obj.qty.toString())
    obj.qty = qty;

    copyOrderItemToEdit(obj)
    history.push(`${location.pathname}/update-order-item`)
  }

  const addOrderItem = () => {
    copyOrderItemToEdit({})
    history.push(`${location.pathname}/update-order-item`)
  }

  return <>
    {/* Item Table */}
    <div className="row mb-2">
      <div className="col">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Style#</th>
                <th scope="col">Item/Description</th>
                <th scope="col" className="text-right">Qty</th>
                <th scope="col" className="text-right">Price</th>
                <th scope="col" className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {byId && byId.items.length > 0 &&
                byId.items.map((item, index) => 
                  <tr 
                    key={index} 
                    className="table-row-no-link-cs span-link-cs"
                    onClick={e => {
                      editOrderItem(item);
                    }}
                  >
                    <td>{item.product.styleCode}</td>
                    <td>{`${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                    <td className="text-right">{integerMask(item.qty.toString())}</td>
                    <td className="text-right">{acctToStr(item.price)}</td>
                    <th scope="row" className="text-right">
                      {subTotal(item.qty, item.price)}
                    </th>
                  </tr>
                ) 
              }
              {
                byId && byId.items.length > 0 && <>
                  <tr className="table-row-no-link-cs">
                    <td colSpan="6" className="text-left">
                      <Link 
                        to={`${location.pathname}/update-order-cost`}
                        className="a-link-cs"
                      >
                        Update Cost
                      </Link>
                    </td>
                  </tr>
                  <tr className="table-row-no-link-cs">
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td colSpan="2" className="text-right">Subtotal</td>
                    <td className="text-right">{acctToStr(sum)}</td>
                  </tr>
                  <tr className="table-row-no-link-cs">
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td colSpan="2" className="text-right">Local Sale Tax</td>
                    <td className="text-right">{saleTax > 0 ? acctToStr(saleTax) : '.00'}</td>
                  </tr>
                  <tr className="table-row-no-link-cs">
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td colSpan="2" className="text-right">Local Shipping</td>
                    <td className="text-right">{shippingCost > 0 ? acctToStr(shippingCost) : '.00'}</td>
                  </tr>
                  <tr className="table-row-no-link-cs">
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <th scope="row" colSpan="2" className="text-right">Total</th>
                    <th scope="row" className="text-right">{total(sum, shippingCost, saleTax)}</th>
                  </tr>
                </>
              }
            
              <tr className="table-row-no-link-cs">
                <td colSpan="6">
                  <Link
                    to={`${location.pathname}/update-order-item`}
                    className="a-link-cs"
                    onClick={e => { 
                      e.preventDefault();
                      addOrderItem();
                    }}
                  >
                    Add Item
                  </Link>
                </td>
              </tr>
                
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* End of Item Table */}
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

const mapDispatchToProps = dispatch => ({
  copyOrderItemToEdit: payload => dispatch(copyOrderItemToEdit(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);