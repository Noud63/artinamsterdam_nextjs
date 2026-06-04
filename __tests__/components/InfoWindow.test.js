import { render, screen, fireEvent } from "@testing-library/react";
import InfoWindow from "@/components/InfoWindow";

// Mock next/image to render a plain img
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} />;
  },
}));

describe("InfoWindow", () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    venueCount: 42,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title", () => {
    render(<InfoWindow {...defaultProps} />);
    expect(screen.getByText("Art in Amsterdam")).toBeInTheDocument();
  });

  it("displays the venue count", () => {
    render(<InfoWindow {...defaultProps} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it('has "active" class when open is true', () => {
    const { container } = render(<InfoWindow {...defaultProps} />);
    expect(container.firstChild).toHaveClass("active");
  });

  it('does not have "active" class when open is false', () => {
    const { container } = render(
      <InfoWindow {...defaultProps} open={false} />,
    );
    expect(container.firstChild).not.toHaveClass("active");
  });

  it("calls onClose when close button is clicked", () => {
    render(<InfoWindow {...defaultProps} />);
    const closeButton = screen.getByAltText("Close info").closest("button");
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("renders the close icon image", () => {
    render(<InfoWindow {...defaultProps} />);
    const img = screen.getByAltText("Close info");
    expect(img).toHaveAttribute("src", "/images/close_white.png");
  });
});
