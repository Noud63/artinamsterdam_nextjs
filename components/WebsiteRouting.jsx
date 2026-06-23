import React from 'react'

const WebsiteRouting = ({userLocation, onRoute, feature, routing}) => {
  return (
    <div className="links">
          {feature.properties.link ? (
            <a
              className="websiteLink"
              href={feature.properties.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/globe.png"
                alt=""
                className="linkIcon"
                aria-hidden="true"
              />
              <span>Website</span>
            </a>
          ) : null}

          {userLocation ? (
            <button
              type="button"
              className="routeLink"
              onClick={() => onRoute(feature)}
              disabled={routing}
            >
              <img
                src="/images/route.png"
                alt=""
                className="linkIcon"
                aria-hidden="true"
              />
              {routing ? "Routing..." : "Route"}
            </button>
          ) : null}
        </div>
  )
}

export default WebsiteRouting