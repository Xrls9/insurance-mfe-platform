export interface Vehicle {
  id?: string;
  brand: string;
  model: string;
  year: number;
  typeOfUse: 'personal' | 'trabajo' | 'carga';
}
