import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioDTO } from 'src/app/core/models/usuario.dto';
import Swal from 'sweetalert2';
import { PerfilService } from './perfil.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  formGroup: FormGroup;
  usuario: UsuarioDTO;

  constructor(private fb: FormBuilder, private perfilService: PerfilService) { }


  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirm_senha: ['', Validators.required]
      }, { validator: this.compararSenha })
    })
    this.perfilService.get().subscribe(usuario => {
      this.usuario = usuario
      this.formGroup.patchValue(usuario);
    }
    )
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

  atualizar(jsonValue: any) {
    if (this.formGroup.valid) {
      Swal.showLoading()
      const obj = {
        email: jsonValue.email, nome: jsonValue.nome,
        senha: jsonValue.passwords.senha
      }
      this.perfilService.put(this.usuario.id!, obj).subscribe(
        () => {
          Swal.close();
          Swal.fire('Sucesso', "Sucesso em atualizar o perfil", "success")
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
