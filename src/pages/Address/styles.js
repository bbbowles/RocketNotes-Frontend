import styled from "styled-components"
import { Link } from "react-router-dom"


export const Container = styled.div`
    >.logoutArrow{
        padding-left:20px;
        padding-top:20px;
        svg{
        color:${({ theme }) => theme.COLORS.GRAY_100};
        font-size:42px;
    } 
    }
`
export const Table = styled.div`
    background-color:black;
    /* width:800px;
    height:400px; */
    table{
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 0 .4rem .2rem rgba(0,0,0,0.3);
    }
    table *{
        font-size: 1.4rem;
        color: white;
    }

    table th{
        background:var(--primary-color);
        text-align: center;
        font-weight: normal;
        padding: 1.5rem;
    }
    table th:first-child{
        border-top-left-radius: .4rem;
    }
    table th:last-child{
        border-top-right-radius: .4rem;
    }
    table tr:nth-child(even){
        background: rgb(13,172,208);
        background: linear-gradient(322deg, rgba(13,172,208,.8) 0%, rgba(11,179,114,.8) 100%);
    }
    table tr:nth-child(odd){
        background: rgb(13,172,208);
        background: linear-gradient(322deg, rgba(13,172,208,.7) 0%, rgba(11,179,114,.7) 100%);
    }
    table td{
        padding: 1.5rem;
        text-align: left;
    }
    td.user{
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    td.user img{
        width: 5rem;
        height: 5rem;

        object-fit: cover;
        border-radius: 50%;
    }
    td.user a{
        text-decoration: none;
    }
    td.user a p{
        font-weight: bold;
    }
    td.remove{
        background:none;
        border: none;

        color: red;

        cursor: pointer;
    }
`

export const AddressCreateButton = styled(Link)`
        display:inline-flex;

        align-items:center;

        text-align:center;

        margin-bottom:30px;

        margin-left:120px;

        background-color:#4ddf7e;
        color: white;

        height: 56px;
        border:0;
        padding:0 16px;
        margin-top: 16px;
        border-radius:10px;
        font-weight:500;

        &:disabled{
            opacity:0.5;
        }
`