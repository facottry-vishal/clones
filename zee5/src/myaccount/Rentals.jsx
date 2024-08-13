import React from 'react'
import { FaFolderClosed } from "react-icons/fa6";
function Rentals() {
  return (
    <div className='tab-body'><FaFolderClosed className='tad-empty-icon' />
      <h1 className='tad-empty-desc'>You have not rented any content yet</h1>
      <h1 className='tad-empty-desc'>Rent from our ZEEPLEX Collection and start watching</h1>
    </div>
  )
}

export default Rentals