import { EmailProcessor } from "@/components/ai/EmailProcessor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Zap, Target, Clock } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Smart Classification",
    description: "AI automatically categorizes emails by type, sentiment, and urgency level."
  },
  {
    icon: Zap,
    title: "Auto-Processing",
    description: "Instantly creates tickets or tasks based on email content and context."
  },
  {
    icon: Target,
    title: "Data Extraction",
    description: "Extracts key information like customer names, amounts, and deadlines."
  },
  {
    icon: Clock,
    title: "Faster Response",
    description: "Reduces email triage time from hours to seconds with AI insights."
  }
];

export const EmailIntelligence = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Email Intelligence
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-powered email processing that automatically creates tickets and tasks
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {features.map((feature) => (
          <Card key={feature.title} className="metric-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {feature.title}
              </CardTitle>
              <feature.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Email Processor */}
      <EmailProcessor />
    </div>
  );
};