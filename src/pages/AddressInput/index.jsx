import { Container, InputBox, SubmitButton, InputSegments } from "./styles"
import { Header } from "../../components/Header"
import { useForm, useWatch } from "react-hook-form"
import { Button } from "../../components/Button"
import { useEffect } from "react"
import { useCallback } from "react"
import { useState } from "react"
import { api } from "../../services/api"
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { ErrorPopUp } from "../../components/ErrorPopUp"
import Swal from 'sweetalert2'
import { PatternFormat } from 'react-number-format';
import * as z from 'zod';



export function AddressInput() {

    const navigate = useNavigate()

    const params = useParams()//RESPEITAR REGRAS DO HOOK

    const [isOpenState, setIsOpenState] = useState(false)

    const [inputButtonText, setInputButtonText] = useState("Salvar")
    const [text, setText] = useState()
    const [title, setTitle] = useState()
    const [route, setRoute] = useState()
    const [users, setUsers] = useState([])
    const [cep, setCep] = useState("")


    const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm()

    const addressSchema = z.object({
        cep: z.string().length(8),
        nome: z.string().min(2)

    })

    const handleInput = useCallback((data) => {
        async function handleCreate() {
            try {
                const resposta = await api.post(`http://localhost:3002/addr`, {
                    cep: data.cep,
                    nome: data.nome,
                    cidade: data.cidade,
                    bairro: data.bairro,
                    estado: data.estado,
                    numero: data.numero,
                    complemento: data.complemento,
                    user_id: data.user_id

                })
                Swal.fire({
                    position: 'center',
                    title: 'sucesso!',
                    text: 'O endereço foi criado',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                navigate("/address")
                return resposta
            } catch (error) {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                })

                // alert(error.response.data.message)

                return error
            }

        }
        async function handleUpdate(id) {
            try {
                const resposta = await api.put(`http://localhost:3002/addr/${id}`, {
                    cep: data.cep,
                    nome: data.nome,
                    cidade: data.cidade,
                    bairro: data.bairro,
                    estado: data.estado,
                    numero: data.numero,
                    complemento: data.complemento,
                    user_id: data.user_id
                })
                Swal.fire({
                    position: 'top-end',
                    title: 'sucesso!',
                    text: 'O endereço foi atualizado',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                navigate("/address")

                return resposta
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                })
                return error
            }


        }

        if (params.id) {
            handleUpdate(params.id)

        } else {
            handleCreate()



        }
    })

    const setAddressEditValues = useCallback((id) => {
        async function handle() {
            const address = await api.get(`http://localhost:3002/addr/${id}`)

            console.log(address.data)

            if (address.data.id) {
                setInputButtonText("Editar")

                setValue("cep", address.data.cep)
                setCep(address.data.cep)
                setValue("nome", address.data.nome)
                setValue("cidade", address.data.cidade)
                setValue("bairro", address.data.bairro)
                setValue("estado", address.data.estado)
                setValue("numero", address.data.numero)
                setValue("user_id", address.data.user_id)

                if (address.data.complemento) {
                    setValue("complemento", address.data.complemento)
                }
            }
        }
        handle()
    })






    const fetchUsers = useCallback(() => {
        async function fetch() {
            const dbUsers = await api.get("http://localhost:3002/users/index")

            setUsers(dbUsers.data)

        }
        fetch()
    }, [])

    useEffect(() => {
        // criar async
        async function useEffectAsync() {
            await fetchUsers()
            if (params.id) {
                setAddressEditValues(params.id)
            }
        }
        useEffectAsync()

    }, [])

    const handleOnChangeCep = useCallback((cep) => {
        async function handle() {
            cep = cep.replace('.', '')
            cep = cep.replace("-", "")

            if (!cep.includes("_")) {
                setValue("cep",cep)
                console.log("cep cheio")
                
                const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
                const cepData = await resposta.json()



                console.log(cepData)

                if (!cepData.erro) {
                    setValue("nome", cepData.logradouro)
                    setValue("bairro", cepData.bairro)
                    setValue("cidade", cepData.localidade)
                    setValue("estado", cepData.uf)
                }

            }
        }
        handle()



    })






    return (
        <Container>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,900&display=swap');
            </style>

            <ErrorPopUp id="Popup" isOpenState={isOpenState} title={title} text={text} route={route} />

            <Header />
            <div class="logoutArrow">
                <Link to="/">
                    <FiArrowLeft />
                </Link>
            </div>




            <InputBox onSubmit={handleSubmit((data) => {
                console.log(data)

                data.cep = data.cep.replace('.', '')
                data.cep = data.cep.replace("-", "")

                const result = addressSchema.safeParse(data);

                console.log(result)

                handleInput(data)


            })}>
                <h1>Adicionar Endereço</h1>
                <div>
                    <InputSegments>
                        <p>CEP</p>
                        <div>
                            <PatternFormat value={cep} format="##.###-###"
                                allowEmptyFormatting mask="_" onChange={e => handleOnChangeCep(e.target.value)}
                            // setValue("cep",e.target.value)
                            // {...register("cep", {
                            //     required: { value: true, message: "é preciso informar o cep!" },
                            //     maxLength: { value: 8, message: "o cep não contem 8 digitos" },
                            //     minLength: { value: 8, message: "o cep não contem 8 digitos" }
                            // })}
                            />







                            {/* <input type="number"  {...register("cep", {
                                required: { value: true, message: "é preciso informar o cep!" },
                                maxLength: { value: 8, message: "o cep não contem 8 digitos" },
                                minLength: { value: 8, message: "o cep não contem 8 digitos" }
                            })} /> */}
                            <p>{errors.cep?.message}</p>
                        </div>
                    </InputSegments>

                    <InputSegments>
                        <p>Nome da rua</p>
                        <div>
                            <input type="text" {...register("nome", { required: { value: true, message: "é preciso informar a rua!" } })} />
                            <p>{errors.nome?.message}</p>

                        </div>
                    </InputSegments>

                    <InputSegments>
                        <p>Cidade</p>
                        <div>
                            <input type="text" {...register("cidade", { required: { value: true, message: "é preciso informar a cidade!" } })} />
                            <p>{errors.cidade?.message}</p>
                        </div>
                    </InputSegments>

                    <InputSegments>
                        <p>Bairro</p>
                        <div>
                            <input type="text" {...register("bairro", { required: { value: true, message: "é preciso informar o bairro!" } })} />
                            <p>{errors.bairro?.message}</p>
                        </div>
                    </InputSegments>

                    <InputSegments>
                        <p>Estado</p>
                        <div>
                            <input type="text" {...register("estado", { required: { value: true, message: "é preciso informar o estado!" } })} />
                            <p>{errors.estado?.message}</p>
                        </div>
                    </InputSegments>

                    <InputSegments>
                        <p>Número</p>
                        <div>
                            <input type="number" {...register("numero", { required: { value: true, message: "é preciso informar o número!" } })} />
                            <p>{errors.numero?.message}</p>
                        </div>
                    </InputSegments>

                    <InputSegments>
                        <p>Complemento</p>
                        <div>
                            <input placeholder="*opcional" type="text" {...register("complemento", { required: { value: false } })} />
                        </div>
                    </InputSegments>

                    <InputSegments>
                        <p>Usuário</p>
                        <div>
                            <select {...register("user_id", { required: { value: true, message: "é preciso informar o usuario!" } })}>
                                <option value="">Clique para expandir</option>
                                {
                                    users.map(user => (
                                        <option value={user.id} >{user.name}</option>
                                    ))
                                }
                            </select>
                            <p>{errors.user_id?.message}</p>
                        </div>
                    </InputSegments>
                </div>

                <SubmitButton type="submit">{inputButtonText}</SubmitButton>

                {/* colocar um botao estilo Button do components */}




            </InputBox>


        </Container>
    )
}

// https://zod.dev/?id=basic-usage
// https://7.dev/getting-started-with-zod/