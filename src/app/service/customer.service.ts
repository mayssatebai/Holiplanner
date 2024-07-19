import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../components/models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:8088/api/customers';
  private addCustomerUrl = 'http://localhost:8088/api/addCustomer';
  private updateCustomerUrl = 'http://localhost:8088/api/updateCustomer';
  private deleteCustomerUrl = 'http://localhost:8088/api/deleteCustomer'; // Ajout de l'URL de suppression
  private jwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXlzc2E2MEBnbWFpbC5jb20iLCJpYXQiOjE3MjEyMzAyOTgsImV4cCI6MTcyMzgyMjI5OH0.WPuVVEYgfCD1jnoaRUcDrRik4xx4_64Ct7DnN81tF1Y'; // Remplacez par votre JWT

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);
    return this.http.get<Customer[]>(this.apiUrl, { headers });
  }
  getCustomerById(id: number): Observable<Customer> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);
    return this.http.get<Customer>(`${this.apiUrl}/${id}`, { headers });
  }

  addCustomer(customer: Customer): Observable<Customer> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);
    return this.http.post<Customer>(this.addCustomerUrl, customer, { headers });
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);
    return this.http.put<Customer>(`${this.updateCustomerUrl}/${id}`, customer, { headers });
  }

  deleteCustomer(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);
    return this.http.delete<any>(`${this.deleteCustomerUrl}/${id}`, { headers });
  }
}

