import React, {  useContext }  from 'react'
import { Card, Icon, Image, Button, Label } from 'semantic-ui-react'
import NumberFormat from 'react-number-format';
import { NavLink } from 'react-router-dom';
import { LessText } from 'utils/Fnct';
import { CartContext } from 'context/CartContext';
import './Item.css';


function Item({product}) {
    const { itemAdd } = useContext(CartContext);
    const { id, img, name, description, price, stock, category } = product;
    
    const handlerAddCart = () => {
        itemAdd(product, 1);
	};
    return (
        <>
            {/* <NavLink to={`/item/${idDrink}`}> */}
                <div className='item'>
                    <Card>
                        <Image src={img} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{name}</Card.Header>
                            <Card.Meta>Stock: {stock} / { category }</Card.Meta>
                            {/* <Card.Description>{strInstructions}</Card.Description> */}
                            <Card.Description><LessText text={description} maxLength={90}/></Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <NavLink to={`/item/${id}`}>
                                <Label.Group tag>
                                    <Label>
                                        <Icon name='dollar' />
                                            <NumberFormat value= {price} displayType={'text'} thousandSeparator={true}/>
                                        </Label>
                                    </Label.Group>
                            </NavLink>
                        </Card.Content>
                        {/* <Card.Content extra><a href="/"><Icon name='dollar' /><NumberFormat value= {idDrink} displayType={'text'} thousandSeparator={true}/></a></Card.Content> */}
                    </Card>
                    <Button content='AGREGAR' onClick={handlerAddCart} primary><Icon name='cart'/> AGREGAR </Button>
                    <NavLink to={`/item/${id}`}><Button content='VER DETALLE' secondary/></NavLink>
                </div>        
        </>
    )
}

export default Item
