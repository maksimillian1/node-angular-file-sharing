import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, Subject } from 'rxjs';

import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { CLIENT_CONFIG } from '../config/client-global-config-injection-token';
import { ClientConfig } from '../config/client-config.interface';
import { JwtService } from './jwt.service';

@Injectable({providedIn: 'root'})
export class UserService {

  public user$!: Observable<UserModel | null>;
  public currentUser$: Subject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
  private readonly baseEndpoint: string = `${this.config.apiEndpoint}/users`;
  public userLoaded$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    @Inject(CLIENT_CONFIG)
    private config: ClientConfig,
    private jwtService: JwtService,
  ) {
    this.setCurrentUser();
  }

  public setCurrentUser(user?: UserModel) {
    if(user) {
      this.currentUser$.next(user);
      this.userLoaded$.next(true);
      return;
    }

    this.user$ = this.getCurrentUser();
    this.user$.subscribe(res => {
      this.userLoaded$.next(true);
      this.currentUser$.next(res);
    });
  }

  public getCurrentUser(): Observable<UserModel | null> {
    if(!this.jwtService.getAccessToken()) {
      return of(null);
    }

    return this.http.get<UserModel>(`${this.baseEndpoint}/me`)
      .pipe(catchError(() => of(null)));
  }

  public getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseEndpoint}`);
  }

  public uploadFile(id: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseEndpoint}/${id}/upload`, data);
  }

}
