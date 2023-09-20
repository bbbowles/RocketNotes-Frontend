import {Routes, Route} from "react-router-dom"

import {New} from "../pages/New"
import {Home} from "../pages/Home"
import {Profile} from "../pages/Profile"
import {Details} from "../pages/Details"
import {Cars} from "../pages/Cars"
import {CarsAdmin} from "../pages/CarsAdmin"


export function AppRoutes(){
    return(
        <Routes>
            <Route path ="/" element={<Home/>}/>
            <Route path ="/new" element={<New/>}/>
            <Route path ="/profile" element={<Profile/>}/>
            <Route path ="/details/:id" element={<Details/>}/>
            <Route path ="/cars" element={<Cars/>}/>
            <Route path ="/carsadmin/:id?" element={<CarsAdmin/>}/>


        </Routes>
    )
}