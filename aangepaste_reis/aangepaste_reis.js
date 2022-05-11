const keys = {8:'BACKSPACE', 13:'ENTER', 74:'J', 75:'K'};
 
const aantal_knoppen = document.querySelectorAll('.selectable').length;
let navigator_idx = 1;

document.querySelector('.selectable[data-id="1"]').focus() // Default

window.addEventListener('mousedown',function(e) {
    if (isNaN(e.target.dataset.id) == false) { // If mouseclick targets on a selectable item;
        document.querySelector('.selectable[data-id="'+navigator_idx+'"]').classList.remove('selected');
        navigator_idx = e.target.dataset.id;
        document.querySelector('.selectable[data-id="'+navigator_idx+'"]').focus()
    }
    document.querySelector('.selectable[data-id="'+navigator_idx+'"]').classList.add('selected');

    if (isNaN(e.target.parentNode.parentNode.dataset.id) == false) { // If mouseclick targets on a selectable item;
        document.querySelector('.selectable[data-id="'+navigator_idx+'"]').classList.remove('selected');
        navigator_idx = e.target.parentNode.parentNode.dataset.id;
        document.querySelector('.selectable[data-id="'+navigator_idx+'"]').focus()
        kies_treinoptie()
    }
    document.querySelector('.selectable[data-id="'+navigator_idx+'"]').classList.add('selected');
})

function kies_treinoptie() {
    let final_datum = document.querySelector('#datum').value;
    let final_vertrek = document.querySelector('#vertrek').value;
    let final_aankomst = document.querySelector('#aankomst').value;
    let final_tijd = document.querySelectorAll('.tijd')[navigator_idx-6].textContent;
    window.location = '../bedankt/bedankt.html?/datum='+final_datum+'?/vertrek='+final_vertrek+'?/aankomst='+final_aankomst+'?/tijd='+final_tijd;
}

