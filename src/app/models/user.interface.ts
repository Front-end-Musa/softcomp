export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  pfpUrl?: string;
  role: 'wrestler' | 'organizer';
  createdAt: Date;
}
