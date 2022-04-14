//variabili
var io;
var il_mio_punteggio = 0;
var avversario;
var il_punteggio_avversario = 0;

var scelte = ["sasso", "carta", "forbici"];

//creo le scelte sasso carta e forbici
for (var i = 0; i < 3; i++) {
    var scelta = document.createElement("img"); //creo tag img
    scelta.id = scelte[i]; //aggiungo come id il relativo nome
    scelta.className = "mano " + scelte[i]; //classe = mano + nome
    scelta.src = "foto/" + scelte[i] + ".png"; //creo il link all'immagine con il precorso prendendo l'immagine chiamata come l'oggetto
    scelta.addEventListener("click", seleziona_scelta); //aggiungo la funzione al click
    document.getElementById("scelte").append(scelta); //inserisco nel html tutto
}
Nome();

//nome del player con controllo vuoto
function Nome() {
    Giocatore1 = prompt("Giocatore inserisci il tuo nome");
    if(Giocatore1==""){
        document.getElementById("nome-player").innerHTML += "player";
    } else {
        document.getElementById("nome-player").innerHTML += Giocatore1;
    }
}

//funzione di gioco
function seleziona_scelta() {
    document.getElementById("messaggi").innerText = ""; //scrivo nulla in caso di non pareggio
    io = this.id;
    document.getElementById("la_mia_scelta").src = "foto/" + io + ".png"; //faccio apparire la foto che ho scelto

    avversario = scelte[Math.floor(Math.random() * 3)]; //il pc sceglie a caso un elemento dell'array
    document.getElementById("la_scelta_avversaria").src = "foto/" + avversario + ".png";//faccio apparire la foto che ha scelto

    //controlli su chi vince
    if (io == avversario) {
        document.getElementById("messaggi").innerText = "Pareggio punto a nessuno"; //pareggio
    }
    else if (io == "sasso") {
        if (avversario == "forbici") {
            il_mio_punteggio += 1;//incremento il mio puteggio se vinco
        }
        else {
            il_punteggio_avversario += 1;//incremento il punteggio del pc se vinco
        }
    }
    else if (io == "forbici") {
        if (avversario == "carta") {
            il_mio_punteggio += 1;//incremento il mio puteggio se vinco
        }
        else {
            il_punteggio_avversario += 1;//incremento il punteggio del pc se vinco
        }
    }
    else if (io == "carta") {
        if (avversario == "sasso") {
            il_mio_punteggio += 1;//incremento il mio puteggio se vinco
        }
        else {
            il_punteggio_avversario += 1;//incremento il punteggio del pc se vinco
        }
    }

    document.getElementById("il_mio_punteggio").innerText = il_mio_punteggio; //stampo il mio punteggio aggiornato
    document.getElementById("il_punteggio_avversario").innerText = il_punteggio_avversario; // stampo punteggio avversario aggiornato
}