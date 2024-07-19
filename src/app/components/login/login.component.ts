import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.loginForm?.valid) {
      this.service.login(this.loginForm.value).subscribe(
        response => {
          localStorage.setItem('jwt', response.token); // Sauvegarde du token JWT dans le localStorage
          this.router.navigate(['/dashboard']); // Redirection vers le tableau de bord
        },
        error => {
          console.error('Login failed', error);
          // Ajoutez une logique pour afficher un message d'erreur à l'utilisateur si nécessaire
        }
      );
    }
  }
    }
  
