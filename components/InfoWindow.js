"use client";

import Image from "next/image";

export default function InfoWindow({ open, onClose, venueCount }) {
  return (
    <div className={`infowindow${open ? " active" : ""}`}>
      <div className="infowindowTitle">Art in Amsterdam</div>
      <div>
        Amsterdam has long stood as one of Europe&apos;s great artistic capitals,
        shaped by masters whose influence extends far beyond the Netherlands. In
        the 17th century, Rembrandt van Rijn lived and worked in the city,
        producing powerful portraits and dramatic scenes that defined the Dutch
        Golden Age. Centuries later, Vincent van Gogh revolutionized art with
        his emotional use of color and expressive brushwork, and his legacy is
        preserved in the Van Gogh Museum. Meanwhile, Piet Mondriaan pioneered
        abstract art, reducing form and color to pure geometry. Today,
        institutions like the Rijksmuseum reflect Amsterdam&apos;s enduring role as a
        center of artistic innovation, preserving centuries of creative
        achievement.
      </div>
      <div>
        <br />
        This interactive map highlights{" "}
        <span className="listLength">{venueCount}</span> locations across
        Amsterdam, including art galleries, museums, art centres, and public
        artworks. It focuses primarily on modern and contemporary art, offering
        an overview of the city&apos;s diverse and vibrant artistic landscape.
      </div>
      <div>
        <br />
        Use the Locate Me button from the menu to find your current location and
        see nearby art locations.
      </div>
      <br />
      <div>
        Please note that not all the markers on the map may be visible within
        the boundaries of your screen.
        <br />
        If so, zoom out by using the − button at the bottom right of the
        screen.
        <br />
        You can also click and hold the left mouse button to drag the map in any
        direction to view additional markers.
      </div>
      <div className="close">
        <button type="button" className="border-0 bg-transparent p-0" onClick={onClose}>
          <Image
            src="/images/close_white.png"
            className="closeIcon_info"
            alt="Close info"
            width={26}
            height={26}
          />
        </button>
      </div>
    </div>
  );
}
