import ItemListContainer from '../components/ItemListContainer/ItemListContainer';
import React from 'react'


function Home() {
    const greeting = process.env.REACT_APP_GREETING; 

    return (
        <>
            <ItemListContainer greeting={greeting}/>
        </>
    )
}

export default Home