import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserDataService } from 'src/app/features/services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  isAuth: boolean = false;
  userName: string | undefined;
  showNavigation: boolean = false;

  constructor(private authService: AuthService, private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
      this.userName = user?.login;
    });
  };

  onLogout() {
    if (confirm('Do you really want to Logout?')) {
      this.authService.logout();   
      // clear boards array on logout
      this.userDataService.clearBoardsRequestState();   
    }
  }

  onToggleNavigation() {
    this.showNavigation = !this.showNavigation;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
