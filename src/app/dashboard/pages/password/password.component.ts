import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/auth/interfaces/IUsuario';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  usuario!: IUsuario;
  miFormulario!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { 
    this.authService.usuario.subscribe(usuario => this.usuario = usuario);
    this.miFormulario = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPasswordConfirm: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  cambiarPassword(){
    const {password, newPassword, newPasswordConfirm} = this.miFormulario.value;
    if(newPassword === newPasswordConfirm){
      this.authService.cambiarPassword(this.usuario.uid, password, newPassword).subscribe(ok=>{
        if(ok === true){
          Swal.fire('Ha actualizado correctamente la contraseña', '', 'success');
        } else {
          Swal.fire('Error', '', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Las contraseñas nuevas no son iguales ', 'error');
    }
  }

}
