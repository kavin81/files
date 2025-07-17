import { useState } from "react";
import { ArrowLeft, Mail, Phone, Building, Calendar, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SmartNotesEditor } from "@/components/ai/SmartNotesEditor";
import { useNavigate } from "react-router-dom";

// Mock contact data
const contact = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah@techcorp.com",
  phone: "+1 (555) 123-4567",
  company: "Tech Corp",
  position: "Chief Technology Officer",
  status: "Hot Lead",
  lastContact: "2 days ago",
  notes: "Met at Tech Conference 2024. Expressed strong interest in our enterprise solution. Company is currently using competitor product but looking for better integration capabilities.",
  activities: [
    { date: "2024-01-18", type: "Email", description: "Sent follow-up email with case studies" },
    { date: "2024-01-15", type: "Meeting", description: "Initial discovery call - 45 minutes" },
    { date: "2024-01-12", type: "Note", description: "Connected on LinkedIn after conference" },
  ]
};

export const ContactDetail = () => {
  const navigate = useNavigate();
  const [contactNotes, setContactNotes] = useState(contact.notes);

  const handleNotesChange = (notes: string) => {
    setContactNotes(notes);
    // In a real app, you'd save this to your backend
  };

  const handleTaskAdded = (taskTitle: string) => {
    // In a real app, you'd add this task to your task management system
    console.log("Task added:", taskTitle);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/contacts")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{contact.name}</h1>
          <p className="text-muted-foreground">{contact.position} at {contact.company}</p>
        </div>
        <Button className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Contact
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-primary-foreground">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">{contact.name}</h3>
                  <Badge variant={contact.status === 'Hot Lead' ? 'default' : 'secondary'}>
                    {contact.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{contact.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Last contact: {contact.lastContact}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button size="sm" className="flex-1">
                  <Mail className="h-3 w-3 mr-1" />
                  Email
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contact.activities.map((activity, index) => (
                  <div key={index} className="flex gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{activity.type}</span>
                        <span className="text-muted-foreground">{activity.date}</span>
                      </div>
                      <p className="text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI-Enhanced Notes */}
        <div className="lg:col-span-2">
          <SmartNotesEditor
            contactName={contact.name}
            initialNotes={contactNotes}
            onNotesChange={handleNotesChange}
            onTaskAdded={handleTaskAdded}
          />
        </div>
      </div>
    </div>
  );
};