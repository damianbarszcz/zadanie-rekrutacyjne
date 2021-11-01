
import { Navbar, Container,Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation: React.FC  = () => {

   return (
    <Navbar bg="primary" variant="dark">
            <Container>
                  <Navbar.Brand><strong>GoSTOCK</strong></Navbar.Brand>

                    <Navbar.Collapse>
                            <Nav className="me-auto">
                                    <LinkContainer to="/product-list">
                                        <Nav.Link>Produkty</Nav.Link>
                                    </LinkContainer>

                                    <LinkContainer to="/category-list">
                                        <Nav.Link>Kategorie</Nav.Link>
                                    </LinkContainer>
                            </Nav>
                    </Navbar.Collapse>
            </Container>
    </Navbar> );
}

export default Navigation;