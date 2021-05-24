import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom"
import axios from '../../src/axios/instance'
import { Grid } from "@material-ui/core"

const getProduct = () => {
    return axios.get('/product/randomproduct');
}
const getAndSet = async (setItem) => {
    const prod = await getProduct();
    setItem(prod.data);
}
const randomize = async (setItem) => {
    getAndSet(setItem);
    setInterval(() => {
        getAndSet(setItem);

    }, 10000)
}

const useStyles = makeStyles({
    root: {
        Width: '100%',
        marginTop: 10,
        marginLeft: 5,
        marginRight: 10,
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
                    <Grid>
                        <Grid style={{ display: "flex", flexDirection: "row" }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                <img src={item.image} style={{ width: "200px", height: "150px" }} />

                            </Typography>
                        </Grid>
                        <Grid style={{ display: "flex", flexDirection: "column", marginLeft: "8px", }}>
                            <Typography>

                                {item.title && item.title.length > 18 ? item.title.slice(0, 18) + "..." : item.title}
                            </Typography>


                            <Typography variant="body2" component="p" variant="h6"  >
                                <strong style={{ color: "red" }}>{Math.floor(item.price - item.price * (item.offer / 100))} ₹</strong><small><del>{item.price}</del></small>
                            </Typography>
                            <Typography  >
                                Liked By:{item.like}
                            </Typography>

                        </Grid>

                    </Grid>


                </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
        </Card>
    )
}
export default AdCard