
// Функція завантаження каталогу категорій
function loadCatalog(event) {
    if (event) event.preventDefault(); // Запобігаємо стандартному переходу за посиланням

    // Робимо Ajax-запит до файлу categories.json
    fetch('data/categories.json')
        .then(response => response.json()) // Перетворюємо відповідь у JS-об'єкт
        .then(categories => {
            let html = '<h2 class="mb-4">Каталог товарів</h2><div class="list-group">';
            
            // Проходимо по кожній категорії і створюємо кнопку
            categories.forEach(category => {
                html += `
                    <a href="#" class="list-group-item list-group-item-action" onclick="loadCategoryItems('${category.shortname}', event)">
                        <h5 class="mb-1">${category.name}</h5>
                        <small class="text-muted">${category.notes}</small>
                    </a>`;
            });

            // Додаємо кнопку "Specials" (Випадкова категорія)
            html += `
                <a href="#" class="list-group-item list-group-item-action list-group-item-warning mt-3 fw-bold" onclick="loadSpecials(event)">
                    ⭐ Specials (Випадкова категорія)
                </a>
            </div>`;

            // Вставляємо згенерований HTML у наш головний контейнер
            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => console.error('Помилка завантаження каталогу:', error));
}

// Функція завантаження товарів конкретної категорії
function loadCategoryItems(shortname, event) {
    if (event) event.preventDefault();

    // Робимо запит до відповідного JSON-файлу (наприклад, data/laptops.json)
    fetch(`data/${shortname}.json`)
        .then(response => response.json())
        .then(data => {
            let html = `
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Категорія: <span class="text-primary">${data.categoryName}</span></h2>
                    <button class="btn btn-secondary" onclick="loadCatalog(event)">⬅ Повернутися до каталогу</button>
                </div>
                <div class="row">
            `;

            // Генеруємо картки для кожного товару
            data.items.forEach(item => {
                html += `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 shadow-sm">
                            <img src="${item.image}" class="card-img-top" alt="${item.name}">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">${item.description}</p>
                                <h6 class="text-success">${item.price}</h6>
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
            // Генеруємо випадковий індекс від 0 до кількості категорій
            const randomIndex = Math.floor(Math.random() * categories.length);
            const randomCategory = categories[randomIndex].shortname;
            
            // Викликаємо функцію завантаження товарів з отриманим shortname
            loadCategoryItems(randomCategory);
        })
        .catch(error => console.error('Помилка завантаження Specials:', error));
}
