export default class ProductData{
  constructor(){}
  async fetchData(page){
    return fetch(`http://localhost:5000/products?_page=${page}&_limit=6`)
    .then( response => response.json() )
    .then(response => {
      return response
    })
    
  }
}