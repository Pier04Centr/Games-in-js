const giochi = ["Mafia", "Slot", "Tris", "Sasso carta forbice" , "Snake", "Ricorda la carta"];
const aiuto = ["help", "h"];
const lista = ["ls", "dir"];
var pul = true;
var lung = giochi.length;
function invio() {
    if (pul == false) {
        var input = document.getElementById("input").value;
        document.getElementById("video").innerText += "> " + input + "\n";
        document.getElementById("input").value = "";
        if (lista.includes(input)) {
            document.getElementById("video").innerText += "I giochi a disposizione sono\n";
            for (var i = 0; i < lung; i++) {
                document.getElementById("video").innerText += "- " + giochi[i] + "\n";
            }
        } else if (aiuto.includes(input)) {
            document.getElementById("video").innerText += "Lancia il comando 'dir' o 'ls' per avere la lista dei giochi\n";
        } else if (input == "clear") {
            document.getElementById("video").innerText = "";
            pul = true;
            pulito();
        } else if (giochi.includes(input.charAt(0).toUpperCase() + input.slice(1).toLowerCase())) {
            document.getElementById("video").innerText += "Sto preparando il gioco \n";
            window.open("../" + input + "/index.html");
        } else if (input != "") {
            document.getElementById("video").innerText += "'" + input + "' non è riconosciuto come comando interno o esterno \n";
        }
    }

}

pulito();
function pulito() {
    if (pul == true) {
        document.getElementById("video").innerText += "Ciao io sono il tuo assistente personale\n";
        pul = false;
    }
}

document.addEventListener("keydown", e => {
    if (e.key == "Enter") {
        invio();
    }
})