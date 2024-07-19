import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { JwtService } from 'src/app/service/jwt.service';
import { Customer } from '../models/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer: Customer = { id: 0, name: '', email: '', password: '', role: '' };
  showAddForm: boolean = false;
  showEditForm: boolean = false;

  constructor(private customerService: CustomerService, private router: Router ,  private jwtService: JwtService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
      },
      error => {
        console.error('Error fetching customers', error);
      }
    );
  }

  openAddForm(): void {
    this.showAddForm = true;
  }

  closeAddForm(): void {
    this.showAddForm = false;
  }

  openEditForm(customer: Customer): void {
    this.router.navigate(['/edit', customer.id]);
  }


  closeEditForm(): void {
    this.showEditForm = false;
  }
  deleteCustomer(id: number): void {
    const customer = this.customers.find(c => c.id === id);
    if (customer && confirm(`Voulez-vous vraiment supprimer le client ${customer.name} ?`)) {
      this.customerService.deleteCustomer(id).subscribe(
        () => {
          console.log('Client supprimé avec succès.');
          this.customers = this.customers.filter(c => c.id !== id);
        },
        error => {
          console.error('Erreur lors de la suppression du client :', error);
        }
      );
    }
  }

 
  
}
