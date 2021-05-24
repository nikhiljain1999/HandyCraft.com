import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Grid, Typography, } from "@material-ui/core"
import { red } from '@material-ui/core/colors';
import robo from "../assets/robo.jpg"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '80%',
    marginTop: '7%',
    marginLeft: '10%',
    minHeight: '80%',
    marginBottom: '7%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
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
    marginLeft: "40px"

  }
}
));

export default function Profile(props) {

  const classes = useStyles();
  return (
    <Card className={classes.root}>
    
      <CardContent>
        <Grid className={classes.col}>
          <Grid className={classes.rowStyles} item >
            <CardActionArea>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>

                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">

                  </IconButton>
                }
                title={props.name}
                subheader={props.createdAt}
              />
              <CardMedia

                style={{ height: '300%', width: '90%' }}
                image={robo}
                title="Your Profile"
              />
            </CardActionArea>

          </Grid>
          <Grid className={classes.rowStyles} item >
            <Typography ><CardContent >
              <Typography variant="body2" color="textSecondary" component="p" style={{ fontSize: '30px', marginTop: '30%' }}>
                <strong>Name :</strong>{props.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" style={{ fontSize: '20px' }}>
                <strong>Email :</strong>{props.email}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" style={{ fontSize: '30px' }}>
                <strong>Phone :</strong>{props.phone}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" style={{ fontSize: '30px' }}>
                <strong>Age :</strong>{props.age}
              </Typography>
              {props.address && <Typography variant="body2" color="textSecondary" component="p" style={{ fontSize: '30px' }}>
                <strong>address :</strong>{props.address}
              </Typography>}
            </CardContent>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
     
    </Card>
  );
}