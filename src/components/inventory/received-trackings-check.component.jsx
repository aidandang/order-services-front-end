import React, { useState, useEffect } from 'react'

// dependencies
import { useLocation, Redirect, useHistory } from 'react-router-dom'
// components
import { Card, Ul } from '../tag/tag.component'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { integerMask } from '../utils/helpers'
import ReceivedTrackingsItemForm from './received-trackings-item-form.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCheckingItems } from '../../state/inventory/inventory.selectors'
import { patchReq } from '../../state/api/api.requests'
import { ReceivingActionTypes } from '../../state/receiving/receiving.types'
import { updateCheckedItems } from '../../state/inventory/inventory.actions'

const ReceivedTrackingsCheck = ({
  checkingItems,
  patchReq,
  updateCheckedItems
}) => {

  const location = useLocation()
  const history = useHistory()

  const [idx, setIdx ] = useState(null)
  const [success, setSuccess] = useState(false)

  // get previous path for coming back
  const prevPath = location.pathname.split('/check')[0]

  const formSubmit = () => {
    const pathname = `/receiving/${location.state.id}`
    const fetchSuccess = ReceivingActionTypes.RECEIVING_FETCH_SUCCESS
    const reqBody = {
      status: 'checked',
      items: [ ...checkingItems ]
    }
    const component = 'received-trackings-check'

    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  }

  const formReset = () => {

  }

  useEffect(() => {
    if (success) history.push(prevPath)
    // cleanup checked items
    return () => {
      updateCheckedItems([])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>
    {
      location.state && location.state.tracking 
      ? <>
        {
          idx !== null 
          ? <ReceivedTrackingsItemForm idx={idx} setIdx={setIdx} />
          : <>
            <div className="row mb-2">
              <div className="col">
                <div className="table-responsive-sm">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Tracking</th>
                        <th scope="col">Item Description</th>
                        <th scope="col">Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="col" colSpan="3">
                          {
                            location.state && location.state.tracking && 
                            <>
                              {location.state.tracking}
                            </>
                          }
                        </th>
                      </tr>
                      {
                        checkingItems.length > 0 
                        &&
                        checkingItems.map((item, index) => 
                          <tr 
                            key={index} 
                            className="table-row-cs"
                            onClick={e => {
                              e.preventDefault()
                              setIdx(index)
                            }} 
                          >
                            <td></td>
                            <td>{item.desc}</td>
                            <td>{integerMask(item.qty.toString())}</td>
                          </tr>
                        )
                      }
                      <tr className="table-row-cs">
                        <td colSpan="3">
                          <a
                            href="/"
                            className="a-link-cs"
                            onClick={e => {
                              e.preventDefault()
                              setIdx('add')
                            }}
                          >
                            Add Items
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Card title="Update Checking">
              <Ul>
                <SubmitOrReset
                  buttonName={'Check'}
                  buttonDisabled={checkingItems.length > 0 ? false : true}
                  formSubmit={formSubmit}
                  formReset={formReset}
                />
              </Ul>
            </Card>
          </>
        }
      </> 
      : <Redirect to={prevPath} />
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  checkingItems: selectCheckingItems
})
const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  ),
  updateCheckedItems: items => dispatch(updateCheckedItems(items))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedTrackingsCheck)