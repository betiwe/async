let xhr = new XMLHttpRequest();
let items = document.getElementById('items');
let loader = document.getElementById('loader');
let arr = [];
let fromLocalStorage = localStorage.getItem('preloader');

if (fromLocalStorage !== null) {
    let itemStorage = JSON.parse(fromLocalStorage);

    renderAnswer(itemStorage);

    xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
    xhr.send();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            itemStorage = JSON.parse(xhr.responseText);

            renderAnswer(itemStorage);

            localStorage.setItem('preloader', xhr.responseText);
        }    
    });

} else {
    xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
    xhr.send();
    
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            let itemStorage = JSON.parse(xhr.responseText);
            
            renderAnswer(itemStorage);

            localStorage.setItem('preloader', xhr.responseText);
        }    
    });
}

function renderAnswer(itemStorage) {
    for (let valute in itemStorage.response.Valute) {
        arr.push(itemStorage.response.Valute[valute]);
    }

    let codeValute = arr.map(el => `
        <div class="item">
            <div class="item__code">
                ${el.CharCode}
            </div>
            <div class="item__value">
                ${el.Value}
            </div>
            <div class="item__currency">
                руб.
            </div>
        </div>
    `);

    items.innerHTML = codeValute.join('');
    arr = [];
    loader.classList.remove('loader_active');
}