import "./globals.css";
import "./map-ui.css";

export const metadata = {
  title: "Art in Amsterdam",
  description:
    "Find galleries, museums, art centres and public art in Amsterdam.",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
