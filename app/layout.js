// app/layout.js
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata = {
  title: 'Book Exchange Portal',
  description: 'Connect with book enthusiasts in your community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}