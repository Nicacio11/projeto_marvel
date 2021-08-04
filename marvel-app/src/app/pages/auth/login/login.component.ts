import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({});
  validationsMessage = {
    email: [
      { type: 'required', message: 'Campo obrigatório.' },
      { type: 'email', message: 'Email invalido' },
    ],
    senha: [
      { type: 'required', message: 'Campo obrigatório.' },
      {
        type: 'minlength',
        message: 'É necessário que a senha possua no mínimo 6 caractéres.',
      },
    ],
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  logar(jsonValue: any) {

  }
}
