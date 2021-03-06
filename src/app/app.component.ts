import { Component, ViewChild } from '@angular/core';
import { Platform, Events, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Login } from '../pages/login/login';
import { Report } from '../pages/report/report';

import { UserProvider } from '../providers/user-provider';
import { WordPressProvider } from '../providers/word-press-provider';
import { HttpClient } from '../providers/http-client';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [UserProvider, WordPressProvider, HttpClient]
})
export class MyApp {
  // the default root page is Login
  rootPage: any = Login;
  @ViewChild(Nav) nav: Nav;
  constructor(
    private events: Events,
    private userData: UserProvider
  ) {
    // start listening to login and log out events
    this.listenToLoginEvents();
    // check to see if user has logged in before
    // if they have there will be a logged in event fired
    userData.checkedLoggedInStatus();
  }

  listenToLoginEvents() {
    // if the user is logged in then navigate to the Report page
    this.events.subscribe('user:login', () => this.rootPage = Report);
    this.events.subscribe('user:logout', () => this.rootPage = Login);
  }
}
