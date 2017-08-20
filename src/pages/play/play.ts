import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../game/game';

@IonicPage()
@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
})
export class PlayPage {

  difficulties = ["Easy", "Medium", "Hard"];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  startGame(diff: number) {
    this.navCtrl.push(GamePage, {
      difficulty: diff
    });
  }
}
