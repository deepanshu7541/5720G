import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Switch } from "./ui/switch"
import { Badge } from "./ui/badge"
import PowerChart from "./PowerChart"
import UpdatesFeed from "./UpdatesFeed"
import { Thermometer, Activity, Lightbulb, Wind } from "lucide-react"

const Dashboard = ({ systemState, setSystemState }) => {
  const [manualOverride, setManualOverride] = useState({
    lights: false,
    windows: false,
  })

  const handleLightToggle = () => {
    setSystemState((prev) => ({ ...prev, lights: !prev.lights }))
    setManualOverride((prev) => ({ ...prev, lights: true }))
  }

  const handleWindowToggle = () => {
    setSystemState((prev) => ({ ...prev, windows: !prev.windows }))
    setManualOverride((prev) => ({ ...prev, windows: true }))
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Controls */}
        <div className="space-y-6">
          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Status
              </CardTitle>
              <CardDescription>Last updated: {systemState.lastUpdate}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Temperature</span>
                </div>
                <Badge variant="secondary">{systemState.temperature.toFixed(1)}°C</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Motion</span>
                </div>
                <Badge variant={systemState.motion ? "default" : "secondary"}>
                  {systemState.motion ? "Detected" : "None"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Light Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Lighting Control
              </CardTitle>
              <CardDescription>Manual override available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Room Lights</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    Status: {systemState.lights ? "ON" : "OFF"}
                    {manualOverride.lights && (
                      <Badge variant="outline" className="text-xs">
                        Manual
                      </Badge>
                    )}
                  </p>
                </div>
                <Switch checked={systemState.lights} onCheckedChange={handleLightToggle} />
              </div>
            </CardContent>
          </Card>

          {/* Window Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="h-5 w-5" />
                Window Control
              </CardTitle>
              <CardDescription>Automatic ventilation system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Windows</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    Status: {systemState.windows ? "OPEN" : "CLOSED"}
                    {manualOverride.windows && (
                      <Badge variant="outline" className="text-xs">
                        Manual
                      </Badge>
                    )}
                  </p>
                </div>
                <Switch checked={systemState.windows} onCheckedChange={handleWindowToggle} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Charts */}
        <div className="space-y-6">
          <PowerChart powerSaving={systemState.powerSaving} />
        </div>

        {/* Right Column - Updates Feed */}
        <div className="space-y-6">
          <UpdatesFeed systemState={systemState} manualOverride={manualOverride} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
