import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-gray-800 to-gray-900 text-gray-300 mt-10 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-2">TaskManager</h3>
            <p className="text-gray-400 text-sm">
              Your personal task management tool to stay organized and productive.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/home"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  → Home
                </Link>
              </li>
              <li>
                <Link
                  to="/new"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  → Add Task
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  → Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Connect</h4>
            <p className="text-gray-400 text-sm mb-2">📧 info@taskmanager.com</p>
            <p className="text-gray-400 text-sm">Made with ❤️ by TaskManager Team</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; 2024 TaskManager. All rights reserved.</p>
            <div className="flex gap-4 mt-3 md:mt-0">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
