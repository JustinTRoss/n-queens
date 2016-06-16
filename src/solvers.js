/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solnArray = [];

  var findSolns = function(n, curBoard, rookCount = 0) {
    var solution = curBoard || new Board({n: n}); //fixme
    var curRooks = rookCount;
    
    for (var column = 0; column < n; column++) {
      curRooks = rookCount;
      solution.togglePiece(curRooks, column);
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(curRooks, column);
      } else {
        curRooks++;
        if (curRooks === n) {
          solnArray.push(solution);
        } else {
          findSolns(n, solution, curRooks);
        }
      }
    }
  };

  findSolns(n);
  console.log(solnArray);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solnArray[0].rows()));
  return solnArray[0].rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solnArray = [];  
  var findSolns = function(n, curBoard, rookCount = 0) {
    var solution = curBoard || new Board({n: n}); //fixme
    var curRooks = rookCount;
    // debugger;
    for (var column = 0; column < n; column++) {
      solution.togglePiece(curRooks, column);
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(curRooks, column);
      } else {
        curRooks++;
        if (curRooks === n) {
          var mappedSoln = solution.rows().slice().map(function(valAry) {
            return valAry.slice();
          });
          solnArray.push(mappedSoln);
          curRooks--;
          solution.togglePiece(curRooks, column);
          //console.log(solution);
        } else {
         // console.log(solution);

          findSolns(n, solution, curRooks);
          curRooks--;
          solution.togglePiece(curRooks, column);
        }
      }
    }
  };

  findSolns(n);

  console.log(solnArray);

  console.log('Number of solutions for ' + n + ' rooks:', solnArray.length);
  return solnArray.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solnArray = []; 
  var findSolns = function(n, curBoard, queenCount = 0) {
    var solution = curBoard || new Board({n: n}); //fixme
    var curQueens = queenCount;
    if (n === 1) {
    //  debugger;
    }
    for (var column = 0; column < n; column++) {
      solution.togglePiece(curQueens, column);
      if (solution.hasAnyQueensConflicts()) {
        solution.togglePiece(curQueens, column);
      } else {
        curQueens++;
        if (curQueens === n) {
          var mappedSoln = solution.rows().slice().map(function(valAry) {
            return valAry.slice();
          });
          solnArray.push(mappedSoln);
          curQueens--;
          solution.togglePiece(curQueens, column);
          //console.log(solution);
        } else {
         // console.log(solution);

          findSolns(n, solution, curQueens);
          curQueens--;
          solution.togglePiece(curQueens, column);
        }
      }
    }
  };

  findSolns(n);

  console.log(solnArray);
  var returnVal = solnArray[0];
  if (solnArray.length === 0) {
    if (n === 0) {
      returnVal = [];
    } else {
      returnVal = {n: n};
    }
  }
  console.log(returnVal);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(returnVal));
  return returnVal;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solnArray = []; 
  var findSolns = function(n, curBoard, queenCount = 0) {
    var solution = curBoard || new Board({n: n}); //fixme
    var curQueens = queenCount;
    if (n === 1) {
    //  debugger;
    }
    for (var column = 0; column < n; column++) {
      solution.togglePiece(curQueens, column);
      if (solution.hasAnyQueensConflicts()) {
        solution.togglePiece(curQueens, column);
      } else {
        curQueens++;
        if (curQueens === n) {
          var mappedSoln = solution.rows().slice().map(function(valAry) {
            return valAry.slice();
          });
          solnArray.push(mappedSoln);
          curQueens--;
          solution.togglePiece(curQueens, column);
          //console.log(solution);
        } else {
         // console.log(solution);

          findSolns(n, solution, curQueens);
          curQueens--;
          solution.togglePiece(curQueens, column);
        }
      }
    }
  };

  findSolns(n);

  var returnVal = solnArray.length;
  if (solnArray.length === 0) {
    if (n <= 1) {
      returnVal = 1;
    } else {
      returnVal = 0;
    }
  }

  return returnVal;
};
