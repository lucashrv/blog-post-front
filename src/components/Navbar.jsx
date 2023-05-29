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

    const logout = () => {
        localStorage.removeItem('user')
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ justifyContent: 'space-between' }}>
                <Navbar.Brand style={{ marginLeft: 20 }} href="/">Blog Post</Navbar.Brand>

                {token && (
                    <>
                        <Nav className="me-auto">
                            <NavDropdown title="Artigos" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/admin/articles">Artigos</NavDropdown.Item>
                                <NavDropdown.Item href="/admin/articles/new">Cadastrar artigo</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Categorias" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/admin/categories">Categorias</NavDropdown.Item>
                                <NavDropdown.Item href="/admin/categories/new">Cadastrar categoria</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="float-right">
                            <Nav.Link onClick={logout} href={'http://localhost:3000/login'}>Sair</Nav.Link>
                        </Nav>
                    </>
                )}
                {!token && (
                    <Nav className="float-right">
                        <Nav.Link href={'http://localhost:3000/login'}>Entrar</Nav.Link>
                        <Nav.Link href={'http://localhost:3000/register'}>Cadastrar</Nav.Link>
                    </Nav>
                )}
            </Navbar>
        </>
    )
}