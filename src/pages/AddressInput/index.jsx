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



export function AddressInput() {

    const [users, setUsers] = useState([])

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    // fazer primeiro o handle input para criar, depois checar se veio parametro e caso vier fazer o handle de editar
    // colocar o select, fazer o mapa, useEffect e useCallback para puxar usuarios etc etc

    const fetchUsers = useCallback(()=>{
        async function fetch(){
            const dbUsers = await api.get("http://localhost:3002/users/index")

            setUsers(dbUsers.data)

        }
        fetch()
    },[])

    useEffect(()=>{
        fetchUsers()
    },[])


    async function handleInput(data){
        //faco ou nao um if se todos estao aki? o forms ja faz isso
        //devo colocar um padrao para o complemento ser null?
        const resposta = await api.post(`http://localhost:3002/addr`,{
            cep:data.cep,
            nome:data.nome,
            cidade:data.cidade,
            bairro:data.bairro,
            estado:data.estado,
            numero:data.numero,
            complemento:data.complemento,
            user_id:data.user_id
            
        })
        alert("alerta temporario!, endereco adicionado com sucesso")
        return resposta
    }


    return (
        <Container>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
            </style>
            <Header />
            <div class="logoutArrow">
                <Link to="/">
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
                        <input type="number" {...register("cep", { required: { value: true, message: "é preciso informar o nome do carro!" } })} />
                    </div>
                </div>

                <div>
                    <p>Nome da rua</p>
                    <div>
                        <input type="text" {...register("nome", { required: { value: true, message: "é preciso informar o nome do carro!" } })} />
                    </div>
                </div>

                <div>
                    <p>Cidade</p>
                    <div>
                        <input type="text" {...register("cidade", { required: { value: true, message: "é preciso informar o nome do carro!" } })} />
                    </div>
                </div>

                <div>
                    <p>Bairro</p>
                    <div>
                        <input type="text" {...register("bairro", { required: { value: true, message: "é preciso informar o nome do carro!" } })} />
                    </div>
                </div>

                <div>
                    <p>Estado</p>
                    <div>
                        <input type="text" {...register("estado", { required: { value: true, message: "é preciso informar o nome do carro!" } })} />
                    </div>
                </div>

                <div>
                    <p>Número</p>
                    <div>
                        <input type="number" {...register("numero", { required: { value: true, message: "é preciso informar o nome do carro!" } })} />
                    </div>
                </div>

                <div>
                    <p>Complemento</p>
                    <div>
                        <input placeholder="*opcional" type="text" {...register("complemento",{required:{value:false}})} />
                    </div>
                </div>

                <div>
                    <p>Usuário</p>
                    <div>
                        <select {...register("user_id",{ required: { value: true, message: "é preciso informar o usuario!" } })}>
                            <option value="">Clique para expandir</option>
                            {
                                users.map(user => (
                                    <option value={user.id} >{user.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <SubmitButton type="submit">Salvar</SubmitButton>

                {/* colocar um botao estilo Button do components */}




            </InputBox>

        </Container>
    )
}
