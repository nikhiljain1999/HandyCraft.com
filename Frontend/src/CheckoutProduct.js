import React, { useState } from 'react'
import { useStateValue } from './StateProvider';
import axios from '../src/axios/instance'
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from "@material-ui/core/Button"
import { confirmAlert } from 'react-confirm-alert';
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography';
import { Checkbox } from '@material-ui/core';
import { useHistory } from "react-router-dom"
function CheckoutProduct(props) {
    const [{ basket }, dispatch] = useStateValue()
    const [quant, setQuant] = useState('')
    const history = useHistory()
    const { item } = props;
    const removeFromCart = (item) => {
        for (let i = 0; i < item.quantity; i++) {
            axios.get(`/product/removefromcart/${item.id}`)
        }

        dispatch({
            type: "REMOVE_FROM_CART",
            payload: item.id,
        })
    }
    const updatequent = (item1) => {

        if (item1.stock - 1 > 0) {
            axios.get(`product/addtocart/${item1.id}`).then(resp => {
                item1.quantity = Number(item1.quantity) + 1
                item.stock = item.stock - 1
                setQuant(item1.quantity)
                dispatch({

                    type: "UPDATE_QUANTITY",
                    id: item1._id,
                    quantity: item1.quantity + 1,
                    stock: item1.stock,
                })
            }

            )
            console.log(item1.quantity)

        }
        else {
            confirmAlert({
                title: 'Out Of Stock',
                message: 'Item you are trying to purchase is Out of Stock.We will send you mail once it will be back',
                buttons: [{
                    label: 'Ok',
                    onClick: () => { }
                }
                ]
            })
        }


    }
    const deletequent = (item1) => {
        let total = Number(item1.quantity)
        console.log(item1.id)
        if (total <= 1) {
            return item1.quantity = 1
        }
        axios.get(`/product/removefromcart/${item1.id}`).then(resp => {
            console.log(resp)
            item1.quantity = Number(item1.quantity) - 1
            item.stock = item.stock + 1
            setQuant(item1.quantity)
            dispatch({
                type: "UPDATE_QUANTITY",
                id: item1._id,
                quantity: item1.quantity - 1,
                stock: item1.stock,
            })

        })


    }
    const gotoproduct = (item) => {
            history.push(`/product/${item.id}`)
       
    }
    return (
        <>
            <Grid style={{ display: "flex", flexDirection: "row", marginTop: "30px", }}>

                <Grid>
                    <img src={item.image} style={{
                        objectFit: "contain",
                        width: "180px",
                        height: "180px"
                    }} />


                </Grid>

                <Grid style={{ display: "flex", flexDirection: "column", width: "70%", marginLeft: "30px" }}>
                    <div style={{ cursor: "pointer", color: "rgb(21, 35, 165)" }} onClick={() => gotoproduct(item)}>{item.title} </div>
                    {(
                        item.stock - 1 > 4 &&
                        <Typography>Available in stock</Typography>
                    )}

                    {(item.stock - 1 < 5 && item.stock - 1 > 0) &&
                        <Typography style={{ color: "red" }}>
                            <strong> Hurry up Only {item.stock - 1} Left in Stock</strong>
                        </Typography>
                    }
                    {item.stock - 1 === 0 &&
                        <Typography style={{ color: "red" }}>
                            <strong> Out of Stock</strong>
                        </Typography>
                    }
                    <h6><Checkbox />This will be a gift</h6>
                    <Grid>
                        <div>
                            <Button onClick={() => updatequent(item)} ><AddBoxIcon fontSize="large" /></Button>
                            <Button style={{ border: "2px solid" }} >
                                {quant !== "" ? quant : item.quantity}</Button>
                            <Button onClick={() => deletequent(item)}><IndeterminateCheckBoxIcon fontSize="large" /></Button>
                |<Button style={{ marginLeft: "40px" }} onClick={() => removeFromCart(item)}>Delete</Button>
                        </div>

                    </Grid>
                </Grid>
                <Grid style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
                    <div>
                        <h6> Price</h6>
                    </div>
                    <div>
                        <small style={{ color: "red" }}>₹{item.price}</small>
                    </div>
                </Grid>
            </Grid>

            <hr />

        </>
    )
}

export default CheckoutProduct
