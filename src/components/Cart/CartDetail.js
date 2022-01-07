import React, { useContext } from 'react';
import { Table, Image, Segment, Button, Icon } from 'semantic-ui-react'
import { CartContext } from 'context/CartContext';
import NumberFormat from 'react-number-format';
import './CartDetail.css';

// function CartDetail({ itemCard }) {
const CartDetail = ({ items }) => {
    const { itemRemove } = useContext(CartContext);
    const { id, image, name, description, price, quantity, } = items;

    // console.log("CartDetail.item:",items);
    return (
        <div className="card-detail">
            <Segment attached>
                    <Table definition>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={2}>Producto</Table.Cell>
                                <Table.Cell> <Image src={image} size='tiny' circular  centered verticalAlign='middle' />{' '}<span className="name-card-detail">{name}</span></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Descripcion</Table.Cell>
                                <Table.Cell>{description}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Precio Unitario</Table.Cell>
                                <Table.Cell>$ <NumberFormat value= {price} displayType={'text'} thousandSeparator={true}/> </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Cantidad</Table.Cell>
                                <Table.Cell>{quantity}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Acción</Table.Cell>
                                <Table.Cell><Button secondary onClick={()=>itemRemove(id)}><Icon name='trash'/></Button></Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Segment>
        </div>
    )
}

export default CartDetail
