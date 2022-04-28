const keys = {8:'BACKSPACE', 13:'ENTER', 74:'J', 75:'K'};

const aantal_knoppen = document.querySelectorAll('.selectable').length;
let navigator_idx = 1;

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
        window.location = 'index.html';
    }
    if (keys[e.keyCode] == 'ENTER') {
        const link_to_navigate = document.querySelector('.selectable[data-id="'+navigator_idx+'"]').href;
        window.location = link_to_navigate;
    }
    document.querySelector('.selectable[data-id="'+navigator_idx+'"]').classList.add('selected');
}

let current_time_vertrek = new Date();
current_time_vertrek.setDate(current_time_vertrek.getDate() + 1); // Morgen is 1 dag later
current_time_vertrek.setHours(8);
current_time_vertrek.setMinutes(0);

let current_time_aankomst = new Date();
current_time_aankomst.setDate(current_time_vertrek.getDate() + 1);
current_time_aankomst.setHours(8);
current_time_aankomst.setMinutes(80); // Aankomst is 80 minuten later

for (let idx=0; idx<3; idx++) {
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
