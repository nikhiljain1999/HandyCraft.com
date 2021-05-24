import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios"
import './Header.css'
import LocationOnIcon from '@material-ui/icons/LocationOn';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const[city,setCity]=useState('')
  const[area,setArea]=useState('')
  const [pin ,setPin]=useState()
  const[error ,setError]=useState('')
  const handleClickOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const Xyz=()=>{
      

      axios.get( `http://www.postalpincode.in/api/pincode/${pin}`).then(resp=>{
          let cty=resp.data.PostOffice[0].District
          setCity(cty)
          console.log(resp.data.PostOffice[0].Name)
          setArea(resp.data.PostOffice[0].Name)
          setOpen(false);
          setError()
        }
      ).catch(e=>{
       setError(e)
      })
    //         console.log(city.data.PostOffice[0].District)
    //    if (a!==null){a=a.toUpperCase()
    //    setCity(a)}
    }
  return (
    <div  className="header">
            <div >  
                    <LocationOnIcon  style={{color:"white", fontSize:"30px", marginRight:"10px" ,marginLeft:"30px" }}/>
                    </div> 
                <div  className="header_optionone">
                
                   {city===''? (
                       <div  className="header_optionone">
                   <span className="header_optionLineOne" onClick={handleClickOpen} >Enter Your</span>
                    <span className="header_optionLineTwo" onClick={handleClickOpen}>City Pincode</span></div>) :
                    (<div  className="header_optionone">
                     <span className="header_optionLineOne" onClick={handleClickOpen} >Delivery to</span>
                    <span className="header_optionLineTwo" onClick={handleClickOpen} >{area},{city}</span></div>)
                    }
                    </div> 
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delivery To</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Enter Pin Code 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="number"
            fullWidth

             onChange={e => setPin(e.target.value)}
          />
          {error && <h4 style={{color:"red"}}>Pin not Found.Please try Other</h4>}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={Xyz} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}