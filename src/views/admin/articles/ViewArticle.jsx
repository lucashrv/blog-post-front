import React, { useState, useEffect, useRef } from "react"
import { Button, Card, Form } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import { useApi } from "../../../hooks/useApi"
import { useNavigate } from "react-router-dom"
import { Editor } from '@tinymce/tinymce-react';

function ViewArticle() {

    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [article, setArticle] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const navigate = useNavigate()
    const editorRef = useRef()
    const url = "http://localhost:8000/admin/articles"

    const { data: category, loading } = useApi({
        url: `http://localhost:8000/admin/categories`,
        method: 'GET'
    })

    const { data } = useApi({
        url: `${url}/edit/${id}`,
        method: 'GET'
    })

    useEffect(() => {
        if (data) {
            setArticle(data.body)
            setTitle(data.title)
            setCategoryId(data.categoryId)
        }
    }, [data])


    const routeRedirect = () => {
        navigate("/")
    }

    return (
        <>
            <hr />
            <Card>
                <Card.Header>
                    <h2>{`Blog Post`}</h2>
                </Card.Header>

                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                disabled={true}
                                type="text"
                                placeholder="Informe o título do artigo"
                                onChange={() => {}}
                                value={title}
                            />

                            <Form.Label className="mt-3">Categoria</Form.Label>
                            <Form.Select
                                style={{ width: 400 }}
                                value={categoryId}
                                disabled={true}
                            >
                                {loading && (<option>...Carregando</option>)}
                                {!loading && category &&

                                    category.map(category => {
                                        const { title, id } = category
                                        return (
                                            <option
                                                key={id}
                                                value={id}
                                            >
                                                {title}
                                            </option>
                                        )
                                    })
                                }
                            </Form.Select>

                            <Form.Label className="mt-3">Artigo</Form.Label>
                            <Editor
                                onInit={(evt, editor) => editorRef.current = editor}
                                value={article}
                                disabled={true}
                                init={{
                                    height: 600,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview hr anchor save emoticons',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    language: 'pt_BR',
                                    toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
                <Button className="mt-4 mb-4" onClick={routeRedirect}>Voltar</Button>
        </>
    )
}

export default ViewArticle;