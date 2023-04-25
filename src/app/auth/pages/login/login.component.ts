import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    usuario: ['oculushorus', [Validators.required]],
    password: ['n5e9ot', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.miFormulario.value);
    const {password, usuario} = this.miFormulario.value;
    this.authService.login(usuario, password).subscribe(ok =>{
      if(ok === true) {
        this.router.navigate(['/dashboard']);
        Swal.fire('Ha ingresado correctamente', '' , 'success');
      } else {
        Swal.fire('Error', ok, 'error');
      }
    });
  }

}
