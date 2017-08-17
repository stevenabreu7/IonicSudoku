import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BoardProvider } from '../../providers/board/board';

/**
 * Generated class for the GamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  difficulty: number;
  difText: string;
  selected: number = -1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public board: BoardProvider) {
  }

  ionViewDidLoad() {
    this.difficulty = this.navParams.get('difficulty');
    if (this.difficulty == 0) {
      this.difText = "Easy";
    } else if (this.difficulty == 1) {
      this.difText = "Medium";
    } else {
      this.difText = "Hard";
    }
    this.board.createBoard(this.difficulty);
  }

  solve() {
    console.log(this.board.solve());
  }

  pressedField(row: number, col: number) {
    this.board.makeMove(row, col, this.selected);
    // let res = this.board.makeMove(row, col, this.selected);
    // if (!res) {
    //   console.log("invalid move");
    // }
    this.checkGame();
  }

  pressedNumber(num: number) {
    this.selected = num;
  }

  isSelected(num: number) {
    return (this.selected == num);
  }

  checkGame() {
    if (this.board.isFull()) {
      console.log("BOARD FULL.");
    }
  }
}
