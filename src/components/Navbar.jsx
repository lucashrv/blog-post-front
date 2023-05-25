import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from "react-bootstrap";
import { useApi } from "../hooks/useApi";
import { useLocation } from "react-router-dom";

export default function NavbarComponent({ token }) {

    const location = useLocation()
    const { data: categories, loading } = useApi({
        url: 'http://localhost:8000/admin/categories',
        method: 'GET'
    })

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand style={{ marginLeft: 20 }} href="/">Blog Post</Navbar.Brand>
                <Nav className="me-auto">
                    {token && (
                        <>
                            <NavDropdown title="Artigos" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/admin/articles">Artigos</NavDropdown.Item>
                                <NavDropdown.Item href="/admin/articles/new">Cadastrar artigo</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Categorias" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/admin/categories">Categorias</NavDropdown.Item>
                                <NavDropdown.Item href="/admin/categories/new">Cadastrar categoria</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    )}
                    {location.pathname === '/' && !loading && (
                        categories.map(category => {
                            return (
                                <Nav.Link key={category.id} href={`http://localhost:3000/articles/category/${category.id}`}>{category.title}</Nav.Link>
                            )
                        })
                    )}
                </Nav>
            </Navbar>
        </>
    )
}