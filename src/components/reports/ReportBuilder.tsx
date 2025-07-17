import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, Play, Save } from "lucide-react";
import { format } from "date-fns";
import { Report, ReportFilter } from "@/types/crm";

const reportTypes = [
  { value: "contacts", label: "Contacts Report" },
  { value: "deals", label: "Deals Report" },
  { value: "tasks", label: "Tasks Report" },
  { value: "revenue", label: "Revenue Report" },
  { value: "activities", label: "Activities Report" },
];

const contactFields = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "company", label: "Company" },
  { value: "status", label: "Status" },
  { value: "source", label: "Source" },
  { value: "createdAt", label: "Created Date" },
  { value: "lastContact", label: "Last Contact" },
];

const dealFields = [
  { value: "title", label: "Deal Title" },
  { value: "value", label: "Value" },
  { value: "stage", label: "Stage" },
  { value: "probability", label: "Probability" },
  { value: "expectedCloseDate", label: "Expected Close Date" },
  { value: "assignedTo", label: "Assigned To" },
];

const operators = [
  { value: "equals", label: "Equals" },
  { value: "contains", label: "Contains" },
  { value: "greater_than", label: "Greater Than" },
  { value: "less_than", label: "Less Than" },
  { value: "between", label: "Between" },
  { value: "in", label: "In" },
];

export const ReportBuilder = () => {
  const [report, setReport] = useState<Partial<Report>>({
    name: "",
    type: "contacts",
    filters: [],
    columns: [],
    dateRange: {
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
    sortBy: "",
    sortOrder: "asc",
  });

  const [newFilter, setNewFilter] = useState<Partial<ReportFilter>>({
    field: "",
    operator: "equals",
    value: "",
  });

  const getFieldsForType = (type: string) => {
    switch (type) {
      case "contacts":
        return contactFields;
      case "deals":
        return dealFields;
      default:
        return contactFields;
    }
  };

  const addFilter = () => {
    if (newFilter.field && newFilter.operator && newFilter.value) {
      setReport(prev => ({
        ...prev,
        filters: [...(prev.filters || []), newFilter as ReportFilter]
      }));
      setNewFilter({ field: "", operator: "equals", value: "" });
    }
  };

  const removeFilter = (index: number) => {
    setReport(prev => ({
      ...prev,
      filters: prev.filters?.filter((_, i) => i !== index) || []
    }));
  };

  const toggleColumn = (field: string, checked: boolean) => {
    setReport(prev => ({
      ...prev,
      columns: checked 
        ? [...(prev.columns || []), field]
        : prev.columns?.filter(col => col !== field) || []
    }));
  };

  const runReport = () => {
    // In a real app, this would generate and display the report
    console.log("Running report:", report);
  };

  const saveReport = () => {
    // In a real app, this would save the report configuration
    console.log("Saving report:", report);
  };

  const exportReport = (format: string) => {
    // In a real app, this would export the report in the specified format
    console.log("Exporting report as:", format);
  };

  const fields = getFieldsForType(report.type || "contacts");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Report Builder</h2>
          <p className="text-muted-foreground">Create custom reports and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={saveReport}>
            <Save className="h-4 w-4 mr-2" />
            Save Report
          </Button>
          <Button onClick={runReport}>
            <Play className="h-4 w-4 mr-2" />
            Run Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Report Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportName">Report Name</Label>
                  <Input
                    id="reportName"
                    value={report.name}
                    onChange={(e) => setReport(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter report name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select value={report.type} onValueChange={(value) => setReport(prev => ({ ...prev, type: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {report.dateRange?.start ? format(new Date(report.dateRange.start), "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={report.dateRange?.start ? new Date(report.dateRange.start) : undefined}
                        onSelect={(date) => date && setReport(prev => ({
                          ...prev,
                          dateRange: { ...prev.dateRange!, start: date.toISOString() }
                        }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {report.dateRange?.end ? format(new Date(report.dateRange.end), "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={report.dateRange?.end ? new Date(report.dateRange.end) : undefined}
                        onSelect={(date) => date && setReport(prev => ({
                          ...prev,
                          dateRange: { ...prev.dateRange!, end: date.toISOString() }
                        }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Filter */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <Label>Field</Label>
                  <Select value={newFilter.field} onValueChange={(value) => setNewFilter(prev => ({ ...prev, field: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map((field) => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Operator</Label>
                  <Select value={newFilter.operator} onValueChange={(value) => setNewFilter(prev => ({ ...prev, operator: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {operators.map((op) => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Value</Label>
                  <Input
                    value={newFilter.value}
                    onChange={(e) => setNewFilter(prev => ({ ...prev, value: e.target.value }))}
                    placeholder="Enter value"
                  />
                </div>
                <Button onClick={addFilter}>Add Filter</Button>
              </div>

              {/* Active Filters */}
              {report.filters && report.filters.length > 0 && (
                <div className="space-y-2">
                  <Label>Active Filters</Label>
                  {report.filters.map((filter, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm">
                        {fields.find(f => f.value === filter.field)?.label} {filter.operator} "{filter.value}"
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFilter(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Column Selection */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Columns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {fields.map((field) => (
                  <div key={field.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={field.value}
                      checked={report.columns?.includes(field.value) || false}
                      onCheckedChange={(checked) => toggleColumn(field.value, checked as boolean)}
                    />
                    <Label htmlFor={field.value} className="text-sm">
                      {field.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle>Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full" onClick={() => exportReport('pdf')}>
                <Download className="h-4 w-4 mr-2" />
                Export as PDF
              </Button>
              <Button variant="outline" className="w-full" onClick={() => exportReport('csv')}>
                <Download className="h-4 w-4 mr-2" />
                Export as CSV
              </Button>
              <Button variant="outline" className="w-full" onClick={() => exportReport('excel')}>
                <Download className="h-4 w-4 mr-2" />
                Export as Excel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};