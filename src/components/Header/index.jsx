import { RiShutDownLine} from "react-icons/ri"
import {AiFillCar, AiFillPlusCircle} from "react-icons/ai"
import {Container, Profile, Logout,CarsButton} from "./styles"
import {useAuth} from "../../hooks/auth"
import { api } from "../../services/api"
import avatarPlaceholder from "../../assets/no_avatar-3909400661.jpg"
import { Navigate } from "react-router-dom"


export function Header(){
    const {signOut, user} = useAuth()


    const avatarUrl = user.avatar ?`http://localhost:3002/avatar/${user.avatar}` : avatarPlaceholder //por que

    return(
        <Container>
            <Profile to="/profile">
                <img src={avatarUrl}/>

                <div>
                    <span>Bem-Vindo</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>

            <div class="buttons">
            <CarsButton to="/carsadmin">
                <AiFillPlusCircle/>
            </CarsButton>


            <CarsButton to="/cars">
                <AiFillCar/>
            </CarsButton>

            <Logout onClick={signOut}>
                <RiShutDownLine/>
            </Logout>
            </div>
        </Container>
    )
}