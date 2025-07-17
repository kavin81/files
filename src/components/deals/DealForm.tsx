import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { Deal, DealProduct } from "@/types/crm";
import { format } from "date-fns";

interface DealFormProps {
  deal?: Deal;
  onSave: (deal: Partial<Deal>) => void;
  onCancel: () => void;
}

export const DealForm = ({ deal, onSave, onCancel }: DealFormProps) => {
  const [formData, setFormData] = useState({
    title: deal?.title || "",
    contactId: deal?.contactId || "",
    organizationId: deal?.organizationId || "",
    value: deal?.value || 0,
    currency: deal?.currency || "USD",
    stage: deal?.stage || "Prospecting",
    probability: deal?.probability || 10,
    expectedCloseDate: deal?.expectedCloseDate ? new Date(deal.expectedCloseDate) : new Date(),
    notes: deal?.notes || "",
    assignedTo: deal?.assignedTo || "",
    products: deal?.products || [],
  });

  const [newProduct, setNewProduct] = useState<Partial<DealProduct>>({
    name: "",
    quantity: 1,
    unitPrice: 0,
    discount: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      expectedCloseDate: formData.expectedCloseDate.toISOString(),
      value: calculateTotalValue(),
    });
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.unitPrice) {
      const total = (newProduct.quantity || 1) * (newProduct.unitPrice || 0) * (1 - (newProduct.discount || 0) / 100);
      const product: DealProduct = {
        id: Date.now().toString(),
        name: newProduct.name,
        quantity: newProduct.quantity || 1,
        unitPrice: newProduct.unitPrice || 0,
        discount: newProduct.discount || 0,
        total,
      };
      
      setFormData(prev => ({
        ...prev,
        products: [...prev.products, product]
      }));
      
      setNewProduct({
        name: "",
        quantity: 1,
        unitPrice: 0,
        discount: 0,
      });
    }
  };

  const removeProduct = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== productId)
    }));
  };

  const calculateTotalValue = () => {
    return formData.products.reduce((sum, product) => sum + product.total, 0);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{deal ? 'Edit Deal' : 'Add New Deal'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Deal Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Input
                id="assignedTo"
                value={formData.assignedTo}
                onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stage">Stage</Label>
              <Select value={formData.stage} onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Prospecting">Prospecting</SelectItem>
                  <SelectItem value="Qualification">Qualification</SelectItem>
                  <SelectItem value="Proposal">Proposal</SelectItem>
                  <SelectItem value="Negotiation">Negotiation</SelectItem>
                  <SelectItem value="Closed Won">Closed Won</SelectItem>
                  <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="probability">Probability (%)</Label>
              <Input
                id="probability"
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => setFormData(prev => ({ ...prev, probability: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Expected Close Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.expectedCloseDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.expectedCloseDate}
                    onSelect={(date) => date && setFormData(prev => ({ ...prev, expectedCloseDate: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Products/Services */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Products/Services</Label>
            
            {/* Add Product Form */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product/Service</Label>
                    <Input
                      id="productName"
                      placeholder="Product name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unitPrice">Unit Price</Label>
                    <Input
                      id="unitPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={newProduct.unitPrice}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={newProduct.discount}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <Button type="button" onClick={addProduct}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Products List */}
            {formData.products.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {formData.products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex-1 grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium">{product.name}</span>
                          </div>
                          <div>
                            Qty: {product.quantity} × ${product.unitPrice}
                          </div>
                          <div>
                            {product.discount > 0 && `${product.discount}% off`}
                          </div>
                          <div className="font-medium">
                            ${product.total.toFixed(2)}
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="text-right pt-2 border-t">
                      <span className="text-lg font-bold">
                        Total: ${calculateTotalValue().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {deal ? 'Update Deal' : 'Create Deal'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};