import { Alert  } from 'react-bootstrap';

interface Alt {
    headerTitle: string;
    headerDesc: string;
}

const PageAlert = (props:Alt) =>{

    return(
        <Alert variant="success">
                <Alert.Heading> {props.headerTitle} </Alert.Heading>
             <hr />

            <p className="mb-0">{props.headerDesc}</p>
        </Alert> )
}

export default PageAlert;