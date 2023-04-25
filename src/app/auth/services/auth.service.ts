import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: IUsuario;
  private observableUsuario: ReplaySubject<IUsuario>;
  private observableUsuario$: Observable<IUsuario>;

  constructor(private http: HttpClient) {
    this.observableUsuario = new ReplaySubject<IUsuario>(1);
    this.observableUsuario$ = this.observableUsuario.asObservable();
    if (localStorage.getItem('usuario')) {
      this._usuario = JSON.parse(localStorage.getItem('usuario')!);
      this.observableUsuario.next(this._usuario);
    }
  }

  get usuario(){
    return this.observableUsuario$;
  }

  registro(nombre: string, apellido: string, email: string, usuario: string, password: string) {
    const url = `${this.baseUrl}/registrar`;
    const body = {
      nombre,
      apellido,
      email,
      usuario,
      password
    };

    return this.http.post<IAuthResponse>(url, body).pipe(
      tap(resp => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            uid: resp.uid!,
            usuario: resp.usuario!,
            nombre: resp.nombre!,
            apellido: resp.apellido!,
            email: resp.email!,
            imagen: resp.imagen
          }

          localStorage.setItem('usuario', JSON.stringify(this._usuario));
          this.observableUsuario.next(this._usuario);
        }
      }),
      map((resp: IAuthResponse) => {
        return resp.ok;
      }),
      catchError(err => of(err.error.msg))
    );
  }


  login(usuario: string, password: string) {
    const url = `${this.baseUrl}/login`;
    const body = {
      usuario,
      password
    };

    return this.http.post<IAuthResponse>(url, body).pipe(
      tap(resp => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            uid: resp.uid!,
            usuario: resp.usuario!,
            nombre: resp.nombre!,
            apellido: resp.apellido!,
            email: resp.email!,
            imagen: resp.imagen
          }

          localStorage.setItem('usuario', JSON.stringify(this._usuario));
          this.observableUsuario.next(this._usuario);
        }
      }),
      map((resp: IAuthResponse) => {
        return resp.ok;
      }),
      catchError(err => of(err.error.msg))
    );
  }

  recuperarPassword(usuario: string, email: string) {

    const url = `${this.baseUrl}/RecuperarPassword`;
    const body = {
      usuario,
      email
    };

    return this.http.post<IAuthResponse>(url, body).pipe(
      map((resp: IAuthResponse) => {
        return resp.ok;
      }),
      catchError(err => of(err.error.msg))
    );
  }

  validarToken() {
    if (localStorage.getItem('token')) {
      const url = `${this.baseUrl}/revalidarToken`;
      const body = {}
      const headers = new HttpHeaders({
        'authorization': `Bearer ${localStorage.getItem('token')}`
      });
      return this.http.post<IAuthResponse>(url, body, { headers }).pipe(
        map(resp => {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            uid: resp.uid!,
            usuario: this._usuario.usuario,
            nombre: resp.nombre!,
            apellido: resp.apellido!,
            email: this._usuario.email,
            imagen: this._usuario.imagen
          }

          localStorage.setItem('usuario', JSON.stringify(this._usuario));
          this.observableUsuario.next(this._usuario);
          return resp.ok;
        })
      );
    } else {
      return of(false);
    }
  }

  editar(_id: string, nombre: string, apellido: string, email: string, usuario: string) {
    if (localStorage.getItem('token')) {
      const url = `${this.baseUrl}/editar`;
      const headers = new HttpHeaders({
        'authorization': `Bearer ${localStorage.getItem('token')}`
      });
      const options = { headers: headers }
      const body = {
        _id,
        nombre,
        apellido,
        email,
        usuario
      };
      return this.http.post<IAuthResponse>(url, body, options).pipe(
        tap(resp => {
          if (resp.ok) {
            this._usuario = {
              uid: _id!,
              usuario: usuario,
              nombre: nombre,
              apellido: apellido,
              email: email,
              imagen: this._usuario.imagen
            }
          }
          localStorage.setItem('usuario', JSON.stringify(this._usuario));
          this.observableUsuario.next(this._usuario);
        }),
        map((resp: IAuthResponse) => {
          return resp.ok;
        }),
        catchError(err => of(err.error.msg))
      )
    } else {
      return of(false);
    }
  }

  subirFoto(id: string, imagen: File) {
    if (localStorage.getItem('token')) {
      const url = `${this.baseUrl}/editarImagen/${id}`;
      const headers = new HttpHeaders({
        'authorization': `Bearer ${localStorage.getItem('token')}`
      });
      const options = { headers: headers }
      let formData = new FormData();
      formData.append("imagen", imagen);
      return this.http.post<IAuthResponse>(url, formData, options).pipe(
        tap(resp => {
          if (resp.ok) {
            this._usuario = {
              uid: this._usuario.uid!,
              usuario: this._usuario.usuario,
              nombre: this._usuario.nombre,
              apellido: this._usuario.apellido,
              email: this._usuario.email,
              imagen: resp.imagen
            }
          }
          localStorage.setItem('usuario', JSON.stringify(this._usuario));
          this.observableUsuario.next(this._usuario);
        }),
        map((resp: IAuthResponse) => {
          return resp.ok;
        }),
        catchError(err => of(err.error.msg))
      );
    } else {
      return of(false);
    }
  }

  cambiarPassword(_id: string, password: string, newPassword: string){
    if (localStorage.getItem('token')) {
      const url = `${this.baseUrl}/cambiarPassword`;
      const headers = new HttpHeaders({
        'authorization': `Bearer ${localStorage.getItem('token')}`
      });
      const options = { headers: headers }
      const body = {
        _id,
        password,
        newPassword
      }
      return this.http.post<IAuthResponse>(url, body, options).pipe(
        map((resp: IAuthResponse) => {
          return resp.ok;
        }),
        catchError(err => of(err.error.msg))
      );
    } else {
      return of(false);
    }
  }

  logout() {
    localStorage.clear();
  }
}
