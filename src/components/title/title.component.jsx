import React from 'react'

// dependencies
import { Link } from 'react-router-dom'
// css
import './title.style.css'

const Title = ({
  title,
  button
}) => {

  return <>
    <div className="row">
      <div className="col">
        <div className="row mx-0 px-1 mb-2">
          <div className="col">
            <span className="h4 align-middle">{title.name}</span>
            {
              button && <>
                <span className="ml-1">{' '}</span>
                <Link to={button.path} className="btn btn-outline-primary title-cs__button py-0">
                  {button.text}
                </Link>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Title;