import { Component } from "react";
import axios from 'axios';

// Components
import { Container, Form,Button,Row,Col  } from 'react-bootstrap';
import { PageAlert }  from '../../components';

const GET_CATEGORY = `https://newdemostock.gopos.pl/ajax/219/product_categories/`;
const UPDATE_CATEGORY = `https://newdemostock.gopos.pl/ajax/219/product_categories/`;


class EditCategory extends Component {
        constructor(props){  
                super(props);   
                this.state = { category:[], name: '', success:false, errors:{}, data_changes:false }

                this.getFormData = this.getFormData.bind(this);
                this.handleForm = this.handleForm.bind(this);
                this.getSingleCategory = this.getSingleCategory.bind(this);
        }

        componentDidMount(){ this.getSingleCategory();   }

        // Get single category data
        getSingleCategory(){
                const id = this.props.match.params.id
        
                axios.get(GET_CATEGORY+ id, {  
                        headers: {  Authorization: this.props.AUTHORIZATION   }
                 })
                .then(response => {  this.setState({ category: response.data.data,  name:response.data.data.name })   })
        }

        // Update value from category input
        getFormData(e){
                e.preventDefault();
                const name = e.target.name;
                const value = e.target.value;
                this.setState({  [name] : value, data_changes:true})
        }

        // Update single category
        handleForm(e,categoryId) {
                e.preventDefault();

                const data = { name: this.state.name };

                axios.put(UPDATE_CATEGORY+categoryId ,data, {  
                        headers: {  Authorization: this.props.AUTHORIZATION   }
                 })

                .then(response => {
                        if (!response.errors) {                         
                                this.setState({ success:true ,errors:{}, data_changes:false }) 

                                this.getSingleCategory();

                                setTimeout(function(){ this.setState({ success:false }); }.bind(this),5000);
                         }
                })
                .catch(error => {  this.setState({ errors: error.response.data.errors});  })
         }

        render(){
                const { category, name, data_changes, errors, success } = this.state;

                return (
                        <Container>     
                                <Row className="justify-content-md-center">
                                        <Col xs={12} sm={9} md={6}> 
                                                <header className="mt-5 mb-3">
                                                        <p className="h3 text-muted"> Edytuj kategorię: <strong>{category.name} </strong></p>
                                                </header>

                                                { success && <PageAlert  headerTitle="Udało się!" headerDesc="Gratulacje, udało się edytować kategorię w systemie."/> }
                            
                                                <Form  onSubmit={ (e) => this.handleForm(e,category.id) } method="POST">
                                                        <Form.Group className="mb-4 mt-4">
                                                                { errors.length > 0 && errors.map((error,i) => <div className='mt-3' key={i} style={{color:'red'}}> { error.message } </div>) }
                                                        </Form.Group>

                                                        <Form.Group className="mb-3">
                                                                <Form.Label className="text-muted">Nazwa kategorii <span className="text-danger">*</span></Form.Label>
                                
                                                                <Form.Control size="lg" onChange={ this.getFormData }  value={name || ''} name="name" type="text" />
                                                        </Form.Group>
                                
                                                        <Form.Group className="mt-5 text-center">
                                                                { data_changes ?
                                                                        <Button  variant="primary" size="lg" type="submit">  Edytuj kategorie </Button>
                                                                        :
                                                                        <Button  variant="primary" size="lg" type="submit"  disabled>  Edytuj kategorie</Button>
                                                                }
                                                        </Form.Group>
                                                </Form>
                                         </Col>
                                 </Row>
                        </Container>
                );
        }
  }

  export default EditCategory;