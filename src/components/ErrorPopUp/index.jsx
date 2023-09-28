import { Container, Message } from "./styles.js"
import { Link } from "react-router-dom"


export function ErrorPopUp({ title, text, textButton, isOpenState, route }) {


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
        <Container id="errorPopUp" open={isOpenState}>
            <Message>
                <h1>{title}</h1>
                <p>{text}</p>
                <Link to={route}>
                    <button >
                        {textButton}
                    </button>
                </Link>
            </Message>
        </Container>
    )
}