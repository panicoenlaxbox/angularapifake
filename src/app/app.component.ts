import { Component, OnInit } from '@angular/core';
import { UsersServiceBase } from './users.service';
import { User } from './user';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  private users: User[];
  private subscription: Subscription;
  constructor(private usersService: UsersServiceBase) {
  }
  ngOnInit(): void {
    this.subscription = this.usersService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }
}
