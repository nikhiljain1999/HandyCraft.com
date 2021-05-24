import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Grid, Typography, } from "@material-ui/core"

const useStyles = makeStyles({
    root: {
        marginTop:"20px",
        minWidth: '100%',
        backgroundColor: '#279698'
    },
    bullet: {
        display: 'inline-block',
        color: 'white',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 40,
        color: 'white',
        align: 'center'
    },
    p: {
        frontSize: 20
    },
    pos: {
        marginBottom: 12,
        color: 'white',
    },
    col: {
        display: 'flex',
        flexDirection: "row"
    },
    rowStyles: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "20%",
    }
});

export default function SimpleCard() {
    const classes = useStyles();


    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} align='center' gutterBottom>
                    HandyCraft.com
        </Typography>
                <Grid className={classes.col}>
                    <Grid className={classes.rowStyles} item >
                        <Typography style={{

                            width: '4rem',
                            color: "white"
                        }}><h2>ABOUT</h2>
                            ContactUs
                            AboutUs
                            Careers
                            Handicraft Stories
                            Wholesale
                    </Typography>

                    </Grid>

                    <Grid className={classes.rowStyles} item >
                        <Typography style={{


                            width: '4rem',
                            color: "white"
                        }}><h2>HELP</h2>
                            Payments
                            Shipping
                            Cancellation &return
                            FAQ
                    </Typography>
                    </Grid>

                    <Grid className={classes.rowStyles} item >
                        <Typography style={{
                            width: '4rem',
                            color: "white"
                        }}><h2>POLICY</h2>
                                ReturnPolicy
                                TermsofUse
                                Security
                                Privacy
                                Complains
                    </Typography>
                    </Grid>
                </Grid>
                <br />
                <hr />
                <Typography align='center' marginTop='7px'> All Rights Reserved @handycraft.com</Typography>

            </CardContent>
        </Card>
    );
}