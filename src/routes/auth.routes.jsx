import {Routes, Route} from "react-router-dom"

import {SignIn} from "../pages/SignIn"
import {SignUp} from "../pages/SignUp"
import { AboutUs } from "../pages/AboutUs"


export function AuthRoutes(){
    return(
        <Routes>
            <Route path ="/" element={<SignIn/>}/>
            <Route path ="/register" element={<SignUp/>}/>
            <Route path ="/about" element={<AboutUs/>}/>
        </Routes>
    )
}