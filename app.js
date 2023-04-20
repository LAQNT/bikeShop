const apiUrl = `https://striveschool-api.herokuapp.com/api/product/`;
const apiKey = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjJiZjMzYjE1MjAwMTQ3NjE3OWMiLCJpYXQiOjE2ODE0OTY3NDUsImV4cCI6MTY4MjcwNjM0NX0.2GntzF_dTHvDwvFGbPJMbX9PbX19sNEZyX8e_4YFXxw`;


async function getData() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Authorization": apiKey
            }
            })
            
        const data = await response.json();
        console.log(data);

        let spinner = document.querySelector('.spinner');
        spinner.classList.add('hide');  
        
        return data;    

    } catch (error) {
        console.log(error)      
    }
}
getData()


async function generateShop (){
    let productsData = await getData();

    let shopContainer = document.getElementById('shop');

    return (shopContainer.innerHTML = productsData.map((product) => {
        let {_id, name, description, brand, imageUrl, price} = product;
        
        return `
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 gy-4">
            <div class="card" onclick="openProduct('${_id}')">
                    
                    <div class="img-container p-4">
                        <img src="${imageUrl}" class="card-img-top"  alt="">
                    </div>

                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${description}</p>
                        <p class="card-text"><span>Brand: </span>${brand}</p>
                        <p class="card-text asin"><span>Product id: </span>${_id}</p>

                        <div class="price-buttons">
                            <span class="book-price">€ ${price}</span>
                            <div>
                                 <button class="btn btn-outline-success     add-button button-circle" onclick= addToCart("$ {book.asin}") id="addToCart">
                                    <i class="bi bi-cart-plus"      id="cart-icon"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div> 
            </div> 
             `;

    }).join(""));

}
generateShop ();


async function openProduct(productId) {
    let productsData = await getData();
    window.location.href = `product.html?id=${productId}`;
}

function goBackOffice() {
    window.location.href = 'backOffice.html'
  }