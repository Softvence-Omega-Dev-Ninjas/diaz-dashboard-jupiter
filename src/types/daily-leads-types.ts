export interface Lead {
  id?: number;
  user_id: string;
  name: string | null;
  email: string | null;
  product: string;
  status?: 'not contacted' | 'contacted';
  created_at?: string;
}

export interface DailyLeadsResponse {
  status: string;
  total_leads: number;
  leads: Lead[];
}
