import { useState, useCallback, useEffect } from "react";
import { Sparkles, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock AI service for demonstration
const mockAIService = {
  async generateSuggestions(text: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock AI responses based on keywords
    if (text.toLowerCase().includes('demo') || text.toLowerCase().includes('presentation')) {
      return {
        completion: "Consider preparing a customized demo focusing on their specific use case. Schedule a 30-minute session to showcase relevant features.",
        followUp: "Schedule demo preparation meeting",
        insights: ["High engagement topic", "Decision maker identified"]
      };
    } else if (text.toLowerCase().includes('price') || text.toLowerCase().includes('budget')) {
      return {
        completion: "Budget discussions indicate serious interest. Prepare pricing options and ROI calculations for the next conversation.",
        followUp: "Prepare pricing proposal",
        insights: ["Budget confirmed", "Ready for proposal"]
      };
    } else if (text.toLowerCase().includes('follow up') || text.toLowerCase().includes('follow-up')) {
      return {
        completion: "Regular follow-up is key to maintaining engagement. Consider sending relevant case studies or industry insights.",
        followUp: "Send industry insights email",
        insights: ["Requires nurturing", "Educational content needed"]
      };
    } else {
      return {
        completion: "This contact shows potential for conversion. Consider scheduling a follow-up call to discuss their specific needs and timeline.",
        followUp: "Schedule follow-up call",
        insights: ["Potential opportunity", "Needs assessment required"]
      };
    }
  }
};

interface SmartNotesEditorProps {
  contactName?: string;
  initialNotes?: string;
  onNotesChange?: (notes: string) => void;
  onTaskAdded?: (task: string) => void;
}

export const SmartNotesEditor = ({ 
  contactName = "Contact", 
  initialNotes = "", 
  onNotesChange,
  onTaskAdded 
}: SmartNotesEditorProps) => {
  const [notes, setNotes] = useState(initialNotes);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);

  const generateSuggestions = useCallback(async (text: string) => {
    if (text.length < 20) return; // Minimum text length for suggestions
    
    setIsLoading(true);
    try {
      const response = await mockAIService.generateSuggestions(text);
      setSuggestions(response);
      setLastGenerated(new Date());
    } catch (error) {
      console.error('AI suggestion error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNotesChange = (value: string) => {
    setNotes(value);
    onNotesChange?.(value);
  };

  const handleAddTask = (taskTitle: string) => {
    onTaskAdded?.(taskTitle);
    // You could show a toast notification here
  };

  const applySuggestion = () => {
    if (suggestions?.completion) {
      const updatedNotes = `${notes}\n\n${suggestions.completion}`;
      handleNotesChange(updatedNotes);
      setSuggestions(null);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="form-section">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Smart Notes for {contactName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Enter your notes about this contact... (AI will suggest improvements and follow-up actions)"
            className="min-h-[120px] resize-none"
          />
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {notes.length > 20 ? "AI suggestions available" : "Type at least 20 characters for AI suggestions"}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => generateSuggestions(notes)}
              disabled={isLoading || notes.length < 20}
              className="gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {isLoading ? "Analyzing..." : "Get AI Suggestions"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      {suggestions && (
        <Card className="ai-suggestion">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Suggested Addition:</h4>
              <p className="text-sm bg-background p-3 rounded border-l-4 border-primary">
                {suggestions.completion}
              </p>
            </div>

            {suggestions.insights && suggestions.insights.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Insights:</h4>
                <div className="flex gap-2 flex-wrap">
                  {suggestions.insights.map((insight: string, index: number) => (
                    <span key={index} className="status-badge status-badge-success text-xs">
                      {insight}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button size="sm" onClick={applySuggestion}>
                Apply Suggestion
              </Button>
              {suggestions.followUp && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleAddTask(suggestions.followUp)}
                  className="gap-2"
                >
                  <Plus className="h-3 w-3" />
                  Add Task: {suggestions.followUp}
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={() => setSuggestions(null)}>
                Dismiss
              </Button>
            </div>

            {lastGenerated && (
              <div className="text-xs text-muted-foreground border-t pt-2">
                Generated: {lastGenerated.toLocaleTimeString()}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};