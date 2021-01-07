import React from 'react'

// components
import { Li, Button } from '../tag/tag.component'

const SubmitOrReset = ({
  formSubmit,
  buttonName,
  buttonDisabled,
  formReset,
  secondButtonName,
  props
}) => {
  return <>
    <Li>      
      <div className="row">
        <div className="col my-1">
          <Button
            onClick={e => {
              e.preventDefault();
              formSubmit(props)
            }}
            disabled={buttonDisabled}
          >
            {buttonName}
          </Button>
          {
            formReset && <>
              <span className="mr-3"></span>
              <Button
                onClick={e => {
                  e.preventDefault();
                  formReset()
                }}
              >
                {secondButtonName ? secondButtonName : 'Reset'}
              </Button>
            </>
          }
        </div>
      </div>
    </Li>
  </>
}

export default SubmitOrReset