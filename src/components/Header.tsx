
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, User, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">HomeEase</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-600 hover:text-blue-600 transition-colors ${
                isActive("/") ? "text-blue-600 font-medium" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/listings"
              className={`text-gray-600 hover:text-blue-600 transition-colors ${
                isActive("/listings") ? "text-blue-600 font-medium" : ""
              }`}
            >
              Listings
            </Link>
            <Link
              to="/about"
              className={`text-gray-600 hover:text-blue-600 transition-colors ${
                isActive("/about") ? "text-blue-600 font-medium" : ""
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-gray-600 hover:text-blue-600 transition-colors ${
                isActive("/contact") ? "text-blue-600 font-medium" : ""
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome back!</span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleAuthClick}>
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleAuthClick}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`text-gray-600 hover:text-blue-600 transition-colors ${
                  isActive("/") ? "text-blue-600 font-medium" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/listings"
                className={`text-gray-600 hover:text-blue-600 transition-colors ${
                  isActive("/listings") ? "text-blue-600 font-medium" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Listings
              </Link>
              <Link
                to="/about"
                className={`text-gray-600 hover:text-blue-600 transition-colors ${
                  isActive("/about") ? "text-blue-600 font-medium" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`text-gray-600 hover:text-blue-600 transition-colors ${
                  isActive("/contact") ? "text-blue-600 font-medium" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                {user ? (
                  <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleAuthClick}>
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleAuthClick}>
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
