const canvas = document.getElementById("partita");
//indicare il contesto della tela
const ctx = canvas.getContext("2d");

//classe con un costruttore parametrizzato 
class Blocco_snake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//velocità di aggiornamento 
let velocità = 7;

let num_celle = 20;//numero di cellette della tela
let grandezza_celle = canvas.width / num_celle; //grandezza cellette della tela (aggiungere -2 se si vuole ottenere un po di distacco)

//cordinate testa serpente spawn
let testaX = 10;
let testaY = 10;

//corpo serpente
const corpo = []; //ho usato una costante solo perche non toglierò mai un elemnto dal serpente
let lungh_corpo = 2; //lunghezza corpo

//cordinate mela spawn
let melaX = 5;
let melaY = 5;

//velocita spostamento x e y
let velocita_X_input = 0;
let velocita_Y_input = 0;


let velocita_X = 0;
let velocita_Y = 0;

//punteggio
let punteggio = 0;

//audio
const mela_suono = new Audio("mela.mp3");

//colore randomico mela
var colore = `hsl(${~~(Math.random() * 360)},100%,50%)`

/*
ordine logico delle cose
-campio la posizione del serpente
-controllo se si è perso se si esco
-se non ha perso aggiorno la tela
-controllo le collisoni con la mela
-disegno la mela
-disegno il serpente
-incremento il punteggio
*/

//aggiornamento costante del gioco (loop)
function loop() {
  velocita_X = velocita_X_input;
  velocita_Y = velocita_Y_input;

  cambiaPosizione();
  if (perso()) {
    return;
  }

  schermo();

  mangia();
  creaMela();
  creaSerpente();

  if (punteggio >= 15) {
    velocità = punteggio - 2;
  } else if (punteggio > 10) {
    velocità = 11;
  } else if (punteggio > 5) {
    velocità = 9;
  }

  setTimeout(loop, 1000 / velocità); //frequenza di aggiornamento
}

//controllo se ha perso con dei booleani 
function perso() {
  let gameOver = false;

  if (velocita_Y === 0 && velocita_X === 0) {
    return false;
  }

  //bordi della tela
  if (testaX < 0) { //bordo sinistro
    gameOver = true;
  } else if (testaX === num_celle) { //bordo destro
    gameOver = true;
  } else if (testaY < 0) { //bordo su
    gameOver = true;
  } else if (testaY === num_celle) { //bordo giu
    gameOver = true;
  }

  for (let i = 0; i < corpo.length; i++) {
    let parte = corpo[i];
    if (parte.x === testaX && parte.y === testaY) {
      gameOver = true;
      break;
    }
  }

  //stampa a video la scritta hai perso
  if (gameOver) {
    ctx.fillStyle = "#4cffd7";
    ctx.textAlign = "center";
    ctx.font = "bold 30px Poppins, sans-serif";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    ctx.font = "15px Poppins, sans-serif";
    ctx.fillText('Premi enter per ricoinciare', canvas.width / 2, canvas.height / 2 + 40);
  }
  return gameOver;
}

//funzione per il punteggio
function punti() {
  document.getElementById("punti").innerText = punteggio;
}

//scermo pulito
function schermo() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//creazione serpente con logica pila
function creaSerpente() {
  ctx.fillStyle = "#c9c9c9";
  for (let i = 0; i < corpo.length; i++) {
    let parte = corpo[i];
    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgba(255,255,255,.3 )";
    ctx.fillRect(parte.x * num_celle, parte.y * num_celle, grandezza_celle, grandezza_celle);//disegnamo la parte nuova
    ctx.shadowBlur = 0;
    
  }

  corpo.push(new Blocco_snake(testaX, testaY)); //aggiungere la parte nuova al serpente (lista) , con le vecchie cordinate della testa quindi il nuovo blocco si trova subito dopo
  while (corpo.length > lungh_corpo) {
    corpo.shift(); // se il serpente ha piu elementi della sua coda lo eliminiamo
  }

  ctx.fillStyle = "white";
  ctx.fillRect(testaX * num_celle, testaY * num_celle, grandezza_celle, grandezza_celle);
}

//muove il serpente
function cambiaPosizione() {
  testaX = testaX + velocita_X;
  testaY = testaY + velocita_Y;
}

//disegna la mela
function creaMela() {
  ctx.globalCompositeOperation = "lighter";
  ctx.shadowBlur = 20;
  ctx.shadowColor = colore;
  ctx.fillStyle = colore;
  ctx.fillRect(melaX * num_celle, melaY * num_celle, grandezza_celle, grandezza_celle);
  ctx.globalCompositeOperation = "source-over";
  ctx.shadowBlur = 0;
}

//il serpente mangia la mela
function mangia() {
  if (melaX === testaX && melaY == testaY) {
    //nuova mela posizione randomica tra 0 e 20
    melaX = Math.floor(Math.random() * num_celle);
    melaY = Math.floor(Math.random() * num_celle);
    lungh_corpo++;
    punteggio++;
    mela_suono.play();
    colore = `hsl(${~~(Math.random() * 360)},100%,50%)`;
    punti();
  }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(e) {
  //muoversi in su o con la freccia o con w
  if (e.keyCode == 38 || e.keyCode == 87) {
    //impedire di fare auto collisione
    if (velocita_Y_input == 1) return;
    velocita_Y_input = -1;
    velocita_X_input = 0;
  }

  //muoversi in giu o con la freccia o con s
  if (e.keyCode == 40 || e.keyCode == 83) {
    //impedire di fare auto collisione
    if (velocita_Y_input == -1) return;
    velocita_Y_input = 1;
    velocita_X_input = 0;
  }

  //muoversi a sinistra o con la freccia o con a
  if (e.keyCode == 37 || e.keyCode == 65) {
    //impedire di fare auto collisione
    if (velocita_X_input == 1) return;
    velocita_Y_input = 0;
    velocita_X_input = -1;
  }

  //muoversi a destra o con la freccia o con d
  if (e.keyCode == 39 || e.keyCode == 68) {
    //impedire di fare auto collisione
    if (velocita_X_input == -1) return;
    velocita_Y_input = 0;
    velocita_X_input = 1;
  }
}

function ricarica() {
  window.location.reload(true);
}

//al premere di invio chiama la funzione ricarica
document.addEventListener("keydown", e => {
  if (e.key == "Enter") {
      ricarica();
  }
})

loop();