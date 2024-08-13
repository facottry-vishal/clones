import React from 'react'
import { FaFolderClosed } from "react-icons/fa6";
function Transaction() {
  return (
    <div className='tab-body'><FaFolderClosed className='tad-empty-icon' />
      <h1 className='tad-empty-desc'>No Active Transactions</h1>
    </div>
  )
}

export default Transaction