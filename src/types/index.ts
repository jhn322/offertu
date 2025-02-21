// Export all types from lead.types
export * from './lead.types';

export interface LeadResponse {
  id: string;
  email: string;
  phone: string | null;
  category: string;
  referenceId: string | null;
  createdAt: Date;
}
