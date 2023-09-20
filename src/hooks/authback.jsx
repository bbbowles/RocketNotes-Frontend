import {createContext, useContext,useState} from "react"

import {api} from "../services/api"

//puxa um "contexto", resumidamente, se o usuario esta autenticado ou nao, o contexto dele

const AuthContext = createContext({})//passamos o contexto default null

function AuthProvider({children}){
    const [data,setData] = useState({})

    async function signIn({email,password}){
        try{
            const response = await api.post("http://localhost:3002/sessions", {email,password})
            const {user, token} = response.data

            api.defaults.headers.authorization = `Bearer ${token}` //insere depois da criacao da sessao, o token no header do axios
            setData({user,token})

        }catch(error){
            if(error.response){
                alert(error.response.data.message)
            }else{
                alert("erro interno")
            }
        }
    
    }



    return(
        <AuthContext.Provider value={{signIn, user: data.user}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)

    return context
}

export {AuthProvider, useAuth}