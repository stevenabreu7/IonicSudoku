import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { GamePage } from '../pages/game/game';
import { PlayPage } from '../pages/play/play';
import { OnboardingPage } from '../pages/onboarding/onboarding';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage) {
    this.initializeApp();

    this.storage.get('b').then(val => {
      if (val == null) {
        this.rootPage = OnboardingPage;
        // this.storage.set('b', true);
      } else {
        this.rootPage = PlayPage;
      }
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Play Now', component: PlayPage },
      // { title: 'Sudoku', component: GamePage },
      { title: 'Onboarding', component: OnboardingPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
