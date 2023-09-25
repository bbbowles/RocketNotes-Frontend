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
    width:50%;
    background: rgb(13,172,208);
    background: linear-gradient(322deg, rgba(13,172,208,1) 0%, rgba(11,179,114,1) 100%);     
    display:block;
    border-radius:2%;
    padding-top:20px;


    margin:50px auto;

    >h1{
        font-size:50px;
        font-family: 'Roboto', sans-serif;
        font-weight:700;
        padding-bottom:40px;
        text-align:center;
    }

    
    >div{
        justify-content:space-between;
        margin-bottom:20px;
        display:flex;
        >p{
        text-align:left;
        padding-left:10%;
        font-size:35px;
        font-family: 'Roboto', sans-serif;
        color: white;
        }   
        >div{
            width:60%;
            display:flex;


            input{
                height:37px;
                font-size:24px;
                border:none;
                border-radius:8px;
            }


            select{
                width:328px;
                height:37px;
                font-size:24px;
                border:none;
                font-family: 'Roboto', sans-serif;
                border-radius:8px;

                >option{
                    font-size:24px;
                    font-family: 'Roboto', sans-serif;
                }

            }


            p{
                font-size:20px;
                font-family: 'Roboto', sans-serif;
                font-weight: 900;
                font-style:italic;

                color:red;

                text-shadow:0px 0px 4px rgba(0,0,0,0.4);

                margin-left:2px;
            }


            }
    }
    
`

export const SubmitButton = styled.button`
    width:100%;
    background-color:#77FF6E;
    color: white;
    text-shadow:0px 0px 5px rgba(0,0,0,0.3);

    height: 56px;
    border:0;
    padding:0 16px;
    margin-top: 16px;
    border-radius:10px;
    font-weight:500;
    font-size:25px;

    &:disabled{
        opacity:0.5;
    }
`