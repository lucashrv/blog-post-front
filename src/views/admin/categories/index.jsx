import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from 'react-bootstrap'
import { useApi } from "../../../hooks/useApi"
import axios from "axios"

export default function Category() {
    const [dataSearch, setDataSearch] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()

    const baseUrl = 'http://localhost:8000/admin/categories/delete'

    const { data: categories, loading, error } = useApi({
        url: 'http://localhost:8000/admin/categories',
        method: 'GET'
    })

    useEffect(() => {
        if (!loading) {
            setDataSearch(categories)
        }
    }, [loading])

    const routeRedirect = (id) => {
        let path = `/admin/categories/edit/${id}`
        navigate(path)
    }

    const handleDelete = async (id) => {
        if (id != undefined && id != null && !isNaN(id)) {
            await axios.delete(baseUrl + `/${id}`)
                .then((res) => {
                    setDataSearch(dataSearch.filter(cat => cat.id !== id))
                })
                .catch(err => console.log(err))
        }
    }

    const popUp = (id) => {
        const decision = window.confirm('Tem certeza que quer deletar esta categoria?')

        if (decision) {
            handleDelete(id)
        }
    }

    const searchCategories = () => {
        !loading &&
            setDataSearch(categories.filter(category => {
                let valid = false
                console.log(category)
                if (category.title.toLowerCase().includes(searchValue) ||
                    category.id.toString().includes(searchValue)
                ) {
                    valid = true
                }
                return valid
            }))
    }

    return (
        <>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Categorias</h2>
                <div className="input-group flex-nowrap" style={{ width: 250 }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={'Pesquise uma categoria'}
                        onKeyUp={searchCategories}
                        onChange={e => setSearchValue(e.target.value.toLowerCase())}
                        value={searchValue}
                    />
                </div>
            </div>
            <hr />
            <Link to='/admin/categories/new'>
                <Button
                    variant="success"
                >
                    Nova categoria
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
                    {!loading && dataSearch.length > 0 && dataSearch.map(category => {
                        return (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.title}</td>
                                <td>{category.slug}</td>
                                <td
                                    style={{ display: 'flex', justifyContent: 'space-evenly' }}
                                >
                                    <Button
                                        variant="warning"
                                        onClick={() => routeRedirect(category.id)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => popUp(+category.id)}
                                    >
                                        Deletar
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                    {!loading && dataSearch.length === 0 && (
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