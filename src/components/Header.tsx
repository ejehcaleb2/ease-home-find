
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, User, Menu, X, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import Logo from "./Logo";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userProfile, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleAccountSettings = () => {
    navigate('/account');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">HomeEase</span>
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
                <span className="text-gray-600">
                  Welcome, {userProfile?.full_name || user.user_metadata?.full_name || 'User'}!
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={handleAccountSettings}>
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                  <>
                    <div className="text-gray-600 px-2">
                      Welcome, {userProfile?.full_name || user.user_metadata?.full_name || 'User'}!
                    </div>
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleAccountSettings}>
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
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
