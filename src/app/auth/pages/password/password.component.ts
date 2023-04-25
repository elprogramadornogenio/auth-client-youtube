import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    usuario: ['oculushorus', [Validators.required]],
    email: ['doctrinaomnia@gmail.com', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  recuperarPassword(){
    console.log(this.miFormulario.value);
    const {email, usuario} = this.miFormulario.value;
    this.authService.recuperarPassword(usuario, email).subscribe(ok =>{
      if(ok === true) {
        Swal.fire('Recuperación de Contraseña', `Se ha enviado un correo a la dirección ${email} `, 'success');
      } else {
        Swal.fire('Error', ok, 'error');
      }
    });
  }

}
