import React, { useEffect } from 'react';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlertMessage } from '../../state/alert/alert.selectors'; 
import { clearAlertMessage } from '../../state/alert/alert.actions';

// ui settings
import './alert-mesg.styles.css';

const AlertMesg = ({ alertMessage, clearAlertMessage }) => {

  useEffect(() => {
    return () => {
      clearAlertMessage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <div className='row'>
      <div className='col'>
        <div className={`alert alert-${alertMessage.color} d-flex justify-content-between`}>
          <span>{alertMessage.message}</span>
          <span 
            className='clear-alert' 
            onClick={(e => {
              e.preventDefault();
              clearAlertMessage()
            })}
          >
            &#10006;
          </span>
        </div>
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  clearAlertMessage: () => dispatch(clearAlertMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(AlertMesg);