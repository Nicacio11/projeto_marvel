import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  logar(jsonValue: any) {
    if (this.formGroup.valid) {
      Swal.showLoading()
      this.loginService.login(jsonValue).subscribe(
        () => {
          Swal.close();
          this.router.navigate(['character']);
        },
        (err: HttpErrorResponse) => {
          const message =
            err.error.message;
          Swal.fire('Algo deu errado!', message, 'error');
        },
      )
    }
  }
}
