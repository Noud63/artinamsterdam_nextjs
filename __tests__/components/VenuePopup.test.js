import { render, screen, fireEvent } from "@testing-library/react";
import VenuePopup from "@/components/VenuePopup";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} />;
  },
}));

const mockFeature = {
  id: "test-museum",
  cat: "museum",
  properties: {
    name: "Test Museum",
    title: "Great Exhibition",
    image: "test.jpg",
    address: "123 Art Street",
    extra: "A wonderful museum",
    link: "https://testmuseum.nl",
    open: ["Wednesday:10:00 - 18:00", "Thursday:10:00 - 18:00"],
  },
  geometry: {
    type: "Point",
    coordinates: [4.89, 52.37],
  },
};

describe("VenuePopup", () => {
  const defaultProps = {
    feature: mockFeature,
    active: true,
    sidebarHidden: false,
    userLocation: null,
    routing: false,
    onClose: jest.fn(),
    onRoute: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null when feature is null", () => {
    const { container } = render(
      <VenuePopup {...defaultProps} feature={null} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("returns null when active is false", () => {
    const { container } = render(
      <VenuePopup {...defaultProps} active={false} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders venue name", () => {
    render(<VenuePopup {...defaultProps} />);
    expect(screen.getByText("Test Museum")).toBeInTheDocument();
  });

  it("renders venue title in quotes", () => {
    render(<VenuePopup {...defaultProps} />);
    expect(screen.getByText(/"Great Exhibition"/)).toBeInTheDocument();
  });

  it("renders venue address", () => {
    render(<VenuePopup {...defaultProps} />);
    expect(screen.getByText("123 Art Street")).toBeInTheDocument();
  });

  it("renders extra description", () => {
    render(<VenuePopup {...defaultProps} />);
    expect(screen.getByText("A wonderful museum")).toBeInTheDocument();
  });

  it("renders the venue image", () => {
    render(<VenuePopup {...defaultProps} />);
    const img = screen.getByAltText("Test Museum");
    expect(img).toHaveAttribute("src", "/images/test.jpg");
  });

  it("renders website link", () => {
    render(<VenuePopup {...defaultProps} />);
    const link = screen.getByText("Website").closest("a");
    expect(link).toHaveAttribute("href", "https://testmuseum.nl");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("shows 'Location unavailable' when no user location", () => {
    render(<VenuePopup {...defaultProps} />);
    expect(screen.getByText(/Location unavailable/)).toBeInTheDocument();
  });

  it("shows distance when user location is provided", () => {
    render(
      <VenuePopup
        {...defaultProps}
        userLocation={{ lat: 52.36, lng: 4.88 }}
      />,
    );
    expect(screen.getByText(/1\.3 km/)).toBeInTheDocument();
  });

  it("does not show Route button when no user location", () => {
    render(<VenuePopup {...defaultProps} />);
    expect(screen.queryByText("Route")).not.toBeInTheDocument();
  });

  it("shows Route button when user location is provided", () => {
    render(
      <VenuePopup
        {...defaultProps}
        userLocation={{ lat: 52.36, lng: 4.88 }}
      />,
    );
    expect(screen.getByText("Route")).toBeInTheDocument();
  });

  it("shows 'Routing...' when routing is in progress", () => {
    render(
      <VenuePopup
        {...defaultProps}
        userLocation={{ lat: 52.36, lng: 4.88 }}
        routing={true}
      />,
    );
    expect(screen.getByText("Routing...")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(<VenuePopup {...defaultProps} />);
    const closeButton = screen.getByAltText("Close popup").closest("button");
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onRoute when Route button is clicked", () => {
    render(
      <VenuePopup
        {...defaultProps}
        userLocation={{ lat: 52.36, lng: 4.88 }}
      />,
    );
    fireEvent.click(screen.getByText("Route"));
    expect(defaultProps.onRoute).toHaveBeenCalledWith(mockFeature);
  });

  it("adds 'left' class when sidebar is hidden", () => {
    const { container } = render(
      <VenuePopup {...defaultProps} sidebarHidden={true} />,
    );
    expect(container.firstChild).toHaveClass("left");
  });

  it("shows open/closed status for non-public venues", () => {
    render(<VenuePopup {...defaultProps} />);
    expect(screen.getByText("Museum is:", { exact: false })).toBeInTheDocument();
    const statusEl = screen.getByText(/^(Open|Closed)$/);
    expect(statusEl).toBeInTheDocument();
  });

  it("does not show open/closed status for public art", () => {
    const publicFeature = { ...mockFeature, cat: "public" };
    render(<VenuePopup {...defaultProps} feature={publicFeature} />);
    expect(screen.queryByText("Public Art is:")).not.toBeInTheDocument();
  });

  it("renders opening hours", () => {
    render(<VenuePopup {...defaultProps} />);
    expect(screen.getByText("Wednesday:10:00 - 18:00")).toBeInTheDocument();
    expect(screen.getByText("Thursday:10:00 - 18:00")).toBeInTheDocument();
  });
});
