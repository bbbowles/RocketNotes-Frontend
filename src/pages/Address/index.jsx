import { AddressCreateButton, Container, Table } from "../Address/styles"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi";
import { api } from "../../services/api";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Swal from 'sweetalert2'





export function Address() {

    const [address, setAddress] = useState([])

    const fetchAddress = useCallback(() => {
        async function fetch() {

            const address = await api.get("http://localhost:3002/addr")

            setAddress(address.data)

            return
        }
        fetch()
    }, [])

    const deleteAddress = useCallback((address_id)=>{
        async function deleteAddr(){
            await api.delete(`http://localhost:3002/addr/${address_id}`)

            fetchAddress()

            return
        }
        deleteAddr()
    },[])

    useEffect(() => {
        fetchAddress()


        return
    }, [])


    async function handleDelete(address_id) {

        console.log(address_id)

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




    return (
        <Container>
            <Header />
            <div class="logoutArrow">
                <Link to="/">
                    <FiArrowLeft />
                </Link>
            </div>

            <AddressCreateButton to="/address/add">Criar endereços</AddressCreateButton>

            <div style={{
                display:"flex",
                justifyContent:"center"
            }}>
                <Table>
                    <table>
                        <thead>
                            <tr>
                                <th>CEP</th>
                                <th>Nome</th>
                                <th>Cidade</th>
                                <th>Bairro</th>
                                <th>Estado</th>
                                <th>Número</th>
                                <th>Complemento</th>
                                <th>Usuário</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="tmp">
                            {
                                address.map(addr => (
                                    <tr>
                                        <td>{String(addr.cep).replace(/(?<=^.{2})/, ".").replace(/(?<=^.{6})/, "-")}</td>
                                        <td>{addr.nome}</td>
                                        <td>{addr.cidade}</td>
                                        <td>{addr.bairro}</td>
                                        <td>{addr.estado}</td>
                                        <td>{addr.numero}</td>
                                        <td>{addr.complemento}</td>
                                        <td>{addr.name}</td>


                                        <td>
                                            <Link to={`/address/add/${addr.id}`}>
                                                <Button 
                                                    title={<AiFillEdit />}>
                                                </Button>
                                            </Link>
                                        </td>
                                        <td><Button style={{background:"red"}} onClick={() => handleDelete(addr.id)} title={<AiOutlineDelete />}></Button></td>
                                    </tr>
                                ))
                            }

                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </Table>
            </div>

        </Container>
    )
}