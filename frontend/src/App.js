"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import Dashboard from "./components/Dashboard"
import NotificationsPage from "./components/NotificationsPage"
import SettingsPage from "./components/SettingsPage"
import ProfilePage from "./components/ProfilePage"
import Navbar from "./components/Navbar"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [systemState, setSystemState] = useState({
    lights: true,
    windows: false,
    temperature: 22.5,
    motion: true,
    powerSaving: 15.2,
    lastUpdate: new Date().toLocaleTimeString(),
  })

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "info",
      title: "System Update",
      message: "LumoSense system has been updated to version 2.1.0",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
    },
    {
      id: "2",
      type: "warning",
      title: "High Temperature Alert",
      message: "Room temperature exceeded 28°C. Windows opened automatically.",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      read: false,
    },
    {
      id: "3",
      type: "success",
      title: "Energy Goal Achieved",
      message: "You've saved 20% more energy this week compared to last week!",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true,
    },
  ])

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("lumosense_token")
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        setSystemState((prev) => ({
          ...prev,
          temperature: 20 + Math.random() * 10,
          motion: Math.random() > 0.3,
          powerSaving: 10 + Math.random() * 20,
          lastUpdate: new Date().toLocaleTimeString(),
        }))
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  const handleLogin = (token) => {
    localStorage.setItem("lumosense_token", token)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("lumosense_token")
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar onLogout={handleLogout} notifications={notifications} systemState={systemState} />
        <main className="pt-20 p-6">
          <Routes>
            <Route path="/" element={<Dashboard systemState={systemState} setSystemState={setSystemState} />} />
            <Route
              path="/notifications"
              element={<NotificationsPage notifications={notifications} setNotifications={setNotifications} />}
            />
            <Route
              path="/settings"
              element={<SettingsPage systemState={systemState} setSystemState={setSystemState} />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
