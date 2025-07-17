import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  TrendingUp, 
  Users, 
  Globe, 
  Mail, 
  Phone, 
  MessageSquare,
  Calendar,
  Plus,
  Filter,
  Download,
  BarChart3,
  Zap
} from "lucide-react";

const leadSources = [
  { name: "Website Forms", leads: 145, conversion: 24, trend: "up", change: 12 },
  { name: "Social Media", leads: 89, conversion: 18, trend: "up", change: 8 },
  { name: "Email Campaigns", leads: 67, conversion: 31, trend: "down", change: -3 },
  { name: "Cold Outreach", leads: 43, conversion: 12, trend: "up", change: 15 },
  { name: "Referrals", leads: 38, conversion: 45, trend: "up", change: 22 },
  { name: "Events", leads: 29, conversion: 38, trend: "stable", change: 2 },
];

const campaigns = [
  {
    id: "1",
    name: "Q1 Product Launch",
    type: "Email",
    status: "Active",
    leads: 234,
    budget: 5000,
    spent: 3200,
    conversion: 28,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
  },
  {
    id: "2",
    name: "LinkedIn Outreach",
    type: "Social",
    status: "Active",
    leads: 156,
    budget: 3000,
    spent: 2100,
    conversion: 15,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
  },
  {
    id: "3",
    name: "Content Marketing",
    type: "Content",
    status: "Paused",
    leads: 89,
    budget: 4000,
    spent: 1800,
    conversion: 22,
    startDate: "2024-01-01",
    endDate: "2024-04-01",
  },
];

const recentLeads = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@techstartup.com",
    company: "Tech Startup Inc",
    source: "Website Forms",
    score: 85,
    status: "Hot Lead",
    createdAt: "2024-01-19T10:30:00Z",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@designstudio.com",
    company: "Design Studio",
    source: "Social Media",
    score: 72,
    status: "Qualified",
    createdAt: "2024-01-19T09:15:00Z",
  },
  {
    id: "3",
    name: "David Chen",
    email: "david@consulting.com",
    company: "Chen Consulting",
    source: "Referrals",
    score: 91,
    status: "Hot Lead",
    createdAt: "2024-01-18T16:45:00Z",
  },
];

export const LeadGeneration = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "Email",
    budget: "",
    startDate: "",
    endDate: "",
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success/10 text-success border-success/20";
      case "Paused":
        return "bg-warning/10 text-warning border-warning/20";
      case "Completed":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lead Generation</h1>
          <p className="text-muted-foreground">Manage campaigns and track lead sources</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="sources">Lead Sources</TabsTrigger>
          <TabsTrigger value="leads">Recent Leads</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="metric-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Leads
                  </CardTitle>
                  <Users className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-success mr-1" />
                    <span className="text-sm font-medium text-success">+18%</span>
                    <span className="text-sm text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="metric-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Conversion Rate
                  </CardTitle>
                  <Target className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24.5%</div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-success mr-1" />
                    <span className="text-sm font-medium text-success">+2.1%</span>
                    <span className="text-sm text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="metric-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Campaigns
                  </CardTitle>
                  <Zap className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <div className="flex items-center mt-2">
                    <span className="text-sm font-medium text-muted-foreground">2 ending soon</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="metric-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Cost per Lead
                  </CardTitle>
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$42</div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-destructive mr-1 rotate-180" />
                    <span className="text-sm font-medium text-destructive">-8%</span>
                    <span className="text-sm text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lead Sources Performance */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Lead Sources Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{source.name}</h4>
                          <p className="text-sm text-muted-foreground">{source.leads} leads this month</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-lg font-bold">{source.conversion}%</div>
                          <div className="text-xs text-muted-foreground">Conversion</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(source.trend)}
                          <span className={`text-sm font-medium ${
                            source.trend === 'up' ? 'text-success' :
                            source.trend === 'down' ? 'text-destructive' :
                            'text-muted-foreground'
                          }`}>
                            {source.change > 0 ? '+' : ''}{source.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Campaigns</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="contact-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{campaign.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{campaign.type} Campaign</p>
                      </div>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Leads:</span> {campaign.leads}
                      </div>
                      <div>
                        <span className="font-medium">Conversion:</span> {campaign.conversion}%
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Budget Used</span>
                        <span>${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
                      </div>
                      <Progress value={(campaign.spent / campaign.budget) * 100} />
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        View Details
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

        <TabsContent value="sources" className="mt-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Lead Source Analysis</CardTitle>
              <p className="text-sm text-muted-foreground">
                Track performance across all lead generation channels
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {leadSources.map((source, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{source.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {source.leads} leads • {source.conversion}% conversion
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(source.trend)}
                        <span className={`text-sm font-medium ${
                          source.trend === 'up' ? 'text-success' :
                          source.trend === 'down' ? 'text-destructive' :
                          'text-muted-foreground'
                        }`}>
                          {source.change > 0 ? '+' : ''}{source.change}%
                        </span>
                      </div>
                    </div>
                    <Progress value={source.conversion} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="mt-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
              <p className="text-sm text-muted-foreground">
                Latest leads from all sources
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-foreground">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{lead.name}</h4>
                        <p className="text-sm text-muted-foreground">{lead.email}</p>
                        <p className="text-sm text-muted-foreground">{lead.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getScoreColor(lead.score)}`}>
                          {lead.score}
                        </div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                      <Badge className={lead.status === 'Hot Lead' ? 'status-badge-success' : 'status-badge-warning'}>
                        {lead.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {lead.source}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};