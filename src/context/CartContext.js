import React, { useState, createContext } from 'react'
// import React, { useState, createContext, useContext} from 'react'


//Export Context
export const CartContext = createContext([])

// export const useCartContext = () => useContext(CartContext)

//Context Provider
export const CartProvider = ({ item = [], children, steped=1, OrderPay='' })  => {
    const [itemCard, setItemCard] = useState(item);
    const [step, setStep] = useState(steped);
    const [purchaseOrder, setPurchaseOrder] = useState(OrderPay);
    
    // console.log('CartProvider.itemCard:[', item ,']');

    /*********/
    /* Cart  */
    /*********/
    /* Add Item at carro */
    const itemAdd = (item, qty) => {
        // console.log('item', item);
        // console.log('quantity', qty);

        /* Question if exits */
        if (!isInCart(item.id)) {
          const objCart = {
            id: item.id,
            image: item.img,
            name: item.name,
            description: item.description,
            price: item.price,
            stock: item.stock,
            quantity: qty
          }
          setItemCard(itemCard.concat(objCart));
        } else {
          console.log('El producto ya fue agregado al carro');
        }
      }
      
      /* Delete Item of cart */
      const itemRemove = (itemId) => {
        const newCart = itemCard.filter(product => product.id !== itemId);
        setItemCard(newCart);
      }
    
      /* Clean cart */
      const itemClear = () => {
        setItemCard([]);
      }
    
      /* Exist item on cart */
      const isInCart = (id) => {
        if (itemCard.find(product => product.id === id)) 
          return true;
         else 
          return false;
      }

      /*********/
      /* Step */
      /*********/
      const stepUpdate = (step) =>{
        setStep(step);
      }

      /******************/
      /* Purchase Order */
      /******************/
      const purchaseOrderAdd = (idPay) => {
        setPurchaseOrder(idPay);
      }

    // console.log("children:[",children,"]");
    // console.log("Item:[",itemCard,"]");

    return (
        <CartContext.Provider value={{ itemCard, itemAdd, itemRemove, itemClear, isInCart, step, stepUpdate, purchaseOrder, purchaseOrderAdd}}>
            { children }
        </CartContext.Provider>
    )
}

export default CartProvider;