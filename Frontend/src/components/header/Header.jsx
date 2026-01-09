import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { verifyAuth, callLogoutUserApi } from "@/services";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await verifyAuth();
      setIsAuthenticated(authenticated);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    const data = await callLogoutUserApi();
    if (data?.success) {
      toast.success("Logged out successfully!");
      setIsAuthenticated(false);
      navigate("/signin");
    } else {
      toast.error("Failed to logout");
    }
  };

  return (
    <header className="sticky top-5 z-50 bg-white border-b border-gray-200 shadow-sm w-full">
      <nav className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div>
            <img
              src={logo}
              onClick={() => navigate("/tasks/list")}
              alt="Task Manager Logo"
              className="flex justify-center items-start h-22 mx-auto w-auto"
            />
          </div>

          {/* Center: Desktop Navigation Links */}
          {isAuthenticated && (
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center gap-6">
              <NavLink
                to="/tasks/list"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-black text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100 hover:text-black"
                  }`
                }
              >
                Tasks
              </NavLink>
              <NavLink
                to="/tasks/scrum-board"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-black text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100 hover:text-black"
                  }`
                }
              >
                Scrum Board
              </NavLink>
            </div>
          )}

          {/* Right: Auth Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop Auth Button */}
            <div className="hidden sm:block">
              {isAuthenticated ? (
                <Button
                  onClick={handleLogout}
                  className="bg-black hover:bg-gray-800 text-white transition-all duration-200 shadow-sm"
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  onClick={() => navigate("/signin")}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black transition-all duration-200"
                >
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            {isAuthenticated && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isAuthenticated && isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3">
            <div className="flex flex-col space-y-2">
              <NavLink
                to="/tasks/list"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                Tasks
              </NavLink>
              <NavLink
                to="/tasks/scrum-board"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                Scrum Board
              </NavLink>
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="bg-black hover:bg-gray-800 text-white transition-all duration-200 w-full"
              >
                Sign Out
              </Button>
            </div>
          </div>
        )}

        {/* Mobile Sign In Button (when not authenticated) */}
        {!isAuthenticated && (
          <div className="sm:hidden border-t border-gray-200 py-3">
            <Button
              onClick={() => navigate("/signin")}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black transition-all duration-200 w-full"
            >
              Sign In
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
