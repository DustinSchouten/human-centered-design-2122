const keys = {8:'BACKSPACE', 13:'ENTER', 72:'H', 74:'J', 75:'K'};

const aantal_knoppen = document.querySelectorAll('.selectable').length;

let navigator_idx = 1;
document.querySelector('.selectable[data-id="1"]').focus() // Default

window.onkeydown = function(e) {   
    console.log(e.keyCode) 
    document.querySelector('.selectable[data-id="'+navigator_idx+'"]').classList.remove('selected');
    if (keys[e.keyCode] == 'K') {
        if (navigator_idx > 1) {
            navigator_idx -= 1;
            document.querySelector('.selectable[data-id="'+navigator_idx+'"]').focus()
        }
    }
    if (keys[e.keyCode] == 'J') {
        if (navigator_idx < aantal_knoppen) {
            navigator_idx += 1;
            document.querySelector('.selectable[data-id="'+navigator_idx+'"]').focus()
        }
    }
    if (keys[e.keyCode] == 'BACKSPACE') {
        window.location = 'index.html';
    }
    // if (keys[e.keyCode] == 'ENTER' && navigator_idx == 2) {
    //     switch_vertrek_aankomst()
    // }
    if (keys[e.keyCode] == 'ENTER' && navigator_idx > 5) {
        const link_to_navigate = document.querySelector('.selectable[data-id="'+navigator_idx+'"]').href;
        window.location = link_to_navigate;
    }
    document.querySelector('.selectable[data-id="'+navigator_idx+'"]').classList.add('selected');
}


const treinstations_suggesties = ["Alkmaar","Almere Centrum","Amersfoort Centraal","Amsterdam Amstel","Amsterdam Bijlmer ArenA","Amsterdam Centraal","Amsterdam Sloterdijk","Amsterdam Zuid","Arnhem","Breda","Delft","Den Haag Centraal","Den Haag HS","Deventer","Dordrecht","Eindhoven Centraal","Gouda","Groningen","Haarlem","Hilversum","Leeuwarden","Leiden Centraal","Nijmegen","Rotterdam Blaak","Rotterdam Centraal","Schiedam Centrum","Schiphol Airport","Tilburg","Utrecht Centraal","Zaandam","Zwolle","‘s-Hertogenbosch"];
treinstations_suggesties.sort() // Om zeker te weten dat de stations gesorteerd staan
function voeg_treinstation_suggesties_toe(soort) {
    let treinstation_suggesties_element = document.querySelector('#'+soort);
    for (let idx=0; idx<treinstations_suggesties.length; idx++) {
        let option = document.createElement('option');
        option.value = treinstations_suggesties[idx];
        option.textContent = treinstations_suggesties[idx];
        treinstation_suggesties_element.appendChild(option);
    }
}

function switch_vertrek_aankomst() {
    let vertrek_invoer = document.querySelector('#vertrek').value;
    let aankomst_invoer = document.querySelector('#aankomst').value;
    document.querySelector('#vertrek').value = aankomst_invoer;
    document.querySelector('#aankomst').value = vertrek_invoer;
}

function voeg_datum_suggesties_toe() {
    const datum_looper = new Date();
    let datum_suggesties_element = document.querySelector('#datum');
    datum_looper.setDate(datum_looper.getDate() + 2);
    for (let idx=0; idx<5; idx++) {
        datum_looper.setDate(datum_looper.getDate() + 1);
        let option = document.createElement('option');
        let dag = datum_looper.getDate();
        let maand = datum_looper.toLocaleString('nl-NL', { month: 'long' });
        let weekdag = datum_looper.toLocaleDateString('nl-NL', { weekday: 'long' }).substring(0, 2);
        option.value = weekdag + ' ' + dag + ' ' + maand;
        option.textContent = weekdag + ' ' + dag + ' ' + maand;
        datum_suggesties_element.appendChild(option);
    }
}

const current_date = new Date();
function voeg_uren_suggesties_toe() {
    let uren_suggesties_element = document.querySelector('#uren');
    for (let uur_idx=0; uur_idx<24; uur_idx++) {
        let option = document.createElement('option');
        if (uur_idx < 10) {
            uur_idx = '0' + uur_idx;
        }
        if (uur_idx == current_date.getHours()) {
            option.selected = true;
        }
        option.value = uur_idx
        option.textContent = uur_idx;
        uren_suggesties_element.appendChild(option);
    }
}

function voeg_minuten_suggesties_toe() {
    let minuten_suggesties_element = document.querySelector('#minuten');
    for (let minuut_idx=0; minuut_idx<60; minuut_idx++) {
        let option = document.createElement('option');
        if (minuut_idx < 10) {
            minuut_idx = '0' + minuut_idx;
        }
        if (minuut_idx % 15 == 0) {
            if (minuut_idx == Math.floor(current_date.getMinutes()/15)*15){
                option.selected = true
            }
            option.value = minuut_idx;
            option.textContent = minuut_idx;
            minuten_suggesties_element.appendChild(option);
        }
    }
}


// const current_month_idx = current_date.getMonth();
// let current_month_idx_text = current_date.toLocaleString('en-EN', { month: 'long' });
// const first_weekday_of_month = new Date(2022,current_month_idx,1,0,0,0).getDay();
// const current_day = current_date.getDate();
// const current_weekday = current_date.toLocaleDateString('en-EN', { weekday: 'long' });
// const days_amount_in_month = new Date(2022, current_month_idx+1, 0).getDate();
// let hours_value = current_date.getHours();

voeg_treinstation_suggesties_toe('vertrek');
voeg_treinstation_suggesties_toe('aankomst');
voeg_datum_suggesties_toe()
voeg_uren_suggesties_toe()
voeg_minuten_suggesties_toe()