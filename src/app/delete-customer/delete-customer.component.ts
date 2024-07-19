import { Component, Input } from '@angular/core';
import { Customer } from '../components/models/customer';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.scss']
})
export class DeleteCustomerComponent {
  @Input() customer: Customer;

  constructor(private customerService: CustomerService) { }

  deleteCustomer(id: number): void {
    if (confirm(`Voulez-vous vraiment supprimer le client ${this.customer.name} ?`)) {
      this.customerService.deleteCustomer(id).subscribe(
        () => {
          console.log('Client supprimé avec succès.');
          // Mettez à jour la liste des clients ou effectuez d'autres actions nécessaires après la suppression
        },
        error => {
          console.error('Erreur lors de la suppression du client :', error);
        }
      );
    }
  }

}
