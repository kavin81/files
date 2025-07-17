import { Users, CheckSquare, TrendingUp, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  {
    title: "Total Contacts",
    value: "2,847",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Open Tasks",
    value: "23",
    change: "-4%",
    changeType: "negative" as const,
    icon: CheckSquare,
  },
  {
    title: "This Month's Deals",
    value: "$47,500",
    change: "+23%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Overdue Items",
    value: "7",
    change: "+2",
    changeType: "neutral" as const,
    icon: Clock,
  },
];

const recentContacts = [
  { name: "Sarah Johnson", email: "sarah@example.com", company: "Tech Corp", status: "Hot Lead" },
  { name: "Mike Chen", email: "mike@startup.io", company: "StartupIO", status: "Qualified" },
  { name: "Emma Davis", email: "emma@design.co", company: "Design Co", status: "New" },
  { name: "James Wilson", email: "james@agency.com", company: "Creative Agency", status: "Follow-up" },
];

const recentTasks = [
  { title: "Follow up with Sarah Johnson", due: "Today", priority: "High" },
  { title: "Prepare proposal for Tech Corp", due: "Tomorrow", priority: "Medium" },
  { title: "Schedule demo with StartupIO", due: "This week", priority: "High" },
  { title: "Update contact information", due: "Friday", priority: "Low" },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6 relative">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)] pointer-events-none" />
      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening with your business.</p>
        </div>
        <Button className="gap-2 bg-gradient-primary hover:opacity-90 transition-opacity shadow-[var(--shadow-primary)] glow-primary">
          <Plus className="h-4 w-4" />
          Add Contact
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {metrics.map((metric) => (
          <Card key={metric.title} className="metric-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-success' :
                  metric.changeType === 'negative' ? 'text-destructive' :
                  'text-muted-foreground'
                }`}>
                  {metric.change}
                </span>
                <span className="text-sm text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        {/* Recent Contacts */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Contacts
              <Button variant="ghost" size="sm" className="hover:bg-surface/50">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentContacts.map((contact, index) => (
              <div key={index} className="contact-card">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-sm text-muted-foreground">{contact.email}</p>
                    <p className="text-sm text-muted-foreground">{contact.company}</p>
                  </div>
                  <span className={`status-badge ${
                    contact.status === 'Hot Lead' ? 'status-badge-success' :
                    contact.status === 'Follow-up' ? 'status-badge-warning' :
                    'status-badge-pending'
                  }`}>
                    {contact.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Upcoming Tasks
              <Button variant="ghost" size="sm" className="hover:bg-surface/50">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTasks.map((task, index) => (
              <div key={index} className="task-item">
                <div className="w-4 h-4 border-2 border-border rounded"></div>
                <div className="flex-1">
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-muted-foreground">{task.due}</p>
                </div>
                <span className={`status-badge ${
                  task.priority === 'High' ? 'status-badge-success' :
                  task.priority === 'Medium' ? 'status-badge-warning' :
                  'status-badge-pending'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};