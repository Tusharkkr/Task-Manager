import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ simple = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-16 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <h3 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
            TaskManager
          </h3>
        </Link>

        {!simple && <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="md:hidden rounded-lg p-2 text-2xl leading-none text-gray-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "×" : "☰"}
        </button>}

        {!simple && <div className={`${isMenuOpen ? "flex" : "hidden"} basis-full flex-col gap-2 border-t border-blue-100 py-3 text-gray-700 font-medium md:flex md:basis-auto md:flex-row md:items-center md:gap-6 md:border-0 md:py-0`}>
          <Link
            to="/"
            onClick={closeMenu}
            className="rounded-lg px-4 py-3 text-gray-800 transition-colors duration-200 hover:bg-blue-50 md:py-2"
          >
            Home
          </Link>

          <Link
            to="/new"
            onClick={closeMenu}
            className="rounded-lg px-4 py-3 text-gray-800 transition-colors duration-200 hover:bg-blue-50 md:py-2"
          >
            Add Task
          </Link>

          <Link
            to="/profile"
            onClick={closeMenu}
            className="rounded-lg px-4 py-3 text-gray-800 transition-colors duration-200 hover:bg-purple-50 md:py-2"
          >
            Profile
          </Link>
        </div>}
      </div>
    </nav>
  );
};

export default Navbar;