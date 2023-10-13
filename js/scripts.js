$(document).ready(function () {
    // Obtén el parámetro "category" de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const productToDisplay = urlParams.get("product");

    // Lista de categorías y sus nombres (actualiza con tus propias categorías)
    const categories = {
        themes: "Themes",
        modules: "Modules"
        // Agrega más categorías según sea necesario
    };

    // Función para cargar productos basados en la categoría
    function loadProducts(category) {
        const categoryTitle = categories[category] || "Categoría Desconocida";
        $("#category-title").text(categoryTitle);
        const productCardsContainer = $("#product-cards");

        // Cargar la lista de productos de la categoría
        $.ajax({
            url: `categories/${category}`,
            success: function (data) {
                // Recorre los archivos .md en la carpeta de la categoría
                $(data).find("a:contains(.md)").each(function () {
                    const productFile = $(this).attr("href");
                    $.ajax({
                        url: `categories/${category}/${productFile}`,
                        success: function (productData) {
                            const product = parseProductData(productData);
                            const card = `
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                                        <div class="card-body">
                                            <h5 class="card-title">${product.title}</h5>
                                            <p class="card-text">Precio: ${product.price}</p>
                                            <a class="btn btn-primary" href="product.html?category=${category}&product=${productFile}">Ver más</a>
                                        </div>
                                    </div>
                                </div>
                            `;
                            productCardsContainer.append(card);
                        }
                    });
                });
            }
        });
    }

    // Función para cargar un solo producto en detalle
    function loadProductDetail(category, productFile) {
        $.ajax({
            url: `categories/${category}/${productFile}`,
            success: function (productData) {
                const product = parseProductData(productData);
                // Mostrar los detalles del producto en la página
                // Esto debe implementarse en product.html
            }
        });
    }

    // Función para analizar los datos del producto desde el archivo .md
    function parseProductData(data) {
        const metadata = data.match(/---([\s\S]*?)---/)[1];
        const content = data.split(/---([\s\S]*?)---/)[2].trim();
        const product = {};
        metadata.split("\n").forEach(function (item) {
            const parts = item.split(":");
            const key = parts[0].trim();
            const value = parts[1].trim();
            product[key] = value;
        });
        product.description = content;
        return product;
    }

    // Cargar enlaces a las categorías en la barra de navegación
    const categoryLinksContainer = $("#category-links");
    for (const cat in categories) {
        categoryLinksContainer.append(`<a class="btn btn-primary mr-2" href="categories.html?category=${cat}">${categories[cat]}</a>`);
    }

    if (category) {
        // Si se proporciona un producto específico, cargar solo ese producto
        if (productToDisplay) {
            loadProductDetail(category, productToDisplay);
        } else {
            loadProducts(category);
        }
    }
});
