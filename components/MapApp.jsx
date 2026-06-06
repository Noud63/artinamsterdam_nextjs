"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { art } from "@/data/art";
import { L, AMSTERDAM_CENTER, DEFAULT_ZOOM } from "@/lib/leaflet-setup";
import { filterFeatures, sortFeaturesByName } from "@/lib/venue";
import ArtMarkersLayer from "@/components/map/ArtMarkersLayer";
import UserLocationLayer from "@/components/map/UserLocationLayer";
import RouteLayer from "@/components/map/RouteLayer";
import MapController from "@/components/map/MapController";
import Sidebar from "@/components/Sidebar";
import Menu from "@/components/Menu";
import InfoWindow from "@/components/InfoWindow";
import VenuePopup from "@/components/VenuePopup";
import "leaflet/dist/leaflet.css";

export default function MapApp() {
  const markersRef = useRef({});
  const [category, setCategory] = useState(null);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [popupActive, setPopupActive] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [userCenter, setUserCenter] = useState(null);
  const [userCenterKey, setUserCenterKey] = useState(0);
  const [openUserPopup, setOpenUserPopup] = useState(false);
  const [locating, setLocating] = useState(false);
  const [routeLatLngs, setRouteLatLngs] = useState(null);
  const [routeBounds, setRouteBounds] = useState(null);
  const [routing, setRouting] = useState(false);
  const [resetToken, setResetToken] = useState(0);

  const filteredFeatures = useMemo(() => {
    const filtered = filterFeatures(art.features, category);
    return sortFeaturesByName(filtered);
  }, [category]);

  const geoJsonKey = useMemo(
    () => filteredFeatures.map((feature) => feature.id).join(","),
    [filteredFeatures],
  );

  const closePopup = useCallback(() => {
    setPopupActive(false);
    setSelectedFeature(null);
  }, []);

  useEffect(() => {
    closePopup();
    setRouteLatLngs(null);
    setRouteBounds(null);
  }, [category, closePopup]);

  const closeInfo = useCallback(() => {
    setInfoOpen(false);
    setMobileMenuOpen(false);
  }, []);

  const handleMapClick = useCallback(() => {
    closePopup();
    closeInfo();
    setMobileMenuOpen(false);
  }, [closePopup, closeInfo]);

  const handleVenueSelect = useCallback(
    (feature) => {
      setSelectedFeature(feature);
      setPopupActive(true);

      if (typeof window !== "undefined" && window.innerWidth <= 540 && !sidebarHidden) {
        setSidebarHidden(true);
      }

      markersRef.current[feature.id]?.bounce(1);
    },
    [sidebarHidden],
  );

  const locateUser = useCallback((openPopup = false) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        setUserLocation({ lat, lng, accuracy });
        setUserCenter([lat, lng]);
        setUserCenterKey((value) => value + 1);
        setOpenUserPopup(openPopup);
        setLocating(false);

        if (window.matchMedia("(max-width: 430px)").matches) {
          setInfoOpen(false);
          setSidebarHidden(true);
          setMobileMenuOpen(false);
        }
      },
      (error) => {
        let errorMessage = "Unable to get your location.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please enable location services in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            break;
        }

        alert(errorMessage);
        setLocating(false);
      },
    );
  }, []);

  const showRoute = useCallback(
    async (feature) => {
      if (!userLocation) {
        return;
      }

      const [lng, lat] = feature.geometry.coordinates;

      setRouting(true);

      try {
        const response = await fetch("/api/routing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userLat: userLocation.lat,
            userLng: userLocation.lng,
            venueLat: lat,
            venueLng: lng,
            venueName: feature.properties.name,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Request failed (${response.status})`);
        }

        const data = await response.json();

        if (data.paths?.[0]?.points?.coordinates) {
          const latLngs = data.paths[0].points.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]);
          setRouteLatLngs(latLngs);
          setRouteBounds(L.latLngBounds(latLngs));
        } else {
          alert("Route not found");
        }
      } catch (error) {
        alert(`Error calculating route: ${error.message}`);
      } finally {
        setRouting(false);
      }
    },
    [userLocation],
  );

  const handleReset = useCallback(() => {
    setCategory(null);
    setRouteLatLngs(null);
    setRouteBounds(null);
    closePopup();
    closeInfo();
    setMobileMenuOpen(false);
    setResetToken((value) => value + 1);
    markersRef.current = {};
  }, [closePopup, closeInfo]);

  const handleInfoClick = useCallback(() => {
    if (infoOpen) {
      closeInfo();
      return;
    }

    setInfoOpen(true);
    setMobileMenuOpen(false);

    if (window.matchMedia("(max-width: 430px)").matches) {
      setSidebarHidden(true);
    }
  }, [infoOpen, closeInfo]);

  const handleHamburgerClick = useCallback(() => {
    if (infoOpen) {
      closeInfo();
      return;
    }

    setMobileMenuOpen((open) => !open);
  }, [infoOpen, closeInfo]);

  useEffect(() => {
    locateUser(false);
  }, [locateUser]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const menubar = document.querySelector(".menubar");
      const hamburger = document.querySelector(".hamburger");
      const infowindow = document.querySelector(".infowindow");

      if (!menubar || !hamburger || !infowindow) {
        return;
      }

      const clickedInsideMenu = menubar.contains(event.target);
      const clickedHamburger = hamburger.contains(event.target);
      const clickedInsideInfowindow = infowindow.contains(event.target);

      if (!clickedInsideMenu && !clickedHamburger && !clickedInsideInfowindow) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="amsterdam_logo">
        <Image
          src="/images/amsterdam_logo_wit.png"
          alt=""
          width={70}
          height={18}
          aria-hidden="true"
          style={{ width: "70px", height: "auto" }}
        />
      </div>
      <div className="amsterdam_logo_right">
        <Image
          src="/images/amsterdam_logo_wit.png"
          alt=""
          width={70}
          height={18}
          aria-hidden="true"
          style={{ width: "70px", height: "auto" }}
        />
      </div>
      <div className="artinamsterdam">
        <Image
          src="/images/artinamsterdam_black_2.png"
          alt="Art in Amsterdam"
          width={240}
          height={60}
          priority
        />
      </div>

      <Menu
        onCategorySelect={setCategory}
        onInfoClick={handleInfoClick}
        onLocate={() => locateUser(true)}
        onReset={handleReset}
        locating={locating}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={handleHamburgerClick}
        onMobileMenuClose={() => setMobileMenuOpen(false)}
        infoOpen={infoOpen}
      />

      <InfoWindow
        open={infoOpen}
        onClose={closeInfo}
        venueCount={art.features.length}
      />

      <Sidebar
        features={filteredFeatures}
        hidden={sidebarHidden}
        onToggleHidden={() => setSidebarHidden((hidden) => !hidden)}
        markersRef={markersRef}
      />

      <VenuePopup
        feature={selectedFeature}
        active={popupActive}
        sidebarHidden={sidebarHidden}
        userLocation={userLocation}
        routing={routing}
        onClose={closePopup}
        onRoute={showRoute}
      />

      <div id="container" className="absolute inset-0 z-[1]">
        <MapContainer
          center={AMSTERDAM_CENTER}
          zoom={DEFAULT_ZOOM}
          zoomControl={false}
          className="h-full w-full"
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            maxZoom={18}
            attribution="Tiles &copy; Esri"
          />
          <ArtMarkersLayer
            geoJsonKey={geoJsonKey}
            features={filteredFeatures}
            onVenueSelect={handleVenueSelect}
            markersRef={markersRef}
          />
          <UserLocationLayer
            userLocation={userLocation}
            openPopup={openUserPopup}
          />
          <RouteLayer routeLatLngs={routeLatLngs} />
          <MapController
            routeBounds={routeBounds}
            userCenter={userCenter}
            userCenterKey={userCenterKey}
            onMapClick={handleMapClick}
            resetToken={resetToken}
          />
        </MapContainer>
      </div>
    </div>
  );
}
