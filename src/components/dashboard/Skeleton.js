import React from 'react'
import "./skel.css"
const Skeleton = () => {
  return (
    <div className="carts">
      <div>
        {/* Skeleton loading for the image */}
        <div className="skeleton-image"></div>
      </div>
      <div className="cart-item-detailss">
        {/* Skeleton loading for various details */}
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
      </div>
    </div>
  
  )
}

export default Skeleton