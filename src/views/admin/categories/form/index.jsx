import React, { useState, useEffect } from "react"
import { Button, Card, Form } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import { useApi } from "../../../../hooks/useApi"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function CategoryForm() {

    const { id } = useParams()
    const [title, setTitle] = useState('')
    let url = 'http://localhost:8000/admin/categories'
    const navigate = useNavigate()

    const { data: category } = useApi({
        url: `${url}/edit/${id}`,
        method: 'GET'
    })


    if (!id) {
        url = `${url}/new`
    }

    useEffect(() => {
        if (category) {
            setTitle(category.title)
        }
    }, [category])

    const routeRedirect = (path) => {
        navigate(path)
    }

    const onClickSave = async () => {
        if (!title) return

        if (!id) {
            await axios.post(url, {
                title: title.toString(),
            })
                .then(res => routeRedirect(`/admin/categories/edit/${res.data.id}`))
                .catch(err => console.log(err))

        } else {
                await axios.put(`${url}/update`, {
                    id,
                    title
                })
                    .then(() => routeRedirect(`/admin/categories`))
                    .catch(err => console.log(err))
        }
    }

    return (
        <>
            <hr />
            <Card>
                <Card.Header>
                    <h2>{`${id ? 'Editar' : 'Cadastrar'} categoria`}</h2>
                </Card.Header>

                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Título da categoria</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Informe o título da categoria"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </Form.Group>

                        <Button
                            variant="success"
                            type="button"
                            onClick={onClickSave}
                        >
                            {id ? 'Atualizar' : 'Cadastrar'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default CategoryForm;