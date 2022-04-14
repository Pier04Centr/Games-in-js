const carte = document.querySelectorAll('.carte');

var carta_restituita = false;
var pirma_carta, seconda_carta;
var blocco = false;

carte.forEach(carte => {
    carte.addEventListener('click', gira)
})

//Gira le carte a coppie di due e conserva i dati.

function gira(){
    if(!blocco){
        this.childNodes[1].classList.toggle('attivata');

        if(!carta_restituita){

            carta_restituita = true;
            pirma_carta = this;
            return;
        }

        carta_restituita = false;
        seconda_carta = this;
        uguali();
    }
    

}

function uguali(){

    if(pirma_carta.getAttribute('data-attr') === seconda_carta.getAttribute('data-attr')) {

        pirma_carta.removeEventListener('click', gira);
        seconda_carta.removeEventListener('click', gira);

    } else {
        blocco = true;
        setTimeout(() => {

            pirma_carta.childNodes[1].classList.remove('attivata');
            seconda_carta.childNodes[1].classList.remove('attivata');

            blocco = false;
        }, 1000)
    }

}

function posiziona(){
    carte.forEach(card => {
        var posizione_a_caso = Math.floor(Math.random() * 12);
        card.style.order = posizione_a_caso;
    })
}
posiziona();