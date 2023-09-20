import {createContext, useContext} from "react"

import {api} from "../services/api"

//puxa um "contexto", resumidamente, se o usuario esta autenticado ou nao, o contexto dele

const AuthContext = createContext({})//passamos o contexto default null

function AuthProvider({children}){

    async function signIn({email,password}){
        try{
            const response = await api.post("http://localhost:3002/sessions", {email,password})
            const {user, token} = response.data
        }catch(error){
            if(error.response){
                alert(error.response.data.message)
            }else{
                alert("erro interno")
            }
        }
    
    }



    return(
        <AuthContext.Provider value={signIn}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)

    return context
}

export {AuthProvider, useAuth}