
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import * as store from 'store-js';
import { ApiService } from './api.service';
import { APIService } from './Services/api.service.js';


const CHECK_INTERVALL = 15000 // in ms
const STORE_KEY = 'lastAction';


@Injectable({
  providedIn: 'root'
})
export class AutologoutService {

  MINUTES_UNITL_AUTO_LOGOUT : any;

  errorDisplayed = false;
  intVar = 0
  constructor(
    private api: APIService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.api.GetLogOutTime().subscribe( data => {
      this.MINUTES_UNITL_AUTO_LOGOUT = data["Time"]
    })
    this.check();
    this.initListener();
    this.initInterval();
  }

  get lastAction() {
    return parseInt(store.get(STORE_KEY));
  }
  set lastAction(value) {
    store.set(STORE_KEY, value);
  }

  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
      document.body.addEventListener('keypress', () => this.reset());
      document.body.addEventListener('mousemove', () => this.reset());
    });
  }

  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, CHECK_INTERVALL);
    })
  }

  reset() {
    this.lastAction = Date.now();
  }

  check() { 
    const now = Date.now();
    const timeleft = this.lastAction + this.MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;
    this.ngZone.run(() => {
      if (isTimeout && sessionStorage.getItem('clientID')) {
        console.log(`You were logged out immediately after  ${this.MINUTES_UNITL_AUTO_LOGOUT} minute(s)`);
        sessionStorage.clear();
        this.router.navigate(['/login']);
       // window.alert(`You were logged out immediately after  ${this.MINUTES_UNITL_AUTO_LOGOUT} minute(s)`);

      } 
    });
  }
  
}