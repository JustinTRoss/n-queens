// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var numInRow = 0;
      var arr = this.get(rowIndex);
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === 1) {
          numInRow++;
        }
      }
      if (numInRow > 1) {
        return true;
      }

      return false; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var cols = this.get('n');
      var hasCon = false;
      for (var i = 0; i < cols; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return hasCon; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var colCount = 0;
      var rows = this.get(colIndex).length;

      for (var i = 0; i < rows; i++) {
        colCount += this.get(i)[colIndex];
      }

      if (colCount > 1) {
        return true;
      }

      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var rows = this.get('n');
      var hasCon = false;
      for (var i = 0; i < rows; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return hasCon; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      
      var currColumn = majorDiagonalColumnIndexAtFirstRow;
      var diagonalCounter = 0;
      var size = this.get('n');

      for (var row = 0; row < size; row++) {
        if (this.get(row)[currColumn] === 1) {
          diagonalCounter++;
        }
        if (diagonalCounter > 1) {
          return true;
        }
        currColumn++;
      }
      return false;





      // var size = this.get('n');
      // var start = majorDiagonalColumnIndexAtFirstRow;
      // var index = 0;
      // var col = 0;
      // var counter = 0;
      /* 
    x x x x x
      x x x x
      x x x x
      x x x x
      start = 0
      size = 4
      itear = 4
      col = 0
      counter 0
      */
      // if (!this._isInBounds(0, start)) {
      //   col = -1 * start;
      //   start = 0; 
      // }

      // for (var i = start; i < size; i++) {
      //   if (this.get(i)[col] === 1) {
      //     counter++;
      //     col++;
      //   }
      //   if (counter > 1) {
      //     return true;
      //   }

      // }
      
      // return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var size = this.get('n');
      for (var index = -size; index < size; index++) {
        if (this.hasMajorDiagonalConflictAt(index)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var currColumn = minorDiagonalColumnIndexAtFirstRow;
      var diagonalCounter = 0;
      var size = this.get('n');

      for (var row = 0; row < size; row++) {
        if (this.get(row)[currColumn] === 1) {
          diagonalCounter++;
        }
        if (diagonalCounter > 1) {
          return true;
        }
        currColumn--;
      }
      return false;

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var size = this.get('n');
      for (var index = 0; index < (size - 1) * 2; index++) {
        if (this.hasMinorDiagonalConflictAt(index)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
