import { Injectable } from '@angular/core';
import { Distributor } from '../models/distributor.model';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  private distributors: Distributor[] = [
    {
      name: 'ABC Distributors',
      code: 'D001',
      contactPerson: 'Ravi Kumar',
      mobile: '9876543210',
      city: 'Hyderabad',
      status: 'Active'
    },
    {
      name: 'Sri Sai Traders',
      code: 'D002',
      contactPerson: 'Suresh',
      mobile: '9123456780',
      city: 'Warangal',
      status: 'Active'
    },
    {
      name: 'Metro Agencies',
      code: 'D003',
      contactPerson: 'Priya',
      mobile: '9988776655',
      city: 'Karimnagar',
      status: 'Inactive'
    },
    {
        name: 'Global Distributors',
        code: 'D004',
        contactPerson: 'Anil Kumar',
        mobile: '9876543211',
        city: 'Vijayawada',
        status: 'Active'
    },
    {
        name: 'Sunshine Traders',
        code: 'D005',
        contactPerson: 'Ramesh',
        mobile: '9876543212',
        city: 'Guntur',
        status: 'Inactive'
    }
  ];

  getDistributors(): Distributor[] {
    return this.distributors;
  }
  addDistributor(distributor: Distributor): void {
  this.distributors.push(distributor);
}
}