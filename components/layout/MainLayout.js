// components/layout/MainLayout.js
import Navbar from '../ui/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; {new Date().getFullYear()} Book Exchange Portal
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;