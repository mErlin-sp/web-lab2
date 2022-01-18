window.onload = function () {

    // Завдання 1

    let third = document.getElementById('third')
    let sixth = document.getElementById('sixth')

    let third_content = third.innerHTML
    third.innerHTML = sixth.innerHTML
    sixth.innerHTML = third_content

    // Завдання 2

    let task1 = document.getElementById('task2')
    let a = 10, b = 10, h = 5

    function calculate_trapezium_area(a, b, h) {
        let area = 0.5 * h * (a + b)
        task1.innerHTML = `Task 2: Trapezium with a = ${a}, b = ${b}, h = ${h} area = ${area}`
    }

    calculate_trapezium_area(a, b, h)

    // Завдвння 3

    let task3_cookie = getCookie('task3')

    if (task3_cookie !== '') {
        if (!confirm(`This is saved cookie for task3: ${task3_cookie}. Do you need to keep it?`)) {
            task3_cookie = ''
            setCookie('task3', task3_cookie, 14)
        } else {
            document.getElementById('task3').style.display = 'none'
        }
    }

    if (task3_cookie === '') {
        document.getElementById('task3_send').onclick = function () {
            let result = printDivisors(document.getElementById('task3_input').value)
            setCookie('task3', result, 14)
        }
    }

    function printDivisors(n) {
        let result_str = ''
        for (let i = 1; i * i < n; i++) {
            if (n % i === 0)
                result_str += (i + ' ');
        }
        for (let i = Math.sqrt(n); i >= 1; i--) {
            if (n % i === 0)
                result_str += (' ' + n / i);
        }
        console.log(n + '  ' + result_str)
        alert('Calculated divisors for number ' + n + ': ' + result_str)
        return result_str
    }

    // Завдання 4

    let fourth_normal = document.getElementById('fourth_normal')
    let fourth_camel = document.getElementById('fourth_camelcase')

    let task4_radio1 = document.getElementById('task4_radio1')
    let task4_radio2 = document.getElementById('task4_radio2')

    let task4_cookie = getCookie('task4')

    if (task4_cookie === '') {
        task4_radio1.checked = 'true'
        fourth_normal.style.display = 'inline'
        fourth_camel.style.display = 'none'
    } else {
        task4_radio2.checked = 'true'
        fourth_normal.style.display = 'none'
        fourth_camel.style.display = 'inline'
    }

    task4_radio1.onchange = task4_event
    task4_radio2.onchange = task4_event

    function task4_event() {
        if (task4_radio1.checked) {
            setCookie('task4', '', 14)
            fourth_normal.style.display = 'inline'
            fourth_camel.style.display = 'nine'
        } else {
            setCookie('task4', 'camel')
            fourth_normal.style.display = 'none'
            fourth_camel.style.display = 'inline'
        }
    }

    // Завдання 5

    let block_x = document.getElementById('x_block')

    block_x.onclick = function () {
        not_saved_images.push(getRandomImage())
        update_images()
    }

    update_images()
}


let saved_images = JSON.parse(localStorage.getItem('saved_images'))
if (saved_images === null) {
    saved_images = []
    localStorage.setItem('saved_images', saved_images)
}
let not_saved_images = []

function update_images() {
    localStorage.setItem('saved_images', JSON.stringify(saved_images))

    let saved_images_block = document.getElementById('saved_images')
    let not_saved_images_block = document.getElementById('not_saved_images')

    let html = ''

    saved_images.forEach(function (image) {
        html += `<div style="display: flex;flex-direction: column; margin: 10px"> <img src="${image}" alt=""> <input type="button" value="Delete image" onClick="remove_image('${image}')"> </div>`
    })
    saved_images_block.innerHTML = html

    html = ''

    not_saved_images.forEach(function (image) {
        html += `<div style="display: flex;flex-direction: column; margin: 10px; width: 300px;"> <img src="${image}" alt=""> <input type="button" value="Save image" width="200px" height="300px" onClick="save_image('${image}')"> </div>`
    })
    not_saved_images_block.innerHTML = html
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}


function getCookie(cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function getRandomImage() {
    const seed = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    return 'https://picsum.photos/seed/' + seed + '/200/300';
}

function save_image(image) {
    not_saved_images = not_saved_images.filter(item => item !== image)
    saved_images.push(image)
    update_images()
}

function remove_image(image) {
    saved_images = saved_images.filter(item => item !== image)
    not_saved_images.push(image)
    update_images()
}



