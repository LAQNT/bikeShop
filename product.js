const apiUrl = `https://striveschool-api.herokuapp.com/api/product/`;
const apiKey = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjJiZjMzYjE1MjAwMTQ3NjE3OWMiLCJpYXQiOjE2ODE0OTY3NDUsImV4cCI6MTY4MjcwNjM0NX0.2GntzF_dTHvDwvFGbPJMbX9PbX19sNEZyX8e_4YFXxw`;


const imgProduct = document.getElementById('img');
const titleProduct = document.getElementById('title');
const descProduct = document.getElementById('description');
const brandProduct = document.getElementById('brand');
const IdProduct = document.getElementById('product-id');
const priceProduct = document.getElementById('price');



async function getProductData() {

    const qsParams = new URLSearchParams(window.location.search);
    const productId = qsParams.get('id')
  
    buildPageTitle(titleProduct)
    
    console.log(apiUrl+productId)
    // --------- load the page just for the id ----------     
      try {
        const response = await fetch(apiUrl + productId,{
            headers: {
                "Authorization": apiKey,
            }
        });
        const product = await response.json();
        console.log(product)
        // ---- set inputs with product info --- 
        imgProduct.setAttribute('src', product.imageUrl);
        titleProduct.innerHTML = product.name
        brandProduct.innerHTML = product.brand
        IdProduct.innerHTML = product._id
        descProduct.innerHTML = product.description
        priceProduct.innerHTML = `€ ${product.price},00`
        
    
      } catch (error) {
        console.log('Error: ', error);
      }
    
  }
getProductData();


function buildPageTitle(productName) {  
    titleProduct.textContent = productName
  }

  function goBackShop() {
    window.location.href = 'index.html'
  }