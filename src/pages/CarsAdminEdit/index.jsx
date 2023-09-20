import { Container, InputBox } from "./styles"
import { Header } from "../../components/Header"
import { Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi";
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { useRef } from "react";
import { api } from "../../services/api";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"




export function CarsAdminEdit() {

    const params = useParams()

    const [car, setCar] = useState([])
    const [userName, setUserName] = useState([])

    const nameRef = useRef("")
    const brandRef = useRef("")
    const yearRef = useRef("")
    const idRef = useRef("")
    const userIdRef = useRef("")


    

    useEffect(() => {

        async function usersIndex() {
            const users = await api.get("http://localhost:3002/users/index")

            console.log("users", users.data)

            setUserName(users.data)

        }
        async function carShow(id) {
            const dbCar = await api.get(`http://localhost:3002/cars/show/${id}`)

            console.log(dbCar.data)

            setCar(dbCar.data[0])

            console.log("car show", dbCar)

            nameRef.current = dbCar.data[0].names
            brandRef.current = dbCar.data[0].brand
            yearRef.current = dbCar.data[0].year
            idRef.current = params.id
            userIdRef.current = dbCar.data[0].user_id
        }


        usersIndex()
        carShow(params.id)


    }, [params.id])


    async function handleInput({ name, brand, year, user_id, id }) {

        console.log({ name, brand, year, user_id })

        const resposta = await api.post("http://localhost:3002/carsadmin/edit", {
            name,
            brand,
            year,
            user_id,
            car_id
        })

        if (resposta.status == 200) {
            alert("Carro salvo com sucesso")
            return

        } else {
            alert("Um erro interno ocorreu :(")

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

            <InputBox>
                <div>
                    <p>Nome do Carro</p>
                    <Input placeholder={car.names} onChange={e => nameRef.current = e.target.value} />
                </div>
                <div>
                    <p>Marca do Carro</p>
                    <Input placeholder={car.brand} onChange={e => brandRef.current = e.target.value} />

                </div>
                <div>
                    <p>Ano do Carro</p>
                    <Input placeholder={car.year} onChange={e => yearRef.current = e.target.value} />

                </div>
                <div>
                    <p>Usuário</p>
                    {/* <Input onChange={e=>user_idRef.current=e.target.value}/> */}
                    <select onChange={e => userName.current = e.target.value}>

                        {
                            userName.map(user => (
                                <option onClick={() => userIdRef.current = user.id}>{user.name}</option>
                            ))
                        }

                    </select>
                </div>

                <Button title="Editar" onClick={() => handleInput({
                    name: nameRef.current,
                    brand: brandRef.current,
                    year: yearRef.current,
                    user_id: userIdRef.current,
                    id: params.id
                })
                } />

            </InputBox>

        </Container>
    )
}