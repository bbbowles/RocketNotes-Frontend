import styled from "styled-components"
import backgroundImg from "../../assets/background.jpg"
import {Link} from "react-router-dom"



export const Container = styled.div`
    height:100vh;

    display:flex;
    align-items:stretch;

`

export const Form = styled.form`
    padding:0 136px;

    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    text-align:center;

    >h1{
        font-size:48px;
        color:${({theme})=>theme.COLORS.ORANGE};

    }
    >h2{
        font-size:24px;
        margin-top:84px;
        margin-bottom:24px;
    }
    >p{
        font-size:14px;
        color:${({theme})=>theme.COLORS.GRAY_100};
    }
    >a{
        margin-top:124px;
        color:${({theme})=>theme.COLORS.ORANGE};
    }
`   
export const Background =styled.div`
    flex:1;
    background:url(${backgroundImg}) no-repeat center center;
    background-size:cover;
    
`

export const Links = styled(Link)`
        position:absolute;
        top:82vh;
        left:2vh;
        z-index:99;
        
        h2{
        color:${({theme})=>theme.COLORS.WHITE};
        font-size:35px;
        text-shadow:0px 0px 8px rgba(255,255,255,0.8);

        &:hover{
                cursor:pointer;
                text-shadow:2px 2px 12px rgba(255,255,255,1);


        }

    }

`