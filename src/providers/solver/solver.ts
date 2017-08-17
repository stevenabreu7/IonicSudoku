import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class SolverProvider {

  count = 0;

  constructor() { }

  solution(fields: number[][]) {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (fields[i][j] == 0) {
          return false;
        }
      }
    }
    return true;
  }

  correctMove(fields: number[][], row: number, col: number, move: number) {
    for (var i = 0; i < 9; i++) {
      if (fields[row][i] == move) {
        return false;
      } else if (fields[i][col] == move) {
        return false;
      }
    }
    for (i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        let x = Math.floor(row/3)*3;
        let y = Math.floor(col/3)*3;
        if (fields[x+i][y+j] == move) {
          return false;
        }
      }
    }
    return true;
  }

  search(fields: number[][]) {
    if (this.solution(fields)) {
      return fields;
    } else {
      var fieldz = fields;
      var freeX = -1;
      var freeY = -1;
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (fields[i][j] == 0) {
            freeX = i;
            freeY = j;
          }
        }
      }
      let choices = [1,2,3,4,5,6,7,8,9].filter(move => this.correctMove(fields, freeX, freeY, move));
      for (i = 0; i < choices.length; i++) {
        var choice = choices[i];
        fieldz[freeX][freeY] = choice;
        let x = this.search(fieldz);
        if (x != null) {
          return x;
        }
        fieldz[freeX][freeY] = 0;
      }
      return null;
    }
  }
}
