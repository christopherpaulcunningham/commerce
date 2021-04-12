import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="footer-container">
            <div className="footer-section">
                <span className="header">Visit Us</span>
                <span className="bold-regular">Amunt Bike Co.</span>
                <span>Calle Falsa 123,</span>
                <span>Valencia, 46001</span>
                <span>Spain</span>
                <span className="address-email">info@amuntbikeco.es</span>
                <span className="address-number">+34 123 456 789</span>
            </div>
            <div className="footer-section">
                <span className="header">Products</span>
                <Link to="/shop/bicycles" style={{ textDecoration: 'none', color: '#ffffff' }}><span className="product-link">Bicycles</span></Link>
                <Link to="/shop/accessories" style={{ textDecoration: 'none', color: '#ffffff' }}><span className="product-link">Accessories</span></Link>
            </div>
            <div className="footer-section">
                <span className="header">Social</span>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="social-link">Instagram</a>
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="social-link">Facebook</a>
                <a href="https://www.twitter.com" target="_blank" rel="noreferrer" className="social-link">Twitter</a>
            </div>
            <div className="break"></div>
            <div className="footer-section trademark">
                © {currentYear} Christopher Cunningham                
            </div>
        </div>
    )
}

export default Footer;
