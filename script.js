$(document).ready(function () {
    const categoriesPath = 'categories/';

    // Obtener la lista de categorías (directorios)
    $.ajax({
        url: categoriesPath,
        success: function (categoryList) {
            const categories = categoryList.split('\n').filter(Boolean);

            // Recorrer cada categoría
            categories.forEach(function (category) {
                const categoryPath = categoriesPath + category;

                // Obtener la lista de productos en esta categoría
                $.ajax({
                    url: categoryPath,
                    success: function (productList) {
                        const products = productList.split('\n').filter(Boolean);

                        // Recorrer cada producto
                        products.forEach(function (product) {
                            const productPath = categoryPath + '/' + product;

                            // Cargar y procesar el contenido del archivo .md
                            $.ajax({
                                url: productPath,
                                dataType: 'text',
                                success: function (productData) {
                                    const productInfo = parseProductMarkdown(productData);
                                    createProductCard(productInfo);
                                }
                            });
                        });
                    }
                });
            });
        }
    });

    // Función para analizar el contenido del archivo .md del producto
    function parseProductMarkdown(markdownData) {
        // Analiza el contenido y extrae los datos necesarios (nombre, imagen, descripción, etc.)
        // Retorna un objeto con la información del producto
        // Ejemplo:
        const productData = markdownData.split('---'); // Suponiendo que los datos estén separados por '---'
        const productInfo = {
            name: productData[0].trim(),
            description: productData[1].trim(),
            image: productData[2].trim(),
	    price: productData[3].trim(),
            // Agrega más campos según tus necesidades
        };
        return productInfo;
    }

    // Función para crear una tarjeta de producto en HTML
    function createProductCard(productInfo) {
        // Crea una tarjeta Bootstrap utilizando los datos del producto
        const cardHtml = `
    <div class="col">
		<div class="card text-bg-dark mb-3" style="max-width: 18rem;">
			<div class="card-header">
			<img src="${productInfo.image}" class="card-img-top" alt="${productInfo.name}"/>
			</div>
			<div class="card-body">
				<h5 class="card-title">${productInfo.name}</h5>
				<hr>
				<p class="card-text">${productInfo.description}</p>
				<hr>
				<p class="card-text"><b>Price: </b>${productInfo.price}</p>
				<hr>
				<a href="https://wa.me/573209135899" class="btn btn-primary">Comprar</a>
			</div>
		</div>
		</div>
        `;

        // Agrega la tarjeta al contenedor en index.html
        $('.productos').append(cardHtml);
    }
});
