import React from 'react';

const Title = ({
  title
}) => {
  return <>
    <div className="row">
      <div className="col">
        <div className="row mx-0 px-1">
          <div className="col">
            <h4 className="title-font">{title.name}</h4>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Title;