"use client";
import {
  formatDistance,
  estimateWalkingTime,
  getDistanceToVenue,
} from "@/lib/distance";
import { formatCategoryLabel, isVenueOpen } from "@/lib/venue";
import Image from "next/image";

export default function VenuePopup({
  feature,
  active,
  sidebarHidden,
  userLocation,
  routing,
  onClose,
  onRoute,
}) {
  if (!feature || !active) {
    return null;
  }

  const props = feature.properties;
  const [lng, lat] = feature.geometry.coordinates;
  const distance = getDistanceToVenue(userLocation, lat, lng);
  const showOpenStatus =
    feature.cat !== "public" && props.name !== "Van Gogh Museum";
  const openNow = isVenueOpen(feature);

  return (
    <div
      className={`wrapper${sidebarHidden ? " left" : ""} active`}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="pic">
        <Image
          src={`/images/${props.image}`}
          alt={props.name}
          width={350}
          height={200}
          className="puImage h-[200px] w-full object-cover"
        />
      </div>

      <div className="popUpContent">
        {distance ? (
          <div className="w-full flex flex-row items-center justify-between gap-2 border-b border-dotted pb-1 mb-2">
            <div>📍{formatDistance(distance)}</div>
            <div className="flex gap-1">
              <Image
                src="/images/walk.png"
                alt=""
                height={16}
                width={8}
                className="walkIcon"
                aria-hidden="true"
                style={{width:"8px", height:"16px"}}
              />
              <span>{estimateWalkingTime(distance)} (5 km/h)</span>
            </div>
            
          </div>
        ) : (
          <div className="distance">📍 Location unavailable</div>
        )}

        <div className="puName">{props.name}</div>
        {props.title ? <div className="puTitle">&quot;{props.title}&quot;</div> : null}
        {props.extra ? <div className="extra3">{props.extra}</div> : null}
        {props.address ? (
          <div className="address">
            <span className="popupSectionTitle">Address:</span> {props.address}
          </div>
        ) : null}

        {showOpenStatus ? (
          <div className="openOrClosed">
            <span className="category">
              {formatCategoryLabel(feature.cat)} is:
            </span>{" "}
            <span className="closedOpen">{openNow ? "Open" : "Closed"}</span>
          </div>
        ) : null}

        {props.open ? (
          <div className="openingHours">
            <span className="popupSectionTitle">Opening hours:</span>
            {props.open.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
        ) : null}

        <div className="links">
          {props.link ? (
            <a
              className="websiteLink"
              href={props.link}
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

        <div className="close">
          <button type="button" className="border-0 bg-transparent p-0" onClick={onClose}>
            <Image
              src="/images/close.png"
              className="closeIcon"
              alt="Close popup"
              width={26}
              height={26}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
