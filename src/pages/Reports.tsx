import { useState } from "react";
import { ReportBuilder } from "@/components/reports/ReportBuilder";
import { KPIDashboard } from "@/components/analytics/KPIDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BarChart3, TrendingUp, Calendar } from "lucide-react";

const savedReports = [
  {
    id: "1",
    name: "Monthly Sales Report",
    type: "deals",
    lastRun: "2024-01-19",
    description: "Comprehensive sales performance analysis",
  },
  {
    id: "2",
    name: "Lead Conversion Analysis",
    type: "contacts",
    lastRun: "2024-01-18",
    description: "Track lead sources and conversion rates",
  },
  {
    id: "3",
    name: "Task Completion Report",
    type: "tasks",
    lastRun: "2024-01-17",
    description: "Team productivity and task completion metrics",
  },
];

export const Reports = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <p className="text-muted-foreground">Analyze your business performance and generate insights</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="builder" className="gap-2">
            <FileText className="h-4 w-4" />
            Report Builder
          </TabsTrigger>
          <TabsTrigger value="saved" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Saved Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <KPIDashboard />
        </TabsContent>

        <TabsContent value="builder" className="mt-6">
          <ReportBuilder />
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Saved Reports</h2>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedReports.map((report) => (
                <Card key={report.id} className="contact-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{report.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="status-badge status-badge-pending capitalize">{report.type}</span>
                      <span className="text-muted-foreground">Last run: {report.lastRun}</span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        Run Report
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};