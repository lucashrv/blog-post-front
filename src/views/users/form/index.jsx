import React, { useState, useCallback } from "react"
import { Card, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Users = () => {

    const [localState, setLocalState] = useState({})
    const url = 'http://localhost:8000/user/register'
    const navigate = useNavigate()

    if(localStorage.getItem('user')){
        window.location.href = '/'
    }

    const updateLocalState = useCallback(
        (key, value) => {
            setLocalState(prev => ({ ...prev, [key]: value }))
        }
    )

    const routeRedirect = (path) => {
        navigate(path)
    }

    const onClickSave = async () => {
        if (
            !localState.userName ||
            !localState.password ||
            !localState.confirmPassword ||
            !localState.email ||
            !localState.firstName ||
            !localState.lastName
        ){
            alert("Campo(s) com preenchimento incorreto revise o formulário")
            return
        }

        if (localState.password !== localState.confirmPassword) {
            alert("Os campos senha e confirme a senha não correspondem")
            return
        }

        try{
            await axios.post(url, {
                userName: localState.userName,
                password: localState.password,
                confirmPassword: localState.confirmPassword,
                email: localState.email,
                firstName: localState.firstName,
                lastName: localState.lastName
            })
            routeRedirect('/')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Card className='mb-4 mt-4'>
                <Card.Header>
                    <h4>Cadastro de usuário</h4>
                </Card.Header>

                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Login</Form.Label>
                        <Form.Control
                            id="userName"
                            type="text"
                            placeholder="Informe o login"
                            onChange={(e) => updateLocalState('userName', e.target.value)}
                            value={localState.userName}
                        />
                        <Form.Label className="mt-2">Senha</Form.Label>
                        <Form.Control
                            id="password"
                            type="password"
                            placeholder="*************"
                            onChange={(e) => updateLocalState('password', e.target.value)}
                            value={localState.password}
                        />
                        <Form.Label className="mt-2">Confirmar senha</Form.Label>
                        <Form.Control
                            id="confirmPassword"
                            type="password"
                            placeholder="*************"
                            onChange={(e) => updateLocalState('confirmPassword', e.target.value)}
                            value={localState.confirmPassword}
                        />
                        <Form.Label className="mt-2">Email</Form.Label>
                        <Form.Control
                            id="email"
                            type="text"
                            placeholder="example@email.com"
                            onChange={(e) => updateLocalState('email', e.target.value)}
                            value={localState.email}
                        />
                        <Form.Label className="mt-2">Nome</Form.Label>
                        <Form.Control
                            id="firstName"
                            type="text"
                            placeholder="Informe seu nome"
                            onChange={(e) => updateLocalState('firstName', e.target.value)}
                            value={localState.firstName}
                        />
                        <Form.Label className="mt-2">Sobrenome</Form.Label>
                        <Form.Control
                            id="lastName"
                            type="text"
                            placeholder="Informe seu sobrenome"
                            onChange={(e) => updateLocalState('lastName', e.target.value)}
                            value={localState.lastName}
                        />
                    </Form.Group>
                    <Form>
                        <Button
                            variant="success"
                            type="button"
                            onClick={onClickSave}
                        >
                            Cadastrar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default Users