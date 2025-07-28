import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Lightbulb, Home, Bell, Settings, User, LogOut, Leaf } from "lucide-react"

const Navbar = ({ onLogout, notifications, systemState }) => {
  const location = useLocation()
  const unreadNotifications = notifications.filter((n) => !n.read).length

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-border z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Lightbulb className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">LumoSense Dashboard</h1>
            <p className="text-xs text-gray-600">Real-time lighting management</p>
          </div>
        </div> */}
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="LumoSense Logo"
            className="h-12 w-40 object-contain rounded-lg"
          />
        </div>

        <div className="flex items-center gap-6">
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            <Leaf className="h-3 w-3 mr-1" />
            {systemState.powerSaving.toFixed(1)}% saved
          </Badge>

          <div className="flex items-center gap-2">
            <Button variant={location.pathname === "/" ? "default" : "ghost"} className="border-radius:1px" size="sm" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>

            <Button
              variant={location.pathname === "/notifications" ? "default" : "ghost"}
              size="sm"
              asChild
              className="relative rounded-lg"
            >
              <Link to="/notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500 text-white">
                    {unreadNotifications}
                  </Badge>
                )}
              </Link>
            </Button>

            <Button variant={location.pathname === "/settings" ? "default" : "ghost"} className="rounded-lg" size="sm" asChild>
              <Link to="/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>

            <Button variant={location.pathname === "/profile" ? "default" : "ghost"} className="rounded-lg" size="sm" asChild>
              <Link to="/profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </Button>

            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
