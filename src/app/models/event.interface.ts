export interface CompEvent {
  id?: string;
  name: string;
  description?: string;
  location: string;
  date: string;
  createdBy: string;
  participants: string[];
  maxParticipants: number;
  createdAt: string;
}