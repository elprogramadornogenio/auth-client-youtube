import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { IUsuario } from 'src/app/auth/interfaces/IUsuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  usuario!: IUsuario;

  miFormulario!: FormGroup;

  fileControl!: FormControl;

  foto!: File;

  constructor(private fb:FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.usuario.subscribe(usuario => this.usuario = usuario);
    this.fileControl = new FormControl(this.foto, [Validators.required]);
    this.miFormulario = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      apellido: [this.usuario.apellido, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      usuario: [this.usuario.usuario, [Validators.required]],
    });
    this.fileControl.valueChanges.subscribe((file:File) =>{
      this.foto = file;
    });
  }

  editar(){
    const { nombre, apellido, email, usuario } = this.miFormulario.value;
    this.authService.editar(this.usuario.uid, nombre, apellido, email, usuario).subscribe(ok=>{
      if(ok===true){
        Swal.fire('Ha actualizado la información Correctamente', "", "success");
      } else {
        Swal.fire('Error', "", "error");
      }
    })
  }

  subirFoto(){
    if(!this.foto){
      Swal.fire('Error', "No hay imagen seleccionada", "error");
    } else {
      this.authService.subirFoto(this.usuario.uid, this.foto).subscribe(ok =>{
        if(ok===true){
          Swal.fire('La Imagen se ha actualizado Correctamente', "", "success");
        } else {
          Swal.fire('Error', "", "error");
        }
      });
    }
  }

  

}
