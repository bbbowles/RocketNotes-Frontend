import styled from "styled-components"

export const Container = styled.div`
    >.logoutArrow{
        svg{
        color:${({theme}) => theme.COLORS.GRAY_100};
        font-size:42px;
    } 
    }
    
`
export const InputBox = styled.div`
    width:500px;
    height:400px;
    background-color:${({theme}) => theme.COLORS.BACKGROUND_800};
    box-shadow:5px 5px 5px 5px black;
    color: ${({theme}) => theme.COLORS.ORANGE};
    margin:20px auto;
    text-align:center;
    font-size:24px;
    
`