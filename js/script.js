// Функція завантаження каталогу категорій
function loadCatalog(event) {
    if (event) event.preventDefault();

    fetch('data/categories.json')
        .then(response => response.json())
        .then(categories => {
            // Додав кнопку "На головну" та прибрав стандартні кольори
            let html = `
                <div class="w-100 d-flex justify-content-start mb-3">
                    <a href="index.html" class="btn hero-btn btn-sm">🏠 На головну</a>
                </div>
                <h2>Каталог товарів</h2>
                <div class="list-group">`;
            
            categories.forEach(category => {
                // Прибрав text-muted, бо він робив текст сірим і нечитабельним на темному
                html += `
                    <a href="#" class="list-group-item list-group-item-action" onclick="loadCategoryItems('${category.shortname}', event)">
                        <h5 class="mb-1">${category.name}</h5>
                        <p>${category.notes}</p>
                    </a>`;
            });

            html += `
                <a href="#" class="list-group-item list-group-item-action list-group-item-warning mt-3" onclick="loadSpecials(event)">
                    ⭐ Specials (Випадкова категорія)
                </a>
            </div>`;

            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => console.error('Помилка завантаження каталогу:', error));
}

// Функція завантаження товарів конкретної категорії
function loadCategoryItems(shortname, event) {
    if (event) event.preventDefault();

    fetch(`data/${shortname}.json`)
        .then(response => response.json())
        .then(data => {
            // Стилізував кнопку повернення та заголовок категорії
            let html = `
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 w-100">
                    <h2 class="text-light mb-3 mb-md-0">Категорія: <span style="color: #00c6ff;">${data.categoryName}</span></h2>
                    <button class="btn hero-btn" onclick="loadCatalog(event)">⬅ Повернутися до каталогу</button>
                </div>
                <div class="row w-100">
            `;

            data.items.forEach(item => {
                // Замінив h6 text-success на div class="price", щоб працював наш CSS
                html += `
                    <div class="col-md-4 mb-4">
                        <div class="card shadow-sm product-card">
                            <img src="${item.image}" class="card-img-top" alt="${item.name}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text flex-grow-1">${item.description}</p>
                                <div class="price">${item.price}</div>
                            </div>
                        </div>
                    </div>`;
            });

            html += '</div>';
            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => console.error('Помилка завантаження товарів:', error));
}

// Функція випадкового вибору категорії (Specials)
function loadSpecials(event) {
    if (event) event.preventDefault();

    fetch('data/categories.json')
        .then(response => response.json())
        .then(categories => {
            const randomIndex = Math.floor(Math.random() * categories.length);
            const randomCategory = categories[randomIndex].shortname;
            loadCategoryItems(randomCategory);
        })
        .catch(error => console.error('Помилка завантаження Specials:', error));
}
