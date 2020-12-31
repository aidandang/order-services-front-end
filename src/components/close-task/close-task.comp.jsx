import React from 'react'

const CloseTask = ({
  setClose
}) => {
  return <>
    <div className="row mb-2">
      <div className="col text-right">
        <a 
          href="/" 
          className="a-link-cs mx-2"
          onClick={e => {
            e.preventDefault()
            setClose()
          }}
        >
          <i className="fas fa-times-circle"></i>
        </a>
      </div>
    </div>
  </>
}

export default CloseTask