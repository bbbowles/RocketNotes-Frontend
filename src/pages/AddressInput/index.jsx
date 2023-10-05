import { Container, InputBox, SubmitButton, InputSegments } from "./styles"
import { Header } from "../../components/Header"
import { useForm} from "react-hook-form"
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

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';



export function AddressInput() {

    const navigate = useNavigate()

    const params = useParams()//RESPEITAR REGRAS DO HOOK

    const [isOpenState, setIsOpenState] = useState(false)

    const [inputButtonText, setInputButtonText] = useState("Salvar")
    const [users, setUsers] = useState([])
    const [cep, setCep] = useState("")

    const addressSchema = z.object({
        
        
        cep: z.string().trim().length(8, { message: "Um cep deve ter exatamente 8 números" }),

        nome: z.string().min(3, { message: "Digite um nome de pelomenos 3 caracteres" }).max(20,{message:"Texto muito grande!"}),

        cidade: z.string().min(3, { message: "O nome da cidade deve ter pelomenos 3 caracteres" }).max(30,{message:"Texto muito grande!"}),

        bairro: z.string().min(3, { message: "O nome do bairro deve ter pelomenos 3 caracteres" }).max(15,{message:"Texto muito grande!"}),

        estado: z.string().length(2, { message: "O estado deve ser escrito em sigla, apenas 2 caracteres permitidos" }),

        numero: z.string().min(1, { message: "O número da casa deve ser maior que zero" }).max(4,{message:"Número muito grande!"}),

        user_id: z.string().min(1, { message: "O user id deve ser maior que zero" })

    })


    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(addressSchema),
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
            console.log("handleUpdate")
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

            address.data.cep = String(address.data.cep)


            if (address.data.id) {
                setInputButtonText("Editar")

                setValue("cep", String(address.data.cep))
                setCep(String(address.data.cep))//===================================================================
                setValue("nome", String(address.data.nome))
                setValue("cidade", String(address.data.cidade))
                setValue("bairro", String(address.data.bairro))
                setValue("estado", String(address.data.estado))
                setValue("numero", String(address.data.numero))
                setValue("user_id", String(address.data.user_id))

                if (address.data.complemento) {
                    setValue("complemento", String(address.data.complemento))
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
            console.log(cep,"alo")
            cep = cep.replace('.', "")
            cep = cep.replace("-", "")
            console.log(cep,"alo")

            setValue("cep", String(cep))
            //era so colocar o setValue aki fora

            if (cep.length==8) {
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

            <Header />
            <div class="logoutArrow">
                <Link to="/">
                    <FiArrowLeft />
                </Link>
            </div>




            <InputBox onSubmit={handleSubmit((data) => {
                console.log(data)


                data.numero = Number(data.numero)
                data.cep = String(data.cep).replace('.', '')
                data.cep = String(data.cep).replace("-", "")
                data.user_id = Number(data.user_id)

                console.log(data)


                try {
                    // console.log("parse")
                    // console.log(addressSchema.parse(data))

                    handleInput(data)

                    return

                } catch (err) {
                    if (err instanceof z.ZodError) {
                        console.log(err.issues);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: err.issues[0].message,
                        })
                    }
                }


            })}>
                <h1>Adicionar Endereço</h1>
                <div>
                    <InputSegments>
                        <p>CEP</p>
                        <div>
                            <PatternFormat value={cep} format="##.###-###"
                                allowEmptyFormatting patternChar="#" mask="" onChange={e => handleOnChangeCep(e.target.value)} />
                            <p>{errors.cep?.message}</p>
                        </div>
                    </InputSegments>

                    <InputSegments>
                        <p>Nome da rua</p>
                        <div>
                            <input type="text" {...register("nome")} />
                            <p>{errors.nome?.message}</p>

                        </div>
                    </InputSegments>

                    <InputSegments>
                        <p>Cidade</p>
                        <div>
                            <input type="text" {...register("cidade")} />
                            <p>{errors.cidade?.message}</p>
                        </div>
                    </InputSegments>

                    <InputSegments>
                        <p>Bairro</p>
                        <div>
                            <input type="text" {...register("bairro")} />
                            <p>{errors.bairro?.message}</p>
                        </div>
                    </InputSegments>

                    <InputSegments>
                        <p>Estado</p>
                        <div>
                            <input type="text" {...register("estado")} />
                            <p>{errors.estado?.message}</p>
                        </div>
                    </InputSegments>

                    <InputSegments>
                        <p>Número</p>
                        <div>
                            <input type="number" {...register("numero")} />
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
                            <select {...register("user_id")}>
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

// Object { success: false, error: Getter }
// ​
// _error: ZodError: [
//   {
//     "code": "too_big",
//     "maximum": 2,
//     "type": "string",
//     "inclusive": true,
//     "exact": true,
//     "message": "O estado deve ser escrito em sigla, apenas 2 caracteres permitidos",
//     "path": [
//       "estado"
//     ]
//   }
// ]
// ​
// error: 
// ​
// success: false
// ​
// <get error()>: function error()
// ​
// <prototype>: Object { … }
// index.jsx:254:24
