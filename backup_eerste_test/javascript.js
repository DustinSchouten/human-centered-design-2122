window.onload = () => {
    const current_date = new Date();
    const current_month_idx = current_date.getMonth();
    let current_month_idx_text = current_date.toLocaleString('en-EN', { month: 'long' });
    document.querySelector('#months_text').textContent = current_month_idx_text;
    const first_weekday_of_month = new Date(2022,current_month_idx,1,0,0,0).getDay();
    const current_day = current_date.getDate();
    // const current_weekday = current_date.toLocaleDateString('en-EN', { weekday: 'long' });
    const days_amount_in_month = new Date(2022, current_month_idx+1, 0).getDate();
    generate_date_picker()

    let hours_value = current_date.getHours();
    let minutes_value = current_date.getMinutes();
    update_timer()

    document.querySelector('#previous_month').addEventListener('click',previous_month)
    document.querySelector('#next_month').addEventListener('click',next_month)
    document.querySelector('#hours_up').addEventListener('click',hours_up)
    document.querySelector('#hours_down').addEventListener('click',hours_down)
    document.querySelector('#minutes_up').addEventListener('click',minutes_up)
    document.querySelector('#minutes_down').addEventListener('click',minutes_down)
   
    function generate_date_picker() {
        let html_text = '<tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr>';
        let table_element = document.querySelector('#date_picker');
        table_element.innerHTML = ''
        for (let week_idx=-1; week_idx<6; week_idx++) {
            html_text += '<tr>';
            for (let idx=1; idx<8; idx++) {
                let day_idx = idx+(7*week_idx)-first_weekday_of_month+1;
                if (day_idx > 0 && day_idx < days_amount_in_month+1) {
                    if (day_idx == current_day) {
                        html_text += '<td><input type="radio" id="date_'+day_idx+'" name="date" value='+day_idx+' checked><label for=date_'+day_idx+'>'+day_idx+'</label></td>';
                    }
                    else {
                        html_text += '<td><input type="radio" id="date_'+day_idx+'" name="date" value='+day_idx+'><label for=date_'+day_idx+'>'+day_idx+'</label></td>';
                    }
                }
                else {
                    html_text += '<td class="empty"></td>';
                }
            }
            html_text += '</tr>';
        }
        table_element.insertAdjacentHTML('afterbegin',html_text);

        for (let week_idx=0; week_idx<8; week_idx++) {
            if (document.querySelectorAll('tr')[week_idx].querySelectorAll('.empty').length == 7) {
                document.querySelectorAll('tr')[week_idx].style.display = 'none';
            }
        }
    }

    function update_timer() {
        let hours_element = document.querySelector('#hours_number');
        let minutes_element = document.querySelector('#minutes_number');
       
        hours_element.textContent = hours_value;
        minutes_element.textContent = minutes_value;
        if (hours_value < 10) {
            hours_element.textContent = '0' + hours_value;
        }
        if (minutes_value < 10) {
            minutes_element.textContent = '0' + minutes_value;
        }
    }

    function set_hours_value(value) {
        if (value == 'up' && hours_value < 24) {
            hours_value += 1;
        }
        else if (value == 'down' && hours_value > 0) {
            hours_value -= 1;
        }
        update_timer()
    }

    function set_minutes_value(value) {
        if (value == 'up') {
            minutes_value += 1;
            if (minutes_value == 60) {
                hours_value += 1;
                minutes_value = 0;
            }
        }
        else if (value == 'down') {
            minutes_value -= 1;
            if (minutes_value < 0) {
                hours_value -= 1;
                minutes_value = 59;
            }
        }
        update_timer()
    }

    function previous_month() {
        alert('werkt nog niet :)')
    }

    function next_month() {
        alert('werkt nog niet :)')
    }

    function hours_up() {
        set_hours_value('up')
    }
    
    function hours_down() {
        set_hours_value('down')
    }

    function minutes_up() {
        set_minutes_value('up')
    }

    function minutes_down() {
        set_minutes_value('down')
    }
}