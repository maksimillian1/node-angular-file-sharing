import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { passwordShouldMatch } from "../../validators/password-should-match.validator";
import { AuthService } from "../../../core/services/auth.service";
import { httpErrorHandler } from "../../../shared/helpers/http-error-handler.helper";
import { finalize } from "rxjs";
import { RegisterDTO } from "../../../core/dtos/auth/register.dto";
import { JwtService } from "../../../core/services/jwt.service";
import { UserService } from "../../../core/services/user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../../auth.styles.scss'],
})
export class RegistrationComponent {

  public showPassword = false;
  public showPasswordConfirmation = false;
  public registrationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
    password_confirmation: [''],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
  }, { validators: passwordShouldMatch });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  public submit(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const payload = { ...this.registrationForm.value } as RegisterDTO;

    this.authService.register(payload)
      .subscribe(
        {
          next: (response) => {
            if (response.authorization) {
              this.jwtService.setTokens(response.authorization);
              this.userService.setCurrentUser(response.user);

              this.toastr.success('User Registered Successfully!');
              this.router.navigate(['account']).then();
            }
          },
          error: httpErrorHandler(this.toastr),
        },
      );
  }

}
