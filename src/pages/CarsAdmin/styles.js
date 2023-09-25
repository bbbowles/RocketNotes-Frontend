import styled from "styled-components"

export const Container = styled.div`
    >.logoutArrow{
        svg{
        color:${({ theme }) => theme.COLORS.GRAY_100};
        font-size:42px;
    } 
    }
   
    
`
export const InputBox = styled.form`
    width:500px;
    height:400px;
    background-color:${({ theme }) => theme.COLORS.BACKGROUND_700};
    box-shadow:5px 5px 5px 5px black;
    color: ${({ theme }) => theme.COLORS.ORANGE};
    margin:20px auto;
    text-align:center;
    font-size:24px;

    select{
        height:56px;
        width:100%;

        padding:12px;

        color:black;
        background:white;
        border:0;
        }
    >input{
        margin-top:10px;
        height:56px;
        width:100%;

        padding:12px;

        color:black;
        background:rgb(90,240,90);
        border:0;

        &:hover{
            cursor:pointer;
        background:rgb(0,220,0);

        }
        

    }
    
    
    >div{
        >input{
        height:56px;
        width:100%;

        padding:12px;

        color:black;
        background:white;
        border:0;
        

    }
    }
   
    
`

