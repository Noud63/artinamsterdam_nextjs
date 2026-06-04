import { render, screen } from "@testing-library/react";
import Sidebar from "@/components/Sidebar";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} />;
  },
}));

const mockFeatures = [
  {
    id: "museum-a",
    cat: "museum",
    properties: { name: "Rijksmuseum", image: "rijks.jpg" },
  },
  {
    id: "gallery-b",
    cat: "gallery",
    properties: { name: "Stedelijk", image: "stedelijk.jpg" },
  },
];

describe("Sidebar", () => {
  const defaultProps = {
    features: mockFeatures,
    hidden: false,
    onToggleHidden: jest.fn(),
    markersRef: { current: {} },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders venue names from features", () => {
    render(<Sidebar {...defaultProps} />);
    expect(screen.getByText("Rijksmuseum")).toBeInTheDocument();
    expect(screen.getByText("Stedelijk")).toBeInTheDocument();
  });

  it("renders category labels", () => {
    render(<Sidebar {...defaultProps} />);
    expect(screen.getByText("Museum")).toBeInTheDocument();
    expect(screen.getByText("Gallery")).toBeInTheDocument();
  });

  it("renders venue images", () => {
    const { container } = render(<Sidebar {...defaultProps} />);
    const venueImages = container.querySelectorAll('img[src="/images/rijks.jpg"], img[src="/images/stedelijk.jpg"]');
    expect(venueImages).toHaveLength(2);
  });

  it("adds hidden class when hidden prop is true", () => {
    const { container } = render(
      <Sidebar {...defaultProps} hidden={true} />,
    );
    const sidebar = container.querySelector(".sidebar");
    expect(sidebar).toHaveClass("hidden");
  });

  it("does not have hidden class when hidden prop is false", () => {
    const { container } = render(<Sidebar {...defaultProps} />);
    const sidebar = container.querySelector(".sidebar");
    expect(sidebar).not.toHaveClass("hidden");
  });

  it("renders the toggle button with correct title", () => {
    render(<Sidebar {...defaultProps} />);
    expect(screen.getByTitle("Hide sidebar")).toBeInTheDocument();
  });

  it("renders the toggle button with 'Show sidebar' when hidden", () => {
    render(<Sidebar {...defaultProps} hidden={true} />);
    expect(screen.getByTitle("Show sidebar")).toBeInTheDocument();
  });

  it("renders the header image", () => {
    const { container } = render(<Sidebar {...defaultProps} />);
    const headerImg = container.querySelector('img[src="/images/nachtwacht_zw.jpg"]');
    expect(headerImg).toBeTruthy();
  });
});
