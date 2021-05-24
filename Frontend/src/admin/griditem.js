import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from "@material-ui/core/Button"
import axios from "../../src/axios/instance"
import {confirmAlert} from "react-confirm-alert"
import { useHistory } from "react-router-dom"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const DataTable=(props)=> {
    const history  =useHistory()
    const x = props.items
    let rows=[]
    let config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    }
  }
 
    console.log(x[0])
    for (let i = 0; i < x.length; i++) {
       rows[i]= {id:x[i]._id,  title: x[i].title, Price: x[i].price+"Rs", Discount:x[i].offer+"%", Stock: x[i].stock  ,like:x[i].like }
    }
    console.log(rows)
    const columns = [
        { field: 'id', headerName: 'ID', width: 220, },
        { field: 'title', headerName: 'Product Tttle', width: 600 },
        
        { field: 'Stock', headerName: 'Stock', width: 90 },
        {
            field: 'Price',headerName: 'Price', width: 90,
        },
        {
            field: 'Discount',
            headerName: 'Discount',
            sortable: false,
            width: 120,
        } ,
        {
            field: 'like',
            headerName: 'Like',
           
            width: 80,
        },{
            field: 'Delete',
            headerName: 'Delete',
            type: 'button',
            width: 95,
            renderCell: (e) => {
                return <DeleteIcon style={{cursor: "pointer",color:"red"}} onClick={()=>deleteitem(e)}/>
              }
        },
        {
            field: 'Edit',
            headerName: 'Edit',
            type: 'button',
            width: 80,
            renderCell: (e) => {
                return <EditIcon style={{cursor: "pointer",color:"green" }} onClick={()=>edititem(e)}/>
              }
        },
    ];
    const deleteitem=(e)=>{ 
      console.log(e.id)
        confirmAlert({
                    title: 'Conform To Delete',
                    message: 'Are you sure you want to delete.',
                    
                    buttons: [
                      {
                        label: 'Delete',
                        style:{color:'Red'},
                        onClick: () =>{
                            axios.delete(`/admin/delete/${e.id}`,config).then(resp=> {
                              window.location.reload();
                            })
                            .catch(error=> console.log(error))
                          }
                      },
                      {
                        label: 'No',
                        onClick: () => {}
                      }
                    ]
                  });
    }
 const edititem=(e)=>{
 localStorage.setItem('id',e.id);
 history.push('/AdminDashbord/editproduct')

 }
    return (
        <>
            <div style={{ height: '550px', width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={8}  />

 
            </div>
    
        </>
    );
}
export default DataTable