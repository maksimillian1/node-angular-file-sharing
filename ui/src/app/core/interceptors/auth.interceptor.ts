import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtService } from "../services/jwt.service";

export enum CustomHeader {
  SKIP_AUTH = 'skip-auth',
  SKIP_POST_LOGIC = 'skip',
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private jwtService: JwtService,
  ) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.get(CustomHeader.SKIP_AUTH)) return next.handle(request);

    const accessToken = this.jwtService.getAccessToken();
    if (accessToken) {
      request = request.clone({
        setHeaders: { Authorization: accessToken },
      });
    }

    if (request.headers.get(CustomHeader.SKIP_POST_LOGIC)) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      delay(1000),
      catchError((err) => {
        if (err.status === 401) {
          this.jwtService.clearTokens();
          this.router.navigate(['/auth']);
        }

        return throwError(err);
      }),
    );
  }
}
