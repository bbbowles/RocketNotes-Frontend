import {createContext, useContext, useState, useEffect} from "react"

import {api} from "../services/api"

//puxa um "contexto", resumidamente, se o usuario esta autenticado ou nao, o contexto dele

const AuthContext = createContext({})//passamos o contexto default null

function AuthProvider({children}){
    const [data,setData] = useState({}) 

    async function signIn({email,password}){
        try{
            const response = await api.post("http://localhost:3002/sessions", {email,password})
            const {user, token} = response.data

            localStorage.setItem("@rocketnotes:user", JSON.stringify(user)) //enviamos em string
            localStorage.setItem("@rocketnotes:token", token)

            setData({user,token})
            api.defaults.headers.common["Authorization"] = `Bearer ${token}` //insere depois da criacao da sessao, o token no header do axios


        }catch(error){
            if(error.response){
                alert(error.response.data.message)
            }else{
                alert("erro interno")
            }
        }
    
    }

    function signOut(){
         localStorage.clear()

         setData({})
    }

    async function updateProfile({user, avatarFile}){
        try{
            if(avatarFile){
                const fileUploadForm = new FormData()
                fileUploadForm.append("avatar", avatarFile)

                const response = await api.patch("http://localhost:3002/users/avatar", fileUploadForm)
                user.avatar = response.data.avatar
            }

            await api.put("http://localhost:3002/users", user)
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user))

            setData({user,token:data.token})
            alert("perfil atualizado")

        }catch(error){
            if(error.response){
                alert(error.response.data.message)
            }else{
                alert("erro interno")
            }

            }
    }

    useEffect(()=>{
        const token = localStorage.getItem("@rocketnotes:token")
        const user = localStorage.getItem("@rocketnotes:user")

        if(token && user){
            api.defaults.headers.common["Authorization"] = `Bearer ${token}` //insere depois da criacao da sessao, o token no header do axios
      
            setData({token,
                user:JSON.parse(user)}) //recebemos em json

        }
    },[])

    return(
        //passamos no context o signin, signout e o user data, por isso podemos acessar a funcao pelo useAuth()
        <AuthContext.Provider value={{signIn,signOut,updateProfile, user: data.user}}> 
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)

    return context
    
}

export {AuthProvider, useAuth}