import React, { useState, useEffect, useRef } from "react"
import { Button, Card, Form, FloatingLabel } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import { useApi } from "../../../../hooks/useApi"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Editor } from '@tinymce/tinymce-react';

function ArticlesForm() {

    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [article, setArticle] = useState('')
    const [categoryId, setCategoryId] = useState('')
    let url = 'http://localhost:8000/admin/articles'
    const navigate = useNavigate()
    const editorRef = useRef()

    const { data: category, loading } = useApi({
        url: `http://localhost:8000/admin/categories`,
        method: 'GET'
    })

    const { data } = useApi({
        url: `${url}/edit/${id}`,
        method: 'GET'
    })

    if (!id) {
        url = `${url}/new`
    }

    useEffect(() => {
        if (data && !article && !title) {
            setArticle(data.body)
            setTitle(data.title)
            setCategoryId(data.categoryId)
        }
    }, [data])


    const routeRedirect = (path) => {
        navigate(path)
    }

    const onClickSave = async () => {
        if (!id) {

            await axios.post(url, {
                title,
                body: article,
                categoryId,
            })
                .then(res => routeRedirect(`/admin/articles/edit/${res.data.id}`))
                .catch(err => console.log(err))

        } else {
            await axios.put(`${url}/update`, {
                id,
                title,
                body: article,
                categoryId,
            })
                .then((res) => console.log(res))
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <hr />
            <Card>
                <Card.Header>
                    <h2>{`${id ? 'Editar' : 'Cadastrar'} artigo`}</h2>
                </Card.Header>

                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Informe o título do artigo"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />

                            <Form.Label className="mt-3">Categoria</Form.Label>
                            <Form.Select
                                onChange={(e) => setCategoryId(e.target.value)}
                                style={{ width: 400 }}
                                value={categoryId}
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
                                onKeyUp={() => setArticle(editorRef.current.getContent())}
                                init={{
                                    height: 300,
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

export default ArticlesForm;