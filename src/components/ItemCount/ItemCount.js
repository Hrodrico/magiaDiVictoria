import React, { useState } from 'react';
import { HiOutlinePlusSm, HiOutlineMinus } from 'react-icons/hi';
import { Button } from 'semantic-ui-react'
import { Toast } from 'utils/Swal'


function ItemCount ({stock=0, initial=0, onAdd})  {    
    const [counter, setCounter] = useState(initial);

    const handlerCounterUp = () => {
        if(counter < stock)
		    setCounter(+counter + 1);
        else
            Toast.fire({
                icon: 'warning',
                title: 'No hay más stock'
                })
        
	};

	const handlerCounterDown = () => {
        if(counter > 0)
		    setCounter(+counter - 1);
        else
            Toast.fire({
                icon: 'error',
                title: 'Stock, debe ser mayor a 0'
                })
        
	};

    const handlerAddCart = () => {
        onAdd(counter)
	};



    return (
        <div className="item-content">            
            <div className="item-section-stock">            
                Stock Disponible: { stock }
            </div>

            <div className="item-section">
                <button className="item-button"  onClick={handlerCounterDown}><HiOutlineMinus className="icon"/></button>
                <input type="text" className="input" defaultValue={initial} value={counter} placeholder="Contador"/>
                <button className="item-button"   onClick={handlerCounterUp}><HiOutlinePlusSm className="icon"/></button>
            </div>        

            <div className="item-section">
                { counter > 0 && <Button content='Agregar a Carro' primary onClick={handlerAddCart}/> }
            </div>
        </div>
    )
}

export default ItemCount
