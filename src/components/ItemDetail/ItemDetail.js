import React, { useState, useContext }  from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import NumberFormat from 'react-number-format';
import ItemCount from 'components/ItemCount/ItemCount';
import { CartContext } from 'context/CartContext'
import './ItemDetail.css';

function ItemDetail({ product }) {
    const [buttonFinish, setButtonFinish] = useState(false);
    const { itemAdd } = useContext(CartContext);
    const { img, name, description, price, stock, category } = product[0];
    
    const onAdd = (qty) =>{
        setButtonFinish(true);
        itemAdd(product[0], qty);
    };

    return (
            
            <>
                <div>
                    <div className='item-detail'>
                        <Card>
                            <Image src={img} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{name}</Card.Header>
                                <Card.Meta>Stock: {stock} / { category }</Card.Meta>
                                <Card.Description>{description}</Card.Description>
                            </Card.Content>
                            <Card.Content extra><Icon name='dollar' /><NumberFormat value={ price } displayType={'text'} thousandSeparator={true}/></Card.Content>
                        </Card>
                    </div>

                    <div className='count-detail'>
                        { !buttonFinish && <ItemCount stock={6} initial={1} onAdd={onAdd} /> }
                    </div>    

                    <div className='button-detail'>
                                { buttonFinish && 
                                    <>
                                        <Link to='/'><Button content='Seguir Comprando' primary /></Link>
                                        <Link to='/cart'><Button content='Terminar mi compra' secondary /></Link>
                                    </>
                                }
                    </div>
                </div>
            </>   
            
    )
}

export default ItemDetail
