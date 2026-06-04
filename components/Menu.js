"use client";

const MENU_BUTTONS = [
  { key: "museum", label: "Museums", className: "museums" },
  { key: "gallery", label: "Galleries", className: "galleries" },
  { key: "public", label: "Public Art", className: "publicArt" },
  { key: "artcentre", label: "Art Centres", className: "artcentre" },
];

function MenuButtons({
  onCategorySelect,
  onInfoClick,
  onLocate,
  onReset,
  locating,
  onCloseMobileMenu,
}) {
  return (
    <>
      {MENU_BUTTONS.map((button) => (
        <button
          key={button.key}
          type="button"
          className={button.className}
          onClick={() => {
            onCategorySelect(button.key);
            onCloseMobileMenu?.();
          }}
        >
          {button.label}
        </button>
      ))}
      <button
        type="button"
        className="informatie"
        onClick={() => {
          onInfoClick();
          onCloseMobileMenu?.();
        }}
      >
        Info
      </button>
      <button
        type="button"
        className="locateMe"
        onClick={() => {
          onLocate();
          onCloseMobileMenu?.();
        }}
        disabled={locating}
      >
        {locating ? "Locating..." : "Locate Me"}
      </button>
      <button
        type="button"
        className="reset"
        onClick={() => {
          onReset();
          onCloseMobileMenu?.();
        }}
      >
        Reset
      </button>
    </>
  );
}

export default function Menu({
  onCategorySelect,
  onInfoClick,
  onLocate,
  onReset,
  locating,
  mobileMenuOpen,
  onMobileMenuToggle,
  onMobileMenuClose,
  infoOpen,
}) {
  return (
    <>
      <div className="menuTop">
        <MenuButtons
          onCategorySelect={onCategorySelect}
          onInfoClick={onInfoClick}
          onLocate={onLocate}
          onReset={onReset}
          locating={locating}
        />
      </div>

      <div className={`menubar${mobileMenuOpen ? " active" : ""}`}>
        <MenuButtons
          onCategorySelect={onCategorySelect}
          onInfoClick={onInfoClick}
          onLocate={onLocate}
          onReset={onReset}
          locating={locating}
          onCloseMobileMenu={onMobileMenuClose}
        />
      </div>

      <button
        type="button"
        className={`hamburger${mobileMenuOpen || infoOpen ? " active" : ""}`}
        aria-expanded={mobileMenuOpen || infoOpen}
        aria-label={
          infoOpen ? "Close info" : mobileMenuOpen ? "Close menu" : "Open menu"
        }
        onClick={onMobileMenuToggle}
      >
        <img
          src="/images/hamburger.png"
          className="icon icon-closed"
          alt=""
          aria-hidden="true"
        />
        <img
          src="/images/close_cross.png"
          className="icon icon-open"
          alt=""
          aria-hidden="true"
        />
      </button>
    </>
  );
}
