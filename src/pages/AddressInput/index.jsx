import { Container, InputBox, SubmitButton } from "./styles"
import { Header } from "../../components/Header"
import { useForm } from "react-hook-form"
import { Button } from "../../components/Button"
import { useEffect } from "react"
import { useCallback } from "react"
import { useState } from "react"
import { api } from "../../services/api"
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"




export function AddressInput() {

    const params = useParams()//RESPEITAR REGRAS DO HOOK


    const [inputButtonText, setInputButtonText] = useState("Salvar")
    const [users, setUsers] = useState([])


    const { register, handleSubmit, setValue, formState: { errors } } = useForm()



    const handleInput = useCallback((data) => {
        async function handleCreate() {

            //faco ou nao um if se todos estao aki? o forms ja faz isso
            //devo colocar um padrao para o complemento ser null?
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
            alert("alerta temporario!, endereco adicionado com sucesso")
            return resposta
        }
        async function handleUpdate(id) {
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
            alert("alerta temporario!, endereco atualizado com sucesso")
            return resposta

        }

        if (params.id) {
            handleUpdate(params.id)
        } else {
            handleCreate()
        }
    })

    const handleParam = useCallback((id) => {
        async function handle() {
            const address = await api.get(`http://localhost:3002/addr/${id}`)

            console.log(address.data)

            if (address.data.id) {
                setInputButtonText("Editar")

                setValue("cep", address.data.cep)
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
        fetchUsers()
        if (params.id) {
            handleParam(params.id)
        }
    }, [])




    return (
        <Container>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,900&display=swap');
            </style>
            <Header />
            <div class="logoutArrow">
                <Link to="/address">
                    <FiArrowLeft />
                </Link>
            </div>


            <InputBox onSubmit={handleSubmit((data) => {
                console.log(data)

                handleInput(data)

            })}>
                <h1>Adicionar Endereço</h1>
                <div>
                    <p>CEP</p>
                    <div>
                        <input type="number" {...register("cep", {
                            required: { value: true, message: "é preciso informar o cep!" },
                            maxLength: { value: 8, message: "o cep não contem 8 digitos" },
                            minLength: { value: 8, message: "o cep não contem 8 digitos" }
                        })} />
                        <p>{errors.cep?.message}</p>
                    </div>
                </div>

                <div>
                    <p>Nome da rua</p>
                    <div>
                        <input type="text" {...register("nome", { required: { value: true, message: "é preciso informar a rua!" } })} />
                        <p>{errors.nome?.message}</p>

                    </div>
                </div>

                <div>
                    <p>Cidade</p>
                    <div>
                        <input type="text" {...register("cidade", { required: { value: true, message: "é preciso informar a cidade!" } })} />
                        <p>{errors.cidade?.message}</p>
                    </div>
                </div>

                <div>
                    <p>Bairro</p>
                    <div>
                        <input type="text" {...register("bairro", { required: { value: true, message: "é preciso informar o bairro!" } })} />
                        <p>{errors.bairro?.message}</p>
                    </div>
                </div>

                <div>
                    <p>Estado</p>
                    <div>
                        <input type="text" {...register("estado", { required: { value: true, message: "é preciso informar o estado!" } })} />
                        <p>{errors.estado?.message}</p>
                    </div>
                </div>

                <div>
                    <p>Número</p>
                    <div>
                        <input type="number" {...register("numero", { required: { value: true, message: "é preciso informar o número!" } })} />
                        <p>{errors.numero?.message}</p>
                    </div>
                </div>

                <div>
                    <p>Complemento</p>
                    <div>
                        <input placeholder="*opcional" type="text" {...register("complemento", { required: { value: false } })} />
                    </div>
                </div>

                <div>
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
                </div>

                <SubmitButton type="submit">{inputButtonText}</SubmitButton>

                {/* colocar um botao estilo Button do components */}




            </InputBox>
            <p>{errors.cep?.message}</p>


        </Container>
    )
}
