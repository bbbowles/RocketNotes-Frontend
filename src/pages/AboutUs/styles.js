import styled from "styled-components"
import backgroundImg from "../../assets/background.jpg"

export const Container = styled.div`
    background:url(${backgroundImg}) no-repeat center center;
    background-size:cover;
    width:100%;
    height:100vh;
    display:block;
    padding-top:10vh;




    >div{
        margin-left:auto;
        margin-right:auto;

        padding-top:20px;

        border-radius:2%;

        width:50vh;
        background:${({theme})=>theme.COLORS.BACKGROUND_800};
        text-align:center;

        box-shadow:5px 5px 5px rgba(0,0,0,0.3);

        >div{
            display:flex;
            margin-left:20px;
            margin-top:15px;
            position:absolute;

            svg{
                font-size:40px;
                color:${({theme})=>theme.COLORS.WHITE};

            }
            
        }


        h1{
        color:${({theme})=>theme.COLORS.ORANGE};
        padding-bottom:30px;
        font-size:50px;


        }     
    }
`
export const SubTitle = styled.h2`
    color:${({theme,Highlight})=> Highlight ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};

`
export const SobreTexto = styled.p`
        padding-left:20px;
        padding-right:20px;
        margin-bottom:20px;
        margin-top:10px;
`