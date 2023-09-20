import { Container,SubTitle, SobreTexto} from "./styles"
import {Button} from "../../components/Button"
import { FiArrowLeft } from "react-icons/fi"
import {Link} from "react-router-dom"

export function AboutUs(){
    return(
        <Container>
            <div>
            <div>
                <Link to="/register">
                <FiArrowLeft/> 
                </Link>
            </div>
                <h1>Sobre nos</h1>
                <SobreTexto>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates tempora accusamus dignissimos ex accusantium qui, magnam praesentium quod perspiciatis corrupti repellendus? Atque ad nobis voluptates minima laboriosam amet porro illum!</SobreTexto>
                <SubTitle>Nosso objetivo</SubTitle>
                <SobreTexto>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium neque eaque officiis inventore necessitatibus natus consequuntur, eum enim dolores culpa explicabo quibusdam labore voluptatem distinctio, nisi aspernatur provident optio nihil?</SobreTexto>
                <SubTitle>Nossas responsabilidades</SubTitle>
                <SobreTexto>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, sint. Repudiandae quidem natus voluptates labore. Harum eveniet, reiciendis, sunt doloremque laborum molestiae, neque labore alias vel praesentium quas suscipit voluptatem.</SobreTexto>
                <SubTitle Highlight>Gostou?</SubTitle>
                <Link to="/register">
                <Button title="Crie sua conta!"/>
                </Link>
            </div>
        </Container>
    )
}