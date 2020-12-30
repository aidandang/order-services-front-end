import React from 'react'

// dependencies
import { Link } from 'react-router-dom'

const Tab = ({
  items,
  active
}) => {

  return <>
    <div className="card mb-4">
      <div className="card-body py-3">
        {
          items.map((item, index) => 
            <span key={index}>
              {
                active.match(item.link)
                ?
                <span>{item.name}</span>
                :
                <Link 
                  to={item.link} 
                  className="a-link-cs"
                >
                  {item.name}
                </Link>
              }
              {
                item.badge > 0 && <>
                  <span>{' '}</span>
                  <span className="badge badge-pill badge-danger">{item.badge}</span>
                </>
              }
              { index < items.length - 1 && <span className="mx-2">{'|'}</span> }
            </span>
          )
        }
      </div>
    </div>
  </>
}

export default Tab