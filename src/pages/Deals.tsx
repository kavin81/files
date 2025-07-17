import { useState } from "react";
import { DealPipeline } from "@/components/deals/DealPipeline";
import { DealForm } from "@/components/deals/DealForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Deal } from "@/types/crm";

export const Deals = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | undefined>();

  const handleSaveDeal = (dealData: Partial<Deal>) => {
    // In a real app, this would save to your backend
    console.log("Saving deal:", dealData);
    setShowForm(false);
    setEditingDeal(undefined);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingDeal(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Deals</h1>
          <p className="text-muted-foreground">Track opportunities through your sales pipeline</p>
        </div>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Deal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DealForm
              deal={editingDeal}
              onSave={handleSaveDeal}
              onCancel={handleCancelForm}
            />
          </DialogContent>
        </Dialog>
      </div>

      <DealPipeline />
    </div>
  );
};