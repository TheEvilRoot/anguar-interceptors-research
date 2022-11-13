import { Component, OnInit } from '@angular/core';
import {AppService, LoadingState} from "../app.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-app-loading',
  templateUrl: './app-loading.component.html',
  styleUrls: ['./app-loading.component.css']
})
export class AppLoadingComponent implements OnInit {

  isLoading: boolean = false
  loadingTitle: string | null = 'loading...'
  loadingSubscription: Subscription | null = null

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.clearSubscriptions()
    this.loadingSubscription = this.appService.loadingObservable().subscribe({
      next: (value: LoadingState) => {
        if (value === null) {
          this.setLoadingState(false, null);
        } else {
          this.setLoadingState(true, value.message);
        }
      },
      error: (error: Error) => {
        console.error('loading state is failed due', error)
      }
    })
  }

  setLoadingState(isLoading: boolean, message: string | null) {
    this.isLoading = isLoading;
    this.loadingTitle = message;
  }

  clearSubscriptions() {
    if (this.loadingSubscription !== null) {
      this.loadingSubscription.unsubscribe()
      this.loadingSubscription = null;
    }
  }
}
