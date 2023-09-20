import { Container,Form,Avatar} from "./style";
import {FiArrowLeft,FiUser,FiMail,FiLock,FiCamera} from "react-icons/fi"
import {Input} from "../../components/Input"
import {Button} from "../../components/Button"
import {Link} from "react-router-dom"
import { useState, } from "react";
import { useAuth } from "../../hooks/auth";
import {api} from "../../services/api"

import avatarPlaceholder from "../../assets/no_avatar-3909400661.jpg"

export function Profile(){ //usar o ref depois, mais facil
    const {user,updateProfile} = useAuth()

    const [name,setName] = useState(user.name)
    const [email,setEmail] = useState(user.email)
    const [passwordOld,setPasswordOld] = useState()
    const [passwordNew,setPasswordNew] = useState()

    const avatarUrl = user.avatar ?`http://localhost:3002/avatar/${user.avatar}` :avatarPlaceholder //por que

    const [avatar, setAvatar] = useState(user.avatar)
    const [avatarFile, setAvatarFile] = useState(null)

    async function handleUpdate(){
        const user={
            avatar,
            name,
            email,
            password:passwordNew,
            old_password:passwordOld
        }

        await updateProfile({user, avatarFile})
    }

    function handleChangeAvatar(e){
        const file = e.target.files[0] //pode enviar varios arquivos, entao array de posicao zero sempre
        setAvatarFile(file)

        const imagePreview = URL.createObjectURL(file)
        setAvatar(imagePreview)
    }
    //refEmail e refName nao deixavam atualizar o valor do input, melhor opcao e colocar o email e nome
    //no placeholder e mudar a cor para branco


    return(
        <Container>
            <header>
                <Link to="/">
                <FiArrowLeft/> 
                </Link>

            </header>
            <Form>
                <Avatar>
                    <img src={avatarUrl} alt="" />

                    <label htmlFor="avatar">
                        <FiCamera />
                        <input id="avatar" type="file" onChange={handleChangeAvatar}/>
                    </label>
                </Avatar>
                <Input placeholder="Nome" type="text" icon={FiUser} value={name}
                    onChange={e=>setName(e.target.value)}
                />

                <Input placeholder="Email" type="text" icon={FiMail} value={email}
                    onChange={e=>setEmail(e.target.value)}
                />

                <Input placeholder="Senha atual" type="password" icon={FiLock}
                    onChange={e=>setPasswordOld(e.target.value)}
                />

                <Input placeholder="Nova senha" type="password" icon={FiUser}
                    onChange={e=>setPasswordNew(e.target.value)}
                />

                <Button title="Salvar" onClick={handleUpdate}/>
            </Form>
        </Container>
    )
}
