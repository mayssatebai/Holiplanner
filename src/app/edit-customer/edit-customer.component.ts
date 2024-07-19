import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../components/models/customer';
import { CustomerService } from '../service/customer.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  @Input() selectedCustomer: Customer = { id: 0, name: '', email: '', password: '', role: 'CUSTOMER' };

  constructor(private customerService: CustomerService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log('Fetching customer with ID:', id); // Ajoutez cette ligne pour déboguer
      this.customerService.getCustomerById(+id).subscribe(
        (customer: Customer) => this.selectedCustomer = customer,
        error => {
          console.error('Error fetching customer', error);
          this.router.navigate(['/dashboard']);
        }
      );
    } else {
      console.error('No ID found in route parameters');
    }
  }

  submitEditForm(): void {
    this.customerService.updateCustomer(this.selectedCustomer.id!, this.selectedCustomer).subscribe(
      (customer: Customer) => {
        console.log('Client modifié :', customer);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error updating customer', error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
