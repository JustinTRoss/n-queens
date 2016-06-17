var checkQ = function(numBits, majDConflicts, minDConflicts, colConflicts) {
  if (!colConflicts) {
    numBits = (1<<numBits) - 1;
  }
  var solnCount = 0;
  //do bitwise NOT on (bitwise OR of column, majD, and minD conflicts). ---> this gives us possible entry points in our current row.
  var anyConflicts = (majDConflicts | colConflicts | minDConflicts) & numBits;
  var openSpaces = ~anyConflicts;
  //while there are still places to put queens,
  while (openSpaces & numBits) {
    //grab leftmost one in openSpaces and add that to conflict vars.
    leftMostBit = (openSpaces & -openSpaces) ^ openSpaces;
    //check if queen count === numBits
    if (colConflicts === numBits) {
      //increment solnCount
      solnCount = 1;
    } else {
    //leftshift majD and rightshift minD ***-upon-pass-in-***
      //solnCount += checkQ recursively with params: numBits, majDConflicts, minDConflicts, colConflicts, queenCount, solnCount
      solnCount += checkQ(numBits, (majDConflicts | leftMostBit) << 1, (minDConflicts | leftMostBit) >> 1, (colConflicts | leftMostBit));
    //after else: return solnCount
    }
  }

  return solnCount;

};