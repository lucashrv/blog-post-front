import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from 'react-bootstrap'
import { useApi } from "../../../hooks/useApi"
import axios from "axios"

export default function Category() {
    const [dataSearch, setDataSearch] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const baseUrl = 'http://localhost:8000/admin/categories/delete'

    const { data: categories, loading, error } = useApi({
        url: 'http://localhost:8000/admin/categories',
        method: 'GET'
    })

    useEffect(() => {
        if(!loading){
            setDataSearch(categories)
        }
    }, [categories])

    const handleDelete = async (id) => {
        if(id != undefined && id != null && !isNaN(id)){
            console.log(id)
            await axios.delete(baseUrl + `/${id}`)
                .then((res) => {
                    window.location.href = "http://localhost:3000/admin/categories"
                })
                .catch(err => console.log(err))
        }
    }

    const searchCategories = () => {
        !loading &&
            setDataSearch(categories.filter(category => {
                return category.title.toLowerCase().includes(searchValue)
            }))
    }

    return (
        <>
            <hr />
            <div style={{ display:'flex', justifyContent:'space-between' }}>
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
                            <td>...Carregando</td>
                        </tr>
                    )}
                    {!loading && dataSearch.map(category => {
                        return(
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.title}</td>
                                <td>{category.slug}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(+category.id)}
                                        className="btn btn-danger"
                                    >
                                        Deletar
                                    </button>
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