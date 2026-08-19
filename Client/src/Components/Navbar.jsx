import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-blue-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <h3 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
            TaskManager
          </h3>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-800 transition-colors duration-200"
          >
            Home
          </Link>

          <Link
            to="/new"
            className="px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-800 transition-colors duration-200"
          >
            Add Task
          </Link>

          <Link
            to="/profile"
            className="px-4 py-2 rounded-lg hover:bg-purple-50 text-gray-800 transition-colors duration-200"
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;