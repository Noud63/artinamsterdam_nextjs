import React from 'react'
import { formatDistance } from '@/lib/distance'
import { estimateWalkingTime } from '@/lib/distance'
import Image from 'next/image'

const WalkingDistance = ({distance}) => {
  return (
    <>
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
            )}</>
  )
}

export default WalkingDistance