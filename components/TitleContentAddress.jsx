import React from 'react'

const TitleContentAddress = ({featureProps}) => {
  return (
    <div> {featureProps.title ? (
          <div className="puTitle">&quot;{featureProps.title}&quot;</div>
        ) : null}
        {featureProps.extra ? (
          <div className="extra3">{featureProps.extra}</div>
        ) : null}
        {featureProps.address ? (
          <div className="address">
            <span className="popupSectionTitle">Address:</span>{" "}
            {featureProps.address}
          </div>
        ) : null}</div>
  )
}

export default TitleContentAddress