import {Container} from "./styles"

export function Button({title, loading = false,type="button", ...rest}){ //essa funcao recebe o props, para nao ter que especificar props.title, colocamos o title entre chaves
    return(
    <Container {...rest} type={type} disabled={loading}>
        {loading ? "Carregando...":title}
        
    </Container>)
}
//{...rest}