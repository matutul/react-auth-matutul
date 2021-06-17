import React from 'react';
import {
    Link, useHistory
} from "react-router-dom";
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const handleSignOut = () => {
        setLoggedInUser({});
    }
    const history = useHistory();
    const handleLogIn = () => {
        history.push('./login')
    }
    return (
        <Navbar className="nav justify-content-between" sticky="top" collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand><Link to="/home" className="brand-name">Easy Transport</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                <Nav>
                    <Nav.Link className="menu-item"><Link to="/home" className="link">Home</Link></Nav.Link>
                    <Nav.Link className="menu-item"><Link to="/destination" className="link">Destination</Link></Nav.Link>
                    <Nav.Link className="menu-item"><Link to="/blog" className="link">Blog</Link></Nav.Link>
                    <Nav.Link className="menu-item"><Link to="/contact" className="link">Contact</Link></Nav.Link>
                    {
                        loggedInUser.displayName ? (<NavDropdown title={loggedInUser.displayName} id="collasible-nav-dropdown" className="link">
                            <NavDropdown.Item><Link to="/profile">Profile</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleSignOut}>Log out</NavDropdown.Item>
                        </NavDropdown>) : <Button onClick={handleLogIn} className="menu-btn">Log in</Button>
                    }

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;