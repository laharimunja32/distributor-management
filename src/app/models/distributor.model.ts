export interface Distributor {
  name: string;
  code: string;
  contactPerson: string;
  mobile: string;
  city: string;
  status: 'Active' | 'Inactive';
}