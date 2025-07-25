export interface Vehicle {
  id?: string;
  brand: string;
  model: string;
  year: number;
  typeOfUse: 'personal' | 'work' | 'cargo';
}
