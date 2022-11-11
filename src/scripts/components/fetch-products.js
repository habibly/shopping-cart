export default class ProductData{
  constructor(){}
  async fetchData(offset){
    return fetch(`https://martqilvhcsrussigrnv.supabase.co/rest/v1/products?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hcnRxaWx2aGNzcnVzc2lncm52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMzk4NTUsImV4cCI6MTk4MzcxNTg1NX0.tPFsKFwwKbzF4Zy8qS3IyOvFlBgPUQBO0shC5e8ul1A&limit=6&offset=${offset}`)
    .then( response => response.json() )
    .then(response => {
      return response
    })
    
  }
}