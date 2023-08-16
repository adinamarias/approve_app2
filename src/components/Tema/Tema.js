import React from "react";
import pozatema from "../../media/blue.jpeg";
import pozaform from "../../media/pozaform.jpeg";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios  from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import SearchAppBar from "../Portal/AppBar";



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Tema(props) {

  const [dateWithNoInitialValue, setDateWithNoInitialValue] =
    React.useState(null);

const currentDate = dayjs().format('YYYY-MM-DD HH:mm');

  const isDateTimeValid =
    dateWithNoInitialValue !== null &&
    dateWithNoInitialValue.isBefore(currentDate, "minute");
  const handleChange = (event) => {
    setSpeci(event.target.value);
    
  };
 
 const handleDateTimeChange = (newValue) => {
  setDedline(dayjs(newValue).format('YYYY-MM-DD HH:mm'));
  setDateWithNoInitialValue(newValue);
  console.log(deadline);
 }
  const[denumire,setDenumire] =  React.useState('');
  const[speci,setSpeci] =  React.useState('');
  const[descriere,setDescriere] =  React.useState('');
  const [deadline,setDedline] = React.useState('');
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigateTema = useNavigate();
  


  const Teme = () => {
    let params = new FormData()
    params.append('denumire', denumire);
    params.append('speci', speci);
    params.append('descriere', descriere);
    params.append('deadline', deadline);
    params.append('dateadded',currentDate);
    axios.post("http://localhost:8080/approve_app/php/add_tema.php", params).then((response) => {
        console.log(response.data);
        if (response.data === "success") {
          setSuccess(true);
          setOpen(true);
        } else {
          setSuccess(false);
        }
        
      })
      .catch((error) => {
        console.log(error);
        setSuccess(false);
        setOpen(true);
      });
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const typographyStyle = {
  article: {
    background: 'linear-gradient(to right, hsl(98 100% 62%), hsl(204 100% 59%))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    fontSize: '9vh',
    width:'40vw',

  },

};
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${pozatema})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        flexDirection:'column'
        
      }}
    >
     <SearchAppBar />
    <div style={{width:'40vw'}}>
    <Typography  style={typographyStyle.article}>Adauga tema</Typography>
    </div>
    
      <div
        style={{
          height: "80vh",
          width: "80vw",
          display: "flex",
          flexDirection: "row",
          marginLeft:'10vw'
        }}
      >
        <div
          style={{
            height: "75vh",
            width: "40vw",
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        >
          <TextField
            id="filled-basic"
            label="Denumire tema"
            variant="filled"
            style={{
              marginTop: "5vh",
              width: "30vw",
              
            }}
            onChange={(e)=>setDenumire(e.target.value)}
          />
          <div
            style={{
              marginTop: "9vh",
              width: "30vw",
              justifyContent: "space-between",
              display: "flex",
              marginLeft: "5vw",
              flexDirection: "row",

            }}
          >
            <div
              style={{
                width: "18vw",
                height: "17vh",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs} locale="ro">
                <Stack
                  style={{
                    width: "18vw",
                  }}
                >
                  <DateTimePicker
                    style={{ justifyContent: "center", display: "flex" }}
                    sx={{ width: 197 }}
                    inputFormat="YYYY-MM-DD HH:mm"
                    ampm={false}
                    label="Deadline"
                    value={dateWithNoInitialValue}
                    onChange={handleDateTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <div
              style={{
                width: "10vw",
                height: "17vh",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Specializare
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={speci}
                  variant="filled"
                  label="Specializare"
                  onChange={handleChange}
                  
                >
                  <MenuItem value='LICENTA'>Licenta</MenuItem>
                  <MenuItem value='MASTER'>Master</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
            <div style={{justifyContent:'center', display:'flex', flexDirection:'column'}}>
              <div>
                <TextField
                id="filled-multiline-static"
                label="Descriere temă"
                multiline
                rows={8}
                variant="filled"
                style={{width:'20vw'}}
                onChange={(e)=>setDescriere(e.target.value)}
                />
              </div>
              <div style={{marginTop:'5vh'}}>
                <Button
                variant="contained"
                
                  onClick={()=>{
                            Teme()
                            handleClick()
                        }
                        }
                >
                TRIMITE
                </Button>
              </div>
            </div>
          
        </div>
        <div
          style={{
            height: "75vh",
            width: "40vw",
            borderRadius: "8px",
            backgroundImage: `url(${pozaform})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
        </div>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        {success ? (
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            Tema asignată cu succes!
          </Alert>
        ) : (
          <Alert severity="error" onClose={handleClose}>Ceva nu a funcționat. Încearcă din nou!</Alert>
        )}
      </Snackbar>
      </div>
    </div>
  );
}

export default Tema;
