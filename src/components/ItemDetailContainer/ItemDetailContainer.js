import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading'; 
import ItemDetail from '../ItemDetail/ItemDetail'
import ErrorView from 'views/ErrorView';
//Css
import "./ItemDetailContainer.css";

//Firebase
import { collection, query, getDocs, where, documentId } from "firebase/firestore";
import { db } from 'firebase/FirebaseConfig'

function ItemDetailContainer() {
    const [products, setProducts] = useState({});
    const [done , setDone] = useState(undefined);
    const [error , setError] = useState(false);
    const paramsId = useParams();

    
    //Filtra id por params 
    // const itemDetailFilter = products.filter((obj) => {
    //     return obj.id === paramsId.id}
    // )

    // console.log("itemDetailFilter::",itemDetailFilter);

    //Hooks getProducts invoca Firebase
    useEffect(() => {
		const getProducts = async () => {
            const refProduct = collection(db, "product");
			const q = query(refProduct, where(documentId(), '==', paramsId.id));
			const docs = []
			const querySnapshot = await getDocs(q)
			querySnapshot.forEach((doc) => {
				docs.push({...doc.data(), id: doc.id})
			})
            console.log("docs:::",docs);

            if(docs.length !== 0){
                setProducts(docs)
                setDone(true);
            }else{
                setError(true);
            }
		}
		getProducts()
        console.log("docs.products:::",products);
        console.log("docs.length:::",Object.keys(products).length);
	}, [])

    return (
        <>  
            {
                !error ? (
                    !done ? ( 
                        <div className="loading">
                            <ReactLoading type={"spinningBubbles"} color={"#000"}/>
                        </div> 
                    ) : (
                        <div className="ItemDetailContainer" >
                            { 
                                Object.keys(products).length > 0 ? (
                                    products.map((prod) => {
                                    return <ItemDetail key={prod.id} product={products} />
                                })
                                ) : ("No se encontro producto") 
                            }
                        </div>
                    )
                ) : (<ErrorView />)
            }   
        </>
    )
}

export default ItemDetailContainer
