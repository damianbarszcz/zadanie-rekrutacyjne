import { Component } from 'react';
import axios from 'axios';

// Components
import { Container, Form,Button,Row,Col } from 'react-bootstrap';
import { PageAlert,SearchCategory }  from '../../components';

const GET_PRODUCT = `https://newdemostock.gopos.pl/ajax/219/products/groups/`;
const GET_PRODUCT_TAX_ID = `https://newdemostock.gopos.pl/ajax/219/products/`;
const UPDATE_PRODUCT = `https://newdemostock.gopos.pl/ajax/219/products/`;

class EditProduct extends Component {
        constructor(props){  
                super(props); 

                this.state = { product:[], category:[], name:'', category_name:'', category_id:'', measure_type:'', type:'', tax_id:'',  data_change:false, success:false, errors:{} }

                this.getFormData = this.getFormData.bind(this);
                this.getCategoryId = this.getCategoryId.bind(this);
                this.handleForm = this.handleForm.bind(this);
                this.getSingleProduct = this.getSingleProduct.bind(this);
        }

        componentDidMount(){
                this.getSingleProduct();
        }

        // Get single product
        getSingleProduct(){
                const id = this.props.match.params.id

                axios.get(GET_PRODUCT + id, {  
                        headers: {  Authorization: this.props.AUTHORIZATION   }
                 })
                .then(response => {  
                        this.setState({ 
                                product: response.data.data, 
                                name: response.data.data.name,
                                category_name:response.data.data.category_name,
                                measure_type: response.data.data.measure_type,
                                type:response.data.data.product_type,
                                category_id: response.data.data.id,
                        }); 
                 })

                 axios.get(GET_PRODUCT_TAX_ID + id, {  
                        headers: {  Authorization: this.props.AUTHORIZATION   }
                 })

                .then(response => {   this.setState({ tax_id: response.data.data.tax_id });   });
        }

        // Get product form data
        getFormData(e){
                e.preventDefault();
                const name = e.target.name;
                const value = e.target.value;
                this.setState({  [name] : value, data_changes:true })
        }

        // Get product category id
        getCategoryId(getId) { this.setState({  category_id: getId, data_changes:true });  }

        // Update single product
        handleForm(e,categoryId) {
                e.preventDefault();

                const data = { 
                        name: this.state.name,
                        category_id: this.state.category_id,
                        measure_type: this.state.measure_type,
                        type: this.state.type,
                        tax_id:this.state.tax_id,
                };

                axios.put(UPDATE_PRODUCT + categoryId, data, {  
                        headers: { Authorization: this.props.AUTHORIZATION  }
                 })

                .then(response => {
                        if (!response.errors) {  
                                this.setState({    success:true ,errors:{} , data_changes:false   }) 

                                this.getSingleProduct();
                        }
                        setTimeout(function(){ this.setState({ success:false }); }.bind(this),5000);
                })
                
                .catch(error => {  this.setState({ errors: error.response.data.errors}); })
         }

         render(){
                const {product, name,  category_name, category_id, data_changes, errors,  success } = this.state;

                return (
                        <Container>     
                                <Row className="justify-content-md-center">
                                        <Col xs={12} sm={9} md={6}> 
                                                <header className="mt-5 mb-3">
                                                        <p className="h3 text-muted"> Edytuj produkt: <strong>{product.name} </strong></p>
                                                </header>

                                                { success && <PageAlert  headerTitle="Udało się!" headerDesc="Gratulacje, udało się edytować produkt." /> }

                                                <Form onSubmit={  (e) =>this.handleForm(e,product.id)  } method="POST">
                                                        <Form.Group className="mb-4 mt-4">
                                                                { errors.length > 0 && errors.map((error,i) => <div className='mt-3' key={i} style={{color:'red'}}> { error.message } </div>) }
                                                        </Form.Group>

                                                        <Form.Group className="mb-3">
                                                                <Form.Label>Nazwa *</Form.Label>

                                                                <Form.Control onChange={ this.getFormData }  value={ name }  name="name" type="text" size="lg" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3">
                                                                <Form.Label>Kategoria* </Form.Label>

                                                                <SearchCategory categories ={this.props.productsSearchCategory}  category_id ={category_id} category_name ={category_name} getCategoryId={ this.getCategoryId } />
                                                        </Form.Group>

                                                        <Form.Group className="mt-5 text-center">
                                                                {data_changes ?
                                                                <Button  variant="primary" size="lg" type="submit">  Edytuj produkt </Button>
                                                                :
                                                                <Button  variant="primary" size="lg" type="submit"  disabled>  Edytuj produkt </Button>
                                                                }
                                                        </Form.Group>
                                                </Form>
                                        </Col>
                                </Row>
                         </Container>
                )
        }
}

  export default  EditProduct;