import React, { useEffect, useState } from "react"
import { Button, Card, Form } from 'react-bootstrap'
import { NavLink } from "react-router-dom"
import axios from "axios"

function NewCategory() {

    const baseUrl = 'http://localhost:3030/admin/categories/new'
    const [ title, setTitle ] = useState('')

    const onClickSave = async () => {
        await axios.post(baseUrl, {
          "title": title.toString()
        })
        .then(() => {
            window.location.href = "http://localhost:3000"
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <>
            <hr />
            <Card>
                <Card.Header>
                    <h2>Cadastro de categoria</h2>
                </Card.Header>

                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Título da categoria</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Informe o título da categoria"
                                onChange={(e) => setTitle(e.target.value )}
                                value={title}
                            />
                        </Form.Group>

                        <Button
                            variant="success"
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

export default NewCategory;