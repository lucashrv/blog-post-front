import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarComponent () {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                    <Navbar.Brand style={{ marginLeft: 20 }} href="/">Blog Post</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/admin/categories">Categorias</Nav.Link>
                    </Nav>
            </Navbar>
        </>
    )
}