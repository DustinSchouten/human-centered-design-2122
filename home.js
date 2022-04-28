const keys = {13:'ENTER', 74:'J', 75:'K'};

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
    if (keys[e.keyCode] == 'ENTER') {
        const link_to_navigate = document.querySelector('.selectable[data-id="'+navigator_idx+'"]').href;
        if (navigator_idx == 2) {
            alert('Pagina nog niet gemaakt')
        }
        else {
            window.location = link_to_navigate;
        }
    }
    document.querySelector('.selectable[data-id="'+navigator_idx+'"]').classList.add('selected');
}

let current_time_vertrek = new Date();
current_time_vertrek.setHours(current_time_vertrek.getHours() + 1); // Over 1 uur

let vertrek_in_uren = current_time_vertrek.getHours();
let vertrek_in_minuten = current_time_vertrek.getMinutes();

if (vertrek_in_uren < 10) {
    vertrek_in_uren = '0' + vertrek_in_uren;
}
if (vertrek_in_minuten < 10) {
    vertrek_in_minuten = '0' + vertrek_in_minuten;
}
document.querySelector('#tijd_over_een_uur').textContent = vertrek_in_uren + ':' + vertrek_in_minuten;
