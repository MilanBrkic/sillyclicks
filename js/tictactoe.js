var niz = [
    ["","",""],
    ["","",""],
    ["","",""]
];

var recenica_x = "X plays";
var recenica_o = "O plays";
var potez = 0;
var x_score = 0;
var o_score = 0;
var prvi = true;
var pobednik = false;
var multiPlayer = true;

const celija00 = document.getElementById("00");
const celija01 = document.getElementById("01");
const celija02 = document.getElementById("02");

const celija10 = document.getElementById("10");
const celija11 = document.getElementById("11");
const celija12 = document.getElementById("12");

const celija20 = document.getElementById("20");
const celija21 = document.getElementById("21");
const celija22 = document.getElementById("22");

const igrac_p = document.querySelector(".igrac");
const play_btn = document.querySelector(".play")

const x_score_p = document.getElementById("x-score");
const o_score_p = document.getElementById("o-score");

const celije = [
    [celija00, celija01,celija02],
    [celija10, celija11,celija12],
    [celija20, celija21,celija22]
]

function main(){
    
    celijePointerEventIskljuci();
    
}

//onemogucava mogucnost kliktanja na celije
function celijePointerEventIskljuci(){
    for(var i = 0; i<niz[0].length;i++){
        for(var j = 0;j<niz[i].length;j++){
            celije[i][j].style.pointerEvents = "none";
        }
    }
}

//omogucava klinktanje na celije
function celijePointerEventUkljuci(){
    for(var i = 0; i<niz[0].length;i++){
        for(var j = 0;j<niz[i].length;j++){
            celije[i][j].style.pointerEvents = "all";
        }
    }
}

//poziva se kada kliknemo na neki od radiobuttona
function toPlay(){
    play_btn.innerHTML = "Play"
    if(igrac_p.innerHTML !=recenica_x && igrac_p.innerHTML != recenica_o)
        igrac_p.innerHTML = "Click Play";
}

function restartScore(){
    x_score = 0;
    x_score_p.innerHTML = x_score;
    o_score = 0;
    o_score_p.innerHTML = o_score;
}

//poziva se kada kliknemo na play ili replay dugme
function startGame(){
    if(document.getElementById('multi').checked){
        if(!multiPlayer){
            restartScore();
            
        }
        play_btn.innerHTML = "Replay";
        isprazniNiz();
        ispuniCelije();
        igrac_p.innerHTML = recenica_x;
        celijePointerEventUkljuci();
        prvi = true;
        potez = 0;
        pobednik = false;
        multiPlayer = true;
    }
    else if(document.getElementById('single').checked){
        if(multiPlayer){
            restartScore();
            
        }
        play_btn.innerHTML = "Replay";
        isprazniNiz();
        ispuniCelije();
        igrac_p.innerHTML = recenica_x;
        celijePointerEventUkljuci();
        prvi = true;
        potez = 0;
        pobednik = false;
        multiPlayer=false;
    }
}

function povecajScore(igrac){
    if(igrac==='X'){
        x_score++;
        x_score_p.innerHTML = x_score;
    }
    else if(igrac==='O'){
        o_score++;
        o_score_p.innerHTML = o_score;
    }
}

//poziva se kada je igra gotova
function GameOver(igrac){
    for(var i = 0; i<niz[0].length;i++){
        for(var j = 0;j<niz[i].length;j++){
            celije[i][j].style.pointerEvents = "none";
        }
    }

    igrac_p.innerHTML = igrac+" wins!";
    pobednik = true;
    povecajScore(igrac);
}


//ova funkcija postavlja vrednost svih elemenata niza na ""
function isprazniNiz(){
    for(var i = 0; i<niz[0].length;i++){
        for(var j = 0;j<niz[i].length;j++){
            niz[i][j] = "";
        }
    }
}

//ova funckija azurira celije tabele sa nizom
function ispuniCelije(){
    for(var i = 0; i<niz[0].length;i++){
        for(var j = 0;j<niz[i].length;j++){
            celije[i][j].innerHTML = niz[i][j];
        }
    }
}


function daLiJeNaDijagonali(i, j){
    if(i==j){
        return true;
    }
    else if(i+j ==2){
        return true;
    }
    return false;
}

function proveraDijagonale(i, j, igrac){
    
    for(var k = i-1;k<i+2;k++){
        for(var p = j-1; p<j+2;p++){
            razlikai = k-i;
            razlikaj = p-j;

            // ako je na 11
            if(i==1 && j==1){
                if(niz[k][p]===igrac && (k!=1 || p!=1)){
                    if(niz[i-razlikai][j-razlikaj]===igrac){
                        // console.log("Preko centra.pobenik je "+igrac);
                        GameOver(igrac);
                        return;
                    }   
                }
                continue;
            }
            
            
            //sve ostale na uglovima 
            if((k!=i || p!=j) && !(k<0) && !(k>2)
              && !(p<0) && !(p>2)){
                if(niz[k][p]===igrac){
                    if(niz[k+razlikai][p+razlikaj]===igrac){
                        // console.log("Preko ostalih uglova.pobenik je "+igrac);
                        GameOver(igrac);
                        return;
                    }
                }
             }
        }
    }
}

