import { Container, Table } from "../Cars/styles";
import { Header } from "../../components/Header"
import { useState, useEffect, useRef, useCallback } from "react"
import { api } from "../../services/api";
import { Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { Button } from "../../components/Button";




export function Cars() {


    const [cars, setCars] = useState([])
    const [id, setUser] = useState("")
    const [change, setChange] = useState("")

    const fetchCars = useCallback(() => {
        async function fetch(){
            const response = await api.get("http://localhost:3002/cars")
            setCars(response.data)
            console.log("usecallback")
        }
        fetch()
    }, [])



    useEffect(() => {
        fetchCars()
        console.log("useeffect")

    }, [])

    console.log("cars",cars)



    async function handleDelete(id) {

        const confirm = window.confirm("Deseja realmente apagar a nota?")

        if (confirm) {
            await api.delete(`http://localhost:3002/carsadmin/${id}`)

            fetchCars()

            return

        }

    }


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
                            <th>Nome</th>
                            <th>Marca</th>
                            <th>Ano</th>
                            <th>Usuário</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tmp">
                        {/* fazer um for each do carsRef.current e criar 3 th por linha no sql */}
                        {
                            cars.map(car => (
                                <tr>
                                    <td>{car.names}</td>
                                    <td>{car.brand}</td>
                                    <td>{car.year}</td>
                                    <td>{car.name}</td>
                                    <td>
                                        <Link to={`/carsadmin/${car.id}`}>
                                            <Button
                                                title={<AiFillEdit />}>
                                            </Button>
                                        </Link>
                                    </td>
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

