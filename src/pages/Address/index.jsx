import { AddressCreateButton, Container, Table, Form, CustomAiOutlineDelete, CustomAiFillEdit } from "../Address/styles"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"
// import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi";
import { api } from "../../services/api";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'

import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons, } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom"





export function Address() {

    const columns = [
        { field: 'cep', headerName: 'CEP', width: 150 },
        { field: 'nome', headerName: 'Nome', width: 250 },
        { field: 'cidade', headerName: 'Cidade', width: 350 },
        { field: 'bairro', headerName: 'Bairro', width: 200, },
        { field: "estado", headerName: "Estado", width: 140 },
        { field: "numero", headerName: "Numero", width: 140 },
        { field: "complemento", headerName: "Complemento", width: 220 },
        { field: "name", headerName: "Usuário", width: 140 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Açoes',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {

                return [
                    <GridActionsCellItem
                        icon={<CustomAiFillEdit />}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => editAddress(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem style={{width:"20px"}}
                        icon={<CustomAiOutlineDelete />}
                        label="Delete"
                        onClick={() => handleDelete(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ]

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    const [rows, setRows] = useState([])


    const fetchAddressIndex = useCallback(() => {
        async function fetch() {
            const rows = await api.get("http://localhost:3002/addr")
            // rows.data.cep = rows.data.cep.replace(rows.data.cep[1],`${rows.data.cep[1]}.`)
            // rows.data.cep = rows.data.cep.replace(rows.data.cep[5],`${rows.data.cep[5]}-`)

            setRows(rows.data)


            return

        }
        fetch()
    }, [])


    // {cep, nome, cidade, bairro, estado, numero}
    const fetchFilteredAddress = useCallback(({ cep, nome, cidade, bairro, estado, numero }) => {
        async function fetch() {
            console.log(cep)
            const address = await api.get(`http://localhost:3002/addr/filtered/?cep=${cep}&nome=${nome}&cidade=${cidade}&bairro=${bairro}&estado=${estado}&numero=${numero}`)

            console.log(address.data)

            setRows(address.data)

            return
        }
        fetch()
    }, [])

    const deleteAddress = useCallback((address_id) => {
        async function deleteAddr() {
            await api.delete(`http://localhost:3002/addr/${address_id}`)

            fetchAddressIndex()

            return
        }
        deleteAddr()
    }, [])

    useEffect(() => {
        fetchAddressIndex()


        return
    }, [])


    const handleDelete = useCallback((address_id) => {
        async function deleteAddr() {

            Swal.fire({
                icon: 'warning',
                title: 'Você quer mesmo deletar o endereço?',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: "Não"
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {

                    deleteAddress(address_id)

                    return

                }
            })

        }
        deleteAddr()
    }, [])

    const editAddress = useCallback((id) => {
        async function edit() {
            navigate(`/address/add/${id}`)

            return
        }
        edit()
    }, [])

    const handlePagination = useCallback((pages)=>{
        async function handle(){
            const addr = await api.get(`http://localhost:3002/addr/pagination/${pages}`)

            setRows(addr.data)

            return
        }
        handle()
    },[])




    return (
        <Container>
            <Header />
            <div class="logoutArrow">
                <Link to="/">
                    <FiArrowLeft />
                </Link>
            </div>

            <AddressCreateButton to="/address/add">Criar endereços</AddressCreateButton>

            <h3>Pesquisar Endereço</h3>

            <Form onSubmit={handleSubmit((data) => {
                console.log(data)

                fetchFilteredAddress({
                    cep: data.cep, nome: data.nome, cidade: data.cidade, bairro: data.bairro,
                    estado: data.estado, numero: data.numero
                })
            })}>
                <input placeholder="CEP" type="text" {...register("cep")} />
                <input placeholder="Nome" type="text" {...register("nome")} />
                <input placeholder="Cidade" type="text" {...register("cidade")} />
                <input placeholder="Bairro" type="text" {...register("bairro")} />
                <input placeholder="Estado" type="text" {...register("estado")} />
                <input placeholder="Número" type="text" {...register("numero")} />

                <input class="submit" type="submit" value={"Pesquisar!"} />

            </Form>

            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <div style={{ marginTop: "30px", height: 400, width: '90%', background: "linear-gradient(322deg, rgba(13,172,208,.8) 0%, rgba(11,179,114,.8) 100%)" }}>
                    <DataGrid style={{color:"#ffffff", fontSize:"24px"}}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5]}

                        paginationMode="server"

                        rowCount={6} //puxar do backend
                        
                    />

                </div>

            </div>

            <h2>Force pagination</h2>
            <p>pages</p>

            <button value={0} onClick={(e)=>handlePagination(e.target.value)}>1</button>
            <button value={5} onClick={(e)=>handlePagination(e.target.value)}>2</button>
            <button value={10} onClick={(e)=>handlePagination(e.target.value)}>2</button>

        </Container>
    )
}