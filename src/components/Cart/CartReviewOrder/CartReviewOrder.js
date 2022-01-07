import React, { useContext } from 'react';
import { Divider, Header, Icon, Button, Segment, Grid } from 'semantic-ui-react'
import CartDetail from 'components/Cart/CartDetail'
import NumberFormat from 'react-number-format';
import { CartContext } from 'context/CartContext';


function CartReviewOrder() {
    const { itemCard, itemClear, stepUpdate } = useContext(CartContext);

    /* Price total of Carro */
    const priceTotal =  itemCard.reduce((totalCart, item) => totalCart + (item.price * item.quantity), 0);

    
    const getTransporte = () => {
        stepUpdate(2);
    }

    return (
        <div>
            <Divider horizontal>
                    <Header as='h4'><Icon name='shopping bag' />Revisión del Pedido</Header>
            </Divider>
            <Grid columns={2} relaxed='very' >
                <Grid.Column>
                    {
                        itemCard.map((item) => {
                            return <CartDetail key={item.id} items={item} />
                        })
                    }
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <div className="title-cart">Resumen</div>
                        <Divider/>
                        <div>
                            <span className="subtotal-cart">Sub-Total :</span> 
                            <span className="price-subtotal-cart"><NumberFormat value= { priceTotal } displayType={'text'} thousandSeparator={true}/></span>
                        </div>
                        
                        <div>
                            <span className="total-cart">Total :</span> 
                            <span className="price-total-cart"><NumberFormat value= { priceTotal } displayType={'text'} thousandSeparator={true}/></span>
                        </div>
                    </Segment>
                    <div className="btn-accion">
                            <Button content='Vaciar carro' secondary onClick={ itemClear }/>
                            <Button content='Confirmar Pedido' primary onClick={ getTransporte }/>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default CartReviewOrder
