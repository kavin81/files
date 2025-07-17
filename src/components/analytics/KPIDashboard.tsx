import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus, Target, Users, DollarSign, CheckSquare, Calendar } from "lucide-react";
import { KPI } from "@/types/crm";

const mockKPIs: KPI[] = [
  {
    id: "1",
    name: "Monthly Revenue",
    value: 125000,
    target: 150000,
    unit: "USD",
    trend: "up",
    change: 12.5,
    period: "monthly",
  },
  {
    id: "2",
    name: "New Contacts",
    value: 89,
    target: 100,
    unit: "contacts",
    trend: "up",
    change: 8.2,
    period: "monthly",
  },
  {
    id: "3",
    name: "Conversion Rate",
    value: 24.5,
    target: 30,
    unit: "%",
    trend: "down",
    change: -2.1,
    period: "monthly",
  },
  {
    id: "4",
    name: "Tasks Completed",
    value: 156,
    target: 200,
    unit: "tasks",
    trend: "up",
    change: 15.3,
    period: "weekly",
  },
  {
    id: "5",
    name: "Average Deal Size",
    value: 12500,
    target: 15000,
    unit: "USD",
    trend: "stable",
    change: 0.5,
    period: "monthly",
  },
  {
    id: "6",
    name: "Pipeline Value",
    value: 450000,
    target: 500000,
    unit: "USD",
    trend: "up",
    change: 18.7,
    period: "monthly",
  },
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-success" />;
    case "down":
      return <TrendingDown className="h-4 w-4 text-destructive" />;
    default:
      return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
};

const getKPIIcon = (name: string) => {
  if (name.toLowerCase().includes("revenue") || name.toLowerCase().includes("deal")) {
    return <DollarSign className="h-5 w-5" />;
  }
  if (name.toLowerCase().includes("contact")) {
    return <Users className="h-5 w-5" />;
  }
  if (name.toLowerCase().includes("task")) {
    return <CheckSquare className="h-5 w-5" />;
  }
  if (name.toLowerCase().includes("conversion")) {
    return <Target className="h-5 w-5" />;
  }
  return <Calendar className="h-5 w-5" />;
};

const formatValue = (value: number, unit: string) => {
  if (unit === "USD") {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
  if (unit === "%") {
    return `${value}%`;
  }
  return `${value} ${unit}`;
};

const formatChange = (change: number) => {
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change}%`;
};

export const KPIDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Key Performance Indicators</h2>
        <p className="text-muted-foreground">Track your business metrics and performance</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockKPIs.map((kpi) => {
          const progressPercentage = kpi.target ? (kpi.value / kpi.target) * 100 : 0;
          
          return (
            <Card key={kpi.id} className="metric-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.name}
                </CardTitle>
                {getKPIIcon(kpi.name)}
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-2xl font-bold">
                    {formatValue(kpi.value, kpi.unit)}
                  </div>
                  {kpi.target && (
                    <div className="text-sm text-muted-foreground">
                      Target: {formatValue(kpi.target, kpi.unit)}
                    </div>
                  )}
                </div>

                {kpi.target && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTrendIcon(kpi.trend)}
                    <span className={`text-sm font-medium ${
                      kpi.trend === 'up' ? 'text-success' :
                      kpi.trend === 'down' ? 'text-destructive' :
                      'text-muted-foreground'
                    }`}>
                      {formatChange(kpi.change)}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground capitalize">
                    {kpi.period}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">KPIs on Track</span>
                <span className="font-medium">4 of 6</span>
              </div>
              <Progress value={66.7} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Monthly Target Achievement</span>
                <span className="font-medium">83%</span>
              </div>
              <Progress value={83} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Overall Performance</span>
                <span className="font-medium text-success">Good</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Trending Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockKPIs
              .filter(kpi => kpi.trend !== 'stable')
              .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
              .slice(0, 4)
              .map((kpi) => (
                <div key={kpi.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getTrendIcon(kpi.trend)}
                    <span className="text-sm font-medium">{kpi.name}</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-success' : 'text-destructive'
                  }`}>
                    {formatChange(kpi.change)}
                  </span>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};