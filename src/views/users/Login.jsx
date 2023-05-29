import React, { useState, useCallback } from "react"
import { Card, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from "axios"


function Login() {
    const [localState, setLocalState] = useState({})
    const url = 'http://localhost:8000/user/login'
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

    const login = async () => {
        if (
            !localState.userName ||
            !localState.password
        ){
            alert("Campo(s) com preenchimento incorreto revise o formulário")
            return
        }

        try{
            const user = await axios.post(url, {
                userName: localState.userName,
                password: localState.password,
            })
            localStorage.setItem('user', JSON.stringify(user))
            window.location.href = '/'
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Card className='mb-4 mt-4'>
                <Card.Header>
                    <h4>Login de admins</h4>
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
                    </Form.Group>
                    <Form>
                        <Button
                            variant="success"
                            type="button"
                            onClick={login}
                        >
                            Entrar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default Login;