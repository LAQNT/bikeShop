// const { func } = require("prop-types");

// const { func } = require("prop-types");

// const { isValid } = require("ipaddr.js");

const apiUrl = `https://striveschool-api.herokuapp.com/api/product/`;
const apiKey = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjJiZjMzYjE1MjAwMTQ3NjE3OWMiLCJpYXQiOjE2ODE0OTY3NDUsImV4cCI6MTY4MjcwNjM0NX0.2GntzF_dTHvDwvFGbPJMbX9PbX19sNEZyX8e_4YFXxw`;

const form = document.getElementById('user-form');
const submitProduct = document.getElementById('submit-btn');


// -------insert form inputs inside variables-------------
const nameInput = document.getElementById('name');
const nameInputError = document.getElementById('nameInputError');

const descInput = document.getElementById('description');
const descInputError = document.getElementById('descInputError');

const brandInput = document.getElementById('brand');
const brandInputError = document.getElementById('brandInputError');

const imgUrlInput = document.getElementById('img-url');
const imgUrlInputError = document.getElementById('imgUrlError');
const priceInput = document.getElementById('price');
const priceInputError = document.getElementById('priceInputError');


// -------------POST data =>new item form------------
form.addEventListener('submit', async(e)=>{
        
    let validation = [];
    // --------name validation------
        if (nameInput.value == '' || nameInput.value == null) {
            nameInputError.innerText = 'Name is required';
            validation.push(nameInput.innerText);
        }

        // --------description validation------
        if (descInput.value == '' || nameInput.value == null) {
            descInputError.innerText = 'Description is required';
            validation.push(descInput.innerText);

        } 
        if (descInput.value.length > 20 ){
            descInputError.innerText = 'Description must be maximun 10';
            validation.push(descInput.innerText);

        }
        
        // --------brand validation------
        if (brandInput.value == '' || brandInput.value == null) {
            brandInputError.innerText = 'Brand is required';
            validation.push(brandInput.innerText);

        }
        // --------image validation------
        if (imgUrlInput.value == '' || imgUrlInput.value == null) {
            imgUrlInputError.innerText = 'Image URL is required';
            validation.push(imgUrlInput.innerText);
        }

        console.log(validation)

        if (validation) {
            e.stopImmediatePropagation();
            e.preventDefault()
        }
    
        else return
    
    const product = {
        name: nameInput.value,
        description: descInput.value,
        brand: brandInput.value,
        imageUrl: imgUrlInput.value,
        price: priceInput.value
    }
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(product),
            headers:{
                "Authorization": apiKey,
                "Content-type": `application/json; charset=UTF-8`
            }
        });
        window.location.href = 'backOffice.html?status=additem-ok';
    }
    
    catch (error) {
        console.log('There has been an error:',error);
    }


});


// --------------GET data---------------

async function getData() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Authorization": apiKey
            }
            })
            
        const data = await response.json();
        
        console.log(data); 
        
        return data;    

    } catch (error) {
        console.log(error)      
    }
}
getData()

async function dataIntoTable() {
    let productsData = await getData();

    let tableBody = document.getElementById('table-products');
    tableBody.innerHTML = '';

    productsData.map(product => {
        let {_id, name, description, brand, imageUrl, price, updatedAt} = product;

        // console.log(typeof _id)
        const row = `
        <tr>
            <td>${_id}</td>
            <td><img src="${imageUrl}"></td>
            <td>${name}</td>
            <td>${description}</td>
            <td>${brand}</td>
            <td>€ ${price}</td>
            <td>${updatedAt}</td>
           
            <td>
            <button class="btn btn-primary" onclick="editProduct('${_id}')"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-danger" onclick="deleteProduct('${name}','${_id}')"><i class="bi bi-x-circle"></i></button>
            </td>
        </tr>       
        `
        tableBody.innerHTML += row;
    });
}
dataIntoTable();

// --------------MODIFY data---------------
function editProduct(productId) {
    window.location.href = `editProduct.html?id=${productId}`
}
// GO TO PRODUCT HTML

// --------------DELETE data---------------
async function deleteProduct(productName, productId) {
    // console.log(typeof productName)
    if (confirm(`Delete ${productName}?`)) {
      try {
        await fetch(apiUrl + productId, { 
            method: 'DELETE',
            headers: {
                "Authorization": apiKey,
            }
        } );
            window.location.href = 'backOffice.html?status=delete-ok'

      } catch (error) {
        console.log('Error: ', error);
      }
    }
    
  }

// ------go to shop-------
function goToShop() {
    window.location.href = `index.html`
}

// --------------form VALIDATION---------------


        

        // --------price validation------
        // if (priceInput.value == '' || priceInput.value == null) {
        //     priceInputError.innerText = 'Price is required';
        // }
        
        // e.preventDefault()

    
  