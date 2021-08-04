import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterService } from './register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirm_senha: ['', Validators.required]
      }, { validator: this.compararSenha })
    })
  }
  compararSenha(fb: FormGroup) {
    const confirmSenhaCtrl = fb.get('confirm_senha');
    if (confirmSenhaCtrl?.errors == null || 'mismatch' in confirmSenhaCtrl?.errors) {
      if (confirmSenhaCtrl?.value !== fb.get('senha')?.value) {
        confirmSenhaCtrl?.setErrors({ mismatch: true });
      } else {
        if (confirmSenhaCtrl?.hasError('mismatch')) { delete confirmSenhaCtrl.errors!.mismatch; }
      }
    }
  }
  cadastrar(jsonValue: any) {
    if (this.formGroup.valid) {
      Swal.showLoading()
      const obj = {
        email: jsonValue.email, nome: jsonValue.nome,
        senha: jsonValue.passwords.senha
      }
      this.registerService.create(obj).subscribe(
        () => {
          Swal.close();
          this.router.navigate(['/auth/login']);
          Swal.fire('Sucesso!', "Cadastrado com sucesso", 'success');

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
