import { Mail, Plus, Edit, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const templates = [
  {
    id: 1,
    name: "Initial Outreach",
    subject: "Great meeting you at {event_name}",
    preview: "Hi {contact_name}, it was great meeting you at the conference yesterday...",
    category: "Cold Outreach",
    usage: 24,
  },
  {
    id: 2,
    name: "Follow-up After Demo",
    subject: "Thanks for your time today - next steps",
    preview: "Hi {contact_name}, thank you for taking the time to see our demo today...",
    category: "Follow-up",
    usage: 18,
  },
  {
    id: 3,
    name: "Proposal Submission",
    subject: "Your custom proposal for {company_name}",
    preview: "Hi {contact_name}, as discussed, please find attached our proposal...",
    category: "Proposal",
    usage: 12,
  },
];

export const EmailTemplates = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Email Templates</h1>
          <p className="text-muted-foreground">Pre-built templates for common communications</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Template
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="contact-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-sm">Subject:</p>
                <p className="text-sm text-muted-foreground">{template.subject}</p>
              </div>
              
              <div>
                <p className="font-medium text-sm">Preview:</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{template.preview}</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="status-badge status-badge-pending">{template.category}</span>
                <span className="text-muted-foreground">Used {template.usage} times</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 gap-2">
                  <Copy className="h-3 w-3" />
                  Use Template
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coming Soon Message */}
      <Card className="text-center py-12">
        <CardContent>
          <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">AI Email Assistant Coming Soon</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Our AI will help you craft perfect emails by analyzing your contact's communication style 
            and suggesting personalized content improvements.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};