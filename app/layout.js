import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Arena — Football Predictions",
  description: "Predict football scores, compete weekly, win prizes.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Navbar />
        <main className="max-w-2xl mx-auto px-3 sm:px-4 pb-24">{children}</main>
      </body>
    </html>
  );
}
