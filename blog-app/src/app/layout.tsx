import type { Metadata } from "next";
import "./globals.css";
import Auth0ProviderWithNavigate from "./providers/Auth0Provider";
import Navbar from "./components/Navbar";


export const metadata: Metadata = {
  title: "Blog",
  description: "Blog web portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Auth0ProviderWithNavigate>
          <Navbar />
          {children}
        </Auth0ProviderWithNavigate>
      </body>
    </html>
  );
}
