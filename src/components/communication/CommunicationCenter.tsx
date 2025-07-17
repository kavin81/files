import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MessageSquare, Calendar, Send, Clock, CheckCircle } from "lucide-react";
import { CommunicationRecord } from "@/types/crm";

const mockCommunications: CommunicationRecord[] = [
  {
    id: "1",
    type: "email",
    direction: "outbound",
    subject: "Follow-up on our meeting",
    content: "Hi Sarah, thank you for taking the time to meet with us yesterday...",
    timestamp: "2024-01-19T10:30:00Z",
    participants: ["sarah@techcorp.com"],
  },
  {
    id: "2",
    type: "call",
    direction: "inbound",
    content: "Customer called regarding pricing questions",
    timestamp: "2024-01-19T14:15:00Z",
    duration: 25,
    participants: ["mike@startup.io"],
  },
  {
    id: "3",
    type: "meeting",
    direction: "outbound",
    subject: "Product Demo",
    content: "Conducted product demonstration for potential client",
    timestamp: "2024-01-18T16:00:00Z",
    duration: 45,
    participants: ["emma@designco.com"],
  },
];

const templates = [
  {
    id: "1",
    name: "Follow-up Email",
    subject: "Following up on our conversation",
    content: "Hi {contact_name},\n\nThank you for taking the time to speak with me today...",
  },
  {
    id: "2",
    name: "Meeting Request",
    subject: "Meeting Request - {subject}",
    content: "Hi {contact_name},\n\nI'd like to schedule a meeting to discuss...",
  },
];

export const CommunicationCenter = () => {
  const [activeTab, setActiveTab] = useState("compose");
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    content: "",
    template: "",
  });

  const [smsData, setSmsData] = useState({
    to: "",
    message: "",
  });

  const handleSendEmail = () => {
    // In a real app, this would send the email
    console.log("Sending email:", emailData);
  };

  const handleSendSMS = () => {
    // In a real app, this would send the SMS
    console.log("Sending SMS:", smsData);
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setEmailData(prev => ({
        ...prev,
        subject: template.subject,
        content: template.content,
        template: templateId,
      }));
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getCommunicationIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "call":
        return <Phone className="h-4 w-4" />;
      case "sms":
        return <MessageSquare className="h-4 w-4" />;
      case "meeting":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Communication Center</h2>
        <p className="text-muted-foreground">Manage all your customer communications in one place</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Email Composer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Send Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Template</label>
                  <Select value={emailData.template} onValueChange={handleTemplateSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <Input
                    type="email"
                    value={emailData.to}
                    onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
                    placeholder="recipient@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    value={emailData.subject}
                    onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Email subject"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    value={emailData.content}
                    onChange={(e) => setEmailData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Type your message here..."
                    rows={6}
                  />
                </div>

                <Button onClick={handleSendEmail} className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Send Email
                </Button>
              </CardContent>
            </Card>

            {/* SMS Composer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Send SMS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    type="tel"
                    value={smsData.to}
                    onChange={(e) => setSmsData(prev => ({ ...prev, to: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    value={smsData.message}
                    onChange={(e) => setSmsData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Type your SMS message here..."
                    rows={4}
                    maxLength={160}
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {smsData.message.length}/160 characters
                  </div>
                </div>

                <Button onClick={handleSendSMS} className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Send SMS
                </Button>

                {/* Quick Actions */}
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Phone className="h-4 w-4" />
                      Log Call
                    </Button>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Calendar className="h-4 w-4" />
                      Schedule Meeting
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Communication History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCommunications.map((comm) => (
                  <div key={comm.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className={`p-2 rounded-full ${
                        comm.direction === 'outbound' ? 'bg-primary/10' : 'bg-secondary'
                      }`}>
                        {getCommunicationIcon(comm.type)}
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">
                            {comm.subject || `${comm.type.charAt(0).toUpperCase() + comm.type.slice(1)}`}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {comm.participants?.join(", ")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={comm.direction === 'outbound' ? 'default' : 'secondary'}>
                            {comm.direction}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(comm.timestamp)}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm">{comm.content}</p>
                      
                      {comm.duration && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{comm.duration} minutes</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="contact-card">
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Subject:</p>
                    <p className="text-sm text-muted-foreground">{template.subject}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Content:</p>
                    <p className="text-sm text-muted-foreground line-clamp-3">{template.content}</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1" onClick={() => handleTemplateSelect(template.id)}>
                      Use Template
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
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