import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import uvt from '../../media/uvtphoto.jpeg'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import './style.css';

const theme = createTheme();

function Autentificare(props) {
  const navigateLog = useNavigate();
  const { emailLog, setEmailLog } = props;
  const [parolaLog, setParolaLog] = useState('');
  const [error, setError] = useState('');
  const [tot, setTot] = useState(false);
  const [openModalLog, setOpenModalLog] = useState(false);
  const [openModalLog2, setOpenModalLog2] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowForm(true);
    }, 300);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  async function checkEmailExistsLog() {
    try {
      const response = await axios.get(`http://localhost:8080/approve_app/php/check_email.php?email=${emailLog}&parola=${parolaLog}`);
      
      if (response.data.exists === false) {
        setOpenModalLog(true);
      } else {
        navigateLog("/Portal");
      }
      setTot(response.data.exists);
    } catch (error) {
      console.error(error);
    }
  }

  function handleClick() {
    if (emailLog === "" || parolaLog === "") {
      setOpenModalLog2(true);
    } else {
      checkEmailExistsLog();
    }
  }


  return (
    <div style={{ height: '100vh', width: '100vw', backgroundImage: `url(${uvt})`, backgroundRepeat: 'no-repeat' ,backgroundSize: 'cover' }}>
      <div className={`form-container ${showForm ? "show" : ""}`} style={{ display: 'flex', justifyContent: 'flex-start', width: '40vw' }}>
        {showForm &&
          <Container maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                padding: '3vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <>
                <Typography component="h1" variant="h5" style={{ marginTop: '18vh' }}>
                  Intra in cont
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Adresa de email"
                    name="email"
                    autoComplete="email"
                    sx={{
                      '& label.Mui-focused': { color: 'black' },
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'black',
                        '&:hover fieldset': {
                          borderColor: 'black',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'black',
                        },
                      },
                    }}
                    onChange={(e) => setEmailLog(e.target.value)}
                  >
                    {error && <p>{error}</p>}
                  </TextField>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Parola"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{
                      '& label.Mui-focused': { color: 'black' },
                      '& .MuiOutlinedInput-root': {
                        borderColor: 'black',
                        '&:hover fieldset': {
                          borderColor: 'black',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'black',
                        },
                      },
                    }}
                    onChange={(e) => setParolaLog(e.target.value)}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={(e) => handleClick()}
                  >
                    Sign In
                  </Button>
                </Box>
              </>
            </Box>
          </Container>
        }
      </div>
      <div>
        <Dialog open={openModalLog} onClose={() => setOpenModalLog(false)} style={{ color: '#fff', backgroundImage: `url(${uvt})`, opacity: 0.9, minWidth: "100px"}}>
          <DialogTitle>Adresa de email sau parola nu este corectă </DialogTitle>
          <DialogTitle>
            Te rugăm să încerci din nou.
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => setOpenModalLog(false)}>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog open={openModalLog2} onClose={() => setOpenModalLog2(false)} style={{ color: '#fff', backgroundImage: `url(${uvt})`, opacity: 0.9, minWidth: "100px" }}>
          <DialogTitle>Toate câmpurile sunt obligatorii, iar adresa de email trebuie să fie validă!</DialogTitle>
          <DialogTitle>
            Te rugăm să încerci din nou.
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => setOpenModalLog2(false)}>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}
export default Autentificare;
