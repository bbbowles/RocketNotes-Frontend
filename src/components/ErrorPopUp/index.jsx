import { Container, Message } from "./styles.js"
import { Link } from "react-router-dom"


export function ErrorPopUp({ title, text, textButton, isOpen, route }) {


    if (!title) {
        title = "Erro!"
    }
    if (!text) {
        text = "Um erro interno aconteceu"
    }
    if (!textButton) {
        textButton = "Entendi"
    }
    if (!route){
        route = "/"
    }


    return (
        <Container id="errorPopUp" open={isOpen}>
            <Message>
                <h1>{title}</h1>
                <p>{text}</p>
                <Link to={route}>
                    <button onClick={isOpen=false}>
                        {textButton}
                    </button>
                </Link>
            </Message>
        </Container>
    )
}