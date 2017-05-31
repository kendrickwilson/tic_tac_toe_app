import 'dart:html';
import 'dart:math';

class AppController {
    bool gameOver = false;
    bool userTurn = false;
    num wins = 0;
    num loses = 0;
    num draws = 0;
    List<int> gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  // -----------------------------------------------------------------------
  // App Constructor
  AppController() {
    this.gameOver = false;
    this.userTurn = false;
    this.wins = 0;
    this.loses = 0;
    this.draws = 0;
    this.gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  // -----------------------------------------------------------------------
  // inital game
  initGame() {
    
    // setup click event listeners
    document.getElementById("0").onClick.listen((e) {this.makeMove(0); });
    document.getElementById("1").onClick.listen((e) {this.makeMove(1); });    
    document.getElementById("2").onClick.listen((e) {this.makeMove(2); });
    
    document.getElementById("3").onClick.listen((e) {this.makeMove(3); });
    document.getElementById("4").onClick.listen((e) {this.makeMove(4); });
    document.getElementById("5").onClick.listen((e) {this.makeMove(5); });
    
    document.getElementById("6").onClick.listen((e) {this.makeMove(6); });
    document.getElementById("7").onClick.listen((e) {this.makeMove(7); });
    document.getElementById("8").onClick.listen((e) {this.makeMove(8); });
    
    document.getElementById("new_game").onClick.listen((e) {this.startGame(); });
    
    document.getElementById("new_game").style.visibility = 'hidden';
    
    this.startGame();
  }

  startGame() {

    //  -----------------------------------
    // reset game data
    this.userTurn = false;
    this.gameOver = false;
    this.gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    //  -----------------------------------
    // clear board on screen
    for (var i = 0; i < 9; ++i) {      
      document.getElementById(i.toString()).innerHtml ='';
    }

    // allow user to start game
    this.userTurn = true;
    // hide "new game" button
    document.getElementById("new_game").style.visibility = 'hidden';
  }

  endGame() {
    this.gameOver = true;
    // update score board
    document.getElementById("wins_value").innerHtml = wins.toString();
    document.getElementById("loses_value").innerHtml = loses.toString();
    document.getElementById("draws_value").innerHtml = draws.toString();
    // display "new game" button
    document.getElementById("new_game").style.visibility = 'visible';
  }

  makeMove(moveId) {
    if (this.gameOver == false) {
      if (this.userTurn) {
        if (this.gameBoard[moveId] == 0) {
          this.userTurn = false;
          this.gameBoard[moveId] = 1;
          this.updateUI(moveId, 1);
          if (this.haveWinner()) {
            ++this.wins;
            this.endGame();
          } else {
            this.computeMove();
          }
        }
      }
    }
  }

  computeMove() {
    if (this.gameOver == false) {
      var id = this.findBestMove();
      if (id != -1) {
        this.gameBoard[id] = 2;
        this.updateUI(id, 2);
        this.userTurn = true;
        if (this.haveWinner()) {
          ++this.loses;
          this.endGame();
        }
      } else {
        ++this.draws;
        this.endGame();
      }
    }
  }

  findBestMove() {
    var i = this.findWinningMove(2);
    if (i != -1) {
      return i;
    }

    i = this.findWinningMove(1);
    if (i != -1) {
      return i;
    }
    // level 1
    if (this.gameBoard[4] == 0) {
      return 4;
    }
    // level 2
    var options = [0, 2, 6, 8];
    //TODO:: rank moves
    this.shuffle(options);
    for (var i = 0; i < options.length; ++i) {
      if (this.gameBoard[options[i]] == 0) {
        return options[i];
      }
    }

    // -----------------------------------------------------------------------
    // level 3
    options = [1, 3, 5, 7];
    //TODO:: rank moves
    this.shuffle(options);
    for (var i = 0; i < options.length; ++i) {
      if (this.gameBoard[options[i]] == 0) {
        return options[i];
      }
    }
    return -1;
  }

  updateUI(id, value) {
    if (value == 1) {
      document.getElementById(id).innerHtml = '<div class="x_mark"/>';
    } else {
      document.getElementById(id).innerHtml = '<div class="o_mark"/>';
    }
  }

  shuffle(a) {
    var j;
    var x;    
    var random = new Random();    
    for (var i = a.length - 1; i > 0; i--) {  
      j = random.nextInt(i + 1);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }

  // TODO: refactor, create delegate "Test" method to reduce complexity in the if statement
  findWinningMove(value) {
    if (this.gameBoard[0] == 0 && this.gameBoard[4] == this.gameBoard[8] && this.gameBoard[8] == value) {
      return 0;
    } else if (this.gameBoard[4] == 0 && this.gameBoard[0] == this.gameBoard[8] && this.gameBoard[8] == value) {
      return 4;
    } else if (this.gameBoard[8] == 0 && this.gameBoard[0] == this.gameBoard[4] && this.gameBoard[4] == value) {
      return 8;
    } else if (this.gameBoard[2] == 0 && this.gameBoard[4] == this.gameBoard[6] && this.gameBoard[6] == value) {
      return 2;
    } else if (this.gameBoard[4] == 0 && this.gameBoard[2] == this.gameBoard[6] && this.gameBoard[6] == value) {
      return 4;
    } else if (this.gameBoard[6] == 0 && this.gameBoard[2] == this.gameBoard[4] && this.gameBoard[4] == value) {
      return 6;
    } else if (this.gameBoard[0] == 0 && this.gameBoard[1] == this.gameBoard[2] && this.gameBoard[2] == value) {
      return 0;
    } else if (this.gameBoard[1] == 0 && this.gameBoard[0] == this.gameBoard[2] && this.gameBoard[2] == value) {
      return 1;
    } else if (this.gameBoard[2] == 0 && this.gameBoard[0] == this.gameBoard[1] && this.gameBoard[1] == value) {
      return 2;
    } else if (this.gameBoard[3] == 0 && this.gameBoard[4] == this.gameBoard[5] && this.gameBoard[5] == value) {
      return 3;
    } else if (this.gameBoard[4] == 0 && this.gameBoard[3] == this.gameBoard[5] && this.gameBoard[5] == value) {
      return 4;
    } else if (this.gameBoard[5] == 0 && this.gameBoard[3] == this.gameBoard[4] && this.gameBoard[4] == value) {
      return 5;
    } else if (this.gameBoard[6] == 0 && this.gameBoard[8] == this.gameBoard[7] && this.gameBoard[7] == value) {
      return 6;
    } else if (this.gameBoard[7] == 0 && this.gameBoard[6] == this.gameBoard[8] && this.gameBoard[8] == value) {
      return 7;
    } else if (this.gameBoard[8] == 0 && this.gameBoard[6] == this.gameBoard[7] && this.gameBoard[7] == value) {
      return 8;
    } else if (this.gameBoard[0] == 0 && this.gameBoard[6] == this.gameBoard[3] && this.gameBoard[3] == value) {
      return 0;
    } else if (this.gameBoard[3] == 0 && this.gameBoard[0] == this.gameBoard[6] && this.gameBoard[6] == value) {
      return 3;
    } else if (this.gameBoard[6] == 0 && this.gameBoard[0] == this.gameBoard[3] && this.gameBoard[3] == value) {
      return 6;
    } else if (this.gameBoard[1] == 0 && this.gameBoard[4] == this.gameBoard[7] && this.gameBoard[7] == value) {
      return 1;
    } else if (this.gameBoard[4] == 0 && this.gameBoard[1] == this.gameBoard[7] && this.gameBoard[1] == value) {
      return 4;
    } else if (this.gameBoard[7] == 0 && this.gameBoard[1] == this.gameBoard[4] && this.gameBoard[4] == value) {
      return 7;
    } else if (this.gameBoard[2] == 0 && this.gameBoard[5] == this.gameBoard[8] && this.gameBoard[8] == value) {
      return 2;
    } else if (this.gameBoard[5] == 0 && this.gameBoard[2] == this.gameBoard[8] && this.gameBoard[8] == value) {
      return 5;
    } else if (this.gameBoard[8] == 0 && this.gameBoard[2] == this.gameBoard[5] && this.gameBoard[5] == value) {
      return 8;
    } else {
      return -1;
    }
  }
  
  // TODO: refactor, create delegate "Test" method to reduce complexity in the if statement
  haveWinner() {
    if (this.gameBoard[0] != 0 && this.gameBoard[0] == this.gameBoard[4] && this.gameBoard[4] == this.gameBoard[8]) {
      return true;
    } else if (this.gameBoard[2] != 0 && this.gameBoard[2] == this.gameBoard[4] && this.gameBoard[4] == this.gameBoard[6]) {
      return true;
    } else if (this.gameBoard[0] != 0 && this.gameBoard[0] == this.gameBoard[1] && this.gameBoard[1] == this.gameBoard[2]) {
      return true;
    } else if (this.gameBoard[3] != 0 && this.gameBoard[3] == this.gameBoard[4] && this.gameBoard[4] == this.gameBoard[5]) {
      return true;
    } else if (this.gameBoard[6] != 0 && this.gameBoard[6] == this.gameBoard[7] && this.gameBoard[7] == this.gameBoard[8]) {
      return true;
    } else if (this.gameBoard[0] != 0 && this.gameBoard[0] == this.gameBoard[3] && this.gameBoard[3] == this.gameBoard[6]) {
      return true;
    } else if (this.gameBoard[1] != 0 && this.gameBoard[1] == this.gameBoard[4] && this.gameBoard[4] == this.gameBoard[7]) {
      return true;
    } else if (this.gameBoard[2] != 0 && this.gameBoard[2] == this.gameBoard[5] && this.gameBoard[5] == this.gameBoard[8]) {
      return true;
    } else {
      return false;
    }
  }
}

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


void main() {
var app = new AppController();
app.initGame();
}
