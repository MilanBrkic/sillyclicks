const cards= document.querySelectorAll('.memory-card');

let hasFlippedCard=false; 
let firstCard,secondCard;
let lockboard=false;
let n=0;
let time=0;
let firstClick=true;
let score=0;
let moves=0;

const secondDisplay= document.querySelector('#s');
const minuteDisplay= document.querySelector('#m');
const movesDisplay=document.querySelector('#number');


function flipCard(){
    
    
    

    
    if (firstClick){
        setInterval(countdown, 1000);
        firstClick=false;
    }
    if(lockboard) return;
    if(this===firstCard){
        return;
    } 
    this.classList.toggle('flip');

    if(!hasFlippedCard){
        //first click
        hasFlippedCard=true;
        firstCard=this;
    }
    else { 
        moves++;
        //second click
        hasFlippedCard=false;
        secondCard=this;
        //do cards match?
        matchCards();
    }
    movesDisplay.innerHTML=Math.floor(moves);
    
}

function countdown(){
    if(score===6){
        return;
    }
    time++;
    let min=Math.floor(time/60);
    let sec=time%60;

    if(min<10) minuteDisplay.innerHTML='0'+min;
    else minuteDisplay.innerHTML=min;

    if(sec<10) secondDisplay.innerHTML='0'+sec;
    else secondDisplay.innerHTML=sec;

    
    
}

function matchCards(){
    if(firstCard.dataset.findnemo===secondCard.dataset.findnemo){
        //tacno
        disableCards();
        score++;
    }
    else{
        //netacno
        lockboard= true;
        flipCardsBack();
    }
    
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function flipCardsBack(){
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockboard= false;
    },700);
    
}

function randomize(){
    cards.forEach(card=>{
        let random= Math.floor(Math.random()*12);
        card.style.order=random;
    })
}

randomize();


cards.forEach(card=> card.addEventListener('click', flipCard));