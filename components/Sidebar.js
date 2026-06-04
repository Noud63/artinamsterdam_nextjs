"use client";

import Image from "next/image";
import { formatCategoryLabel } from "@/lib/venue";

export default function Sidebar({
  features,
  hidden,
  onToggleHidden,
  markersRef,
}) {

  console.log("Markers Ref:", markersRef.current[features[0]?.id]);
  return (
    <aside className={`sidebar${hidden ? " hidden" : ""}`} id="sidebar">
      <div className="listPopUpWrapper">
        <button
          type="button"
          className="hideSidebar"
          id="hidesidebar"
          title={hidden ? "Show sidebar" : "Hide sidebar"}
          onClick={onToggleHidden}
          aria-label={hidden ? "Show sidebar" : "Hide sidebar"}
        >
          <Image
            src="/images/triangle.png"
            alt=""
            width={7}
            height={0}
            aria-hidden="true"
           style={{width:"8px", height:"13px", transform: hidden ? "rotate(180deg)" : "rotate(-360deg)"}}
          />
        </button>
        <Image
          src="/images/nachtwacht_zw.jpg"
          alt=""
          id="adam"
          width={350}
          height={200}
          className="h-auto w-full max-w-[350px]"
          priority
        />
        <div id="listings" className="listings">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="item"
              onMouseEnter={() => markersRef.current[feature.id]?.bounce(2)}
            >
              <div className="content">
                <div className="box">
                  <Image
                    src={`/images/${feature.properties.image}`}
                    alt=""
                    id="pic"
                    width={100}
                    height={0}
                    className="pic h-auto w-[30%]"
                  />
                  <div className="info">
                    <div className="space">{feature.properties.name}</div>
                    <span className="extra">
                      {formatCategoryLabel(feature.cat)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
