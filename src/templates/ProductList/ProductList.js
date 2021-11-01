
// Components
import { Container, Table,Row, Col } from 'react-bootstrap';
import { PageHeader }  from '../../components';
import { Link }  from 'react-router-dom';

function ProductList(props) {

    return (
        <Container >
                <PageHeader headerTitle="Lista produktów"  buttonCaption="Dodaj produkt" buttonLink={'/add-product'} />
                <Row className="justify-content-md-center">
                        <Col sm={12} md={10}>
                                <Table  bordered hover>
                                    <thead className="bg-primary" variant="light">
                                            <tr className="text-center text-light">
                                                    <th>#</th>
                                                    <th>Nazwa</th>
                                                    <th>Kategoria</th>
                                                    <th></th>
                                            </tr>
                                    </thead>

                                    <tbody>
                                    { props.productList.map((product,i) => (
                                    <tr key={i+1} className="text-center">
                                            <td className="text-muted" >{i+1}</td>
                                            <td className="text-muted">{product.name}</td>
                                            <td className="text-muted">{product.category_name}</td>
                                            <td width="15%"><Link to={`/edit-product/${product.id}`}  className="btn text-muted">Edytuj</Link></td>
                                    </tr>))
                                     }
                                </tbody>
                             </Table>
                        </Col>
                    </Row>
        </Container>
        )   
  }

  export default  ProductList;