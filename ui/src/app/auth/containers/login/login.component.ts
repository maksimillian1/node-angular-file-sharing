import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from "../../../core/services/auth.service";
import { httpErrorHandler } from "../../../shared/helpers/http-error-handler.helper";
import { LoginDTO } from "../../../core/dtos/auth/login.dto";
import { JwtService } from "../../../core/services/jwt.service";
import { switchMap } from "rxjs";
import { UserService } from '../../../core/services/user.service';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../auth.styles.scss'],
})
export class LoginComponent implements OnInit {

  public showPassword = false;
  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
  }

  public submit(): void {
    const payload = { ...this.loginForm.value } as LoginDTO;

    this.authService.login(payload)
      .pipe(switchMap((response) => {
        this.jwtService.setTokens(response);
        this.toastr.success('User Logged In Successfully!');
        this.userService.setCurrentUser();

        return this.userService.user$;
      }))
      .subscribe({
        next: () => {
          this.router.navigate(['']).then();
        },
        error: httpErrorHandler(this.toastr),
      });
  }

}
