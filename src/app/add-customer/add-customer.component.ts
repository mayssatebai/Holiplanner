import { Component, EventEmitter, Output } from '@angular/core';
import { Customer } from '../components/models/customer';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {
  newCustomer: Customer = { name: '', email: '', password: '', role: 'CUSTOMER' };  // Assigning default role

 

  constructor(private customerService: CustomerService,  private router: Router) {}

  submitAddForm(): void {
    this.customerService.addCustomer(this.newCustomer).subscribe(
      (customer: Customer) => {
        console.log('Client ajouté :', customer);
        this.router.navigate(['/dashboard']); // Rediriger vers le tableau de bord
      },
      error => {
        console.error('Error adding customer', error);
      }
    );
  }
  cancel(): void {
    this.router.navigate(['/dashboard']); // Change this route to match your actual dashboard route
  }
}
