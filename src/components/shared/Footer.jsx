import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-[1920px] mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mb-8">
          {/* Logo and Description */}
          <div className="mb-4 lg:mb-0">
            <div className="text-2xl font-bold text-white">ShadcnKit</div>
            <p className="mt-2 text-sm text-gray-400">
              A powerful and responsive UI kit to build modern web applications.
            </p>
          </div>

          {/* Links */}
          <div className="flex space-x-8">
            {/* Column 1 */}
            <div>
              <h4 className="text-lg font-semibold text-white">Resources</h4>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/docs"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tutorials"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-lg font-semibold text-white">Company</h4>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-blue-500 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-4 flex flex-col lg:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ShadcnKit. All rights reserved.
          </p>
          <div className="mt-4 lg:mt-0 flex space-x-4">
            <Link
              to="/privacy"
              className="text-sm text-gray-400 hover:text-blue-500"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-gray-400 hover:text-blue-500"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
