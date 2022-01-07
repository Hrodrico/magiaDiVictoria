import React from "react";
import { Button, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import error_404  from '../assets/images/error/error_404.png';
import "../App.css";

const Error = () => {
    
	return (
        <>
            <div className="main-msge-error">
                <div className="msge-error-text">
                    <h1>Error 404</h1>
                    <Image src={error_404} className="msge-error-image"/>
                    <Link to="/" className="msge-error-link"><Button content='Volver' primary/></Link>
                </div>
            </div>
		</>
	);
};

export default Error;
