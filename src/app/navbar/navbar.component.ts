import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {

  constructor(private customerService: CustomerService, private router: Router ,  private jwtService: JwtService) { }
  logout(): void {
    this.jwtService.removeToken();  // Remove the JWT token
    this.router.navigate(['/login']);  // Redirect to login page
  }
}
