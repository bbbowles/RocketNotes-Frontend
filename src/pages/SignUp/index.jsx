import {Container,Form,Background, Links} from "./styles"
import {Button} from "../../components/Button"
import {Link, useNavigate} from "react-router-dom"
import {useState} from "react"
import {Input} from "../../components/Input"
import {FiLogIn,FiMail,FiLock,FiUser} from "react-icons/fi"

import {api} from "../../services/api"

export function SignUp(){

    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    const navigate = useNavigate()

    async function handleSignUp(){
        if(!name || !email || !password){
            return alert("Preencha todos os campos!")
        }

        api.post("http://localhost:3002/users",{name,email,password})  //executado em seguida, quando o await da certo
     
        .then(() => {
            alert("Usuario cadastrado com sucesso")
            navigate("/")
        })

        .catch(error=>{
            if(error.response){
                alert(error.response.data.message) //puxa a mensagem de erro da parte da backend, criacao de usuario
            }else{
                alert("Não foi possivel cadastrar, tente novamente mais tarde")//executado em caso de erros
            }
        }) 
    }


    return(

        <Container>
             <Background/>
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links uteis</p>

                <h2>Crie Sua Conta</h2>

                <Input placeholder="Nome" type="text" icon={FiUser} onChange={e=>setName(e.target.value)}/>

                <Input placeholder="E-mail" type="text" icon={FiMail} onChange={e=>setEmail(e.target.value)}/>

                <Input placeholder="Senha" type="password" icon={FiLock} onChange={e=>setPassword(e.target.value)}/>

                <Button title="Cadastrar" onClick={handleSignUp}/>

                <Link to="/">Voltar para o login</Link>

                <Links to="/about">
                <h2>Sobre nós</h2>
                </Links>
            </Form>


        </Container>
    )
}
//fazer um sobre e testar funcoes