import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { Subscription } from 'rxjs';
import { UserModel } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-json-adapter';

  user: UserModel;

  private subscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.userService
      .getUser()
      .subscribe(user => (this.user = user));
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
