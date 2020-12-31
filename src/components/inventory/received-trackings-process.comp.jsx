import React, { useState } from 'react'

// components
import { integerMask } from '../utils/helpers'
import ReceivedTrackingsMatch from './received-trackings-match.comp'

const ReceivedTrackingsProcess = ({
  tracking
}) => {

  const [match, setMatch] = useState(null)

  return <>
    {
      match !== null 
      ? <ReceivedTrackingsMatch match={match} setMatch={setMatch} />
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
                      {tracking.tracking}
                    </th>
                  </tr>
                  {
                    tracking && tracking.items.map(item => 
                      <tr 
                        key={item._id} 
                        className="table-row-cs"
                        onClick={e => {
                          e.preventDefault()
                          setMatch({
                            tracking: tracking.tracking,
                            item: item
                          })
                        }} 
                      >
                        <td></td>
                        <td>{item.desc}</td>
                        <td>{integerMask(item.qty.toString())}</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    }
  </>
}

export default ReceivedTrackingsProcess