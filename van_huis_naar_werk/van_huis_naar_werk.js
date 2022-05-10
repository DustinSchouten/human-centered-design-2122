const keys = {8:'BACKSPACE', 13:'ENTER', 74:'J', 75:'K'};

const aantal_knoppen = document.querySelectorAll('.selectable').length;
let navigator_idx = 1;

document.querySelector('.selectable[data-id="1"]').focus() // Default

window.addEventListener('mousedown',function(e) {
    if (isNaN(e.target.parentNode.parentNode.dataset.id) == false) { // If mouseclick targets on a selectable item;
        document.querySelector('.selectable[data-id="'+navigator_idx+'"]').classList.remove('selected');
        navigator_idx = e.target.parentNode.parentNode.dataset.id;
        document.querySelector('.selectable[data-id="'+navigator_idx+'"]').focus()
        kies_treinoptie()
    }
    document.querySelector('.selectable[data-id="'+navigator_idx+'"]').classList.add('selected');
})

function kies_treinoptie() {
    let final_datum = 'Morgen';
    let final_vertrek = 'Eindhoven Centraal';
    let final_aankomst = 'Amsterdam Centraal';
    let final_tijd = document.querySelectorAll('.tijd')[navigator_idx-1].textContent;
    window.location = '../bedankt/bedankt.html?/datum='+final_datum+'?/vertrek='+final_vertrek+'?/aankomst='+final_aankomst+'?/tijd='+final_tijd;
}

window.onkeydown = function(e) {    
    document.querySelector('.selectable[data-id="'+navigator_idx+'"]').classList.remove('selected');
    if (keys[e.keyCode] == 'K') {
        if (navigator_idx > 1) {
            navigator_idx -= 1;
        }
    }
    if (keys[e.keyCode] == 'J') {
        if (navigator_idx < aantal_knoppen) {
            navigator_idx += 1;
        }
    }
    if (keys[e.keyCode] == 'BACKSPACE') {
        window.location = '../index.html';
    }
    if (keys[e.keyCode] == 'ENTER') {
        kies_treinoptie()
    }
    document.querySelector('.selectable[data-id="'+navigator_idx+'"]').classList.add('selected');
    
    if (typeof(window.scrollY) != 'undefined') { // Check for support
        window.scroll({
            top: document.querySelector('.selectable[data-id="'+navigator_idx+'"]').getBoundingClientRect().top + window.scrollY - 225,
            behavior: 'smooth'
        });
    }
    else {
        window.scrollTo({ top: document.querySelector('.selectable[data-id="'+navigator_idx+'"]').offsetTop - 225, behavior: 'smooth'});
    }
}

let current_time_vertrek = new Date();
current_time_vertrek.setDate(current_time_vertrek.getDate() + 1); // Morgen is 1 dag later
current_time_vertrek.setHours(8);
current_time_vertrek.setMinutes(0);

let current_time_aankomst = new Date();
current_time_aankomst.setDate(current_time_vertrek.getDate() + 1);
current_time_aankomst.setHours(8);
current_time_aankomst.setMinutes(80); // Aankomst is 80 minuten later

for (let idx=0; idx<6; idx++) {
    if (idx > 0) {
        current_time_vertrek.setMinutes(current_time_vertrek.getMinutes() + 15);
        current_time_aankomst.setMinutes(current_time_aankomst.getMinutes() + 15);
    }
   
    let vertrek_in_uren = current_time_vertrek.getHours();
    let vertrek_in_minuten = current_time_vertrek.getMinutes();
    let aankomst_in_uren = current_time_aankomst.getHours();
    let aankomst_in_minuten = current_time_aankomst.getMinutes();

    if (vertrek_in_uren < 10) {
        vertrek_in_uren = '0' + vertrek_in_uren;
    }
    if (vertrek_in_minuten < 10) {
        vertrek_in_minuten = '0' + vertrek_in_minuten;
    }
    if (aankomst_in_uren < 10) {
        aankomst_in_uren = '0' + aankomst_in_uren;
    }
    if (aankomst_in_minuten < 10) {
        aankomst_in_minuten = '0' + aankomst_in_minuten;
    }
    let reisoptie_element = document.querySelectorAll('.button')[idx];
    reisoptie_element.querySelector('.tijd').textContent = vertrek_in_uren + ':' + vertrek_in_minuten + ' - ' + aankomst_in_uren + ':' + aankomst_in_minuten;
}