function proveraKrst(i,j, igrac){
    for(var k = i-1;k<i+2;k++){
        for(var p = j-1; p<j+2;p++){
            razlikai = k-i;
            razlikaj = p-j;

            
            //sve ostale krst 
            if((k!=i || p!=j) && !(k<0) && !(k>2)
              && !(p<0) && !(p>2)){
                if(niz[k][p]===igrac){
                    if(!(k+razlikai<0) && !(k+razlikai>2)
                    && !(p+razlikaj<0) && !(p+razlikaj>2)){
                        if(niz[k+razlikai][p+razlikaj]===igrac){
                            // console.log("Preko krst uglova + metoda.pobenik je "+igrac);
                            GameOver(igrac);
                            return;
                        }
                    }
                    else{
                        if(!(i-razlikai<0) && !(i-razlikai>2)
                        && !(j-razlikaj<0) && !(j-razlikaj>2)){
                            if(niz[i-razlikai][j-razlikaj]===igrac){
                                // console.log("Preko krst uglova - metoda.pobenik je "+igrac);
                                GameOver(igrac);
                                return;
                            }
                        }
                    }
                }
             }
        }
    }
}
//provera pobednika
function proveri(i, j, igrac){
    if(potez<5){
        return;
    }
    
    if(daLiJeNaDijagonali(i,j)){
        proveraDijagonale(i,j, igrac);
        return;
    }

    proveraKrst(i,j,igrac);
}


function koJeNaPotezu(){
        prvi = !prvi;
        if(prvi){
            igrac_p.innerHTML = recenica_x;
        }
        else{
            igrac_p.innerHTML = recenica_o;
        }
}


//ova funkcija dodaje x i o u tabelu kada kliknemo
function addEvent(i, j){
    potez++;    
    if(prvi){
            niz[i][j] = "X";
            ispuniCelije();
            koJeNaPotezu();
            proveri(i,j,"X");
        }
        else{
            niz[i][j]="O";
            ispuniCelije();
            koJeNaPotezu();
            proveri(i,j,"O");
        }
        
        setTimeout(function(){
            if(!multiPlayer){
                // console.log("nesto jos iznad");
                if(potez==9 || pobednik===true) return;
                for(p=0;p<3;p++){
                    for(k=0;k<3;k++){
                        if(niz[p][k]==""){
                            // console.log("nesto iznad");
                            if(proveriAI(p,k,"X")){
                                // console.log("nesto");
                                potez++;
                                niz[p][k]="O";
                                ispuniCelije();
                                koJeNaPotezu();
                                proveri(p,k,"O");
                                return;
                            }
                        }
                    }
                }
                while(true){
                    p = Math.floor(Math.random()*3);
                     k = Math.floor(Math.random()*3); 
                     if(niz[p][k]==""){
                        potez++;
                        niz[p][k]="O";
                        ispuniCelije();
                        koJeNaPotezu();
                        proveri(p,k,"O");
                        break;
                    }
                }    
            }
        }, 300)

        
        
        celije[i][j].style.pointerEvents = "none";
        if(potez == 9 && pobednik == false){
            igrac_p.innerHTML = "Draw";
        }
}

// FUNKCIJE ZA AI PROBA
function proveraDijagonaleAI(i, j, igrac){
    
    for(var k = i-1;k<i+2;k++){
        for(var p = j-1; p<j+2;p++){
            razlikai = k-i;
            razlikaj = p-j;

            // ako je na 11
            if(i==1 && j==1){
                if(niz[k][p]===igrac && (k!=1 || p!=1)){
                    if(niz[i-razlikai][j-razlikaj]===igrac){
                        // console.log("Preko centra.pobenik je "+igrac);
                        
                        return true;
                    }   
                }
                continue;
            }
            
            
            //sve ostale na uglovima 
            if((k!=i || p!=j) && !(k<0) && !(k>2)
              && !(p<0) && !(p>2)){
                if(niz[k][p]===igrac){
                    if(niz[k+razlikai][p+razlikaj]===igrac){
                        // console.log("Preko ostalih uglova.pobenik je "+igrac);
                        
                        return true;
                    }
                }
             }
        }
    }
    return false;
}

function proveraKrstAI(i,j, igrac){
    for(var k = i-1;k<i+2;k++){
        for(var p = j-1; p<j+2;p++){
            razlikai = k-i;
            razlikaj = p-j;

            
            //sve ostale krst 
            if((k!=i || p!=j) && !(k<0) && !(k>2)
              && !(p<0) && !(p>2)){
                if(niz[k][p]===igrac){
                    if(!(k+razlikai<0) && !(k+razlikai>2)
                    && !(p+razlikaj<0) && !(p+razlikaj>2)){
                        if(niz[k+razlikai][p+razlikaj]===igrac){
                            // console.log("Preko krst uglova + metoda.pobenik je "+igrac);
                            
                            return true;
                        }
                    }
                    else{
                        if(!(i-razlikai<0) && !(i-razlikai>2)
                        && !(j-razlikaj<0) && !(j-razlikaj>2)){
                            if(niz[i-razlikai][j-razlikaj]===igrac){
                                // console.log("Preko krst uglova - metoda.pobenik je "+igrac);
                                
                                return true;
                            }
                        }
                    }
                }
             }
        }
    }
    return false;
}
//provera pobednika
function proveriAI(i, j, igrac){
    if(potez<3){
        return false;
    }
    
    if(daLiJeNaDijagonali(i,j)){
        return proveraDijagonaleAI(i,j, igrac);
        
    }

   return proveraKrstAI(i,j,igrac);
    
}

main();

