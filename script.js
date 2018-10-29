window.addEventListener('DOMContentLoaded', function(){
console.log("sdasd");
'use strict';

let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent');

function hideTabContent(a) {
    for (let i = a; i< tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
    }
}

hideTabContent(1);

function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');  
    }
}

info.addEventListener('click', function(event) {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {
        for ( let i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                hideTabContent(0);
                showTabContent(i);
                break;
            }
        }
    }
});

let deadline = '2018-11-20';

function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

    return {
        'total' : t,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds
    };
}

function setClock(id, endtime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
        let t = getTimeRemaining(endtime);
        if (t.total <= 0) {
            clearInterval(timeInterval);
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
        } else {
            if (t.hours.toString().length == 1){
                hours.textContent = '0' + t.hours;
            } else {
                hours.textContent = t.hours;
            }
            if (t.minutes.toString().length == 1){
                minutes.textContent = '0' + t.minutes;
            } else {
                minutes.textContent = t.minutes;
            }if (t.seconds.toString().length == 1){
                seconds.textContent = '0' + t.seconds;
            } else {
                seconds.textContent = t.seconds;
            }
        }
    }
}

setClock('timer', deadline);

//окно узнать больше

let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close'),
    more2 = document.querySelectorAll('.description-btn'),
    mas = [],
    n = more2.length + 1;
    for (let i = 0; i < n; i++) {
        mas[i] = more2[i];    
    }
    mas[n-1] = more;
    mas.forEach(function(elem) {
        elem.addEventListener('click', function (){
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    });

    close.addEventListener('click', function (){
        overlay.style.display = 'none';
        this.classList.remove('more-splash');
        document.body.style.overflow = '';
    });


//Form

let message = {
    loading: 'Ждите, идет загрузка',
    success: 'Спасибо! скоро с вами свяжемся!',
    failure: 'Что-то пошло не так...'
};

let form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');

    statusMessage.classList.add('status');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.appendChild(statusMessage);

    let request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader ('Content-Type', 'application/json; charset=utf-8');
    let formData = new FormData(form);

    let obj = {};
    formData.forEach(function(value, key){
        obj[key] = value;
    });
    let json = JSON.stringify(obj);

    request.send(json);

    request.addEventListener('readystatechange', function() {
        if (request.readyState < 4) {
            statusMessage.innerHTML = message.loading; 
        } else if ( request.readyState === 4 && request.status == 200) {
            statusMessage.innerHTML = message.success; 
        } else {
            statusMessage.innerHTML = message.failure; 
        }
    });

        for ( let i = 0; i< input.length; i++) {
            input[i].value = '';
        }
});

let sv = document.getElementById('form'),
    inputmail = sv.getElementsByTagName('input')[0],
    inputphone = sv.getElementsByTagName('input')[1],
    btn = sv.getElementsByTagName('button')[0],
    statusMes = document.createElement('div');

btn.addEventListener('click', function(event) {
    event.preventDefault();
    sv.appendChild(statusMes);
    
    let request2 = new XMLHttpRequest();
    
    request2.open('POST', 'server.php');
    request2.setRequestHeader ('Content-Type', 'application/json; charset=utf-8');
    let formData2 = new FormData(sv);
    
    let obj2 = {};
    formData2.forEach(function(value, key){
    obj2[key] = value;
    });
    let json = JSON.stringify(obj2);
    
    request2.send(json);
    
    request2.addEventListener('readystatechange', function() {
    if (request2.readyState < 4) {
        statusMes.innerHTML = message.loading; 
    } else if ( request2.readyState === 4 && request2.status == 200) {
        statusMes.innerHTML = message.success; 
    } else {
        statusMes.innerHTML = message.failure; 
    }
    });
})


});
