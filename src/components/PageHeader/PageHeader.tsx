import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface PgHeader {
    headerTitle: string,
    buttonLink:string,
    buttonCaption:string
}

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {  size?: string; }
};

const PageHeader= (props:PgHeader) =>{

    return(
        <Row className='mt-5 mb-5 align-items-center justify-content-md-center'>
                <Col md={3} xs={6} >   
                    <header>
                            <p className="h3 text-muted"> { props.headerTitle } </p>
                    </header>
                </Col>

                <Col md={{ span: 4, offset: 3 }} xs={{ span: 6, offset: 0}} className="text-end" size="lg">
                        <Link to={`${props.buttonLink}`} className="btn btn-primary">{props.buttonCaption} </Link>
                </Col> 
        </Row> 
    )
}
export default PageHeader;