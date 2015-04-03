angular
    .module('gameApp')
    .controller('GameController', GameController);

   GameController.$inject = ['$firebaseObject']; 

function GameController($firebaseObject){
    var self = this;

    self.counter = counter;
    self.makeMove = makeMove;
    self.gameOver = '';
    self.announceWinner = false;
    self.resetGame = resetGame;
    self.ttt = firebaseSync();


    function firebaseSync(){
        var ref = new Firebase("https://tic-pac-ghost.firebaseio.com/board");
        var ttt = $firebaseObject(ref);

        ttt.$loaded(function(){ 

            ttt.squares = [
                {hasMove: "", image: ''},
                {hasMove: "", image: ''},
                {hasMove: "", image: ''},
                {hasMove: "", image: ''},
                {hasMove: "", image: ''},
                {hasMove: "", image: ''},           
                {hasMove: "", image: ''},
                {hasMove: "", image: ''},
                {hasMove: "", image: ''}
                ];

        ttt.$save();

    });             
        return ttt;

    } //end firebaseSync function

    var count = 0; 

function counter(){

    console.log("counter works");
    
    if (count%2 === 0){
        count++
        //console.log("X");
        //console.log(count);
        return "X";
    }

    else {
        count++
        console.log("O");
        
        //console.log(count);
        return "O"
    }
}

function makeMove(sqrNum){
    console.log("makeMove works");
    var move;

    console.log(self.ttt);
   
    if (self.ttt[sqrNum].hasMove === ''){
         move = counter();
        console.log(move);
        console.log(sqrNum);
        self.ttt[sqrNum].hasMove = move;
        console.log(self.ttt);
        setWinner();
    }
}

function setWinner(){

console.log("setWinner works")

var one = self.ttt[0].hasMove;
var two = self.ttt[1].hasMove;
var three = self.ttt[2].hasMove;
var four = self.ttt[3].hasMove;
var five = self.ttt[4].hasMove;
var six = self.ttt[5].hasMove;
var seven = self.ttt[6].hasMove;
var eight = self.ttt[7].hasMove;
var nine = self.ttt[8].hasMove;

if ( one === "X" && two === "X" && three === "X" ||
     four === "X" && five === "X" &&  six === "X" ||
     seven === "X" && eight === "X" && nine === "X" )  
{
    console.log("X wins rows");
    self.gameOver = "Pac-Man wins";
    console.log(self.gameOver);
    self.announceWinner = true;
    // trueWin === true;
}

// //X wins columns
else if (one === "X" && four === "X" && seven === "X" ||
        two === "X" && five === "X" &&  eight === "X" ||
        three === "X" && six === "X" && nine === "X" )
{
    console.log("X wins columns");
    self.gameOver = "Pac-Man wins";
    self.announceWinner = true;
}
//X wins diagonal
else if  (one === "X" && five === "X" && nine === "X" ||
        three === "X" && five === "X" &&  seven === "X") 
{
    console.log("X wins diagonal");
    self.gameOver = "Pac-Man wins";
    self.announceWinner = true;

}

// //O wins Rows

else if ( one === "O" && two === "O" && three === "O" ||
     four === "O" && five === "O" &&  six === "O" ||
     seven === "O" && eight === "O" && nine === "O" )
{
    console.log("O wins rows");
    self.gameOver = "Inky wins";
    self.announceWinner = true;
}

//O wins columns
else if (one === "O" && four === "O" && seven === "O" ||
        two === "O" && five === "O" &&  eight === "O" ||
        three === "O" && six === "O" && nine === "O" )
{
    console.log("O wins columns");
    self.gameOver = "Inky wins";
    self.announceWinner = true;
}
//O wins diagonal
else if (one === "O" && five === "O" && nine === "O" ||
        three === "O" && five === "O" &&  seven === "O") 
{
    console.log("O wins diagonal");
    self.gameOver = "Inky wins";
    self.announceWinner = true;
    } 

if (count === 9){
    self.gameOver = "Nobody wins";
    self.announceWinner = true;
}



} //end setWinner function


function resetGame(){
 
  ttt.squares = [
                {hasMove: "", image: ''},
                {hasMove: "", image: ''},
                {hasMove: "", image: ''},
                {hasMove: "", image: ''},
                {hasMove: "", image: ''},
                {hasMove: "", image: ''},           
                {hasMove: "", image: ''},
                {hasMove: "", image: ''},
                {hasMove: "", image: ''}
                ];

var count = 0;     

self.gameOver = "";
    self.announceWinner = false;           

}

// } end function resetGame


};

