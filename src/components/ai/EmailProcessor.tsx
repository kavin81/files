import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Bot, CheckSquare, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProcessedEmail {
  id: string;
  subject: string;
  sender: string;
  content: string;
  aiAnalysis: {
    sentiment: 'positive' | 'negative' | 'neutral' | 'urgent';
    category: 'support' | 'sales' | 'billing' | 'general';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    suggestedAction: 'create_ticket' | 'create_task' | 'forward' | 'respond';
    summary: string;
    extractedData: {
      customerName?: string;
      issue?: string;
      deadline?: string;
      amount?: string;
    };
  };
  createdTicket?: {
    id: string;
    title: string;
    status: string;
  };
  createdTask?: {
    id: string;
    title: string;
    dueDate: string;
  };
}

export const EmailProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [emailContent, setEmailContent] = useState("");
  const [processedEmails, setProcessedEmails] = useState<ProcessedEmail[]>([]);
  const { toast } = useToast();

  const processEmailWithAI = async (emailText: string) => {
    setIsProcessing(true);
    try {
      // In a real implementation, this would call your Supabase Edge Function
      // that integrates with an LLM API (OpenAI, Anthropic, etc.)
      
      // Simulated AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockProcessedEmail: ProcessedEmail = {
        id: `email_${Date.now()}`,
        subject: "Urgent: Payment Issue with Account #12345",
        sender: "john.customer@example.com",
        content: emailText,
        aiAnalysis: {
          sentiment: 'urgent',
          category: 'billing',
          priority: 'urgent',
          suggestedAction: 'create_ticket',
          summary: "Customer is experiencing payment processing issues with their account. Requires immediate attention from billing team.",
          extractedData: {
            customerName: "John Customer",
            issue: "Payment processing failure",
            amount: "$299.99"
          }
        },
        createdTicket: {
          id: "TICK-001",
          title: "Payment Processing Issue - Account #12345",
          status: "Open"
        }
      };

      setProcessedEmails(prev => [mockProcessedEmail, ...prev]);
      setEmailContent("");
      
      toast({
        title: "Email Processed Successfully",
        description: `Created ticket ${mockProcessedEmail.createdTicket?.id} with high priority`,
      });
      
    } catch (error) {
      toast({
        title: "Processing Failed",
        description: "Failed to process email with AI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'urgent': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'negative': return 'bg-warning/10 text-warning border-warning/20';
      case 'positive': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'high': return <AlertCircle className="h-4 w-4 text-warning" />;
      default: return <CheckSquare className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Input Section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Email Processor
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Paste an email below and our AI will analyze it, extract key information, and automatically create tickets or tasks.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste email content here..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="min-h-[120px] bg-surface/50 border-border/50"
          />
          <Button
            onClick={() => processEmailWithAI(emailContent)}
            disabled={!emailContent.trim() || isProcessing}
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing with AI...
              </>
            ) : (
              <>
                <Bot className="h-4 w-4 mr-2" />
                Process Email
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Processed Emails */}
      {processedEmails.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recently Processed Emails</h3>
          {processedEmails.map((email) => (
            <Card key={email.id} className="glass-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Mail className="h-4 w-4" />
                      {email.subject}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">From: {email.sender}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getSentimentColor(email.aiAnalysis.sentiment)}>
                      {email.aiAnalysis.sentiment}
                    </Badge>
                    <Badge variant="outline">
                      {email.aiAnalysis.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* AI Analysis */}
                <div className="ai-suggestion">
                  <div className="flex items-start gap-3">
                    {getPriorityIcon(email.aiAnalysis.priority)}
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">AI Analysis</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {email.aiAnalysis.summary}
                      </p>
                      
                      {/* Extracted Data */}
                      {email.aiAnalysis.extractedData && (
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {email.aiAnalysis.extractedData.customerName && (
                            <div>
                              <span className="font-medium">Customer:</span> {email.aiAnalysis.extractedData.customerName}
                            </div>
                          )}
                          {email.aiAnalysis.extractedData.issue && (
                            <div>
                              <span className="font-medium">Issue:</span> {email.aiAnalysis.extractedData.issue}
                            </div>
                          )}
                          {email.aiAnalysis.extractedData.amount && (
                            <div>
                              <span className="font-medium">Amount:</span> {email.aiAnalysis.extractedData.amount}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Created Items */}
                <div className="flex gap-4">
                  {email.createdTicket && (
                    <div className="flex-1 p-3 bg-success/5 border border-success/20 rounded-lg">
                      <div className="flex items-center gap-2 text-success mb-1">
                        <CheckSquare className="h-4 w-4" />
                        <span className="font-medium">Ticket Created</span>
                      </div>
                      <p className="text-sm">{email.createdTicket.title}</p>
                      <p className="text-xs text-muted-foreground">ID: {email.createdTicket.id}</p>
                    </div>
                  )}
                  
                  {email.createdTask && (
                    <div className="flex-1 p-3 bg-warning/5 border border-warning/20 rounded-lg">
                      <div className="flex items-center gap-2 text-warning mb-1">
                        <CheckSquare className="h-4 w-4" />
                        <span className="font-medium">Task Created</span>
                      </div>
                      <p className="text-sm">{email.createdTask.title}</p>
                      <p className="text-xs text-muted-foreground">Due: {email.createdTask.dueDate}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Integration Notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-primary mb-2">Backend Integration Required</h4>
              <p className="text-sm text-muted-foreground mb-3">
                To enable real email processing, you'll need to connect to Supabase and set up:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Email webhook integration (Gmail API, Outlook, etc.)</li>
                <li>• LLM API integration (OpenAI, Anthropic, etc.) in Edge Functions</li>
                <li>• Database tables for tickets and tasks</li>
                <li>• Email parsing and classification logic</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};