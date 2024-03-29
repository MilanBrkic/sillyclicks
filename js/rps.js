let userScore=0;
let computerScore=0;
let userScore_span=document.getElementById("user-score");
const computerScore_span=document.getElementById("computer-score");
const scoreBoard_div=document.querySelector(".scoreboard");
const result_p=document.querySelector(".result>p");
const rock_div=document.getElementById("r");
const paper_div=document.getElementById("p");
const scissors_div=document.getElementById("s");

function getComputerChoice(){
    const choices=['r', 'p', 's'];
    const randomNumber=Math.floor(Math.random()*3);
    return choices[randomNumber];
}

function convertToWord(letter){
    if(letter==="r") return "Rock";
    if(letter=== "p") return "Paper";
    return "Scissors";
}

function win(user,computer){
    userScore++;
    userScore_span.innerHTML=userScore;
    computerScore_span.innerHTML=computerScore;
    const small_u="user".fontsize(3).sub();
    const small_c="comp".fontsize(3).sub();
    result_p.innerHTML=`${convertToWord(user)}${small_u} beats ${convertToWord(computer)}${small_c}. You win!`;

    
}
function lose(user,computer){
    computerScore++;
    userScore_span.innerHTML=userScore;
    computerScore_span.innerHTML=computerScore;
    const small_u="user".fontsize(3).sub();
    const small_c="comp".fontsize(3).sub();
    result_p.innerHTML=`${convertToWord(user)}${small_u} loses to ${convertToWord(computer)}${small_c}. You lost...`;
    document.getElementById(user).classList.add('green-glow');
}
function draw(user,computer){
     const small_u="user".fontsize(3).sub();
     const small_c="comp".fontsize(3).sub();
     result_p.innerHTML=`${convertToWord(user)}${small_u} equals ${convertToWord(computer)}${small_c}. It's draw.`;
}

function game(userChoice){
    const computerChoice= getComputerChoice();
    switch(userChoice+computerChoice){
        case "rs":
        case "pr":
        case "sp":
            win(userChoice,computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice,computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice,computerChoice);
            break;
    }
}

function main(){

    rock_div.addEventListener('click', function(){
    game("r");
    })

    paper_div.addEventListener('click', function(){
        game("p");
    })

    scissors_div.addEventListener('click', function(){
        game("s");
    })
}



main();