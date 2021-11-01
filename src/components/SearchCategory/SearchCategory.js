import { Dropdown,Form } from 'react-bootstrap';
import  { useState} from 'react';

function SearchCategory(props){
        const [searchTerm, getSearchTerm] = useState('');
        const [category_name, getCategoryName] = useState('');

        const dropdownMenuStyle = {
            width: "100%",
            height: "300px",
            overflow: "auto"
        };

        const dropdownToggleStyle= {
                width: "100%",
                height: "48px",
                backgroundColor:'white',
                border: '1px solid #ced4da',
                color:'#737373',
                textAlign:'left'
        }

        const dropdownSearchStyle={
                margin: "0.5rem auto",
                width: "95%",
        }

        const  getData = (catId, catName) =>{
                props.getCategoryId(catId);
                getCategoryName(catName);
        }

        let searchResults =  props.categories.filter((category) =>  category.name.toLowerCase().includes(searchTerm.toLowerCase())  );

        return(
                <Dropdown>
                        <Dropdown.Toggle  id="dropdown-custom-components" style={dropdownToggleStyle}> 
                                { category_name   ? category_name  : [ props.category_name ? props.category_name : 'Wybierz kategorię'] }   
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={dropdownMenuStyle}>
                                <Form.Control style={dropdownSearchStyle} onChange={e => getSearchTerm(e.target.value)}  value={ searchTerm } placeholder="Szukaj..." name="name" type="text" />

                                { searchResults.map((category) => (
                                        <Dropdown.Item key={category.id}  onClick={() => getData(category.id,category.name) }>{ category.name} </Dropdown.Item>
                                ))}
                        </Dropdown.Menu>
                </Dropdown>
        )
}

export default SearchCategory;