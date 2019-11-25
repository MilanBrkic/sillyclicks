window.addEventListener('load', init);

//globals

//avaliable levels

const levels={
    easy:5,
    medium: 3,
    hard: 2
}

//to change level
let currentLevel;
let time=0;
let score=0;
let isPlaying;

//score storage

let maxScore=score;

//DOM elements
const wordInput= document.querySelector('#word-input');
const currentWord= document.querySelector('#current-word');
const scoreDisplay= document.querySelector('#score');
const timeDisplay= document.querySelector('#time');
const message= document.querySelector('#message');
const seconds= document.querySelector('#seconds');
const maxScoreDisplay= document.querySelector('#maxScore');


const words = [
    'FON',
    'puzzle',
    'sweets',
    'tom and jerry',
    'iphone',
    'ice cream',
    'internet',
    'instagram',
    'fun',
    'music',
    'pink',
    'green',
    'yellow',
    'banana',
    'giraffe',
    'panda',
    'dog',
    'cat',
    'turle',
    'travel',
    'beach',
    'SillyClicks',
    'dolls',
    'cars',
    'toys',
    'animals',
    'gift',
    'socks',
    'christmas',
    'snow flake',
    'snow man',
    'santa claus',
    'reindeer',
    'perfume',
    'cake',
    'pool',
    'chocolade',
    'shark',
    'elephant',
    'truck',
    'strawberry',
    'raspberry',
    'blueberry',
    'blackberry',
    'peppa pig',
    'angry birds',
    'popcorn',
    'tic tac toe',
    'memory game',
    'rock',
    'paper',
    'scissors',
    'EPOS',
    'Mickey Mouse',
    'guitar',
    'the sims 4',
    'fifa 20'
  ];

  //initialize game

  function init(){
      //show number of secs in UI
      checkLevel();
      //load word from array
      showWord(words);
      //if level not selected
      
      
      //call countdown every second
      setInterval(countdown, 1000);
      //check game status
      setInterval(checkStatus,50);
      
      
  }

 
  //pick and show random word
  function showWord(words){
      //generate random array index
    const randIndex=Math.floor(Math.random() * words.length);
    //output a random word
    currentWord.innerHTML=words[randIndex];
  }

  //countdown timer
  function countdown(){
    //make sure time is not run out
    if(time>0){
        //decrement 
        time--;
    }
    else if(time===0){
        //game over
        isPlaying=false;
    }
    //show time
    timeDisplay.innerHTML= time;
  }

 

  //start matching
  function startMatch(){
      if(matchWords()){
        isPlaying=true;
        time=currentLevel+1;
        showWord(words);
        wordInput.value='';
        score++;
      }
      if(score===-1){
          scoreDisplay.innerHTML=0;
      }
      else{
        scoreDisplay.innerHTML= score;
      }
      
  }

  function checkLevel(){
      if(checkButton()){
        //start matching on word input
        wordInput.addEventListener('input', startMatch);
      }
      else{
          alert("You need to select level!");
      }
  }
  function checkButton(){
    var radio= document.getElementsByName('optradio');
    
     if(radio[0].checked){
        return true;
     }
     else if(radio[1].checked){
        return true;
     }
     else if(radio[2].checked){
        return true;
     }
     return false;
  }

  function matchWords(){
    if(wordInput.value===currentWord.innerHTML){
        message.innerHTML='Correct!!!';
        return true;
    }
    else{
        message.innerHTML='';
        return false;
    }
  }

   //check game status
   function checkStatus(){
    if(!isPlaying && time==0){
        message.innerHTML='Game Over!!!';
        if (score>maxScore){
            maxScore=score;
        }
        maxScoreDisplay.innerHTML=maxScore;
        score=-1;
    }
  }

  function setLevel(){
      var radio= document.getElementsByName('optradio');
    
     if(radio[0].checked){
        currentLevel=levels.easy;
        
     }
     else if(radio[1].checked){
         currentLevel=levels.medium;
     }
     else if(radio[2].checked){
         currentLevel=levels.hard;
     }
    
     console.log(currentLevel);
     time=currentLevel;
     seconds.innerHTML=currentLevel;
  }

  function focus1(){
    wordInput.focus();
  }