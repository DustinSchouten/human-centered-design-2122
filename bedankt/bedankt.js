const keys = {8:'BACKSPACE'};

const href = window.location.href.split('?/');
let final_datum = href[1].split('=')[1];
if (final_datum != 'Vandaag' && final_datum != 'Morgen') {
    final_datum = final_datum.replaceAll('%20',' ');
}
const final_vertrek = href[2].split('=')[1].replaceAll('%20',' ').replaceAll('%27',"'");
const final_aankomst = href[3].split('=')[1].replaceAll('%20',' ').replaceAll('%27',"'");
const final_tijd_substring = href[4].split('=')[1].split('%20');

let final_tijd = undefined;
if (final_tijd_substring.length == 3) {
    final_tijd = final_tijd_substring[0] + ' - ' + final_tijd_substring[2];
}
else {
    final_tijd = 'Vertrek: ' + final_tijd_substring[1];
}

document.querySelector('.datum').textContent = final_datum;
document.querySelector('.traject').textContent = final_vertrek + ' - ' + final_aankomst;
document.querySelector('.tijd').textContent = final_tijd;

window.onkeydown = function(e) {    
    if (keys[e.keyCode] == 'BACKSPACE') {
        window.location = '../index.html';
    }
}

const bier_images = ['amstel_bier_img','bavaria_bier_img','grolsch_bier_img','heineken_bier_img','leffe_bier_img','wieckse_bier_img']
class BierBottle {
    constructor() {
        this.position_X = Math.floor(Math.random()*(window.innerWidth-80))
        this.position_Y = Math.floor(Math.random()*-2500 - 500);
        this.valsnelheid = Math.floor(Math.random() * (10 - 7 + 1) + 7) // 10 is max speed, 5 is min speed
    }
}

let bier_list = {}
const aantal_biertjes = 50;

function voegNieuwBiertjeToe(idx) {
    let bier_element = document.createElement('img');
    bier_element.classList.add('bier_bottle');
    bier_element.id = 'bier_' + idx;
    let bier_soort = bier_images[Math.floor(Math.random()*bier_images.length)];
    bier_element.src = '../bier_images/' + bier_soort + '.png';
    document.querySelector('body').appendChild(bier_element)
    bier_list[idx] = new BierBottle;
}

for (let idx=0; idx<aantal_biertjes; idx++) {
    voegNieuwBiertjeToe(idx)
}

function laatBiertjeVallen() {
    for (let idx=0; idx<aantal_biertjes; idx++) {
        let bier_element = document.querySelector('#bier_'+idx);
        let bier = bier_list[idx];
        if (bier_list[idx] != 'none') {
            bier_list[idx].position_Y += bier_list[idx].valsnelheid;
            bier_element.style.top = bier.position_Y + "px";
            bier_element.style.left = bier.position_X + "px";
        }
        if (bier.position_Y > window.innerHeight) {
            bier_list[idx] = 'none';
            bier_element.remove()
        }
    }
}

setInterval(laatBiertjeVallen, 10);
