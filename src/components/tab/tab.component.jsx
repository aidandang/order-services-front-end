import React from 'react';

const Tab = ({
  items,
  active,
  setActive
}) => {

  return <>
    <div className="card mb-4">
      <div className="card-body py-3">
        {
          items.map((item, index) => 
            <span key={index}>
              {
                active === item.name 
                ?
                <span>{item.name}</span>
                :
                <a 
                  href="/" 
                  className="a-link-cs" 
                  onClick={e => {
                    e.preventDefault();
                    setActive(item.name)
                  }}
                >
                  {item.name}
                </a>
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