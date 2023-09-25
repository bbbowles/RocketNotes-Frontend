import styled from "styled-components"

export const Container=styled.div`
    >.logoutArrow{
        padding-left:20px;
        padding-top:20px;
        svg{
        color:${({theme}) => theme.COLORS.GRAY_100};
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
        color: black;
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
        background: #eee;
    }
    table tr:nth-child(odd){
        background-color: #ddd;
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