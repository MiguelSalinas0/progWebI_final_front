import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  durationInSeconds = 5;

  miFormulario: FormGroup = this.fb.group({
    email: [, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),],],
    password: [, [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private _userService: UserService, private router: Router, private _snackBar: MatSnackBar, private _authService: AuthService) { }

  ngOnInit(): void { }

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  openSnackBar(message: string, action: string) {
    let config = new MatSnackBarConfig();
    config.duration = this.durationInSeconds * 1000;
    this._snackBar.open(message, action, config);
  }

  Ingresar() {
    if (this.miFormulario.invalid)
      return
    const { email, password } = this.miFormulario.controls;
    this._userService.login(email.value, password.value).subscribe({
      next: (data) => {
        if (data.success == true) {
          this._authService.login(data.user.user_id)
          this.router.navigate(['/inicio'])
        } else {
          this.openSnackBar('Credenciales incorrectas', 'Aceptar');
          this.router.navigate(['/login'])
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    })
  }

}
