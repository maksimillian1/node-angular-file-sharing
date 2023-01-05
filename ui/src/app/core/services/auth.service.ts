import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CLIENT_CONFIG } from "../config/client-global-config-injection-token";
import { ClientConfig } from "../config/client-config.interface";
import { Observable, tap } from "rxjs";
import { UserModel } from "../models/user.model";
import { JwtService } from './jwt.service';
import { UserService } from './user.service';
import { LoginDTO } from "../dtos/auth/login.dto";
import { AuthMetadataDto } from "../dtos/auth/auth-metadata.dto";
import { RegisterDTO } from "../dtos/auth/register.dto";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly baseEndpoint: string = `${ this.config.apiEndpoint }`;

  constructor(
    private readonly http: HttpClient,
    @Inject(CLIENT_CONFIG)
    private config: ClientConfig,
    private jwtService: JwtService,
    public userService: UserService,
  ) {}

  public login(data: LoginDTO): Observable<AuthMetadataDto> {
    return this.http.post<AuthMetadataDto>(`${ this.baseEndpoint }/auth/login`, data);
  }

  public register(data: RegisterDTO): Observable<{ authorization: AuthMetadataDto, user: UserModel }> {
    return this.http.post<{ authorization: AuthMetadataDto, user: UserModel }>(`${ this.baseEndpoint }/users/register`, data);
  }

  public logout(): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/auth/token/revoke`, {headers:{skip:"true"}})
      .pipe(tap(() => {
        this.jwtService.clearTokens();
        this.userService.setCurrentUser();
      }));
  }

}

