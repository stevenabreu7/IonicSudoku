import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlayPage } from '../play/play';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  play() {
    this.navCtrl.push(PlayPage);
  }
}
