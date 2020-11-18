import React from 'react';

// dependencies
import { useLocation, useHistory } from 'react-router-dom';

// components
import { acctToStr } from '../utils/acctToStr';
import { integerMask } from '../utils/helpers';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderData } from '../../state/order/order.selectors';
import { copyOrderItemToEdit } from '../../state/order/order.actions';

const OrderSale = ({ 
  data,
  copyOrderItemToEdit 
}) => {

  const location = useLocation();
  const history = useHistory();

  const { byId } = data;

  let sum = 0;

  const subTotalCalc = () => (qty, salePrice, shippingPrice) => {
    const value = (salePrice + shippingPrice) * qty;
    sum = sum + value;
    return acctToStr(value);
  }
  
  const subTotal = subTotalCalc();

  const percentageCalc = (salePrice, price) => {

    let p = 0;

    if (salePrice) {
      p = (salePrice - price) / price * 100
    }

    if (p === 0) {
      return '.00'
    } else {
      return p.toFixed(2)
    }
  }

  const editOrderItem = (item) => {
    const obj = { ...item }

    const salePrice = obj.salePrice > 0 ? acctToStr(obj.salePrice) : '';
    obj.salePrice = salePrice;
    const shippingPrice = obj.shippingPrice > 0 ? acctToStr(obj.shippingPrice) : '';
    obj.shippingPrice = shippingPrice;
    const weight = obj.weight > 0 ? acctToStr(obj.weight) : '';
    obj.weight = weight;

    obj.int = '';

    copyOrderItemToEdit(obj)
    history.push(`${location.pathname}/update-sale-price`)
  }

  return <>   
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
                <th scope="col" className="text-right">% Int</th>
                <th scope="col" className="text-right">Sale Price</th>
                <th scope="col" className="text-right">Shipping</th>
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
                    <td className="text-right">{percentageCalc(item.salePrice, item.price)}</td>
                    <td className="text-right">{item.salePrice > 0 ? acctToStr(item.salePrice) : '.00'}</td>
                    <td className="text-right">{item.shippingPrice > 0 ? acctToStr(item.shippingPrice) : '.00'}</td>
                    <th scope="row" className="text-right">
                      {subTotal(item.qty, item.salePrice, item.shippingPrice)}
                    </th>
                  </tr>
                ) 
              }
              <tr className="table-row-no-link-cs">
                <td className="text-right"></td>
                <td className="text-right"></td>
                <td className="text-right"></td>
                <td className="text-right"></td>
                <td className="text-right"></td>
                <td colSpan="2" className="text-right">Total</td>
                <td className="text-right">{acctToStr(sum)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

const mapDispatchToProps = dispatch => ({
  copyOrderItemToEdit: payload => dispatch(copyOrderItemToEdit(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSale);