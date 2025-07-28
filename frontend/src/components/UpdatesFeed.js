"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Bell, CheckCircle, Info, Settings } from "lucide-react"

const UpdatesFeed = ({ systemState, manualOverride }) => {
  const [updates, setUpdates] = useState([
    {
      id: "1",
      type: "success",
      title: "System Initialized",
      description: "LumoSense system started successfully",
      timestamp: new Date(Date.now() - 300000).toLocaleTimeString(),
      icon: CheckCircle,
    },
    {
      id: "2",
      type: "info",
      title: "Motion Detected",
      description: "Motion sensor activated in main room",
      timestamp: new Date(Date.now() - 240000).toLocaleTimeString(),
      icon: Info,
    },
    {
      id: "3",
      type: "success",
      title: "Lights Activated",
      description: "Room lights turned ON automatically",
      timestamp: new Date(Date.now() - 180000).toLocaleTimeString(),
      icon: CheckCircle,
    },
  ])

  // Add new updates based on system state changes
  useEffect(() => {
    const newUpdate = {
      id: Date.now().toString(),
      type: "info",
      title: "Sensor Update",
      description: `Temperature: ${systemState.temperature.toFixed(1)}°C, Motion: ${systemState.motion ? "Detected" : "None"}`,
      timestamp: systemState.lastUpdate,
      icon: Info,
    }

    setUpdates((prev) => [newUpdate, ...prev.slice(0, 9)]) // Keep only last 10 updates
  }, [systemState.temperature, systemState.motion, systemState.lastUpdate])

  // Add manual override updates
  useEffect(() => {
    if (manualOverride.lights) {
      const update = {
        id: Date.now().toString() + "_lights",
        type: "warning",
        title: "Manual Override",
        description: `Lights manually ${systemState.lights ? "turned ON" : "turned OFF"}`,
        timestamp: new Date().toLocaleTimeString(),
        icon: Settings,
      }
      setUpdates((prev) => [update, ...prev.slice(0, 9)])
    }
  }, [manualOverride.lights, systemState.lights])

  useEffect(() => {
    if (manualOverride.windows) {
      const update = {
        id: Date.now().toString() + "_windows",
        type: "warning",
        title: "Manual Override",
        description: `Windows manually ${systemState.windows ? "opened" : "closed"}`,
        timestamp: new Date().toLocaleTimeString(),
        icon: Settings,
      }
      setUpdates((prev) => [update, ...prev.slice(0, 9)])
    }
  }, [manualOverride.windows, systemState.windows])

  const getUpdateVariant = (type) => {
    switch (type) {
      case "success":
        return "default"
      case "warning":
        return "secondary"
      case "error":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getUpdateColors = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "error":
        return "bg-red-50 border-red-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          System Updates
        </CardTitle>
        <CardDescription>Real-time events and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {updates.map((update) => {
            const IconComponent = update.icon
            return (
              <div key={update.id} className={`p-3 rounded-lg border-l-4 ${getUpdateColors(update.type)}`}>
                <div className="flex items-start gap-3">
                  <IconComponent className="h-4 w-4 mt-0.5 text-gray-600" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-gray-900">{update.title}</h4>
                      <Badge variant={getUpdateVariant(update.type)} className="text-xs">
                        {update.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{update.description}</p>
                    <span className="text-xs text-gray-500">{update.timestamp}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default UpdatesFeed
