import  { useState } from 'react';
import axios from "axios";

// Components
import { Container, Form,Button,Row,Col} from 'react-bootstrap';
import { PageAlert }  from '../../components';

const CREATE_CATEGORY = 'https://newdemostock.gopos.pl/ajax/219/product_categories';

interface AdCat  {  AUTHORIZATION:string  }

interface Errors{
        name:string,
        message:string,
        code:string
}

function AddCategory(props:AdCat) {
        const [name , getName] = useState<string>('');
        const [success , getSuccess] = useState<boolean>(false);
        const [errors, setErrors] = useState<Errors[]>([]);

        const handleForm = (e: React.FormEvent) => {
                e.preventDefault();
        
                axios.post(CREATE_CATEGORY, {
                       name: name
                }, {  headers: {    Authorization: props.AUTHORIZATION } })
        
                .then(response => {
                        getSuccess(true);
                        getName('');
                        setErrors([]);
                        console.log(response);
                        
                        window.setTimeout(function () {  getSuccess(false);  }, 5000);
                })
                
                .catch(error => {    setErrors(error.response.data.errors);});
         }

        return (
                <Container>     
                        <Row className="justify-content-md-center">
                                <Col xs={12} sm={9} md={6}> 
                                        <header className="mt-5 mb-3">
                                                <p className="h3 text-muted"> Dodaj kategorie </p>
                                        </header>

                                        { success && <PageAlert  headerTitle="Udało się!" headerDesc="Gratulacje, udało się dodać nową kategorię." /> }
                                        
                                        <Form className="mt-3" onSubmit={ handleForm } method="POST">
                                                <Form.Group className="mb-4 mt-4">
                                                        { errors.length > 0 && errors.map((error,i ) => <div className='mt-3' key={i} style={{color:'red'}}> { error.message } </div>) }
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted">Nazwa kategorii <span className="text-danger">*</span></Form.Label>

                                                        <Form.Control size="lg" onChange={e =>getName(e.target.value)}  value={ name }  name="name" type="text" />
                                                </Form.Group>

                                                <Form.Group className="mt-5 text-center">
                                                        <Button variant="primary" size="lg" type="submit"> Stwórz kategorię</Button>
                                                </Form.Group>
                                        </Form>
                                </Col>
                        </Row>
                </Container>
         )
  }

  export default  AddCategory;