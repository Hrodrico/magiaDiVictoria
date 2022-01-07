import React from "react";
import { Card } from "react-bootstrap";
import {TiSocialFacebook, TiSocialInstagram} from "react-icons/ti";
import "./Footer.css"

const Footer = () => {
    const linkFB = process.env.REACT_APP_FACEBOOK; 
    const linkIG = process.env.REACT_APP_INSTAGRAM; 
	return (
		<div>
			<Card className="footer-container">
				<Card.Body className="footer-body">
					<Card.Text className="footer-text">No olvides seguirnos!!!</Card.Text>
                    <a href={`${linkIG}`} target="_blank" rel="noopener noreferrer"><TiSocialInstagram className="footer-social"/></a>
					<a href={`${linkFB}`} target="_blank" rel="noopener noreferrer"><TiSocialFacebook className="footer-social"/></a>
				</Card.Body>
				<Card.Header className="footer-header"> ® La Magia Di Victoria © Todos los derechos reservados. </Card.Header>
			</Card>
		</div>
	);
};

export default Footer;
