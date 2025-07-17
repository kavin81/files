export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  status: 'Hot Lead' | 'Qualified' | 'New' | 'Follow-up' | 'Customer' | 'Lost';
  source: 'Website' | 'Referral' | 'Cold Call' | 'Social Media' | 'Event' | 'Other';
  score: number;
  tags: string[];
  customFields: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  lastContact?: string;
  notes: string;
  organizationId?: string;
  assignedTo?: string;
  communicationHistory: CommunicationRecord[];
}

export interface Organization {
  id: string;
  name: string;
  industry?: string;
  size?: string;
  website?: string;
  address?: Address;
  contacts: string[]; // Contact IDs
  deals: string[]; // Deal IDs
  customFields: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface Lead extends Contact {
  qualification: 'Unqualified' | 'Marketing Qualified' | 'Sales Qualified' | 'Opportunity';
  leadSource: string;
  campaignId?: string;
  conversionDate?: string;
}

export interface Deal {
  id: string;
  title: string;
  contactId: string;
  organizationId?: string;
  value: number;
  currency: string;
  stage: 'Prospecting' | 'Qualification' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  probability: number;
  expectedCloseDate: string;
  actualCloseDate?: string;
  products: DealProduct[];
  notes: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  lostReason?: string;
  competitorId?: string;
}

export interface DealProduct {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  total: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: 'Call' | 'Email' | 'Meeting' | 'Follow-up' | 'Demo' | 'Proposal' | 'Other';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  dueDate: string;
  completedDate?: string;
  assignedTo: string;
  contactId?: string;
  dealId?: string;
  organizationId?: string;
  reminders: TaskReminder[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskReminder {
  id: string;
  type: 'email' | 'notification' | 'sms';
  time: string; // ISO string
  sent: boolean;
}

export interface CommunicationRecord {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'sms' | 'note';
  direction: 'inbound' | 'outbound';
  subject?: string;
  content: string;
  timestamp: string;
  duration?: number; // for calls/meetings in minutes
  participants?: string[];
  attachments?: string[];
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: string;
  variables: string[];
  usage: number;
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'Email' | 'SMS' | 'Social' | 'Event' | 'Content';
  status: 'Draft' | 'Active' | 'Paused' | 'Completed';
  startDate: string;
  endDate?: string;
  budget?: number;
  targetAudience: string[];
  metrics: CampaignMetrics;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignMetrics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  bounced: number;
  unsubscribed: number;
}

export interface Report {
  id: string;
  name: string;
  type: 'contacts' | 'deals' | 'tasks' | 'revenue' | 'activities' | 'custom';
  filters: ReportFilter[];
  columns: string[];
  groupBy?: string;
  sortBy?: string;
  sortOrder: 'asc' | 'desc';
  dateRange: {
    start: string;
    end: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ReportFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'in';
  value: any;
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  target?: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}