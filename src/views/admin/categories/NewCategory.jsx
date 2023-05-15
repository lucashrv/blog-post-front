import React, { useState } from "react"
import { Button, Card, Form } from 'react-bootstrap'
import axios from "axios"

function NewCategory() {

    const baseUrl = 'http://localhost:8000/admin/categories/new'
    const [ title, setTitle ] = useState('')

    const onClickSave = async () => {
        // const _data = {
        //     title: title.toString()
        // }

        // await fetch(baseUrl, {
        //     method: "POST",
        //     body: JSON.stringify(_data),
        //     headers: {"Content-type": "application/json; charset=UTF-8"}
        // })
        // .then(() => window.location.href = "http://localhost:3000/admin/categories")
        // .catch(err => console.log(err))

        await axios.post('http://localhost:8000/admin/categories/new', {
            title: title.toString(),
        })
        .then(() => window.location.href = "http://localhost:3000/admin/categories")
        .catch(err => console.log(err))
    }

    return (
        <>
            <hr />
            <Card>
                <Card.Header>
                    <h2>Cadastro de categoria</h2>
                </Card.Header>

                <Card.Body>
                    <Form action="/admin/categories/new" method="post">
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