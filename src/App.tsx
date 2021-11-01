import  { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import { ProductList, CategoryList, EditProduct, EditCategory,AddProduct, AddCategory } from './templates';
import  { Navigation } from './components';
import axios from 'axios';

const AUTHORIZATION = 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e';
const GET_PRODUCTS = 'https://newdemostock.gopos.pl/ajax/219/products/groups';
const GET_CATEGORIES =  'https://newdemostock.gopos.pl/ajax/219/product_categories';

 interface  Categories {
    id:number,
    name:string,
    uid:string,
}

interface Products {
    id:number,
    name:string,
    category_name:string,
}

function App() {
        const [products, getProducts] = useState<Products[]> ([]);
        const [categories , getCategories]= useState<Categories[]> ([]);

           useEffect(() => {

                  axios.get(GET_PRODUCTS, {   headers: {  'Authorization': AUTHORIZATION   }  })
                  .then(response => {  getProducts(response.data.data); })

                  axios.get(GET_CATEGORIES, {   headers: {  'Authorization': AUTHORIZATION   }  })
                  .then(response => {  getCategories(response.data.data); console.log(response.data.data)})
          }, []);

        return (
            <Router>
                <Navigation />
                  <Switch>
                        <Route exact  path="/product-list" component={ () => <ProductList productList ={ products }  /> } />
                        <Route exact  path="/category-list" component={ () =><CategoryList categoryList ={ categories } /> } />
                        <Route path="/add-category" component={ () =><AddCategory AUTHORIZATION = {AUTHORIZATION} /> } />
                        <Route path="/edit-category/:id" render={ props =>  <EditCategory  AUTHORIZATION = {AUTHORIZATION}  {...props}/> } />
                        <Route path="/add-product" component={ () =><AddProduct productsSearchCategory ={ categories } AUTHORIZATION={AUTHORIZATION}   /> } />
                        <Route path="/edit-product/:id" render={ props =>  <EditProduct productsSearchCategory ={categories } AUTHORIZATION={AUTHORIZATION} {...props}/> } />
                  </Switch>
            </Router>
        ); 
      }

      export default App;


