import {Container,Form,Background} from "./styles"
import {Button} from "../../components/Button"
import {Link, useNavigate} from "react-router-dom"
import {Input} from "../../components/Input"
import {FiLogIn,FiMail,FiLock} from "react-icons/fi"

import {api} from "../../services/api"

import{useAuth} from "../../hooks/auth"
import{useState, useRef, useCallback} from "react"

export function SignIn(){
    
    const refEmail = useRef("")
    const refPassword = useRef("")
    const[email,setEmail] = useState("") //é usado o useState por que variaveis nao permanecem entre renderizacoes
    const[password,setPassword] = useState("")

    console.log("qualquer coisa")

    const {signIn} = useAuth() //estava entre chaves, nao funcionou

    function handleSignIn(e){
        e?.preventDefault()
        signIn({email:refEmail.current,password:refPassword.current})

    }
    // const handleSignIn = useCallback(()=>{
    //     signIn({email:refEmail.current,password})
    //     console.log(password)
    //     console.log(refEmail.current)

    // },[password])
2
    return(

        <Container>
            <Form onSubmit={handleSignIn}>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links uteis</p>

                <h2>Faça seu login</h2>

                <Input placeholder="E-mail" type="text" icon={FiMail} 
                onChange={e=>{
                   refEmail.current = e.target.value
                    }}
                    // onKeyPress={(e)=>{
                    //     console.log(e.code)
                    //     if(e.code=="Enter"){
                    //         handleSignIn()
                    //         }}}
                            />

                <Input placeholder="Senha" type="password" icon={FiLock} 
                onChange={e=>{
                    refPassword.current = e.target.value
                    }}
                    // onKeyPress={(e)=>{
                    //     console.log(e.code)
                    //     if(e.code=="Enter"){
                    //         handleSignIn()
                    //         }}}
                            />

                <Button type="submit" title="Entrar" onClick={()=>{handleSignIn()}}/>

                <Link to="/register">Criar Conta</Link>
            </Form>

            <Background/>
        </Container>
    )
}
 //no jsx coloca virgula em vez de + antes de uma var?
