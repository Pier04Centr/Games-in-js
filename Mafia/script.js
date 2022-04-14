//VARIABILI ESSENZIALI
const partita = document.querySelector("#partita");

var livello_di_vita = 100;

//I NEMICI SONO VIVI
function i_nemici_vivono() {
	return document.querySelectorAll(".mafioso:not(.morto)");
}


// IL MAFIOSO MI SPARA
function i_mafiosi_mi_sparano(mafioso) {
	if(mafioso) {
		mafioso.classList.add("mostra");
		setTimeout(function() {
			if(!mafioso.classList.contains("morto")) {
				mafioso.classList.add("sparando");
				partita.classList.add("mafiososparando");
				aggiorna_punti_vita(livello_di_vita-20);
				setTimeout(function() {
					mafioso.classList.remove("sparando");
					partita.classList.remove("mafiososparando");
					setTimeout(function() {
						mafioso.classList.remove("mostra");
					}, 150);
				}, 500);
			}
		}, 800);
	}
}

// SORPRESA
function mafiosi_random() {

	if(livello_di_vita > 0) {

		if(i_nemici_vivono()) {
			var randommafioso = Math.floor(Math.random() * i_nemici_vivono().length);
			var randomDelay = Math.floor(Math.random() * 2000) + 1000;

			setTimeout(function() {
				if(livello_di_vita > 0) {
					i_mafiosi_mi_sparano(i_nemici_vivono()[randommafioso]);
					mafiosi_random();					
				}
			}, randomDelay);
		}

	}

}


// DANNI E MORTE
function aggiorna_punti_vita(quanto) {
	livello_di_vita = quanto;
	if(livello_di_vita < 1) {
		livello_di_vita = 0;
		setTimeout(function() {
			if(i_nemici_vivono().length) {
				partita.classList.add("playermorto");
			}
		}, 500);
	}
	document.getElementById("vita").style.width = livello_di_vita+"%";
}


// SPARO AI NEMICI
function sparo(mafioso) {

	/* Conseguenze sui nemici */
	mafioso.classList.remove("sparando");
	mafioso.classList.add("morto");				

	/* Vittoria! */
	if(!i_nemici_vivono().length) {
		setTimeout(function() {
			partita.classList.add("player_vincitore");
		}, 300);
	}
}

// EFFETTI VISIVI QUANDO SPARO
function effetti_quando_sparo() {
	partita.classList.add("playersparando");
	setTimeout(function() {
		partita.classList.remove("playersparando");
	}, 150);
}


// PREPARARE IL GIOCO
function Nuova_Partita() {

	document.querySelectorAll(".mafioso").forEach(mafioso => {
		mafioso.classList = ["mafioso"];			
	});

	aggiorna_punti_vita(100);
	partita.classList = [];

	setTimeout(function() {
		mafiosi_random();
	}, 3000);

}


i_nemici_vivono().forEach(mafioso => {

	mafioso.addEventListener("click", function() {
		sparo(mafioso);
	});

});