import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Leaf, Zap, BarChart3, TrendingUp } from "lucide-react"

const PowerChart = ({ powerSaving }) => {
  // Mock data for power consumption over time
  const powerData = [
    { time: "00:00", consumption: 45, savings: 12 },
    { time: "04:00", consumption: 32, savings: 18 },
    { time: "08:00", consumption: 78, savings: 8 },
    { time: "12:00", consumption: 65, savings: 15 },
    { time: "16:00", consumption: 82, savings: 5 },
    { time: "20:00", consumption: 58, savings: 22 },
    { time: "24:00", consumption: 41, savings: 25 },
  ]

  const dailyStats = [
    { day: "Mon", saved: 18 },
    { day: "Tue", saved: 22 },
    { day: "Wed", saved: 15 },
    { day: "Thu", saved: 28 },
    { day: "Fri", saved: 19 },
    { day: "Sat", saved: 32 },
    { day: "Sun", saved: 25 },
  ]

  const maxConsumption = Math.max(...powerData.map((d) => d.consumption))
  const maxSavings = Math.max(...dailyStats.map((d) => d.saved))

  return (
    <div className="space-y-6">
      {/* Current Power Saving */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            Power Efficiency
          </CardTitle>
          <CardDescription>Real-time energy savings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="text-4xl font-bold text-green-600 mb-2">{powerSaving.toFixed(1)}%</div>
            <p className="text-sm text-gray-600 mb-4">Energy saved today</p>
            <div className="flex items-center justify-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              +2.3% from yesterday
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Power Consumption Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Power Consumption
          </CardTitle>
          <CardDescription>24-hour consumption pattern</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-end justify-between gap-2 px-4 pb-4">
            {powerData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm mb-2 transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
                  style={{ height: `${(data.consumption / maxConsumption) * 120}px` }}
                ></div>
                <span className="text-xs text-gray-500">{data.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Savings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-600" />
            Weekly Savings
          </CardTitle>
          <CardDescription>Energy saved per day this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-end justify-between gap-2 px-4 pb-8">
            {dailyStats.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="text-xs text-green-600 font-medium mb-1">{data.saved}%</div>
                <div
                  className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm mb-2 transition-all duration-300 hover:from-green-700 hover:to-green-500"
                  style={{ height: `${(data.saved / maxSavings) * 100}px` }}
                ></div>
                <span className="text-xs text-gray-500">{data.day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PowerChart
