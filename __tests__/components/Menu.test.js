import { render, screen, fireEvent } from "@testing-library/react";
import Menu from "@/components/Menu";

describe("Menu", () => {
  const defaultProps = {
    onCategorySelect: jest.fn(),
    onInfoClick: jest.fn(),
    onLocate: jest.fn(),
    onReset: jest.fn(),
    locating: false,
    mobileMenuOpen: false,
    onMobileMenuToggle: jest.fn(),
    onMobileMenuClose: jest.fn(),
    infoOpen: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all category buttons", () => {
    render(<Menu {...defaultProps} />);
    // Each button appears twice (desktop menuTop + mobile menubar)
    expect(screen.getAllByText("Museums")).toHaveLength(2);
    expect(screen.getAllByText("Galleries")).toHaveLength(2);
    expect(screen.getAllByText("Public Art")).toHaveLength(2);
    expect(screen.getAllByText("Art Centres")).toHaveLength(2);
  });

  it("renders Info button", () => {
    render(<Menu {...defaultProps} />);
    expect(screen.getAllByText("Info")).toHaveLength(2);
  });

  it("renders Locate Me button", () => {
    render(<Menu {...defaultProps} />);
    expect(screen.getAllByText("Locate Me")).toHaveLength(2);
  });

  it("renders Reset button", () => {
    render(<Menu {...defaultProps} />);
    expect(screen.getAllByText("Reset")).toHaveLength(2);
  });

  it('shows "Locating..." when locating is true', () => {
    render(<Menu {...defaultProps} locating={true} />);
    expect(screen.getAllByText("Locating...")).toHaveLength(2);
  });

  it("calls onCategorySelect with the correct category", () => {
    render(<Menu {...defaultProps} />);
    // Click the first "Museums" button (desktop)
    fireEvent.click(screen.getAllByText("Museums")[0]);
    expect(defaultProps.onCategorySelect).toHaveBeenCalledWith("museum");
  });

  it("calls onInfoClick when Info is clicked", () => {
    render(<Menu {...defaultProps} />);
    fireEvent.click(screen.getAllByText("Info")[0]);
    expect(defaultProps.onInfoClick).toHaveBeenCalledTimes(1);
  });

  it("calls onLocate when Locate Me is clicked", () => {
    render(<Menu {...defaultProps} />);
    fireEvent.click(screen.getAllByText("Locate Me")[0]);
    expect(defaultProps.onLocate).toHaveBeenCalledTimes(1);
  });

  it("calls onReset when Reset is clicked", () => {
    render(<Menu {...defaultProps} />);
    fireEvent.click(screen.getAllByText("Reset")[0]);
    expect(defaultProps.onReset).toHaveBeenCalledTimes(1);
  });

  it("disables Locate Me button when locating", () => {
    render(<Menu {...defaultProps} locating={true} />);
    const buttons = screen.getAllByText("Locating...");
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it("adds active class to hamburger when mobile menu is open", () => {
    const { container } = render(
      <Menu {...defaultProps} mobileMenuOpen={true} />,
    );
    const hamburger = container.querySelector(".hamburger");
    expect(hamburger).toHaveClass("active");
  });

  it("adds active class to hamburger when info is open", () => {
    const { container } = render(
      <Menu {...defaultProps} infoOpen={true} />,
    );
    const hamburger = container.querySelector(".hamburger");
    expect(hamburger).toHaveClass("active");
  });

  it("calls onMobileMenuToggle when hamburger is clicked", () => {
    render(<Menu {...defaultProps} />);
    const hamburger = screen.getByLabelText("Open menu");
    fireEvent.click(hamburger);
    expect(defaultProps.onMobileMenuToggle).toHaveBeenCalledTimes(1);
  });

  it("sets correct aria-label based on state", () => {
    const { rerender } = render(<Menu {...defaultProps} />);
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();

    rerender(<Menu {...defaultProps} mobileMenuOpen={true} />);
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();

    rerender(<Menu {...defaultProps} infoOpen={true} />);
    expect(screen.getByLabelText("Close info")).toBeInTheDocument();
  });

  it("adds active class to menubar when mobile menu is open", () => {
    const { container } = render(
      <Menu {...defaultProps} mobileMenuOpen={true} />,
    );
    const menubar = container.querySelector(".menubar");
    expect(menubar).toHaveClass("active");
  });
});
