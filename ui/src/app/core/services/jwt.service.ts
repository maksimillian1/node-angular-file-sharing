import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthMetadataDto } from "../dtos/auth/auth-metadata.dto";
import { LocalStorageService } from "./local-storage.service";


export enum JwtToken {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

@Injectable({ providedIn: 'root' })
export class JwtService {

  constructor(
    private readonly lcService: LocalStorageService,
    private readonly jwtHelper: JwtHelperService,
  ) {}

  public isAuthenticated(): boolean {
    try {
      const token = this.getAccessToken();
      return !!token && !this.jwtHelper.isTokenExpired(token);
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public getAccessToken() {
    return this.lcService.get(JwtToken.ACCESS_TOKEN);
  }

  public setTokens(data: AuthMetadataDto) {
    this.lcService.set(JwtToken.ACCESS_TOKEN, `Bearer ${data.access_token}`);
    // this.lcService.set(JwtToken.REFRESH_TOKEN, data.e);
  }

  public clearTokens() {
      this.lcService.delete(JwtToken.ACCESS_TOKEN);
      // this.lcService.delete(JwtToken.REFRESH_TOKEN);
  }

}