window.onkeydown = function(e) {
    document.querySelector('.selectable[data-id="'+navigator_idx+'"]').classList.remove('selected');
    navigator_idx = parseInt(navigator_idx);
    if (keys[e.keyCode] == 'K') {
        if (navigator_idx > 1) {
            navigator_idx -= 1;
            document.querySelector('.selectable[data-id="'+navigator_idx+'"]').focus()
        }
    }
    else if (keys[e.keyCode] == 'J') {
        if (navigator_idx < aantal_knoppen) {
            navigator_idx += 1;
            document.querySelector('.selectable[data-id="'+navigator_idx+'"]').focus()
        }
    }

    if (keys[e.keyCode] == 'BACKSPACE') {
        window.location = '../index.html';
    }

    if (keys[e.keyCode] == 'ENTER' && navigator_idx > 5) {
        kies_treinoptie()
    }

    document.querySelector('.selectable[data-id="'+navigator_idx+'"]').classList.add('selected');

    if (navigator_idx > 5) {
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
}

// const treinstations_suggesties = ["Alkmaar","Almere Centrum","Amersfoort Centraal","Amsterdam Amstel","Amsterdam Bijlmer ArenA","Amsterdam Centraal","Amsterdam Sloterdijk","Amsterdam Zuid","Arnhem Centraal","Breda","Delft","Den Haag Centraal","Den Haag HS","Deventer","Dordrecht","Eindhoven Centraal","Gouda","Groningen","Haarlem","Hilversum","Leeuwarden","Leiden Centraal","Nijmegen","Rotterdam Blaak","Rotterdam Centraal","Schiedam Centrum","Schiphol Airport","Tilburg","Utrecht Centraal","Zaandam","Zwolle","'s-Hertogenbosch"];
const treinstations_suggesties = ["Utrecht Centraal","Amsterdam Centraal","Rotterdam Centraal","Den Haag Centraal","Schiphol Airport","Leiden Centraal","Amsterdam Zuid","Eindhoven Centraal","Amsterdam Sloterdijk","'s-Hertogenbosch","Nijmegen","Arnhem Centraal","Amersfoort Centraal","Haarlem","Zwolle","Delft","Breda","Amsterdam Amstel","Tilburg","Den Haag HS","Amsterdam Bijlmer ArenA","Almere Centrum","Hilversum","Rotterdam Blaak","Gouda","Dordrecht","Schiedam Centrum","Zaandam","Alkmaar","Deventer","Groningen","Leeuwarden"];

function voeg_treinstation_suggesties_toe(soort) {
    let treinstation_suggesties_element = document.querySelector('#'+soort);
    for (let idx=0; idx<treinstations_suggesties.length; idx++) {
        let option = document.createElement('option');
        option.value = treinstations_suggesties[idx];
        option.textContent = treinstations_suggesties[idx];
        if (soort =='vertrek' && treinstations_suggesties[idx] == 'Eindhoven Centraal') {
            option.selected = true;
        }
        if (soort =='aankomst' && treinstations_suggesties[idx] == 'Amsterdam Centraal') {
            option.selected = true;
        }
        treinstation_suggesties_element.appendChild(option);
    }
}

function voeg_datum_suggesties_toe() {
    const datum_looper = new Date();
    let datum_suggesties_element = document.querySelector('#datum');
    datum_looper.setDate(datum_looper.getDate() + 1);
    for (let idx=0; idx<6; idx++) {
        datum_looper.setDate(datum_looper.getDate() + 1);
        let option = document.createElement('option');
        let dag = datum_looper.getDate();
        let maand = datum_looper.toLocaleString('nl-NL', { month: 'long' });
        let weekdag = datum_looper.toLocaleDateString('nl-NL', { weekday: 'long' }).substring(0, 2);
        option.value = weekdag + ' ' + dag + ' ' + maand;
        option.textContent = weekdag + ' ' + dag + ' ' + maand;
        if (idx == 5) {
            option.hidden = true;
        }
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
        if (uur_idx == current_date.getHours() + 1) {
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

voeg_treinstation_suggesties_toe('vertrek');
voeg_treinstation_suggesties_toe('aankomst');
voeg_datum_suggesties_toe()
voeg_uren_suggesties_toe()
voeg_minuten_suggesties_toe()


function updateTreinOpties() {
    let vertrek_value = document.querySelector('#vertrek').value;
    let aankomst_value = document.querySelector('#aankomst').value;
    let datum_value = document.querySelector('#datum').value;
    let uren_value = parseInt(document.querySelector('#uren').value);
    let minuten_value = parseInt(document.querySelector('#minuten').value);
    let treinopties = document.querySelector('.travel_options');
    treinopties.style.display = 'flex';
    treinopties.classList.remove('invisible');

    document.querySelector('.datum_tijd_field').classList.remove('invisible');
    document.querySelector('h1').classList.remove('invisible');
    document.querySelector('img').classList.remove('invisible');
    document.querySelector('.subtitle').classList.remove('invisible');
    document.querySelector('.controls_description').classList.remove('invisible');
    document.querySelector('body').style.backgroundImage = 'url(../heavy_metal_bg.jpg)';

    if (vertrek_value == aankomst_value) {
        treinopties.classList.add('invisible');
        document.querySelector('body').style.backgroundImage = 'url(../bug_found_bg.jpg)';
        document.querySelector('.datum_tijd_field').classList.add('invisible');
        document.querySelector('h1').classList.add('invisible');
        document.querySelector('img').classList.add('invisible');
        document.querySelector('.subtitle').classList.add('invisible');
        document.querySelector('.controls_description').classList.add('invisible');
    }

    for (let idx=0; idx<6; idx++) {
        let treinoptie = document.querySelector('.travel_options').querySelectorAll('div')[idx];
        let traject = treinoptie.querySelector('.traject');
        traject.textContent = vertrek_value + ' - ' + aankomst_value;
        
        let current_time_vertrek = new Date();
        if (idx > 0) {
            minuten_value += 15;
        }
        current_time_vertrek.setHours(uren_value);
        current_time_vertrek.setMinutes(minuten_value);
        uren_value = current_time_vertrek.getHours()
        minuten_value = current_time_vertrek.getMinutes()
        if (uren_value < 10) {
            uren_value = '0' + uren_value;
        }
        if (minuten_value < 10) {
            minuten_value = '0' + minuten_value;
        }

        if (uren_value == 0 && minuten_value == 0 && idx > 0) {
            let options = document.querySelector('#datum').querySelectorAll('option');
            let datum_options_list = []
            for (let option_idx=0; option_idx<options.length; option_idx++) {
                datum_options_list.push(options[option_idx].value)
            }
            console.log(datum_options_list)
            console.log(datum_options_list.indexOf(datum_value));
            console.log(datum_value)
            datum_value = datum_options_list[datum_options_list.indexOf(datum_value)+1];
        }

        let datum = treinoptie.querySelector('.datum');
        datum.textContent = datum_value;
        

        let tijd = treinoptie.querySelector('.tijd');
        tijd.textContent = 'Vertrek: ' + uren_value + ':' + minuten_value;
    };
}

for (let idx=0; idx<5; idx++) {
    document.querySelectorAll('.selectable')[idx].addEventListener('change',function(e) {
        updateTreinOpties()
    });
};
updateTreinOpties() // Als de pagina geladen wordt;