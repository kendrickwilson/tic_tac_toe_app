/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var app = {
    gameOver: false,
    userTurn: false,
    wins: 0,
    loses: 0,
    draws:0,
    gameBoard: [0,0,0, 0,0,0, 0,0,0],

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('resume', this.onDeviceResume.bind(this), false);
        document.addEventListener('pause', this.onDevicePause.bind(this), false);
        document.getElementById("new_game").style.visibility= 'hidden';
        // where up event listeners

        this.startGame();
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    onDeviceResume: function() {
        this.receivedEvent('deviceresume');
    },
    onDevicePause: function() {
        this.receivedEvent('devicepause');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

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
    },
    endGame: function() {
      this.gameOver= true;
      document.getElementById('wins_value').innerHTML = this.wins;
      document.getElementById('loses_value').innerHTML = this.loses;
      document.getElementById('draws_value').innerHTML = this.draws;
      document.getElementById("new_game").style.visibility= 'visible';
    },
    startGame: function() {
      this.userTurn= true;
      this.gameOver= false;
      this.gameBoard = [0,0,0, 0,0,0, 0,0,0];
      for (var i = 0 ; i < 9 ; ++i) {
        document.getElementById(i).innerHTML = '';
      }      
      document.getElementById("new_game").innerHTML='<ons-button>Restart</ons-button>';
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
    }
};

app.initialize();


document.getElementById("0").addEventListener('click',function(){app.makeMove(0)},false);

document.getElementById("1").addEventListener('click',function(){app.makeMove(1)},false);
document.getElementById("2").addEventListener('click',function(){app.makeMove(2)},false);
document.getElementById("3").addEventListener('click',function(){app.makeMove(3)},false);

document.getElementById("4").addEventListener('click',function(){app.makeMove(4)},false);
document.getElementById("5").addEventListener('click',function(){app.makeMove(5)},false);
document.getElementById("6").addEventListener('click',function(){app.makeMove(6)},false);

document.getElementById("7").addEventListener('click',function(){app.makeMove(7)},false);
document.getElementById("8").addEventListener('click',function(){app.makeMove(8)},false);

document.getElementById("new_game").addEventListener('click',function(){app.startGame()},false);
