import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class SolverProvider {

  constructor() {
  }

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
      }
    }
    for (i = 0; i < 9; i++) {
      if (fields[i][col] == move) {
        return false;
      }
    }
    let topLeftX = Math.floor(row/3)*3;
    let topLeftY = Math.floor(col/3)*3;
    for (i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (fields[topLeftX+i][topLeftY+j] == move) {
          return false;
        }
      }
    }
    return true;
  }

  // choices(fields: number[][], row: number, col: number) {
  //   var possibleMoves: number[] = [1,2,3,4,5,6,7,8,9].filter(move => this.correctMove(fields, row, col, move));
  //   // TODO randomize choices before returning them
  //   return possibleMoves;
  // }

  search(fields: number[][]) {
    console.log("run");
    if (fields != null && this.solution(fields)) {
      return fields;
    } else {
      // find first free field
      var fieldz = fields;
      let x = this.findFreeField(fields);
      var row = x[0];
      var col = x[1];
      let choices = [1,2,3,4,5,6,7,8,9].filter(move => this.correctMove(fields, row, col, move));
      // let choices = this.choices(fields, freeX, freeY);
      choices.forEach(choice => {
        fieldz[row][col] = choice;
        let x = this.search(fieldz);
        if (x != null) {
          return x;
        }
        fieldz[row][col] = 0;
      });
      return null;
    }
  }

  findFreeField(fields: number[][]) {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (fields[i][j] == 0) {
          return [i,j];
        }
      }
    }
    return [-1,-1];
  }

}
