"use client";
import React, { useState } from "react";
import {
  formatDistance,
  estimateWalkingTime,
  getDistanceToVenue,
} from "@/lib/distance";
import { formatCategoryLabel, isVenueOpen } from "@/lib/venue";
import Image from "next/image";
import StarRating from "./StarRating";

export default function VenuePopup({
  feature,
  active,
  sidebarHidden,
  userLocation,
  routing,
  onClose,
  onRoute,
  session,
  avatar,
}) {
  if (!feature || !active) {
    return null;
  }

  //  const [rating, setRating] = useState(0);

  // const feature = feature.properties;
  const [lng, lat] = feature.geometry.coordinates;
  const distance = getDistanceToVenue(userLocation, lat, lng);
  const showOpenStatus =
    feature.properties.category !== "public" &&
    feature.properties.name !== "Van Gogh Museum";
  const openNow = isVenueOpen(feature);

  console.log("Id:", feature);
  // console.log("User:", session?.user?.id)
  // console.log("Rating:", rating)

  return (
    <div
      className={`wrapper${sidebarHidden ? " left" : ""} active`}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="pic">
        <Image
          src={`/images/${feature.properties.image}`}
          alt={feature.properties.name}
          width={350}
          height={200}
          className="puImage h-[200px] w-full object-cover"
        />
      </div>

      <div className="popUpContent pt-2">
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
                style={{ width: "8px", height: "16px" }}
              />
              <span>{estimateWalkingTime(distance)} (5 km/h)</span>
            </div>
          </div>
        ) : (
          <div className="distance">📍 Location unavailable</div>
        )}

        <div className="puName flex justify-between mt-2 text-lg font-bold pl-1">
          <div>{feature.properties.name}</div>

          <button type="button" className="" onClick={onClose}>
            <Image
              src="/images/close.png"
              alt="Close popup"
              className="cursor-pointer"
              width={18}
              height={18}
            />
          </button>
        </div>
        {feature.properties.title ? (
          <div className="puTitle">&quot;{feature.properties.title}&quot;</div>
        ) : null}
        {feature.properties.extra ? (
          <div className="extra3">{feature.properties.extra}</div>
        ) : null}
        {feature.properties.address ? (
          <div className="address">
            <span className="popupSectionTitle">Address:</span>{" "}
            {feature.properties.address}
          </div>
        ) : null}

        {showOpenStatus ? (
          <div className="openOrClosed">
            <span className="category">
              {formatCategoryLabel(feature.properties.category)} is:
            </span>{" "}
            <span className="closedOpen">{openNow ? "Open" : "Closed"}</span>
          </div>
        ) : null}

        {feature.properties.open ? (
          <div className="openingHours">
            <span className="popupSectionTitle">Opening hours:</span>
            {feature.properties.open.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
        ) : null}

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
        {session?.user && (
          <div className="flex flex-col mt-8 ">
            <span className="font-semibold mb-2">Assess and Review</span>
            <div className="flex w-full flex-row gap-2 items-center">
              <button type="button" className="" onClick={onClose}>
                <Image src={avatar} alt="avatar" width={30} height={30} />
              </button>
              <StarRating venueId={feature.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
