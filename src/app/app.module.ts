import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GamePage } from '../pages/game/game';
import { PlayPage } from '../pages/play/play';
import { OnboardingPage } from '../pages/onboarding/onboarding';

import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BoardProvider } from '../providers/board/board';
import { CreationProvider } from '../providers/creation/creation';
import { SolverProvider } from '../providers/solver/solver';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GamePage,
    PlayPage,
    OnboardingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GamePage,
    PlayPage,
    OnboardingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BoardProvider,
    CreationProvider,
    SolverProvider
  ]
})
export class AppModule {}
