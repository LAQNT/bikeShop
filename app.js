
async function getData() {
    // let endpoint = 'https://striveschool-api.herokuapp.com/api/product/'
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
            headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjJiZjMzYjE1MjAwMTQ3NjE3OWMiLCJpYXQiOjE2ODEzMjI2ODcsImV4cCI6MTY4MjUzMjI4N30.7BgDgSGQzV0ooOczB0ghzO7l7RqNlKIIeaUuRV8PsdU"
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

