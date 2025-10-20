export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'wrestler' | 'competitionCreator';
  createdAt: Date;
}
