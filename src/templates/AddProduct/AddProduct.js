import  { useState } from 'react';
import axios from 'axios';

// Components
import { Container, Form,Button,Row,Col} from 'react-bootstrap';
import {PageAlert,SearchCategory }  from '../../components';

const CREATE_PRODUCT = 'https://newdemostock.gopos.pl/ajax/219/products';

function AddProduct(props) {
        const [name , getName] = useState('');
        const [category_id , getCategoryId] = useState();
        const [measure_type, getMeasureType] = useState();
        const [tax_id , getTaxId] = useState();
        const [success , getSuccess] = useState(false);
        const [errors, setErrors] = useState([]);

        // Add product
        const handleForm = (e) => {
                e.preventDefault();

                const data = { 
                        name: name, 
                        category_id:category_id ,
                        measure_type:measure_type,
                        tax_id: tax_id,
                        type:"BASIC",
                 };
                 
                 axios.post(CREATE_PRODUCT, data, {  headers: {  Authorization: props.AUTHORIZATION} })
                .then(response => {
                        if (!response.errors) {  
                                getSuccess(true);
                                getName('');
                                getMeasureType('');
                                getTaxId('');
                                setErrors([]);
                        }
                        window.setTimeout(function () {  getSuccess(false);  }, 5000);
                })
                .catch(error => {    setErrors(error.response.data.errors); });
        }

        return (
                <Container>    
                         <Row className="justify-content-md-center">
                                <Col xs={12} sm={9} md={6}> 
                                        <header className="mt-5 mb-3">
                                                 <p className="h3 text-muted"> Dodaj produkt</p>
                                        </header>

                                        { success && <PageAlert  headerTitle="Udało się!" headerDesc="Gratulacje, udało się dodać nowy produkt." /> }

                                        <Form  onSubmit={ handleForm  } method="POST">
                                                <Form.Group className="mb-4 mt-4" >
                                                        { errors.length > 0 && errors.map((error,i) => <div className='mt-3' key={i} style={{color:'red'}}> { error.message } </div>) }
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted">Nazwa <span className="text-danger">*</span></Form.Label>

                                                        <Form.Control  size="lg" value={ name } onChange={e =>getName(e.target.value)} name="name" type="text" />
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted">Kategoria <span className="text-danger">*</span></Form.Label>

                                                        <SearchCategory categories ={props.productsSearchCategory}  getCategoryId={getCategoryId}   />
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted">Jednostka miary <span className="text-danger">*</span></Form.Label>

                                                        <Form.Select size="lg" value={ measure_type }  onChange={ e =>getMeasureType(e.target.value) } >
                                                                <option value=""></option>
                                                                <option value="ITEM">szt</option>
                                                                <option value="KILOGRAM">kg</option>
                                                                <option value="LITER">l</option>
                                                        </Form.Select>
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted">Podatek zakupu <span className="text-danger">*</span></Form.Label>

                                                        <Form.Select size="lg" value={ tax_id }  onChange={e =>getTaxId(e.target.value)} >
                                                                <option  value=""></option>
                                                                <option value="1">0%</option>
                                                                <option value="2">23%</option>
                                                                <option value="3">5%</option>
                                                                <option value="4">8%</option>
                                                                <option value="5">zw</option>
                                                        </Form.Select>
                                                </Form.Group>

                                                <Form.Group className="mt-5 text-center">
                                                        <Button variant="primary" size="lg" type="submit"> Stwórz produkt </Button>
                                                </Form.Group>
                                        </Form>
                                 </Col>
                         </Row>
                </Container>
         )
  }

  export default  AddProduct;