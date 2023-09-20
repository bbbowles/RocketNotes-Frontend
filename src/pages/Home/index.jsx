import { useState, useEffect } from "react"
import {FiPlus,FiSearch} from "react-icons/fi"
import { api } from "../../services/api"

import { Container, Brand, Menu, Search, Content, NewNote} from "./styles"

import {Note} from "../../components/Note"
import {Input} from "../../components/Input"


import {Header} from "../../components/Header"
import {ButtonText} from "../../components/ButtonText"
import {Section} from "../../components/Section"

import { useNavigate } from "react-router-dom"


export function Home(){
    const [tags,setTags] = useState([])
    const [tagsSelected,setTagsSelected] = useState([])
    const [search, setSearch] = useState("")
    const [notes,setNotes] = useState([])

    const navigate = useNavigate()

    function handleTagSelected(tagName){
        
        console.log(tagName)

        if(tagName == "all"){
            console.log("todos!")
            return setTagsSelected([])
        }


        if(tagsSelected.includes(String(tagName))){

            const filtered = tagsSelected.filter(tag=>tag!==tagName)

            console.log(filtered)
            setTagsSelected(filtered) 
        }else{
            setTagsSelected(prevState=>[...prevState, tagName])
            console.log(tagsSelected)

        }
    }

    function handleDetails(id){
        navigate(`/details/${id}`)
    }
    

   

    useEffect(()=>{
        async function fetchTags(){
            const response = await api.get("http://localhost:3002/tags")
            setTags(response.data)
        }
        fetchTags()

    },[])

    useEffect(()=>{
        async function fetchNotes(){
            const response = await api.get(`http://localhost:3002/notes?title=${search}&tags=${tagsSelected}`) //notes where titulo = termo pesquisado e tag = tags selecionadas
            setNotes(response.data)
        }

        fetchNotes()


    
    },[tagsSelected, search])

    return(
        <Container>
            <Brand>
            <h1>RocketNotes</h1>
            </Brand>

            <Header/>

            <Menu>
                <li>
                <ButtonText
                title="Todos"
                onCLick={()=>handleTagSelected("all")}
                isActive={tagsSelected.length === 0}
                /></li>
                {
                    tags && tags.map(tag =>(
                    <li key={String(tag.id)}>
                        <ButtonText
                        title={tag.name}
                        onClick={() => handleTagSelected(tag.name)}
                        isActive={tagsSelected.includes(tag.name)}
                        />
                    </li>
                    ))
                }
                
            </Menu>

            <Search>
                <Input
                placeholder="Pesquisar pelo titulo"
                icon={FiSearch}
                onChange={(e)=>setSearch(e.target.value)}
                
                />
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map(note=>(
                            <Note
                            key={String(note.id)}
                            data={note}
                            onClick={()=>handleDetails(note.id)}
                            />
                        ))
                    }
                </Section>  
            </Content>

            <NewNote to="/new">
                <FiPlus/>
                Criar Nota
            </NewNote>

        </Container>
    )
}