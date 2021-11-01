
// Components
import { Container, Table,Row, Col } from 'react-bootstrap';
import { PageHeader }  from '../../components';
import { Link }  from 'react-router-dom';
import { withRouter } from 'react-router';
const  CategoryList = (props ) => {
    
    return (
        <Container>
                <PageHeader headerTitle="Lista Kategorii"  buttonCaption="Dodaj kategorie" buttonLink={'/add-category'}  />
                <Row className="justify-content-md-center">
                        <Col sm={12} md={10}>
                                <Table bordered hover>
                                        <thead  className="bg-primary" variant="light">
                                                <tr className="text-center text-light">
                                                        <th width="15%">#</th>
                                                        <th>Nazwa</th>
                                                        <th></th>
                                                </tr>
                                        </thead>

                                        <tbody>
                                                { props.categoryList.map((category,i) => (
                                                <tr key={i+1} className="text-center">
                                                        <td className="text-muted" >{i+1}</td>
                                                        <td className="text-muted">{category.name}</td>
                                                        <td className="text-muted" width="15%"><Link to={`/edit-category/${category.id}`}  className="btn text-muted">Edytuj</Link></td>
                                                </tr>))}
                                        </tbody>
                                </Table>
                        </Col>
                </Row>
        </Container>
    )
  }

  export default withRouter(CategoryList);