import styled from "styled-components"


export const Container = styled.dialog`
        background-color:rgba(0,0,0,0.4);
        width:100%;
        height:100vh;
        position:absolute;
        .hidden{
        display:none;
    }

`
export const Message = styled.div`
        width:300px;
        height:200px;
        background-color:white;
        color:black;
        margin:15% auto;
        text-align:center;
        border:2px solid black;
        >h1{
            padding-top:10%;
        }
        button{
        border:none;
        margin-top:10px;
        padding: 3%;
        }

`
export const Link = styled.link`

`
