import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BoardProvider } from '../../providers/board/board';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  difficulty: number;
  difText: string;
  selected: number = -1;
  incorrect: number = -1;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, public board: BoardProvider, 
              public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    // constructor
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
    this.alertCtrl.create({
      title: 'Solved!',
      buttons: ['OK']
    }).present();
  }

  pressedField(row: number, col: number) {
    if (this.selected == -1) {
      this.invalidMoveAlert("Please select a number first in order to make a move.");
      return;
    }
    let res = this.board.makeMove(row, col, this.selected);
    if (!res) {
      let msg = "The move you\'re trying to make is invalid.";
      this.invalidMoveAlert(msg);
    }
    this.selected = -1;
    this.checkGame();
  }

  pressedNumber(num: number) {
    if (this.selected == num) {
      this.selected = -1;
    } else {
      this.selected = num;
    }
  }

  isSelected(num: number) {
    return (this.selected == num);
  }

  isIncorrect(ind: number) {
    return (this.incorrect == ind);
  }

  checkGame() {
    if (this.board.isFull()) {
      console.log("BOARD FULL.");
      // check if correct
      if (this.board.isSolved()) {
        this.correctAlert();
      } else {
        this.incorrectAlert();
      }
    }
  }

  highlightIncorrect() {
    console.log(this.board.correct);
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (!this.board.correct[i][j]) {
          // check row i, col j
          this.incorrect = i*9 + j;
          console.log(this.incorrect);
          return;
        }
      }
    }
  }

  correctAlert() {
    this.alertCtrl.create({
      title: 'You Win!',
      subTitle: 'You have solved this Sudoku puzzle. Congratulations!',
      buttons: ['OK']
    }).present();
  }

  incorrectAlert() {
    this.alertCtrl.create({
      title: 'Something\'s Wrong',
      subTitle: 'There seems to be a mistake on the Sudoku board. Would you like to get a hint?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.highlightIncorrect();
          }
        },
        {
          text: 'No'
        }
      ]
    }).present();
  }

  invalidMoveAlert(msg: string) {
    this.alertCtrl.create({
      title: 'Invalid Move',
      subTitle: msg,
      buttons: ['OK']
    }).present();
  }
}
