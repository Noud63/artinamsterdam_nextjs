import MenuBar from "@/components/MenuBar";
import "./globals.css";
import "./map-ui.css";
import AuthProvider from "@/components/AuthProvider";

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
      <body className="h-full overflow-hidden flex w-full justify-center bg-[linear-gradient(to_top,rgba(73,39,0,0.8),rgba(211,142,64,0.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center">
        <AuthProvider>
          <MenuBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
