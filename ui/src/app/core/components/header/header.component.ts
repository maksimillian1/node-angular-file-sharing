import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserModel } from "../../models/user.model";
import { AuthService } from '../../services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserService } from '../../services/user.service';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  @Input() set user(user: UserModel | null) {
    this.currentUser = user;
  }

  currentUser: UserModel | null = null;
  @Input() loading: boolean = false;

  constructor(
    public authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.currentUser$
      .pipe(untilDestroyed(this))
      .subscribe(user => this.user = user);

  }

  public logout(): void {
    this.authService
      .logout()
      .pipe(untilDestroyed(this))
      .subscribe()
  }

}
