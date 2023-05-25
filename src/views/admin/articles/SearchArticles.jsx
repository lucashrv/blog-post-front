import React, { useState, useEffect } from "react"
import { useApi } from "../../../hooks/useApi"
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

export default function SearchArticles() {

    const { id } = useParams()
    const [dataSearch, setDataSearch] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()

    const { data: category, loading } = useApi({
        url: `http://localhost:8000/articles/GetArticlesByCategory/${id}`
    })

    useEffect(() => {
        if (!loading) {
            setDataSearch(category.articles)
        }
        console.log(category);
    }, [loading])

    const searchArticles = () => {
        !loading &&
            setDataSearch(category.articles.filter(article => {
                return article.title.toLowerCase().includes(searchValue)
            }))
    }

    const routeRedirect = (id) => {
        let path = `/article/${id}`
        navigate(path)
    }

    return (
        <>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5 style={{ marginTop: 15 }}>Artigos buscados por categoria "{!loading && category.title}"</h5>
                <div className="input-group flex-nowrap" style={{ width: 250, height:50 }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={'Pesquise uma categoria'}
                        onKeyUp={searchArticles}
                        onChange={e => setSearchValue(e.target.value.toLowerCase())}
                        value={searchValue}
                    />
                </div>
            </div>
            <hr />
            {loading && (
                <div style={{ textAlign: 'center' }}>
                    ...Carregando
                </div>
            )}
            {!loading && dataSearch.length > 0 && dataSearch.map(article => {
                return (
                    <Card key={article.id} className='mb-4'>
                        <Card.Header>
                            <h4>{article.title}</h4>
                        </Card.Header>

                        <Card.Body>
                            <Form>
                                <Button
                                    variant="success"
                                    type="button"
                                    onClick={() => routeRedirect(article.id)}
                                >
                                    Ler artigo
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                )
            })}
            {!loading && dataSearch.length === 0 && (
                <div style={{ textAlign: 'center' }}>
                    Nenhum artigo encontrado
                </div>
            )}
        </>
    )
}