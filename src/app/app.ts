import { Component } from '@angular/core';

import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { FormsModule } from '@angular/forms';

import { Distributor } from './models/distributor.model';
import { DistributorService } from './services/distributor.service';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  searchText = '';

  distributors: Distributor[] = [];
  filteredDistributors: Distributor[] = [];

  isEditMode = false;
  editIndex = -1;

  codeExists = false;

  distributorForm = new FormGroup({

    name: new FormControl('', Validators.required),

    code: new FormControl('', Validators.required),

    contactPerson: new FormControl('', Validators.required),

    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ]),

    city: new FormControl('', Validators.required),

    status: new FormControl('Active', Validators.required)

  });

  constructor(private distributorService: DistributorService) {

    this.distributors = this.distributorService.getDistributors();

    this.filteredDistributors = [...this.distributors];

  }

  // Search distributors by name
  searchDistributors(): void {
    this.applySearch();
  }

  applySearch(): void {

    const search = this.searchText.toLowerCase().trim();

    this.filteredDistributors = this.distributors.filter(distributor =>
      distributor.name.toLowerCase().includes(search)
    );

  }

  // Add or Update distributor
  addDistributor(): void {

    this.codeExists = false;

    if (this.distributorForm.invalid) {
      this.distributorForm.markAllAsTouched();
      return;
    }

    const code = this.distributorForm.value.code?.trim() || '';

    // Check duplicate distributor code
    const exists = this.distributors.some((distributor, index) =>
      distributor.code.toLowerCase() === code.toLowerCase() &&
      index !== this.editIndex
    );

    if (exists) {
      this.codeExists = true;
      return;
    }

    const distributor: Distributor = {

      name: this.distributorForm.value.name || '',

      code: code,

      contactPerson: this.distributorForm.value.contactPerson || '',

      mobile: this.distributorForm.value.mobile || '',

      city: this.distributorForm.value.city || '',

      status: this.distributorForm.value.status === 'Inactive'
        ? 'Inactive'
        : 'Active'

    };

    if (this.isEditMode) {

      // Update existing distributor
      this.distributors[this.editIndex] = distributor;

      this.distributors = [...this.distributors];

      this.isEditMode = false;
      this.editIndex = -1;

    } else {

      // Add new distributor
      this.distributorService.addDistributor(distributor);

      this.distributors = [
        ...this.distributorService.getDistributors()
      ];

    }

    // Refresh filtered list
    this.applySearch();

    // Reset form
    this.distributorForm.reset({
      name: '',
      code: '',
      contactPerson: '',
      mobile: '',
      city: '',
      status: 'Active'
    });

  }

  // Edit distributor
  editDistributor(distributor: Distributor): void {

    const index = this.distributors.indexOf(distributor);

    if (index === -1) {
      return;
    }

    this.isEditMode = true;
    this.editIndex = index;

    this.distributorForm.patchValue({

      name: distributor.name,

      code: distributor.code,

      contactPerson: distributor.contactPerson,

      mobile: distributor.mobile,

      city: distributor.city,

      status: distributor.status

    });

  }

  // Delete distributor
  deleteDistributor(distributor: Distributor): void {

    const confirmed = confirm(
      'Are you sure you want to delete this distributor?'
    );

    if (!confirmed) {
      return;
    }

    const index = this.distributors.indexOf(distributor);

    if (index === -1) {
      return;
    }

    this.distributors.splice(index, 1);

    this.distributors = [...this.distributors];

    // Refresh filtered list
    this.applySearch();

  }

}