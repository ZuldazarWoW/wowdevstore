// Función para cargar las categorías
function loadCategories() {
    const categoryList = document.getElementById('category-list');
    // Recorre las carpetas en el directorio "category" y agrega las categorías de forma automática
    fetchCategories().then(categories => {
        categories.forEach(category => {
            const categoryLink = document.createElement('li');
            categoryLink.innerHTML = `<a class="nav-link" href="#${category}">${category}</a>`;
            categoryList.appendChild(categoryLink);
        });
    });
}

// Función para cargar productos de una categoría
function loadProducts(category) {
    // Carga los productos desde los archivos Markdown de la categoría
    fetchProducts(category).then(products => {
        displayProducts(products);
    });
}

// Función para mostrar productos en la página principal
function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = `
            <div class="col-md-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}" style="width: 100%;">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Precio: $${product.price}</p>
                        <a href="#${product.id}" class="btn btn-primary">Ver Más</a>
                    </div>
                </div>
            </div>
        `;

        productsContainer.innerHTML += productCard;
    });
}

// Cargar categorías y productos al cargar la página
window.addEventListener('load', () => {
    loadCategories();
});
