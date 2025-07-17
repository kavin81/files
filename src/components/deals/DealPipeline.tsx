import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, Calendar, User } from "lucide-react";
import { Deal } from "@/types/crm";

const mockDeals: Deal[] = [
  {
    id: "1",
    title: "Enterprise Software License",
    contactId: "1",
    organizationId: "1",
    value: 50000,
    currency: "USD",
    stage: "Qualification",
    probability: 60,
    expectedCloseDate: "2024-02-15",
    products: [],
    notes: "Large enterprise deal with high potential",
    assignedTo: "John Doe",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
  },
  {
    id: "2",
    title: "Marketing Automation Setup",
    contactId: "2",
    value: 25000,
    currency: "USD",
    stage: "Proposal",
    probability: 80,
    expectedCloseDate: "2024-01-30",
    products: [],
    notes: "Ready to send proposal",
    assignedTo: "Jane Smith",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-17",
  },
  {
    id: "3",
    title: "CRM Implementation",
    contactId: "3",
    value: 75000,
    currency: "USD",
    stage: "Negotiation",
    probability: 90,
    expectedCloseDate: "2024-02-28",
    products: [],
    notes: "Final pricing negotiations",
    assignedTo: "John Doe",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-19",
  },
];

const stages = [
  { name: "Prospecting", color: "bg-gray-100" },
  { name: "Qualification", color: "bg-blue-100" },
  { name: "Proposal", color: "bg-yellow-100" },
  { name: "Negotiation", color: "bg-orange-100" },
  { name: "Closed Won", color: "bg-green-100" },
  { name: "Closed Lost", color: "bg-red-100" },
];

export const DealPipeline = () => {
  const [deals] = useState<Deal[]>(mockDeals);

  const getDealsByStage = (stage: string) => {
    return deals.filter(deal => deal.stage === stage);
  };

  const getStageValue = (stage: string) => {
    return getDealsByStage(stage).reduce((sum, deal) => sum + deal.value, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sales Pipeline</h2>
          <p className="text-muted-foreground">Track deals through your sales process</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Deal
        </Button>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stages.map((stage) => {
          const stageDeals = getDealsByStage(stage.name);
          const stageValue = getStageValue(stage.name);
          
          return (
            <Card key={stage.name} className="text-center">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  {stage.name}
                </div>
                <div className="text-2xl font-bold">{stageDeals.length}</div>
                <div className="text-sm text-muted-foreground">
                  {formatCurrency(stageValue)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pipeline Board */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 min-h-[600px]">
        {stages.map((stage) => {
          const stageDeals = getDealsByStage(stage.name);
          
          return (
            <div key={stage.name} className="space-y-3">
              <div className={`p-3 rounded-lg ${stage.color}`}>
                <h3 className="font-medium text-sm">{stage.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {stageDeals.length} deals • {formatCurrency(getStageValue(stage.name))}
                </p>
              </div>
              
              <div className="space-y-3">
                {stageDeals.map((deal) => (
                  <Card key={deal.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm line-clamp-2">{deal.title}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            <DollarSign className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm font-medium">{formatCurrency(deal.value)}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>{deal.assignedTo}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(deal.expectedCloseDate)}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {deal.probability}% chance
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};