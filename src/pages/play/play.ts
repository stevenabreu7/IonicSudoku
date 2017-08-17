import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../game/game';

/**
 * Generated class for the PlayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
})
export class PlayPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayPage');
  }

  startGame(diff: number) {
    this.navCtrl.push(GamePage, {
      difficulty: diff
    });
  }
}
