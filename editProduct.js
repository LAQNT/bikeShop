const apiUrl = `https://striveschool-api.herokuapp.com/api/product/`;
const apiKey = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjJiZjMzYjE1MjAwMTQ3NjE3OWMiLCJpYXQiOjE2ODE0OTY3NDUsImV4cCI6MTY4MjcwNjM0NX0.2GntzF_dTHvDwvFGbPJMbX9PbX19sNEZyX8e_4YFXxw`;

const form = document.getElementById('user-form')

const nameInput = document.getElementById('name');
const descInput = document.getElementById('description');
const brandInput = document.getElementById('brand');
const imgUrlInput = document.getElementById('img-url');
const priceInput = document.getElementById('price');
// ----------------------------------------------------------

function goBack() {
    window.location.href = 'backOffice.html'
}


function buildPageTitle(productId) {
    const pageTitle = document.getElementById('page-title')
    pageTitle.textContent =`Edit product n° ${productId}`
  }


async function getProductData() {

    const qsParams = new URLSearchParams(window.location.search);
    const productId = qsParams.get('id')
  
    buildPageTitle(productId)
    
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
        nameInput.value = product.name
        descInput.value = product.description
        brandInput.value = product.brand
        imgUrlInput.value = product.imageUrl
        priceInput.value = product.price
        
    
      } catch (error) {
        console.log('Error: ', error);
      }
    
  }
  getProductData();



form.addEventListener('submit', async (event) => {

    event.preventDefault();
    event.stopImmediatePropagation();

    
    // const isFormValid = handleFormValidation()
    // if(!isFormValid) return
    const qsParams = new URLSearchParams(window.location.search);
    const productId = qsParams.get('id')
  
    const product = {
      name: nameInput.value,
      description: descInput.value,
      brand: brandInput.value,
      imageUrl: imgUrlInput.value,
      price: priceInput.value      
    }

  
    try {        
        const response = await fetch(`${apiUrl+productId}`, {
          method: 'PUT',
          body: JSON.stringify(product),
          headers: {
            'Authorization': apiKey,
            'Content-type': 'application/json; charset=UTF-8',
          }
        })
    
        if (response.ok) {
          window.location.href = 'backOffice.html?status=edit-ok'
        } else {
          alert('Error uploading')
        }
  
    } catch (error) {
      console.log('Error ', error);
    }
  
  
  })