import { Container, Table } from "../Address/styles"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi";
import { api } from "../../services/api";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";


export function Address() {

    const [address,setAddress] = useState([])

    const fetchAddress = useCallback(() => {
        async function fetch() {
            const address = await api.get("http://localhost:3002/addr")

            setAddress(address.data)

            return
        }
        fetch()
    },[])

    useEffect(()=>{
        fetchAddress()


        return
    },[])


    console.log(address)


    return (
        <Container>
            <Header />
            <div class="logoutArrow">
                <Link to="/">
                    <FiArrowLeft />
                </Link>
            </div>

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
                        </tr>
                    </thead>
                    <tbody id="tmp">
                        {
                            address.map(addr => (
                                <tr>
                                    <td>{addr.cep}</td>
                                    <td>{addr.nome}</td>
                                    <td>{addr.cidade}</td>
                                    <td>{addr.bairro}</td>
                                    <td>{addr.estado}</td>
                                    <td>{addr.numero}</td>
                                    <td>{addr.complemento}</td>
                                    <td>{addr.user_id}</td>


                                    {/* <td>
                                        <Link to={`/carsadmin/${car.id}`}>
                                            <Button
                                                title={<AiFillEdit />}>
                                            </Button>
                                        </Link>
                                    </td> */}
                                    <td><Button onClick={() => handleDelete(car.id)} title={<AiOutlineDelete />}></Button></td>
                                </tr>
                            ))
                        }

                    </tbody>
                    <tfoot></tfoot>
                </table>
            </Table>

        </Container>
    )
}