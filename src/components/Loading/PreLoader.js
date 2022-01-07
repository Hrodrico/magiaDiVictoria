import React, { useEffect, useState } from 'react'; 
import ReactLoading from 'react-loading'; 

function PreLoader() {
    const [data, setData] = useState([]);
    const [done , setDone] = useState(undefined);
    
    
    useEffect(() => {
        // Delay 2 seg. por consigna
        setTimeout(() => {            
            fetch(`https://jsonplaceholder.typicode.com/posts`)
                .then(response => response.json())
                .then(json => {
                    console.log("json::",json);
                    setData(json);
                    setDone(true);
                })
                .catch((error) => {
                    console.error('Error: ', error);
                    throw error;
                })
        }, 2000)
    }, [])   

    return (  
        <>
        {
            !done ? (
                    <ReactLoading type={"spinningBubbles"} color={"green"} height={667} width={375} />
                ) : (
                    <h1>Your Data</h1>
                    // <ul>
                    //     {data.map((post)=>{
                    //             <li key={post.id}>post.title</li>
                    //     })}
                    // </ul>
                )
        }
        </>
    ) 
}

export default PreLoader
