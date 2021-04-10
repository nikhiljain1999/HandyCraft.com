import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom"
import axios from "axios"
const getProduct = () => {
    return axios.get('http://localhost:3001/product/randomproduct');
}
const getAndSet = async (setItem) => {
    const prod = await getProduct();
    setItem(prod.data);
}
const randomize = async (setItem) => {
    getAndSet(setItem);
    setInterval(() => {
        getAndSet(setItem);
    }, 5000)
}

const useStyles = makeStyles({
    root: {
        Width: '100%',
        marginTop: 10,
        marginLeft: 5,
        marginRight:10,
        height: "300px",
    },
    media: {

        height: 400,
        width: '100%',
    },
    align: {
        display: 'flex',
        flexDirection: 'row',
    }
});
function AdCard({ }) {
    const history = useHistory()
    const classes = useStyles();
    const [item, setItem] = useState({})
    useEffect(() => {
        try {
            randomize(setItem);
        } catch (error) {
            console.log('error', error)
        }
    }, []);
    
    return (
        <Card name={item._id} key={item._id} className={classes.root}>
            <CardActionArea>
                <CardContent >
                    <Typography gutterBottom variant="h5" component="h2">
                        {item.title && item.title.length>30 ? item.title.slice(0,30)+"..." : item.title}
                    </Typography>
                    <br></br>
                    <Typography variant="body2" component="h4" variant="h6">
                        <strong> Product Description:</strong>{item.Description && item.Description.length>20? item.Description.slice(0,100)+"...":item.Description}
                    </Typography>
                    <br></br>
                    <br></br>
                    <Typography variant="body2" component="p" variant="h6"  >
                        <strong>Price:</strong>{item.price}₹
                    </Typography>
                    <Typography variant="body2" component="h4" variant="h6">
                        <strong> Product Type:</strong>{item.producttype}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
        </Card>
    )
}
export default AdCard