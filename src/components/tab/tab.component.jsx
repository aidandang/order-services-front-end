import React from 'react'

// dependencies
import { Link } from 'react-router-dom'

const Tab = ({
  itemObj,
  active
}) => {

  const arr = Object.keys(itemObj)

  return <>
    <div className="card mb-4">
      <div className="card-body py-3">
        {
          arr.map((key, index) => 
            <span key={index}>
              {
                active.match(itemObj[key].link)
                ?
                <span>{itemObj[key].name}</span>
                :
                <Link 
                  to={itemObj[key].link} 
                  className="a-link-cs"
                >
                  {itemObj[key].name}
                </Link>
              }
              {
                itemObj[key].badge > 0 && <>
                  <span>{' '}</span>
                  <span className="badge badge-pill badge-danger">{itemObj[key].badge}</span>
                </>
              }
              { index < arr.length - 1 && <span className="mx-2">{'|'}</span> }
            </span>
          )
        }
      </div>
    </div>
  </>
}

export default Tab