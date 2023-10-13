// Obtén el parámetro "category" y "product" de la URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const productIndex = urlParams.get("product");

// Lista de categorías y sus nombres
const categories = {
    themes: "Themes",
    modules: "Modules",
    // Agrega más categorías según sea necesario
};

// Función para cargar productos basados en la categoría
function loadProducts(category) {
    // Carga las tarjetas de productos de la categoría
    $.getJSON(`categories/${category}.json`, function (data) {
        const categoryTitle = categories[category] || "Categoría Desconocida";
        $("#category-title").text(categoryTitle);
        const productCardsContainer = $("#product-cards");

        data.products.forEach((product, index) => {
            const card = `
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text">Precio: ${product.price}</p>
                            <a class="btn btn-primary" href="categories.html?category=${category}&product=${index}">Ver más</a>
                        </div>
                    </div>
                </div>
            `;
            productCardsContainer.append(card);
        });
    });
}

// Función para mostrar detalles de un producto
function showProductDetails(index, category) {
    // Cargar el producto desde un archivo separado
    $.getJSON(`categories/${category}/${index}.json`, function (product) {
        const modal = `
            <div class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${product.title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img src="${product.image}" class="img-fluid" alt="${product.title}">
                            <p>${product.description}</p>
                            <p>Precio: ${product.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $(modal).modal("show");
    });
}

// Cargar enlaces a las categorías en la página de inicio
$(document).ready(function () {
    const categoryLinksContainer = $("#category-links");

    for (const cat in categories) {
        categoryLinksContainer.append(`<a class="btn btn-primary mr-2" href="categories.html?category=${cat}">${categories[cat]}</a>`);
    }

    if (category) {
        if (productIndex) {
            showProductDetails(productIndex, category);
        } else {
            loadProducts(category);
        }
    } else {
        // Si no hay categoría en la URL, carga todos los productos en la página de inicio
        for (const cat in categories) {
            loadProducts(cat);
        }
    }
});