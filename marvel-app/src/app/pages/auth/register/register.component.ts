import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder) { }

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

}
