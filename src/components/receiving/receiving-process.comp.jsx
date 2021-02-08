import React, { useState, useEffect } from 'react'

// components
import { Card, Ul, Li } from '../tag/tag.comp'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
// redux
import { connect } from 'react-redux'
import { patchReq } from '../../state/api/api.requests'
import { ReceivingActionTypes } from '../../state/receiving/receiving.types'
// const
const component = 'receiving-process'
const statusTypes = ['received', 'processed', 'returned']

const ReceivingProcess = ({
  byId,
  setCloseTask,
  patchReq
}) => {  

  const [success, setSuccess] = useState(false)
  const [radio, setRadio] = useState(byId.status)

  const handleRadioOnChange = e => {
    e.stopPropagation()
    setRadio(e.target.value)
  }

  const handleRadioSubmit = () => {
    const reqBody = {}

    if (radio === 'processed') {
      reqBody.status = 'processed'
      reqBody.processedDate = Date.now()
      reqBody.returnedDate = null
    } else if (radio === 'returned') {
      reqBody.status = 'returned'
      reqBody.returnedDate = Date.now()
      reqBody.processedDate = null
    } else {
      reqBody.status = 'received'
      reqBody.processedDate = null
      reqBody.returnedDate = null
    }

    const pathname = `/receiving/${byId._id}`
    const fetchSuccess = ReceivingActionTypes.RECEIVING_FETCH_SUCCESS
    
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  }
    
  useEffect(() => {
    if (success) {
      setCloseTask()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])
 

  return <>
    <Card title="Update receiving status">
      <Ul>
        <div onChange={handleRadioOnChange}>
          <Li>
            {
              statusTypes.map((el, idx) => 
                <div className="row" key={idx}>
                  <div className="col align-self-center">
                    <div className="form-check">
                      <label className="form-check-label" htmlFor="status">
                        <input 
                          className="form-check-input" 
                          type="radio" 
                          name="status" 
                          value={el} 
                          defaultChecked={byId.status === el}
                        />
                          <span>{el}</span>
                      </label>
                    </div>
                  </div>
                </div>
              )
            }
          </Li>
          
          <SubmitOrReset
            buttonName={'Update Status'}
            buttonDisabled={byId.status === radio}
            formSubmit={handleRadioSubmit}
          />
        </div>
      </Ul>
    </Card>
  </>
}

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(null, mapDispatchToProps)(ReceivingProcess)