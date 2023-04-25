import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/auth/interfaces/IUsuario';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario!: IUsuario;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.usuario.subscribe(usuario => this.usuario = usuario);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

}
