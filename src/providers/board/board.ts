import { Injectable } from '@angular/core';
import { CreationProvider } from '../creation/creation';
import { SolverProvider } from '../solver/solver';
import 'rxjs/add/operator/map';

@Injectable()
export class BoardProvider {

  fields: number[][];
  correct: boolean[][];
  changeable: boolean[][];

  constructor(public creation: CreationProvider, public solver: SolverProvider) {
    this.fields = [];
    this.correct = [];
    this.changeable = [];
    for (var i = 0; i < 9; i++) {
      this.fields[i] = [];
      this.correct[i] = [];
      this.changeable[i] = [];
      for (var j = 0; j < 9; j++) {
        this.fields[i][j] = 0;
        this.correct[i][j] = null;
        this.changeable[i][j] = null;
      }
    }
  }

  createBoard(dif: number) {
    let b = this.creation.createBoard(dif);
    this.parseBoard(b);
  }

  parseBoard(text: string) {
    for (var i = 0; i < 81; i++) {
      let row = Math.floor(i/9);
      let col = i%9;
      let move = +text.charAt(i);
      this.correct[row][col] = this.isMoveCorrect(row, col, move);
      this.fields[row][col] = move;
      this.changeable[row][col] = (move == 0);
    }
  }

  isFull(): boolean {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (this.fields[i][j] == 0) {
          return false;
        }
      }
    }
    return true;
  }

  isSolved() {
    if (this.isFull()) {
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (this.correct[i][j] == false) {
            return false;
          }
        }
      }
      // full board and all fields correct
      return true;
    }
    // board not full - not solved
    return false;
  }

  isMoveCorrect(row: number, col: number, move: number) {
    return this.correctMove(this.fields, row, col, move);
  }

  makeMove(i: number, j: number, move: number) {
    if (i < 0 || i > 8 || j < 0 || j > 8 || move < 1 || move > 9) {
      // console.log("invalid move.");
      return false;
    } else if (!this.changeable[i][j]) {
      // console.log("this field is not changeable.");
      return false;
    } else if (this.fields[i][j] == move) {
      // console.log("this move has already been made.");
      return false;
    } else {
      let crrct = this.isMoveCorrect(i, j, move);
      this.correct[i][j] = crrct;
      this.fields[i][j] = move;
      return true;
    }
  }

  correctMove(fieldz: number[][], row: number, col: number, move: number) {
    for (var i = 0; i < 9; i++) {
      if (fieldz[row][i] == move) {
        return false;
      }
    }
    for (i = 0; i < 9; i++) {
      if (fieldz[i][col] == move) {
        return false;
      }
    }
    let topLeftX = Math.floor(row/3)*3;
    let topLeftY = Math.floor(col/3)*3;
    for (i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (fieldz[topLeftX+i][topLeftY+j] == move) {
          return false;
        }
      }
    }
    return true;
  } 
  
  solve() {
    let x = this.solver.search(this.fields);
    return x;
  }
}
