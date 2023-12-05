import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Registro } from 'src/app/interfaces/registro';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb: FormBuilder, private _userService: UserService, private router: Router, private _authService: AuthService) { }

  ngOnInit(): void { }

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required]],
    apellido: [, [Validators.required]],
    correo_electronico: [, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),],],
    contrasena: [, [Validators.required, Validators.minLength(6)]],
    biografia: [, [Validators.required]],
  });

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  registrarse() {
    if (this.miFormulario.invalid)
      return
    const { nombre, apellido, correo_electronico, contrasena, biografia } = this.miFormulario.controls;
    this._userService.registrarse(nombre.value, apellido.value, correo_electronico.value, contrasena.value, biografia.value).subscribe({
      next: (data: Registro) => {
        if (data.success == true) {
          this._authService.login(data.data.user_id)
          this.router.navigate(['/inicio'])
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}

