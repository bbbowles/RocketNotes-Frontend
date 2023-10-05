import * as React from 'react';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons, } from '@mui/x-data-grid';
import { api } from '../../services/api';

import { useNavigate } from "react-router-dom"

import Swal from 'sweetalert2'

import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import { useCallback, useEffect, useState } from 'react';






export function AddressTeste() {

  const columns = [
    { field: 'cep', headerName: 'CEP', width: 100 },
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'cidade', headerName: 'Cidade', width: 300 },
    { field: 'bairro', headerName: 'Bairro', width: 150, },
    { field: "estado", headerName: "Estado", width: 90 },
    { field: "numero", headerName: "Numero", width: 90 },
    { field: "complemento", headerName: "Complemento", width: 200 },
    { field: "name", headerName: "Usuário", width: 90 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Açoes',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [
          <GridActionsCellItem
            icon={<AiFillEdit />}
            label="Edit"
            className="textPrimary"
            onClick={() => editAddress(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<AiOutlineDelete />}
            label="Delete"
            onClick={() => handleDelete(id)}
            color="inherit"
          />,
        ];
      },
    },
  ]

  const navigate = useNavigate()

  const [rows, setRows] = useState([])

  const fetchAddressIndex = useCallback(() => {
    async function fetch() {
      const rows = await api.get("http://localhost:3002/addr")
      setRows(rows.data)


      return

    }
    fetch()
  }, [])

  const handleDelete = useCallback((address_id) => {
    async function deleteAddr() {

      Swal.fire({
        icon: 'warning',
        title: 'Você quer mesmo deletar o endereço?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: "Não"
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          deleteAddress(address_id)

          return

        }
      })

    }
    deleteAddr()
  }, [])


  const editAddress = useCallback((id) => {
    async function edit() {
      navigate(`/address/add/${id}`)

      return
    }
    edit()
  }, [])


  const deleteAddress = useCallback((address_id) => {
    async function deleteAddr() {
        await api.delete(`http://localhost:3002/addr/${address_id}`)

        fetchAddressIndex()

        return
    }
    deleteAddr()
}, [])



  useEffect(() => {
    fetchAddressIndex()

    console.log(rows)


    return
  }, [])



  return (
    <div style={{ marginTop: "30px", height: 400, width: '80%', backgroundColor: "#ffffff" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection

      />

    </div>

  );


}