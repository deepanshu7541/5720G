"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Switch } from "./ui/switch"
import { Settings, ComputerIcon as System, Bell, Palette, Shield, Save } from "lucide-react"

const SettingsPage = ({ systemState, setSystemState }) => {
  const [activeTab, setActiveTab] = useState("system")
  const [settings, setSettings] = useState({
    // System Settings
    autoLights: true,
    autoWindows: true,
    motionSensitivity: 75,
    temperatureThreshold: 25,
    lightBrightness: 80,

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    systemAlerts: true,
    energyReports: false,

    // Appearance Settings
    theme: "light",
    language: "en",
    timezone: "UTC",

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    apiAccess: false,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      alert("Settings saved successfully!")
    }, 1000)
  }

  const tabs = [
    { id: "system", label: "System", icon: System },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "security", label: "Security", icon: Shield },
  ]

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>Configure automatic system behaviors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Automatic Lighting</h4>
              <p className="text-sm text-gray-600">Enable motion-based lighting control</p>
            </div>
            <Switch
              checked={settings.autoLights}
              onCheckedChange={(checked) => handleSettingChange("autoLights", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Automatic Windows</h4>
              <p className="text-sm text-gray-600">Enable temperature-based window control</p>
            </div>
            <Switch
              checked={settings.autoWindows}
              onCheckedChange={(checked) => handleSettingChange("autoWindows", checked)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Motion Sensitivity</h4>
              <span className="text-sm text-gray-600">{settings.motionSensitivity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.motionSensitivity}
              onChange={(e) => handleSettingChange("motionSensitivity", Number.parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Temperature Threshold</h4>
              <span className="text-sm text-gray-600">{settings.temperatureThreshold}°C</span>
            </div>
            <input
              type="range"
              min="15"
              max="35"
              value={settings.temperatureThreshold}
              onChange={(e) => handleSettingChange("temperatureThreshold", Number.parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Light Brightness</h4>
              <span className="text-sm text-gray-600">{settings.lightBrightness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.lightBrightness}
              onChange={(e) => handleSettingChange("lightBrightness", Number.parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Push Notifications</h4>
              <p className="text-sm text-gray-600">Receive browser push notifications</p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">System Alerts</h4>
              <p className="text-sm text-gray-600">Critical system notifications</p>
            </div>
            <Switch
              checked={settings.systemAlerts}
              onCheckedChange={(checked) => handleSettingChange("systemAlerts", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Energy Reports</h4>
              <p className="text-sm text-gray-600">Weekly energy consumption reports</p>
            </div>
            <Switch
              checked={settings.energyReports}
              onCheckedChange={(checked) => handleSettingChange("energyReports", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance Settings</CardTitle>
          <CardDescription>Customize the look and feel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Theme</h4>
              <p className="text-sm text-gray-600">Choose your preferred theme</p>
            </div>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange("theme", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Language</h4>
              <p className="text-sm text-gray-600">Select your language</p>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange("language", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Timezone</h4>
              <p className="text-sm text-gray-600">Set your timezone</p>
            </div>
            <select
              value={settings.timezone}
              onChange={(e) => handleSettingChange("timezone", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="GMT">Greenwich Mean Time</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <Switch
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Session Timeout</h4>
              <span className="text-sm text-gray-600">{settings.sessionTimeout} minutes</span>
            </div>
            <input
              type="range"
              min="5"
              max="120"
              step="5"
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">API Access</h4>
              <p className="text-sm text-gray-600">Allow third-party API access</p>
            </div>
            <Switch
              checked={settings.apiAccess}
              onCheckedChange={(checked) => handleSettingChange("apiAccess", checked)}
            />
          </div>

          <div className="pt-6 border-t border-red-200">
            <Button variant="destructive">Reset All Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Settings className="h-8 w-8" />
            Settings
          </h1>
          <p className="text-gray-600 mt-2">Configure your LumoSense system preferences</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="lg:col-span-3">
          {activeTab === "system" && renderSystemSettings()}
          {activeTab === "notifications" && renderNotificationSettings()}
          {activeTab === "appearance" && renderAppearanceSettings()}
          {activeTab === "security" && renderSecuritySettings()}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
