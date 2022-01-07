import React from 'react'
import Item from 'components/Item/Item';
import './ItemList.css';

const ItemList = ({products}) => {
    return (
        <div className="input-container">
            <div className="item-list">
                {
                    Object.keys(products).length ? (
                        products.map((product, index) => {
                            return (
                                <Item product={ product } key={ index }/>
                            )
                        })
                    ) : ("No se encontro resultado")
                }
            </div>
        </div>
    )
}

export default ItemList
