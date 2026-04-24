import { AppContextProvider } from '@/context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <ToastContainer position="bottom-right" />
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}