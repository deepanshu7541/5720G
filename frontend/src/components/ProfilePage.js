import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { User, Edit, Trophy, Activity, Camera } from "lucide-react"

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const [profile, setProfile] = useState({
    name: "Deepanshu Chand",
    email: "deepanshu@gmail.com",
    phone: "+1 (437) 696-7541",
    location: "Ontario, ON",
    bio: "Smart home enthusiast and energy efficiency advocate. Love using technology to make life more sustainable.",
    joinDate: "January 2024",
    avatar: "👤",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const stats = [
    { label: "Energy Saved", value: "1,234 kWh", icon: "📊" },
    { label: "Days Active", value: "127", icon: "📅" },
    { label: "Achievements", value: "8", icon: "🏆" },
    { label: "Carbon Reduced", value: "456 kg", icon: "🌱" },
  ]

  const achievements = [
    { name: "Energy Saver", description: "Saved 1000+ kWh", earned: true },
    { name: "Early Adopter", description: "Joined in first month", earned: true },
    { name: "Automation Master", description: "Set up 10+ automations", earned: true },
    { name: "Green Champion", description: "Reduced carbon footprint by 500kg", earned: false },
    { name: "Efficiency Expert", description: "Achieved 30% energy savings", earned: false },
    { name: "Smart Home Pro", description: "Connected 20+ devices", earned: false },
  ]

  const activities = [
    { action: "Manually turned on lights", time: "2 hours ago", type: "manual" },
    { action: "Energy report generated", time: "1 day ago", type: "system" },
    { action: "Temperature threshold updated", time: "3 days ago", type: "settings" },
    { action: "Achieved Energy Saver badge", time: "1 week ago", type: "achievement" },
    { action: "Profile updated", time: "2 weeks ago", type: "profile" },
  ]

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
      alert("Profile updated successfully!")
    }, 1000)
  }

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const tabs = [
    { id: "profile", label: "Profile Info", icon: User },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "activity", label: "Activity", icon: Activity },
  ]

  const renderProfileInfo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details and contact information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl border-4 border-gray-200">
                {profile.avatar}
              </div>
              {isEditing && (
                <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">{profile.name}</h3>
              <p className="text-gray-600">{profile.email}</p>
              <Badge variant="secondary" className="mt-2">
                Member since {profile.joinDate}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={profile.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <Input
                id="phone"
                type="tel"
                value={profile.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="location"
                type="text"
                value={profile.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium">
              Bio
            </label>
            <textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              disabled={!isEditing}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAchievements = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Your progress and milestones with LumoSense</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg flex items-center gap-4 ${
                  achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="text-2xl">{achievement.earned ? "🏆" : "🔒"}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                  <Badge variant={achievement.earned ? "default" : "secondary"}>
                    {achievement.earned ? "Earned" : "Locked"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderActivity = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent interactions with the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Activity className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
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
            <User className="h-8 w-8" />
            Profile
          </h1>
          <p className="text-gray-600 mt-2">Manage your account and preferences</p>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <div className="text-2xl mr-4">{stat.icon}</div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
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
          {activeTab === "profile" && renderProfileInfo()}
          {activeTab === "achievements" && renderAchievements()}
          {activeTab === "activity" && renderActivity()}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
