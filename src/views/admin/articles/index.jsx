import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from 'react-bootstrap'
import { useApi } from "../../../hooks/useApi"
import axios from "axios"

export default function Article() {
    const [dataSearch, setDataSearch] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()

    const baseUrl = 'http://localhost:8000/admin/articles/delete'

    const { data: articles, loading, error } = useApi({
        url: 'http://localhost:8000/admin/articles',
        method: 'GET'
    })

    useEffect(() => {
        if (!loading) {
            setDataSearch(articles)
        }
    }, [loading])

    const routeRedirect = (id) => {
        let path = `/admin/articles/edit/${id}`
        navigate(path)
    }

    const handleDelete = async (id) => {
        if (id != undefined && id != null && !isNaN(id)) {
            await axios.delete(baseUrl + `/${id}`)
                .then(() => {
                    setDataSearch(dataSearch.filter(cat => cat.id !== id))
                })
                .catch(err => console.log(err))
        }
    }

    const popUp = (id) => {
        const decision = window.confirm('Tem certeza que quer deletar este artigo?')

        if (decision) {
            handleDelete(id)
        }
    }

    const searchArticles = () => {
        !loading &&
            setDataSearch(articles.filter(article => {
                return article.title.toLowerCase().includes(searchValue)
            }))
    }

    return (
        <>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Artigos</h2>
                <div className="input-group flex-nowrap" style={{ width: 250 }}>
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
            <Link to='/admin/articles/new'>
                <Button
                    variant="success"
                >
                    Novo artigo
                </Button>
            </Link>
            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Título</th>
                        <th>Slug</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td
                                style={{ textAlign: 'center' }}
                                colSpan="4"
                            >
                                ...Carregando
                            </td>
                        </tr>
                    )}
                    {!loading && dataSearch.length > 0 && dataSearch.map(article => {
                        return (
                            <tr key={article.id}>
                                <td>{article.id}</td>
                                <td>{article.title}</td>
                                <td>{article.slug}</td>
                                <td
                                    style={{ display: 'flex', justifyContent: 'space-evenly' }}
                                >
                                    <Button
                                        variant="warning"
                                        onClick={() => routeRedirect(article.id)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => popUp(+article.id)}
                                    >
                                        Deletar
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                    {dataSearch.length === 0 && (
                        <tr>
                            <td
                                style={{ textAlign: 'center' }}
                                colSpan="4">Nenhuma categoria encontrada</td>
                        </tr>
                    )}
                </tbody>

            </table>
        </>
    )
}