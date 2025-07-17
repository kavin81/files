import { useState } from "react";
import { Plus, Calendar, Clock, CheckCircle, Circle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tasks = [
  {
    id: 1,
    title: "Follow up with Sarah Johnson",
    description: "Schedule demo call for enterprise solution",
    dueDate: "2024-01-20",
    priority: "High",
    status: "pending",
    assignee: "You",
    contact: "Sarah Johnson",
    category: "Follow-up",
  },
  {
    id: 2,
    title: "Prepare proposal for Tech Corp",
    description: "Create detailed proposal with pricing and timeline",
    dueDate: "2024-01-21",
    priority: "High",
    status: "pending",
    assignee: "You",
    contact: "Sarah Johnson",
    category: "Proposal",
  },
  {
    id: 3,
    title: "Schedule demo with StartupIO",
    description: "Coordinate with Mike Chen for product demo",
    dueDate: "2024-01-22",
    priority: "Medium",
    status: "pending",
    assignee: "You",
    contact: "Mike Chen",
    category: "Demo",
  },
  {
    id: 4,
    title: "Update contact information",
    description: "Verify and update contact details for Emma Davis",
    dueDate: "2024-01-25",
    priority: "Low",
    status: "completed",
    assignee: "You",
    contact: "Emma Davis",
    category: "Admin",
  },
];

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "High":
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    case "Medium":
      return <Clock className="h-4 w-4 text-warning" />;
    default:
      return <Circle className="h-4 w-4 text-muted-foreground" />;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    return date.toLocaleDateString();
  }
};

export const Tasks = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredTasks = tasks.filter(task => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return task.status === "pending";
    if (activeTab === "completed") return task.status === "completed";
    return true;
  });

  const pendingTasks = tasks.filter(task => task.status === "pending");
  const completedTasks = tasks.filter(task => task.status === "completed");
  const overdueTasks = pendingTasks.filter(task => new Date(task.dueDate) < new Date());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage your to-dos and follow-ups</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      {/* Task Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingTasks.length}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedTasks.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold">{overdueTasks.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="task-item">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {task.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getPriorityIcon(task.priority)}
                          <span className="text-sm font-medium">{task.priority}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(task.dueDate)}</span>
                        </div>
                        <span>•</span>
                        <span>Contact: {task.contact}</span>
                        <span>•</span>
                        <span className="status-badge-pending">{task.category}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};