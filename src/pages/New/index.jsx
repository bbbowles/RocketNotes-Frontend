import {Header} from "../../components/Header"
import {Input} from "../../components/Input"
import {TextArea} from "../../components/TextArea"
import {NoteItem} from "../../components/NoteItem"
import {Section} from "../../components/Section"
import {Button} from "../../components/Button"
import {Link, Navigate} from "react-router-dom"
import { useState } from "react"
import {Container,Form} from "./styles"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom"

export function New(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")


    const [links,setLinks] = useState([])
    const [newLink, setNewLink] = useState("")

    const [tags,setTags] = useState([])
    const [newTag, setNewTag] = useState("")

    const navigate = useNavigate()

    function handleAddLink(){
        setLinks((prevState)=>[...prevState, newLink]) // tldr setLinks+=setLinks, ele faz o spread do que ja tinha salvo nele e adiciona novos links
        setNewLink("")
    }

    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted))
    }

    function handleAddTag(){
        setTags(prevState => [...prevState, newTag])
        setNewTag("")
    }
    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted))
        //apaga notas iguais, não deve impactar muito o usuario final
    }

    async function handleNewNote(){
        if(!title){
            return alert("Digite o titulo da nota")
        }
        
        if(newTag){
            return alert("Voce deixou tags sem salvar!")
        }
        if(newLink){
            return alert("voce deixou links sem adicionar")
        }

        await api.post("http://localhost:3002/notes",{
            title,
            description,
            tags,
            links
        })

        alert("Nota criada com sucesso")

        navigate(-1)

        
    }

    return(
        <Container>
            <Header/>

            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <Link to="/">Voltar</Link>
                    </header>

                    <Input
                    placeholder="titulo"
                    onChange={e=>setTitle(e.target.value)}/>

                    <TextArea
                    placeholder="Observações"
                    onChange={e=>setDescription(e.target.value)}/>

                    <Section title="Links uteis">
                        { 
                            links.map((link, index)=>(
                                <NoteItem
                                key={String(index)}
                                value={link}
                                onClick={()=>{handleRemoveLink(link)}}/>
                            ))
                        }
                        <NoteItem
                        isNew
                        placeholder="Novo link"
                        value={newLink}
                        onChange={e=>{
                            setNewLink(e.target.value)


                        }}
                        onClick={handleAddLink}/>
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index)=>(
                                    <NoteItem
                                    key={String(index)}
                                    value={tag}
                                    onClick={() => {handleRemoveTag(tag)}}
                                    />
                                ))
                            }
                            <NoteItem
                            isNew
                            placeholder="Nova tag"
                            onChange={e=>setNewTag(e.target.value)}
                            value={newTag}
                            onClick={handleAddTag}/>
                        </div>
                    </Section>

                    <Button
                    title="Salvar"
                    onClick={handleNewNote}/>

                </Form>
            </main>
        </Container>
    )
}