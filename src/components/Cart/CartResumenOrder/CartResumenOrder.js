import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List, Header, Divider, Icon, Item, Table, Image, Button } from 'semantic-ui-react'
import { CartContext } from 'context/CartContext';
import NumberFormat from 'react-number-format';

//Css
import 'components/Cart/CartConteiner/CartConteiner.css'

//Firebase
import { collection, query, getDocs, where, documentId } from "firebase/firestore";
import { db } from 'firebase/FirebaseConfig'

function CartResumenOrder() {
    const orderThanks = process.env.REACT_APP_RESUMEN_ORDER_THANKS;
    const { itemCard, purchaseOrder, itemClear, stepUpdate } = useContext(CartContext);
    const [purchaseOrderPay, setPurchaseOrderPay] = useState([]);
    const colorTable = 'violet';
    /* Price total of Carro */
    const priceTotal =  itemCard.reduce((totalCart, item) => totalCart + (item.price * item.quantity), 0);

    console.log("purchaseOrder:[",purchaseOrder,"]");
    console.log("itemCard:[",itemCard,"]");

    useEffect(() => {
        if(purchaseOrder.length > 0){
            const getPurchaseOrder = async () => {
                const refPurchase = collection(db, "purchaseOrderPay");
                const q = query(refPurchase, where(documentId(), '==', purchaseOrder));
                const docs = []
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id: doc.id})
                })
                console.log("getPurchaseOrder.docs:::",docs);
    
                if(docs.length !== 0){
                    setPurchaseOrderPay(docs[0])
                }
            }
            getPurchaseOrder()
            console.log("docs.products:::",purchaseOrderPay);
            console.log("docs.length:::",Object.keys(purchaseOrderPay).length);
        }
	}, [purchaseOrder])
    
    const getClose = () => {
        itemClear();
        stepUpdate(1);
        
    }

    
    return (
        <div>
            <Divider horizontal>
                <Header as='h4'><Icon name='boxes' />Resumen de Compra</Header>
            </Divider>
            <List divided relaxed>
                {console.log("purchaseOrderPay::",purchaseOrderPay)}
                {
                    purchaseOrderPay ? (
                        <>
                            <div className="cart-resumen-order-title">Orden Recibida</div>
                            <div className="cart-resumen-order-thanks">{orderThanks}</div>
                            <Table color={colorTable} inverted>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Número Pedido</Table.HeaderCell>
                                        <Table.HeaderCell>Fecha</Table.HeaderCell>
                                        <Table.HeaderCell>Total</Table.HeaderCell>
                                        <Table.HeaderCell>Método Pago</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>{purchaseOrderPay.id}</Table.Cell>
                                        <Table.Cell>{purchaseOrderPay.saleDate}</Table.Cell>
                                        <Table.Cell>$<NumberFormat value= { priceTotal } displayType={'text'} thousandSeparator={true}/></Table.Cell>
                                        <Table.Cell>Transbank Webpay Plus</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            <div className="cart-resumen-order-detail">Orden de Compra</div>
                            <Divider />
                            <Table color={colorTable} >
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Tipo Pago</Table.HeaderCell>
                                        <Table.HeaderCell>Tipo Cuota</Table.HeaderCell>
                                        <Table.HeaderCell>Titular</Table.HeaderCell>
                                        <Table.HeaderCell>Número Cuotas</Table.HeaderCell>
                                        <Table.HeaderCell>Número Tarjeta</Table.HeaderCell>
                                        <Table.HeaderCell>Fecha Vencimiento</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>Crédito</Table.Cell>
                                        <Table.Cell>Venta Normal</Table.Cell>
                                        <Table.Cell>{purchaseOrderPay.informationCreditCard && purchaseOrderPay.informationCreditCard.nameTitular}</Table.Cell>
                                        <Table.Cell>{purchaseOrderPay.informationCreditCard && purchaseOrderPay.informationCreditCard.quotes}</Table.Cell>
                                        <Table.Cell>{purchaseOrderPay.informationCreditCard && purchaseOrderPay.informationCreditCard.creditCard}</Table.Cell>
                                        <Table.Cell>{purchaseOrderPay.informationCreditCard && purchaseOrderPay.informationCreditCard.lastDate}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            <div className="cart-resumen-order-detail">Detalles del Pedido</div>
                            <Divider />
                            {
                                itemCard.map((product, index) => {
                                    return (
                                        <Item.Group divided>
                                            <Item>
                                                <Image src={product.image} circular size='tiny' />
                                                <Item.Content>
                                                    <Item.Header as='a'>{ product.name }</Item.Header>
                                                    <Item.Meta>
                                                        <span className='cinema'>$<NumberFormat value={ product.price } displayType={'text'} thousandSeparator={true}/></span>
                                                    </Item.Meta>
                                                    <Item.Description>{product.description}</Item.Description>
                                                    <Item.Extra>
                                                        <span className='cinema'>{ product.id }</span>
                                                    </Item.Extra>
                                                </Item.Content>
                                            </Item>
                                        </Item.Group>
                                        
                                     
                                        
                                    )
                                })
                            }
                            <Link to="/"><Button content='Finalizar Proceso' primary onClick={ getClose } /></Link>
                        </>
                    ) : ("No se encontro resultado")
                }
                
            </List>
        </div>
    )
}

export default CartResumenOrder
