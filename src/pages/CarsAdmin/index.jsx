import { Container, InputBox } from "./styles"
import { Header } from "../../components/Header"
import { Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi";
import { api } from "../../services/api";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { useCallback } from "react";
import { ErrorPopUp } from "../../components/ErrorPopUp"
import { useNavigate } from "react-router-dom";




export function CarsAdmin() {

    const navigate = useNavigate();

    let tmp

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    console.log(errors.carName?.message)



    const userIdRef = useRef("")
    const [userName, setUserName] = useState([])
    const [selectedName, setSelectedName] = useState("")
    const [inputButtonText, setInputButtonText] = useState("Salvar")
    const [isOpenState, setIsOpenState] = useState(false)
    const [text, setText] = useState("")
    const [title, setTitle] = useState("")
    const [textButton, setTextButton] = useState("")
    const [route, setRoute] = useState("")



    const params = useParams()

    const showCars = useCallback((id) => {

        async function carShow() {
            const dbCar = await api.get(`http://localhost:3002/cars/show/${id}`)

            console.log(dbCar.data)
            console.log("car show", dbCar)

            if (dbCar.data.id) {
                console.log("carro existe!")

                setInputButtonText("Editar")
                setValue("carName", dbCar.data.names)
                setValue("carBrand", dbCar.data.brand)
                setValue("carYear", dbCar.data.year)
                setValue("userId", dbCar.data.user_id)
                // userShow(dbCar.data.user_id)


            } else {
                alert("Carro nao encontrado")
            }

            return dbCar
        }
        carShow()


    })
    const userShow = useCallback((id) => {

        async function userFetch() {
            const user = await api.get(`http://localhost:3002/users/${id}`)
            console.log("user", user.data.name)
            setSelectedName(user.data.name)
            return

        }
        userFetch()
    })



    useEffect(() => {


        async function usersIndex() {
            const users = await api.get("http://localhost:3002/users/index")
            console.log(users)

            setUserName(users.data)


            if (params.id) {

                showCars(params.id)


            }

        }

        usersIndex()

    }, [])



    async function handleInput({ name, brand, year, user_id, car_id }) {

        console.log(car_id)

        if (!car_id) {
            console.log("nao foi recebido car_id")
            if (!name || !brand || !year || !user_id) {
                alert("Preencha todos os campos primeiro!")
            } else {
                const resposta = await api.post("http://localhost:3002/carsadmin", {
                    name,
                    brand,
                    year,
                    user_id
                })

                if (resposta.status == 200) {

                    setTitle("Tudo certo!")
                    setText("Carro salvo com sucesso")
                    setRoute("/cars")
                    setIsOpenState(true)

                    return
                }
                else {
                    setText("Não foi possivel salvar o carro")
                    setIsOpenState(true)
                }

            }
        }
        else {
            try {
                console.log("foi recebido car_id")
                const resposta = await api.post("http://localhost:3002/carsadmin/edit", {
                    name,
                    brand,
                    year,
                    user_id,
                    id: car_id
                })

                if (resposta.status == 200) {

                    setTitle("Tudo certo!")
                    setText("Carro salvo com sucesso")
                    setIsOpenState(true)


                    return

                } else {
                    setText("Não foi possivel salvar o carro")
                    setIsOpenState(true)

                }
            } catch {
                setIsOpenState(true)
            }

        }


    }



    return (
        <Container>
            <ErrorPopUp isOpen={isOpenState} title={title} text={text} textButton={textButton} route={route} />
            <Header />
            <div class="logoutArrow">
                <Link to="/">
                    <FiArrowLeft />
                </Link>
            </div>

            <InputBox onSubmit={handleSubmit((data) => {

                console.log(data)
                handleInput({ name: data.carName, brand: data.carBrand, year: data.carYear, user_id: data.userId, car_id: params.id })
            })}>

                <div>
                    <p>Nome do Carro</p>
                    <input placeholder={errors.carName?.message} {...register("carName", { required: { value: true, message: "é preciso informar o nome do carro!" } })} />
                </div>


                <div>
                    <p>Marca do Carro</p>
                    <input placeholder={errors.carBrand?.message}{...register("carBrand", { required: { value: true, message: "é preciso informar a marca do carro!" } })} />
                </div>


                <div>
                    <p>Ano do Carro</p>
                    <input placeholder={errors.carYear?.message}{...register("carYear", { required: { value: true, message: "é preciso informar o ano do carro!" } })} />
                </div>


                <div>
                    <p>Usuário</p>
                    <select {...register("userId", { required: { value: true, message: "è preciso informar o usuário!" } })}>
                        {/* <option>{selectedName}</option> */}
                        <option value="">{errors.userId?.message ? errors.userId?.message : "Selecione o usuário"}</option>

                        {
                            userName.map(user => (
                                <option value={user.id} >{user.name}</option>
                            ))
                        }


                    </select>
                </div>


                <input value={inputButtonText} type="submit" title={"Salvar"} />


            </InputBox>

        </Container>
    )
}