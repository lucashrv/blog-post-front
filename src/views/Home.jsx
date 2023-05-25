import React, { useState, useEffect } from "react"
import { useApi } from "../hooks/useApi"
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination'

export default function Home() {

    const [dataSearch, setDataSearch] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    const { page } = useParams()
    let currentPage = page ? +page : 1

    const { data: articles, loading } = useApi({
        url: `http://localhost:8000/articles/pagination/${currentPage}`
    })

    useEffect(() => {
        if (!loading && articles) {
            setDataSearch(articles.data.rows)
        }
        console.log(dataSearch);
        console.log(articles);
    }, [loading])

    const searchArticles = () => {
        !loading &&
            setDataSearch(articles.data.rows.filter(article => {
                return article.title.toLowerCase().includes(searchValue)
            }))
    }

    const routeRedirect = (id) => {
        let path = `/article/${id}`
        navigate(path)
    }

    if(!page){
        currentPage = 1
    }

    const pagination = {
        perPage: 4,
        first: () => {
            if (currentPage === 1) return

            currentPage = 1
            window.location.href = `/${currentPage}`
        },
        last: () => {
            if (currentPage === Math.ceil(articles.data.count / pagination.perPage)) return

            currentPage = Math.ceil(articles.data.count / pagination.perPage)
            window.location.href = `/${currentPage}`
        },
        next: () => {
            if(articles.next){
                currentPage = currentPage + 1
                window.location.href = `/${currentPage}`
            }
        },
        prev: () => {
            if(currentPage === 1) return

            currentPage = currentPage - 1
            window.location.href = `/${currentPage}`
        }
    }

    return (
        <>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1 className="display-4">Seja bem-vindo!</h1>
                <div className="input-group flex-nowrap" style={{ width: 250, height: 50 }}>
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
            <div className="jumbotron">
                <h2>Artigos</h2>
                <p className="lead">Aqui você pode ver artigos postados e criar novos artigos</p>
                <hr className="my-4" />
                <p>Crie uma conta para poder postar seus artigos</p>
                <a className="btn btn-primary mb-3 ml-1" href="#" role="button">Criar conta</a>
            </div>
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
            <div>
                <Pagination style={{ margin: '20px auto', width: 140 }}>
                    <Pagination.First onClick={pagination.first} />
                    <Pagination.Prev onClick={pagination.prev} />
                    <Pagination.Item active>{currentPage}</Pagination.Item>
                    <Pagination.Next onClick={pagination.next} />
                    <Pagination.Last onClick={pagination.last} />
                </Pagination>
            </div>
        </>
    )
}