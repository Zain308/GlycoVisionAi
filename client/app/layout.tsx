import { AppContextProvider } from "@/context/AppContext"; // Ensure this path is correct!
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* This is the Power Grid! Everything inside here can use the context */}
        <AppContextProvider>
          <ToastContainer position="bottom-right" />
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}