import React from 'react'
import { formatCategoryLabel } from '@/lib/venue'

const OpenClosedStatus = ({showOpenStatus, openNow, category }) => {
  return (
    <div> {showOpenStatus ? (
              <div className="openOrClosed">
                <span className="category">
                  {formatCategoryLabel(category)} is:
                </span>{" "}
                <span className="closedOpen">{openNow ? "Open" : "Closed"}</span>
              </div>
            ) : null}</div>
  )
}

export default OpenClosedStatus