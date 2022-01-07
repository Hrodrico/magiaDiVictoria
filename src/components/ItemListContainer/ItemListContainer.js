import React, { useState, useEffect } from 'react'
import { Message, Icon, Input } from 'semantic-ui-react'
import ReactLoading from 'react-loading'; 
import ItemList from 'components/ItemList/ItemList';
import './ItemListContainer.css';

//Firebase
import { getDocs, collection, query, where, orderBy, startAt, endAt } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig"

function ItemListContainer({ categoryId , greeting}) {
    const [product, setProduct] = useState([]);
    const [visible, setVisible] = useState(true);
    const [search, setSearch] = useState('');
    const [done , setDone] = useState(undefined);
    const refProduct = collection(db, "product");


    const handleDismiss = () => {
        setVisible(false);
        setTimeout(() => {
            setVisible(true);
        }, 15000)
      }

    useEffect(() => {
		const getProducts = async () => {
			const qry = categoryId ? query(refProduct, where("category", "==", categoryId)) : collection(db, "product")
			const docs = []
			const querySnapshot = await getDocs(qry)
			querySnapshot.forEach((doc) => {
				docs.push({...doc.data(), id: doc.id})
			})
			setProduct(docs)
            setDone(true);
		}
		getProducts()
	}, [categoryId])

     useEffect(() => {
         const getProducts = async () => {
            //  const qry = search ? query(collection(db, 'product').orderBy('name').startAt('name').endAt('name'+'\uf8ff')) : collection(db, "product")
			// const qry = search ? query(ref, where("name", "==", search)) : collection(db, "product")
            const qry = search ? query(refProduct, orderBy('name'), startAt(search), endAt(search+'\uf8ff')) : collection(db, "product")
			const docs = []
			const querySnapshot = await getDocs(qry)
			querySnapshot.forEach((doc) => {
				docs.push({...doc.data(), id: doc.id})
			})
			setProduct(docs)
            setDone(true);
		}
		getProducts()
    }, [search]) 

    const activeSearch = (event) => {
        const val = event.target.value;
        setSearch(val);
      }

    return (
        <>            
            {/* <div style={{color:"green", margin:"25px",fontSize: "2rem", alignContent:"center"}}>{greeting}</div>-<div className="greeting">{greeting}</div>  */}
            {
                visible ? (
                    <div className="greeting">
                        <Message
                            onDismiss={handleDismiss}
                            header={greeting}
                            content='Esta es una notificación especial que puede descartar.'
                        />
                    </div>) : (""
                    // <div className="greeting">El mensaje regresará en 15s...</div>
                )
            }
            {
                !done ? (   
                    <div className="loading"><ReactLoading type={"spinningBubbles"} color={"#000"}/> </div>
                ) : (
                    <div className="input-container">
                        <div className="input-search">
                            {/* <Icon name='search' className="icon"/> */}
                            {/* <input type="text" onChange={activeSearch} value={search} placeholder="Buscar..."/> */}
                            <Input type="text" onChange={activeSearch} value={search} icon={{ name: 'search', circular: true }} iconPosition='left' placeholder="Buscar..."/>
                        </div>  
                        <div className="item-container">
                            <ItemList products={product} />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ItemListContainer;