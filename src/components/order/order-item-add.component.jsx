import React, { useEffect } from 'react'

// dependencies
import { Link, useLocation, useHistory } from 'react-router-dom'
// components
import AlertMesg from '../alert-mesg/alert-mesg.component'
import { acctToStr } from '../utils/acctToStr'
import { integerMask } from '../utils/helpers'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectItemData } from '../../state/item/item.selectors'
import { getReq } from '../../state/api/api.requests'
import { ItemActionTypes } from '../../state/item/item.types'
import { selectAlertMessage } from '../../state/alert/alert.selectors'

const OrderItem = ({
  orderNumber,
  data,
  alertMessage,
  getReq
}) => {

  const location = useLocation()
  const history = useHistory()
  const { allIds } = data

  const pathname = '/items'
  const fetchSuccess = ItemActionTypes.ITEM_FETCH_SUCCESS
  const queryStr = `?orderNumber=${orderNumber}`
  const component = 'order-item'
  
  useEffect(() => {
    getReq(pathname, fetchSuccess, queryStr, null, component)
    // eslint-disable-next-line
  }, [])

  return <>

    { alertMessage && alertMessage.component === component && <AlertMesg /> }

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
                <th scope="col" className="text-right">Item Cost</th>
                <th scope="col" className="text-right">Sales Tax</th>
                <th scope="col" className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {
                allIds && allIds.length > 0 
                ? <>
                  { 
                    allIds.map((item, index) => 
                      <tr 
                        key={index} 
                        className="table-row-no-link-cs span-link-cs"
                        onClick={e => {
                          e.preventDefault()
                          history.push(`${location.pathname}/item`, item )
                        }}
                      >
                        <td>{item.product.styleCode}</td>
                        <td>{`${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                        <td className="text-right">{integerMask(item.qty.toString())}</td>
                        <td className="text-right">{acctToStr(item.unitCost)}</td>
                        <th scope="row" className="text-right">{acctToStr(item.itemCost)}</th>
                      </tr>
                    )
                  } 
                </>
                : <>
                  <tr className="table-row-no-link-cs">
                    <td colSpan="6">
                      <Link
                        to={`${location.pathname}/item`}
                        className="a-link-cs"
                      >
                        Add Item
                      </Link>
                    </td>
                  </tr>
                </>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* End of Item Table */}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);