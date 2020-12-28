import React, { useEffect } from 'react'

// components
import AlertMesg from '../alert-mesg/alert-mesg.component'
import { integerMask } from '../utils/helpers';
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getReq } from '../../state/api/api.requests'
import { ItemActionTypes } from '../../state/item/item.types'
import { selectItemData } from '../../state/item/item.selectors' 
import { selectAlertMessage } from '../../state/alert/alert.selectors'
// constants
const pathname = '/items'
const fetchSuccess = ItemActionTypes.ITEM_FETCH_SUCCESS
const queryStr = '?itemStatus=ordered'
const component = 'incoming-items'


const IncomingItems = ({
  data,
  getReq,
  alertMessage
}) => {

  const { allIds } = data

  useEffect(() => {

    getReq(pathname, fetchSuccess, queryStr, null, component)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>
    { alertMessage && alertMessage.component === 'incoming-items' && <AlertMesg /> }

    <div className="row mb-2">
      <div className="col">
        <div className="table-responsive-sm">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Order#</th>
                <th scope="col">Product</th>
                <th scope="col" className="text-right">Qty</th>
                <th scope="col">Date</th>
                <th scope="col">Customer</th>
                <th scope="col">Merchant</th>
              </tr>
            </thead>
            
            {
              allIds && allIds.length > 0 
              ? 
              allIds.map(order => <tbody key={order._id}>
                <tr>
                  <td colSpan="6">{order._id}</td>
                </tr>
                {
                  order.items.map(item => <tr className="table-row-cs" key={item._id}>
                    <td></td>
                    <td>{item.product.name}</td>
                    <td className="text-right">{integerMask(item.qty.toString())}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>)
                }
              </tbody>)
              : <>
                <tbody>
                  <tr className="table-row-cs">
                    <td colSpan="7">No order needed to process.</td>
                  </tr>
                </tbody>
              </>
            }
            
          </table>
        </div>
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectItemData,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr, setSuccess, component) => dispatch(
    getReq(pathname, fetchSuccess, queryStr, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(IncomingItems)