var app = {

    gameOver: false,
    userTurn: false,
    wins: 0,
    loses: 0,
    draws:0,
    gameBoard: [0,0,0, 0,0,0, 0,0,0],

    // Application Constructor
    initGame: function() {

        var self = this;
       // setup click event listeners
        document.getElementById("0").addEventListener('click',function(){self.makeMove(0)},false);
        document.getElementById("1").addEventListener('click',function(){self.makeMove(1)},false);
        document.getElementById("2").addEventListener('click',function(){self.makeMove(2)},false);
        document.getElementById("3").addEventListener('click',function(){self.makeMove(3)},false);
        document.getElementById("4").addEventListener('click',function(){self.makeMove(4)},false);
        document.getElementById("5").addEventListener('click',function(){self.makeMove(5)},false);
        document.getElementById("6").addEventListener('click',function(){self.makeMove(6)},false);
        document.getElementById("7").addEventListener('click',function(){self.makeMove(7)},false);
        document.getElementById("8").addEventListener('click',function(){self.makeMove(8)},false);
        document.getElementById("new_game").addEventListener('click',function(){self.startGame()},false);
        document.getElementById("new_game").style.visibility= 'hidden';
        // where up event listeners
        self.startGame();
    },

    startGame: function() {

      //  -----------------------------------
      // reset game data
      this.userTurn  = false;
      this.gameOver  = false;
      this.gameBoard = [0,0,0, 0,0,0, 0,0,0];

      //  -----------------------------------
      // clear screen
      for (var i = 0 ; i < 9 ; ++i) {
        document.getElementById(i).innerHTML = '';
      }

      // all user to start game
      this.userTurn= true;
      document.getElementById("new_game").style.visibility= 'hidden';
    },

    endGame: function() {
          this.gameOver= true;
          document.getElementById('wins_value').innerHTML = this.wins;
          document.getElementById('loses_value').innerHTML = this.loses;
          document.getElementById('draws_value').innerHTML = this.draws;
          document.getElementById("new_game").style.visibility= 'visible';
    },

    makeMove: function(moveId) {
      if (this.gameOver == false) {
        if (this.userTurn) {
            if (this.gameBoard[moveId] == 0) {
              this.userTurn = false;
              this.gameBoard[moveId] = 1;
              this.updateUI(moveId,1);
              if (this.haveWinner()) {
                ++this.wins;
                this.endGame();
              } else {
                setTimeout(function(){ app.computeMove();}, 2000 );
              }
           }
        }
      }
    },
    computeMove: function() {
      if (this.gameOver == false) {
          var id = this.findBestMove();
          if (id != -1) {
            this.gameBoard[id] = 2;
            this.updateUI(id,2);
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
    },
    findBestMove: function() {
      var i = this.findWinningMove(2);
      if (i != -1) {
        return i;
      }
      // -----------------------------------------------------------------------
      i = this.findWinningMove(1);
      if (i != -1) {
        return i;
      }
      // -----------------------------------------------------------------------
      // level 1
      if (this.gameBoard[4] == 0) {
        return 4;
      }
      // level 2
      var options = [0,2,6,8];
      //TODO:: rank moves
      this.shuffle(options);
      for (var i = 0 ; i < options.length; ++i) {
        if (this.gameBoard[options[i]] == 0) {
          return options[i];
        }
      }
      // level 3
      options = [1,3,5,7];
      //TODO:: rank moves
      this.shuffle(options);
      for (var i = 0 ; i < options.length; ++i) {
        if (this.gameBoard[options[i]] == 0) {
          return options[i];
        }
      }
      return -1;
    },
    updateUI: function(id, value) {
        if (value === 1) {
          document.getElementById(id).innerHTML = '<div class="x_mark"/>';
        } else {
          document.getElementById(id).innerHTML = '<div class="o_mark"/>';
        }
    },
    shuffle: function(a) {
      var j, x, i;
      for (i = a.length; i; i--) {
          j = Math.floor(Math.random() * i);
          x = a[i - 1];
          a[i - 1] = a[j];
          a[j] = x;
      }
    },
    findWinningMove: function(value) {
      //
      // X12
      // 3X5
      // 67X
      if (this.gameBoard[0] == 0 && this.gameBoard[4] == this.gameBoard[8] && this.gameBoard[8] == value)
      {
        return 0;
      }
      else if (this.gameBoard[4] == 0 && this.gameBoard[0] == this.gameBoard[8] && this.gameBoard[8] == value)
      {
        return 4;
      }
      else if (this.gameBoard[8] == 0 && this.gameBoard[0] == this.gameBoard[4] && this.gameBoard[4] == value)
      {
        return 8;
      }

      //
      // 01X
      // 3X5
      // X78
      else if (this.gameBoard[2] == 0 && this.gameBoard[4] == this.gameBoard[6] && this.gameBoard[6] == value)
      {
        return 2;
      }
      else if (this.gameBoard[4] == 0 && this.gameBoard[2] == this.gameBoard[6] && this.gameBoard[6] == value)
      {
        return 4;
      }
      else if (this.gameBoard[6] == 0 && this.gameBoard[2] == this.gameBoard[4] && this.gameBoard[4] == value)
      {
        return 6;
      }
      //
      // XXX
      // 345
      // 678
      else if (this.gameBoard[0] == 0 && this.gameBoard[1] == this.gameBoard[2] && this.gameBoard[2] == value)
      {
        return 0;
      }
      else if (this.gameBoard[1] == 0 && this.gameBoard[0] == this.gameBoard[2] && this.gameBoard[2] == value)
      {
        return 1;
      }
      else if (this.gameBoard[2] == 0 && this.gameBoard[0] == this.gameBoard[1] && this.gameBoard[1] == value)
      {
        return 2;
      }

      //
      // 012
      // XXX
      // 678
      else if (this.gameBoard[3] == 0 && this.gameBoard[4] == this.gameBoard[5] && this.gameBoard[5] == value)
      {
        return 3;
      }
      else if (this.gameBoard[4] == 0 && this.gameBoard[3] == this.gameBoard[5] && this.gameBoard[5] == value)
      {
        return 4;
      }
      else if (this.gameBoard[5] == 0 && this.gameBoard[3] == this.gameBoard[4] && this.gameBoard[4] == value)
      {
        return 5;
      }
      // 012
      // 345
      // XXX
      else if (this.gameBoard[6] == 0 && this.gameBoard[8] == this.gameBoard[7] && this.gameBoard[7] == value)
      {
        return 6;
      }
      else if (this.gameBoard[7] == 0 && this.gameBoard[6] == this.gameBoard[8] && this.gameBoard[8] == value)
      {
        return 7;
      }
      else if (this.gameBoard[8] == 0 && this.gameBoard[6] == this.gameBoard[7] && this.gameBoard[7] == value)
      {
        return 8;
      }

      // X12
      // X45
      // X78
      else if (this.gameBoard[0] == 0 && this.gameBoard[6] == this.gameBoard[3] && this.gameBoard[3] == value)
      {
        return 0;
      }
      else if (this.gameBoard[3] == 0 && this.gameBoard[0] == this.gameBoard[6] && this.gameBoard[6] == value)
      {
        return 3;
      }
      else if (this.gameBoard[6] == 0 && this.gameBoard[0] == this.gameBoard[3] && this.gameBoard[3] == value)
      {
        return 6;
      }

      // 0X2
      // 3X5
      // 6X8
      else if (this.gameBoard[1] == 0 && this.gameBoard[4] == this.gameBoard[7] && this.gameBoard[7] == value)
      {
        return 1;
      }
      else if (this.gameBoard[4] == 0 && this.gameBoard[1] == this.gameBoard[7] && this.gameBoard[1] == value)
      {
        return 4;
      }
      else if (this.gameBoard[7] == 0 && this.gameBoard[1] == this.gameBoard[4] && this.gameBoard[4] == value)
      {
        return 7;
      }

      // 01X
      // 34X
      // 67X
      else if (this.gameBoard[2] == 0 && this.gameBoard[5] == this.gameBoard[8] && this.gameBoard[8] == value)
      {
        return 2;
      }
      else if (this.gameBoard[5] == 0 && this.gameBoard[2] == this.gameBoard[8] && this.gameBoard[8] == value)
      {
        return 5;
      }
      else if (this.gameBoard[8] == 0 && this.gameBoard[2] == this.gameBoard[5] && this.gameBoard[5] == value)
      {
        return 8;
      }

      //  --------------
      else
      {
        return -1;
      }
    },

        haveWinner: function() {
          //
          // X12
          // 3X5
          // 67X
          if (this.gameBoard[0] != 0 && this.gameBoard[0] == this.gameBoard[4] && this.gameBoard[4] == this.gameBoard[8])
          {
            return true;
          }
          //
          // 01X
          // 3X5
          // X78
          else if (this.gameBoard[2] != 0 && this.gameBoard[2] == this.gameBoard[4] && this.gameBoard[4] == this.gameBoard[6])
          {
            return true;
          }
          //
          // XXX
          // 345
          // 678
          else if (this.gameBoard[0] != 0 && this.gameBoard[0] == this.gameBoard[1] && this.gameBoard[1] == this.gameBoard[2])
          {
            return true;
          }

          //
          // 012
          // XXX
          // 678
          else if (this.gameBoard[3] != 0 && this.gameBoard[3] == this.gameBoard[4] && this.gameBoard[4] == this.gameBoard[5])
          {
            return true;
          }
          // 012
          // 345
          // XXX
          else if (this.gameBoard[6] != 0 && this.gameBoard[6] == this.gameBoard[7] && this.gameBoard[7] == this.gameBoard[8])
          {
            return true;
          }

          // X12
          // X45
          // X78
          else if (this.gameBoard[0] != 0 && this.gameBoard[0] == this.gameBoard[3] && this.gameBoard[3] == this.gameBoard[6])
          {
            return true;
          }

          // 0X2
          // 3X5
          // 6X8
          else if (this.gameBoard[1] != 0 && this.gameBoard[1] == this.gameBoard[4] && this.gameBoard[4] == this.gameBoard[7])
          {
            return true;
          }

          // 01X
          // 34X
          // 67X
          else if (this.gameBoard[2] != 0 && this.gameBoard[2] == this.gameBoard[5] && this.gameBoard[5] == this.gameBoard[8])
          {
            return true;
          }

          else
          {
            return false;
          }
        }
};

// initialize the game
app.initGame();
